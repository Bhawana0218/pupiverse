import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { whatsappUrl } from '../siteConfig.js'

const puppies = [
  {
    name: 'Max',
    breed: 'Maltipoo',
    detail: 'boy · 3 months',
    image: '/reference-assets/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp',
  },
  {
    name: 'Korean Teacup Maltipoo',
    breed: 'Maltipoo',
    detail: 'girl · 2 months',
    image: '/reference-assets/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg',
  },
  {
    name: 'Korean Teacup Poodle',
    breed: 'Poodle',
    detail: 'girl · 2 months',
    image: '/reference-assets/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg',
  },
  {
    name: 'Maltipoo & Cavapoo',
    breed: 'Cavapoo',
    detail: 'boy · 3 months',
    image: '/reference-assets/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg',
  },
  {
    name: 'Toy Poodle',
    breed: 'Poodle',
    detail: 'boy & girl · 2 months',
    image: '/reference-assets/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg',
  },
  {
    name: 'Maltipoo',
    breed: 'Maltipoo',
    detail: 'girl · 3 months',
    image: '/reference-assets/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg',
  },
  {
    name: 'Pomeranian',
    breed: 'Pomeranian',
    detail: 'girl · 3 months',
    image: '/reference-assets/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg',
  },
  {
    name: 'Copper',
    breed: 'Cavapoo',
    detail: 'boy · 2 months',
    image: '/reference-assets/media/O-6w4FYqE10j/be76f399cc/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg',
  },
  {
    name: 'Shih Tzu',
    breed: 'Shih Tzu',
    detail: 'girl · 2 months',
    image: '/reference-assets/media/qNrTCSrsYyzY/168fa8c4ff/b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg',
  },
  {
    name: 'Shih Tzu',
    breed: 'Shih Tzu',
    detail: 'boy · 2 months',
    image: '/reference-assets/media/crgs9ih6as_M/e37bafb1bf/b942a5_344e49c6c34940d2b09a3ddd5c2e3234-mv2.jpg',
  },
  {
    name: 'Maltipoo',
    breed: 'Maltipoo',
    detail: 'girl · 2.5 months',
    image: '/reference-assets/media/wNm2_VIBEQvK/4b68f59e75/b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpg',
  },
  {
    name: 'Maltipoo',
    breed: 'Maltipoo',
    detail: 'girl · 2 months',
    image: '/reference-assets/media/lMhASnmIIVQ4/ad2353ad31/b942a5_6a5617708d75408b8f73725080ed0149-mv2.jpg',
  },
  {
    name: 'Korean Teacup Pomeranian',
    breed: 'Pomeranian',
    detail: 'girl · 2 months',
    image: '/reference-assets/media/EsAq2LSRvVCJ/4d553ed044/b942a5_a8d264c1aa754d80bc7c98917dfd1fda-mv2.jpg',
  },
  {
    name: 'Korean Teacup Pomeranian',
    breed: 'Pomeranian',
    detail: 'girl · 2 months',
    image: '/reference-assets/media/vzf7P8SPCZ-Q/a8db4ee114/b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg',
  },
  {
    name: 'Korean Teacup Pomeranian',
    breed: 'Pomeranian',
    detail: 'boy · 2 months',
    image: '/reference-assets/media/nZTGFv46hrZI/fb9eeefc9c/b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpg',
  },
]

const filters = ['Everywhere', 'Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu']

function PuppiesPage() {
  const [activeFilter, setActiveFilter] = useState('Everywhere')
  const visiblePuppies = activeFilter === 'Everywhere'
    ? puppies
    : puppies.filter((puppy) => puppy.breed === activeFilter)

  return (
    <div className="reference-page">
      <section className="reference-page-intro">
        <p className="reference-script">from Teddy's sketchbook</p>
        <h1>Available puppies</h1>
        <p>Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.</p>
      </section>

      <section aria-label="Available puppies" className="reference-section reference-listings">
        <div aria-label="Filter puppies by breed" className="reference-filter-row" role="group">
          {filters.map((filter) => (
            <button
              aria-pressed={filter === activeFilter}
              className={`reference-filter${filter === activeFilter ? ' is-active' : ''}`}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
        <p className="reference-listing-count">{visiblePuppies.length} puppies looking for a home</p>
        <div aria-live="polite" className="reference-listing-grid">
          {visiblePuppies.map((puppy) => (
            <article className="reference-puppy-card" key={puppy.image}>
              <div className="reference-puppy-image">
                <img alt={puppy.name} loading="lazy" src={puppy.image} />
                <span className="reference-available"><span /> Available</span>
              </div>
              <div className="reference-puppy-details">
                <h2>{puppy.name}</h2>
                <p>{puppy.detail}</p>
                <a className="reference-text-link" href={whatsappUrl(`Hi TeddyPups! I would love to know more about ${puppy.name}.`)} rel="noreferrer" target="_blank">
                  Ask about this puppy <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default PuppiesPage
