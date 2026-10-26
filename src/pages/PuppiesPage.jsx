import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { whatsappUrl } from '../siteConfig.js'

const puppies = [
  {
    name: 'Max',
    breed: 'Maltipoo',
    detail: 'boy · 3 months',
    image: '/reference-assets/media/max-maltipoo.webp',
  },
  {
    name: 'Korean Teacup Maltipoo',
    breed: 'Maltipoo',
    detail: 'girl · 2 months',
    image: '/reference-assets/media/korean-teacup-maltipoo.jpg',
  },
  {
    name: 'Korean Teacup Poodle',
    breed: 'Poodle',
    detail: 'girl · 2 months',
    image: '/reference-assets/media/korean-teacup-poodle.jpg',
  },
  {
    name: 'Maltipoo & Cavapoo',
    breed: 'Cavapoo',
    detail: 'boy · 3 months',
    image: '/reference-assets/media/maltipoo-amp-cavapoo.jpg',
  },
  {
    name: 'Toy Poodle',
    breed: 'Poodle',
    detail: 'boy & girl · 2 months',
    image: '/reference-assets/media/toy-poodle.jpg',
  },
  {
    name: 'Maltipoo',
    breed: 'Maltipoo',
    detail: 'girl · 3 months',
    image: '/reference-assets/media/maltipoo.jpg',
  },
  {
    name: 'Pomeranian',
    breed: 'Pomeranian',
    detail: 'girl · 3 months',
    image: '/reference-assets/media/pomeranian.jpg',
  },
  {
    name: 'Copper',
    breed: 'Cavapoo',
    detail: 'boy · 2 months',
    image: '/reference-assets/media/copper-cavapoo.jpg',
  },
  {
    name: 'Shih Tzu',
    breed: 'Shih Tzu',
    detail: 'girl · 2 months',
    image: '/reference-assets/media/shih-tzu-2.jpeg',
  },
  {
    name: 'Shih Tzu',
    breed: 'Shih Tzu',
    detail: 'boy · 2 months',
    image: '/reference-assets/media/shih-tzu.jpg',
  },
  {
    name: 'Maltipoo',
    breed: 'Maltipoo',
    detail: 'girl · 2.5 months',
    image: '/reference-assets/media/maltipoo-4.jpg',
  },
  {
    name: 'Maltipoo',
    breed: 'Maltipoo',
    detail: 'girl · 2 months',
    image: '/reference-assets/media/maltipoo-3.jpg',
  },
  {
    name: 'Korean Teacup Pomeranian',
    breed: 'Pomeranian',
    detail: 'girl · 2 months',
    image: '/reference-assets/media/korean-teacup-pomeranian.jpg',
  },
  {
    name: 'Korean Teacup Pomeranian',
    breed: 'Pomeranian',
    detail: 'girl · 2 months',
    image: '/reference-assets/media/korean-teacup-pomeranian-3.jpg',
  },
  {
    name: 'Korean Teacup Pomeranian',
    breed: 'Pomeranian',
    detail: 'boy · 2 months',
    image: '/reference-assets/media/korean-teacup-pomeranian-2.jpg',
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
