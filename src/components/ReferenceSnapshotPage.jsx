import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { whatsappUrl } from '../siteConfig.js'

const REFERENCE_ORIGIN = 'https://puppy.instabizweb.com'
let introStarted = false
let routeTransitionPending = false
const STATIC_ROUTES = new Set([
  '/',
  '/puppies',
  '/happy-families',
  '/gone-home',
  '/how-it-works',
  '/faq',
  '/contact',
])

function isLocalRoute(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  return STATIC_ROUTES.has(path) || /^\/puppies\/[a-z0-9-]+$/i.test(path)
}

function snapshotUrl(page, slug) {
  if (page === 'puppy-detail') {
    if (!slug || !/^[a-z0-9-]+$/i.test(slug)) {
      throw new Error('This puppy profile URL is invalid.')
    }
    return `/reference-pages/puppies/${encodeURIComponent(slug)}.html`
  }

  return `/reference-pages/${encodeURIComponent(page)}.html`
}

function collectFromNodes(nodes, selector) {
  return nodes.flatMap((node) => {
    if (!(node instanceof Element)) return []
    return [
      ...(node.matches(selector) ? [node] : []),
      ...node.querySelectorAll(selector),
    ]
  })
}

function belongsToSnapshot(nodes, element) {
  return nodes.some(
    (node) => node === element || (node instanceof Element && node.contains(element)),
  )
}

function normalizeSnapshot(fragment) {
  fragment.querySelectorAll('[id^="S:"]').forEach((streamedContent) => {
    const boundaryId = streamedContent.id.slice(2)
    const boundary = fragment.querySelector(`template[id="B:${boundaryId}"]`)
    if (boundary) boundary.replaceWith(...streamedContent.childNodes)
    streamedContent.remove()
  })
  fragment.querySelectorAll('[aria-busy="true"]').forEach((element) => element.remove())
  fragment.querySelectorAll('script').forEach((script) => script.remove())

  fragment.querySelectorAll('*').forEach((element) => {
    for (const attribute of [...element.attributes]) {
      if (/^on/i.test(attribute.name)) element.removeAttribute(attribute.name)
    }
  })

  fragment.querySelectorAll('a[href]').forEach((anchor) => {
    const href = anchor.getAttribute('href')
    if (!href || href.startsWith('#')) return

    try {
      const url = new URL(href, REFERENCE_ORIGIN)
      if (url.origin !== REFERENCE_ORIGIN || !isLocalRoute(url.pathname)) return
      anchor.setAttribute('href', `${url.pathname}${url.search}${url.hash}`)
    } catch {
      anchor.removeAttribute('href')
    }
  })
}

function createPhotoViewer(dialog, photos, startIndex) {
  if (!dialog || photos.length === 0) return () => {}

  let index = startIndex

  const closeViewer = document.createElement('button')
  closeViewer.type = 'button'
  closeViewer.className = 'btn btn-secondary'
  closeViewer.textContent = 'Close'
  closeViewer.setAttribute('aria-label', 'Close photo viewer')
  closeViewer.dataset.photoAction = 'close'
  closeViewer.style.justifySelf = 'end'

  const previousButton = document.createElement('button')
  previousButton.type = 'button'
  previousButton.className = 'btn btn-secondary'
  previousButton.textContent = 'Previous'
  previousButton.setAttribute('aria-label', 'Previous photo')
  previousButton.dataset.photoAction = 'previous'

  const nextButton = document.createElement('button')
  nextButton.type = 'button'
  nextButton.className = 'btn btn-secondary'
  nextButton.textContent = 'Next'
  nextButton.setAttribute('aria-label', 'Next photo')
  nextButton.dataset.photoAction = 'next'

  const image = document.createElement('img')
  image.style.cssText = 'display:block;max-width:92vw;max-height:76dvh;object-fit:contain;border-radius:1rem;margin:auto'

  const caption = document.createElement('p')
  caption.className = 'font-scrawl'
  caption.style.cssText = 'margin:1rem auto 0;text-align:center;max-width:70ch'

  const controls = document.createElement('div')
  controls.style.cssText = 'display:flex;justify-content:center;align-items:center;gap:.75rem;flex-wrap:wrap'
  controls.append(previousButton, nextButton)

  const content = document.createElement('div')
  content.style.cssText = 'min-height:100%;display:grid;grid-template-rows:auto minmax(0,1fr) auto auto;gap:1rem;padding:1rem'
  content.append(closeViewer, image, controls, caption)
  dialog.replaceChildren(content)

  function renderPhoto() {
    const trigger = photos[index]
    const sourceImage = trigger.querySelector('img')
    const source = sourceImage?.currentSrc || sourceImage?.getAttribute('src')
    image.alt = sourceImage?.alt || trigger.getAttribute('aria-label') || 'TeddyPups family photo'
    if (source) image.src = source
    caption.textContent = (trigger.getAttribute('aria-label') || '')
      .replace(/^Open photo \d+ of \d+:\s*/i, '')
      .trim()
    dialog.dataset.photoIndex = String(index)
  }

  function movePhoto(direction) {
    index = (index + direction + photos.length) % photos.length
    renderPhoto()
  }

  renderPhoto()
  if (!dialog.open) dialog.showModal()

  return (direction) => movePhoto(direction)
}

