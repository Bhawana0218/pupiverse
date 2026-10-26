import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, PawPrint, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { referenceLogo, WHATSAPP_URL, siteNavigation } from '../siteConfig.js'

function Brand({ footer = false }) {
  return (
    <Link className={`brand${footer ? ' footer-brand-link' : ''}`} to="/" aria-label="TeddyPups home">
      <img className="brand-logo" src={referenceLogo} alt="" />
      <span className="brand-name">TeddyPups</span>
    </Link>
  )
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return undefined

    function closeOnEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="site-header" id="top">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {siteNavigation.map((item) => (
            <NavLink
              end={item.href === '/'}
              key={item.href}
              to={item.href}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            <PawPrint size={17} aria-hidden="true" />
            WhatsApp us
          </a>
          <button
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="menu-trigger"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            type="button"
          >
            {menuOpen ? <X size={19} /> : <PawPrint size={18} />}
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="menu-backdrop"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={closeMenu}
          >
            <motion.div
              animate={{ opacity: 1, y: 0, scale: 1 }}
              aria-labelledby="menu-title"
              aria-modal="true"
              className="menu-panel"
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
            >
              <div className="menu-panel-head">
                <span id="menu-title">Where to, friend?</span>
                <button aria-label="Close menu" className="icon-button" onClick={closeMenu} type="button">
                  <X size={20} />
                </button>
              </div>
              <nav aria-label="Menu" className="menu-links">
                {siteNavigation.map((item) => (
                  <Link key={item.href} to={item.href} onClick={closeMenu}>
                    {item.label}
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                ))}
              </nav>
              <div className="menu-contact">
                <p>Our team is here to help you find your new best friend.</p>
                <a href={WHATSAPP_URL} onClick={closeMenu} rel="noreferrer" target="_blank">Say hello ↗</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export { Brand }
export default SiteHeader