function ReferenceSnapshotPage({ page, slug }) {
  const navigate = useNavigate()
  const [snapshot, setSnapshot] = useState(null)
  const [retry, setRetry] = useState(0)
  const snapshotKey = `${page}:${slug || ''}:${retry}`
  const invalidSlug = page === 'puppy-detail' && (!slug || !/^[a-z0-9-]+$/i.test(slug))

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    if (invalidSlug) {
      Promise.resolve().then(() => {
        if (active) setSnapshot({ key: snapshotKey, error: 'This puppy profile URL is invalid.' })
      })
      return () => {
        active = false
        controller.abort()
      }
    }

    fetch(snapshotUrl(page, slug), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Page content could not be loaded (${response.status}).`)
        }
        return response.text()
      })
      .then((html) => {
        if (!html.trim()) throw new Error('The saved page content is empty.')
        if (active) setSnapshot({ key: snapshotKey, markup: html })
      })
      .catch((loadError) => {
        if (loadError.name !== 'AbortError' && active) {
          setSnapshot({ key: snapshotKey, error: loadError.message })
        }
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [invalidSlug, page, retry, slug, snapshotKey])

  const currentSnapshot = snapshot?.key === snapshotKey ? snapshot : null
  const markup = currentSnapshot?.markup || ''
  const error = currentSnapshot?.error || ''
  useEffect(() => {
    if (!markup) return undefined

    const template = document.createElement('template')
    template.innerHTML = markup
    normalizeSnapshot(template.content)

    const nodes = [...template.content.childNodes]
    const appRoot = document.getElementById('root')
    nodes.forEach((node) => document.body.insertBefore(node, appRoot))

    const all = (selector) => collectFromNodes(nodes, selector)
    const one = (selector) => all(selector)[0] || null
    const menuDialog = one('dialog[aria-label="Site menu"]')
    const photoDialog = one('dialog[aria-label="Photo viewer"]')
    const galleryPhotos = all('button.tp-wall__print, button.tp-photowall__print')
    let movePhoto = () => {}
    let navigationTimer = 0
    let introTimer = 0
    let curtainFrame = 0
    let curtainTimer = 0
    let introPending = false
    const curtain = one('.tp-curtain')

    if (page === 'puppy-detail') {
      const profileTitle = one('[data-page] h1')?.textContent.trim()
      if (profileTitle) document.title = `${profileTitle} | TeddyPups U.A.E.`
    }

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.dataset.armed = 'true'
          entry.target.dataset.revealed = 'true'
          currentObserver.unobserve(entry.target)
        })
      }, { rootMargin: '0px 0px -8% 0px' })
      : null

    all('[data-reveal]').forEach((element) => {
      if (element.dataset.revealed === 'true') return
      if (observer) observer.observe(element)
      else element.dataset.revealed = 'true'
    })

    let lastScrollY = window.scrollY
    let frame = 0
    const header = one('.tp-header')
    const mascot = page === 'home' ? one('.pup-layer[data-front="true"], .pup-layer') : null
    const actor = mascot?.querySelector('.pup-actor')
    const mascotBody = mascot?.querySelector('[data-p="body"]')
    const mascotShadow = mascot?.querySelector('[data-p="shadow"]')
    const meetScene = page === 'home' ? one('.tp-meet') : null
    const meetPinRange = meetScene?.querySelector('[data-pin-range]')
    const meetStage = meetScene?.querySelector('.tp-meet__stage')
    const meetHall = meetScene?.querySelector('.tp-meet__hall')
    const meetTrack = meetScene?.querySelector('.tp-meet__track')
    const meetPuppyStop = meetScene?.querySelector('.tp-meet__teddy')
    const basketPuppy = page === 'home' ? one('.tp-basket__pup > .pup-buddy') : null
    const basketBody = basketPuppy?.querySelector('[data-p="body"]')
    const basketShadow = basketPuppy?.querySelector('[data-p="shadow"]')
    const puppyStops = page === 'home'
      ? all('[data-pup-stop="true"]').filter((stop) => stop !== meetPuppyStop)
      : []
    const pawPrintLayer = page === 'home' ? one('.pup-prints') : null
    const pawPrints = pawPrintLayer ? [...pawPrintLayer.querySelectorAll('svg')] : []
    const pawPrintTimers = new Map()
    let lastPawPoint = null
    let pawPrintIndex = 0

    if (mascot) {
      document.documentElement.dataset.pup = 'true'
      mascotBody?.setAttribute('opacity', '1')
      mascotShadow?.setAttribute('opacity', '0.12')
      basketBody?.setAttribute('opacity', '1')
      basketShadow?.setAttribute('opacity', '0.12')
    }

    if (routeTransitionPending && curtain) {
      routeTransitionPending = false
      curtain.dataset.state = 'covered'
      void curtain.offsetHeight
      curtainFrame = window.requestAnimationFrame(() => {
        curtain.dataset.state = 'lifting'
        curtainTimer = window.setTimeout(() => {
          curtain.dataset.state = 'idle'
        }, 460)
      })
    } else if (!introStarted && curtain) {
      introStarted = true
      introPending = true
      curtain.dataset.state = 'intro'
      introTimer = window.setTimeout(() => {
        curtain.dataset.state = 'idle'
        introPending = false
      }, 1100)
    }

    function updateScrollState() {
      frame = 0
      const currentY = window.scrollY

      if (header) {
        header.dataset.scrolled = String(currentY > 12)
        header.dataset.hidden = String(currentY > 80 && currentY > lastScrollY)
      }

      if (actor) {
        let meetStart = 0
        let meetDuration = 0
        let meetProgress = 0
        let meetHallRect = null

        if (meetPinRange && meetStage && meetHall && meetTrack && meetPuppyStop) {
          const travel = Math.max(0, meetTrack.scrollWidth - meetHall.clientWidth)
          const requiredHeight = window.innerHeight + travel
          if (Math.abs(meetPinRange.getBoundingClientRect().height - requiredHeight) > 1) {
            meetPinRange.style.height = `${requiredHeight}px`
          }
          meetTrack.style.willChange = 'transform'
          meetHallRect = meetHall.getBoundingClientRect()
          const rangeRect = meetPinRange.getBoundingClientRect()
          meetStart = rangeRect.top + currentY
          meetDuration = Math.max(0, meetPinRange.offsetHeight - window.innerHeight)
          meetProgress = meetDuration
            ? Math.max(0, Math.min(1, (currentY - meetStart) / meetDuration))
            : 0
          meetTrack.style.transform = `translate3d(${-travel * meetProgress}px, 0, 0)`
        }

        const points = puppyStops.map((stop) => {
          const rect = stop.getBoundingClientRect()
          if (rect.width === 0 || rect.height === 0) return null
          const isHeroStop = stop.classList.contains('tp-hero__teddy')
          const targetScreenY = window.innerHeight * 0.66
          return {
            y: isHeroStop ? 0 : rect.top + currentY - targetScreenY,
            x: rect.left,
            screenY: isHeroStop ? rect.top : targetScreenY,
            scale: rect.width / 300,
            stop,
          }
        }).filter(Boolean)

        if (meetScene && meetHallRect && meetHall && meetStage) {
          const puppyWidth = Math.max(
            176,
            Math.min(224, window.innerWidth * 0.14, window.innerHeight * 0.24),
          )
          const puppyScale = puppyWidth / 300
          const floorHeight = Math.max(
            80,
            Math.min(128, window.innerHeight * 0.13),
          )
          const puppyTopInStage = window.innerHeight - floorHeight * 0.42 - puppyWidth * 0.8
          const meetXStart = window.innerWidth * 0.14
          const meetXEnd = Math.max(
            meetHallRect.left,
            meetHallRect.right - puppyWidth,
          )
          points.push(
            {
              y: meetStart,
              x: meetXStart,
              screenY: puppyTopInStage,
              scale: puppyScale,
              meet: true,
            },
            {
              y: meetStart + meetDuration,
              x: meetXEnd,
              screenY: puppyTopInStage,
              scale: puppyScale,
              meet: true,
            },
          )
        }

        if (points.length === 0) return
        points.sort((first, second) => first.y - second.y)
        let from = points[0]
        let to = points[points.length - 1]
        if (points.length > 1) {
          for (let index = 1; index < points.length; index += 1) {
            if (currentY <= points[index].y) {
              from = points[index - 1]
              to = points[index]
              break
            }
            from = points[index]
          }
        }

        const span = Math.max(1, to.y - from.y)
        const progress = Math.max(0, Math.min(1, (currentY - from.y) / span))
        let x = from.x + (to.x - from.x) * progress
        let y = from.screenY + (to.screenY - from.screenY) * progress
        let scale = from.scale + (to.scale - from.scale) * progress

        if (meetScene && meetHallRect && meetHall && currentY >= meetStart && currentY <= meetStart + meetDuration) {
          const puppyWidth = Math.max(
            176,
            Math.min(224, window.innerWidth * 0.14, window.innerHeight * 0.24),
          )
          const floorHeight = Math.max(
            80,
            Math.min(128, window.innerHeight * 0.13),
          )
          x = window.innerWidth * 0.14
            + (meetHallRect.right - puppyWidth - window.innerWidth * 0.14) * meetProgress
          y = window.innerHeight - floorHeight * 0.42 - puppyWidth * 0.8
          scale = puppyWidth / 300
        }

        const basketPoint = points.find((point) => point.stop && point.stop.classList.contains('tp-basket__pup'))
        const basketApproach = basketPoint && to === basketPoint
          ? progress
          : basketPoint && currentY >= basketPoint.y
            ? 1
            : 0
        const basketOpacity = Math.max(0, Math.min(1, (basketApproach - 0.88) / 0.12))
        actor.style.transformOrigin = 'top left'
        actor.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        actor.style.opacity = String(1 - basketOpacity)
        if (basketPuppy) {
          basketPuppy.style.visibility = basketOpacity > 0 ? 'visible' : 'hidden'
          basketPuppy.style.opacity = String(basketOpacity)
        }
      }

      lastScrollY = currentY
    }

    function requestScrollUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateScrollState)
    }

    function handlePointerMove(event) {
      if (
        !pawPrintLayer
        || !pawPrints.length
        || event.pointerType === 'touch'
        || window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) return

      const point = { x: event.clientX, y: event.clientY }
      if (!lastPawPoint) {
        lastPawPoint = point
        return
      }

      const dx = point.x - lastPawPoint.x
      const dy = point.y - lastPawPoint.y
      const distance = Math.hypot(dx, dy)
      const step = 34
      if (distance < step) return

      const direction = Math.atan2(dy, dx) + Math.PI / 2
      const steps = Math.floor(distance / step)
      for (let index = 1; index <= steps; index += 1) {
        const progress = (index * step) / distance
        const paw = pawPrints[pawPrintIndex % pawPrints.length]
        const side = pawPrintIndex % 2 === 0 ? -1 : 1
        const size = 15.6
        const x = lastPawPoint.x + dx * progress + side * 3
        const y = lastPawPoint.y + dy * progress
        const previousTimer = pawPrintTimers.get(paw)
        if (previousTimer) window.clearTimeout(previousTimer)

        paw.style.transition = 'none'
        paw.style.width = `${size}px`
        paw.style.height = `${size}px`
        paw.style.transform = `translate(${x + window.scrollX - size / 2}px, ${y + window.scrollY - size / 2}px) rotate(${direction + side * 0.12}rad)`
        paw.style.opacity = '0'
        void paw.getBoundingClientRect()
        paw.style.transition = 'opacity 850ms ease-out'
        paw.style.opacity = '0.24'

        pawPrintTimers.set(paw, window.setTimeout(() => {
          paw.style.opacity = '0'
          pawPrintTimers.delete(paw)
        }, 900))
        pawPrintIndex += 1
      }

      if (steps > 0) {
        const progress = (steps * step) / distance
        lastPawPoint = { x: lastPawPoint.x + dx * progress, y: lastPawPoint.y + dy * progress }
      }
    }

    function handleClick(event) {
      const target = event.target instanceof Element ? event.target : null
      if (!target || !belongsToSnapshot(nodes, target)) return

      if (target.closest('.pup-layer .pup-actor')) {
        let bubble = mascot?.querySelector('.pup-bubble')
        if (!bubble && actor) {
          bubble = document.createElement('span')
          bubble.className = 'pup-bubble'
          actor.append(bubble)
        }
        if (bubble) {
          bubble.textContent = 'Every puppy is family!'
          bubble.dataset.show = 'true'
          window.setTimeout(() => { bubble.dataset.show = 'false' }, 1800)
        }
      }

      const anchor = target.closest('a[href]')
      if (anchor && belongsToSnapshot(nodes, anchor)) {
        const destination = new URL(anchor.href, window.location.href)
        if (
          destination.origin === window.location.origin
          && isLocalRoute(destination.pathname)
          && !anchor.target
          && !event.metaKey
          && !event.ctrlKey
          && !event.shiftKey
          && !event.altKey
        ) {
          event.preventDefault()
          const path = `${destination.pathname}${destination.search}${destination.hash}`
          if (destination.pathname === window.location.pathname) {
            if (destination.hash) {
              document.getElementById(decodeURIComponent(destination.hash.slice(1)))
                ?.scrollIntoView({ behavior: 'smooth' })
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          } else {
            const curtain = one('.tp-curtain')
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            if (curtain && curtain.dataset.state === 'idle' && !reduceMotion) {
              routeTransitionPending = true
              curtain.dataset.state = 'covering'
              navigationTimer = window.setTimeout(() => navigate(path), 300)
            } else {
              navigate(path)
            }
          }
          return
        }
      }

      const button = target.closest('button')
      if (!button || !belongsToSnapshot(nodes, button)) return

      if (button.matches('[aria-haspopup="dialog"]') && menuDialog && !menuDialog.open) {
        menuDialog.showModal()
        return
      }

      const photoAction = button.dataset.photoAction
      if (photoAction) {
        if (photoAction === 'close') photoDialog?.close()
        if (photoAction === 'previous') movePhoto(-1)
        if (photoAction === 'next') movePhoto(1)
        return
      }

      if (/^close$/i.test(button.textContent.trim())) {
        button.closest('dialog')?.close()
        return
      }

      if (button.classList.contains('tp-wall__print') || button.classList.contains('tp-photowall__print')) {
        const index = galleryPhotos.indexOf(button)
        movePhoto = createPhotoViewer(photoDialog, galleryPhotos, index)
        return
      }

      const tab = button.matches('[role="tab"][aria-controls]') ? button : null
      if (tab) {
        const switcher = tab.closest('.tp-switch')
        const tabs = switcher ? [...switcher.querySelectorAll('[role="tab"][aria-controls]')] : [tab]
        const selectedIndex = tabs.indexOf(tab)
        switcher?.style.setProperty('--at', String(selectedIndex))

        tabs.forEach((item, index) => {
          const selected = index === selectedIndex
          item.setAttribute('aria-selected', String(selected))
          item.tabIndex = selected ? 0 : -1
          const panel = document.getElementById(item.getAttribute('aria-controls'))
          if (panel) panel.hidden = !selected
        })
        return
      }

      if (button.classList.contains('tp-sticker-chip')) {
        const group = button.parentElement
        const label = group?.querySelector('span')?.textContent.trim().toLowerCase()
        if (group && label) {
          group.querySelectorAll('.tp-sticker-chip').forEach((chip) => {
            chip.setAttribute('aria-pressed', String(chip === button))
          })

          const filterGroups = all('[role="group"][aria-label="Filter puppies"] .tp-sticker-chip')
            .reduce((groups, chip) => {
              const chipGroup = chip.parentElement
              const groupLabel = chipGroup?.querySelector('span')?.textContent.trim().toLowerCase()
              if (groupLabel) groups[groupLabel] = chipGroup.querySelector('[aria-pressed="true"]')?.textContent.trim() || ''
              return groups
            }, {})

          all('a.tp-sketch').forEach((card) => {
            const content = `${card.textContent} ${card.getAttribute('aria-label')} ${card.getAttribute('href')}`.toLowerCase()
            const where = filterGroups.where?.toLowerCase()
            const breed = filterGroups.breed?.toLowerCase()
            const sex = filterGroups['boy or girl']?.toLowerCase()
            const matchesWhere = !where || where === 'everywhere' || content.includes(where.toLowerCase())
            const matchesBreed = !breed || content.includes(breed)
            const matchesSex = !sex
              || (sex === 'boys' ? /\b(boy|boys|male)\b/i.test(content) : /\b(girl|girls|female)\b/i.test(content))
            card.hidden = !(matchesWhere && matchesBreed && matchesSex)
          })
        }
        return
      }

      if (button.matches('[aria-controls][aria-expanded]')) {
        const panel = document.getElementById(button.getAttribute('aria-controls'))
        if (panel) {
          const expanded = button.getAttribute('aria-expanded') === 'true'
          button.setAttribute('aria-expanded', String(!expanded))
          panel.hidden = expanded
        }
        return
      }

      if (button.classList.contains('tp-clip__play')) {
        const video = button.closest('.tp-clip')?.querySelector('video')
        if (!video) {
          button.setAttribute('aria-label', 'This video is unavailable.')
          return
        }

        if (video.paused) {
          video.play().then(() => {
            button.setAttribute('aria-pressed', 'true')
          }).catch((playError) => {
            button.setAttribute('aria-label', 'Video playback could not start. Try again.')
            console.error('TeddyPups video playback failed:', playError)
          })
        } else {
          video.pause()
          button.setAttribute('aria-pressed', 'false')
        }
      }

    }

    function handleInput(event) {
      const input = event.target
      if (
        !(input instanceof HTMLInputElement)
        || input.type !== 'search'
        || !belongsToSnapshot(nodes, input)
      ) return

      const query = input.value.trim().toLowerCase()
      all('button[aria-controls]').forEach((button) => {
        const item = button.closest('li') || button.parentElement?.parentElement
        if (item) item.hidden = Boolean(query) && !item.textContent.toLowerCase().includes(query)
      })
    }

    function handleSubmit(event) {
      const form = event.target
      if (!(form instanceof HTMLFormElement) || !belongsToSnapshot(nodes, form)) return
      if (!form.matches('.tp-letterform')) return

      event.preventDefault()
      if (!form.reportValidity()) return

      const values = new FormData(form)
      if (String(values.get('website') || '').trim()) return

      const name = String(values.get('name') || '').trim()
      const phone = String(values.get('phone') || '').trim()
      const email = String(values.get('email') || '').trim()
      const area = String(values.get('area') || '').trim()
      const puppy = form.querySelector('[name="puppyId"]')?.selectedOptions[0]?.textContent.trim()
      const message = String(values.get('message') || '').trim()
      const enquiry = [
        `Dear TeddyPups, my name is ${name}.`,
        `You can reach me on ${phone}${email ? ` or by email at ${email}` : ''}.`,
        area && `My area is ${area}.`,
        puppy && !/not sure yet/i.test(puppy) && `I am interested in ${puppy}.`,
        message && `A little more about what I am looking for: ${message}`,
      ].filter(Boolean).join('\n')

      const popup = window.open(whatsappUrl(enquiry), '_blank', 'noopener,noreferrer')
      if (!popup) {
        let status = form.querySelector('[aria-live]')
        if (!status) {
          status = document.createElement('p')
          status.setAttribute('role', 'status')
          status.setAttribute('aria-live', 'polite')
          form.append(status)
        }
        status.textContent = 'Please allow pop-ups to open WhatsApp with your enquiry.'
      }
    }

    function handleKeydown(event) {
      if (!photoDialog?.open) return
      if (event.key === 'ArrowLeft') movePhoto(-1)
      if (event.key === 'ArrowRight') movePhoto(1)
    }

    function handleDialogClick(event) {
      if (event.target === menuDialog || event.target === photoDialog) event.target.close()
    }

    function handleVideoEnded(event) {
      if (!(event.target instanceof HTMLVideoElement) || !belongsToSnapshot(nodes, event.target)) return
      const button = event.target.closest('.tp-clip')?.querySelector('.tp-clip__play')
      button?.setAttribute('aria-pressed', 'false')
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('input', handleInput)
    document.addEventListener('submit', handleSubmit)
    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('click', handleDialogClick, true)
    document.addEventListener('ended', handleVideoEnded, true)
    document.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('scroll', requestScrollUpdate, { passive: true })
    window.addEventListener('resize', requestScrollUpdate)
    updateScrollState()

    if (window.location.hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
          ?.scrollIntoView({ behavior: 'smooth' })
      })
    } else {
      window.scrollTo(0, 0)
    }

    return () => {
      observer?.disconnect()
      document.removeEventListener('click', handleClick)
      document.removeEventListener('input', handleInput)
      document.removeEventListener('submit', handleSubmit)
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('click', handleDialogClick, true)
      document.removeEventListener('ended', handleVideoEnded, true)
      document.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('scroll', requestScrollUpdate)
      window.removeEventListener('resize', requestScrollUpdate)
      if (frame) window.cancelAnimationFrame(frame)
      if (navigationTimer) window.clearTimeout(navigationTimer)
      if (introTimer) window.clearTimeout(introTimer)
      if (curtainFrame) window.cancelAnimationFrame(curtainFrame)
      if (curtainTimer) window.clearTimeout(curtainTimer)
      pawPrintTimers.forEach((timer) => window.clearTimeout(timer))
      if (introPending) introStarted = false
      nodes.forEach((node) => {
        if (node instanceof Element && node.matches('dialog[open]')) node.close()
        node.parentNode?.removeChild(node)
      })
      if (page === 'home') delete document.documentElement.dataset.pup
    }
  }, [markup, navigate, page])

  useEffect(() => {
    if (page === 'home') {
      document.title = 'TeddyPups U.A.E. — Premium teacup puppies in Dubai'
      return
    }
    const titles = {
      puppies: 'Available puppies | TeddyPups U.A.E.',
      'happy-families': 'Happy families | TeddyPups U.A.E.',
      'gone-home': 'Gone home | TeddyPups U.A.E.',
      'how-it-works': 'How it works | TeddyPups U.A.E.',
      faq: 'Questions & answers | TeddyPups U.A.E.',
      contact: 'Visit & contact | TeddyPups U.A.E.',
    }
    document.title = titles[page] || 'Puppy profile | TeddyPups U.A.E.'
  }, [page, slug])

  if (error) {
    return (
      <div role="alert" style={{ margin: '3rem auto', maxWidth: '40rem', padding: '2rem', textAlign: 'center' }}>
        <p>{error}</p>
        <button type="button" onClick={() => setRetry((value) => value + 1)}>Try again</button>
      </div>
    )
  }

  if (!markup) {
    return <div role="status" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>Loading TeddyPups…</div>
  }

  return null
}

export default ReferenceSnapshotPage
