import { ArrowRight, Check, Heart, MapPin, Plane, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const stages = [
  {
    number: 'Step 1',
    title: 'Explore our puppies',
    text: 'Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information.',
  },
  {
    number: 'Step 2',
    title: 'Choose your puppy',
    text: 'Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions.',
  },
  {
    number: 'Step 3',
    title: 'Meet your puppy',
    text: 'Meet locally available puppies in our Downtown Dubai showroom, or ask our team about an imported puppy and the next steps.',
  },
]

const promises = [
  'Vet-checked and healthy puppies',
  'Trusted, reputable breeders',
  'Health checks and travel arrangements',
  'Support before and after your puppy arrives',
]

function HowItWorksPage() {
  return (
    <div className="reference-page">
      <section className="reference-page-intro">
        <p className="reference-script">choose your way</p>
        <h1>How it works</h1>
        <p>Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.</p>
        <nav aria-label="How it works sections" className="reference-page-jumps">
          <a href="#two-ways">1&nbsp; Two ways home</a>
          <a href="#promise">2&nbsp; Our premium puppy promise</a>
          <a href="#delivery">3&nbsp; Delivery & collection</a>
          <a href="#why-us">4&nbsp; Why choose us</a>
        </nav>
      </section>

      <section aria-labelledby="two-ways-heading" className="reference-section reference-how-section" id="two-ways">
        <div className="reference-section-head reference-section-head--center">
          <p className="reference-script">two ways home</p>
          <h2 id="two-ways-heading">Meet your puppy in person <span>or order upon request</span></h2>
        </div>
        <div className="reference-way-grid">
          <article className="reference-way-card reference-way-card--text reference-way-card--local">
            <div className="reference-way-content">
              <span className="reference-way-label"><MapPin size={16} /> Downtown Dubai</span>
              <h3>Meet your puppy in person</h3>
              <p>Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they're raised with care, proper nutrition, and veterinary checks.</p>
              <Link className="reference-button reference-button--primary" to="/puppies">Explore local puppies <ArrowRight size={17} /></Link>
            </div>
          </article>
          <article className="reference-way-card reference-way-card--text reference-way-card--import">
            <div className="reference-way-content">
              <span className="reference-way-label"><Plane size={16} /> Korea · Dubai</span>
              <h3>Order upon request</h3>
              <p>Through our Order Upon Request service, we source rare and premium teacup breeds from reputable breeders and guide you through the import journey.</p>
              <Link className="reference-button reference-button--outline" to="/contact">Ask about importing <ArrowRight size={17} /></Link>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="reference-section reference-journey reference-how-section">
        <div className="reference-section-head reference-section-head--center">
          <p className="reference-script">simple, safe, supported</p>
          <h2 id="steps-title">Your puppy journey</h2>
        </div>
        <div className="reference-steps">
          {stages.map((stage) => (
            <article className="reference-step" key={stage.number}>
              <span className="reference-step-number">{stage.number}</span>
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="promise-heading" className="reference-section reference-how-section" id="promise">
        <div className="reference-section-head reference-section-head--center">
          <p className="reference-script">our promise</p>
          <h2 id="promise-heading">Our premium puppy promise</h2>
        </div>
        <div className="reference-promise-list">
          {promises.map((promise) => (
            <p key={promise}><Check size={18} aria-hidden="true" /> {promise}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby="delivery-heading" className="reference-section reference-how-section reference-delivery" id="delivery">
        <div className="reference-section-head reference-section-head--center">
          <p className="reference-script">from our home to yours</p>
          <h2 id="delivery-heading">Delivery & collection</h2>
        </div>
        <div className="reference-delivery-grid">
          <article><h3>Take your puppy home the same day</h3><p>Locally available puppies can go home with their new families after their visit.</p></article>
          <article><h3>Delivery within Dubai</h3><p>We can help arrange delivery within Dubai and make the handover easy.</p></article>
          <article><h3>Safe international cargo</h3><p>Trusted international cargo partners deliver puppies safely to loving homes around the world.</p></article>
        </div>
      </section>

      <section aria-labelledby="why-us-heading" className="reference-section reference-passport reference-how-section" id="why-us">
        <div className="reference-passport-heading">
          <p className="reference-script">here for every little step</p>
          <h2 id="why-us-heading">Why choose us</h2>
        </div>
        <div className="reference-benefits">
          <article className="reference-benefit"><span className="reference-benefit-icon"><Plane size={22} /></span><div><h3>International cargo</h3><p>Support with travel and delivery arrangements for imported puppies.</p></div></article>
          <article className="reference-benefit"><span className="reference-benefit-icon"><Heart size={22} /></span><div><h3>Support 24/7</h3><p>Our team is here to help before and after your puppy arrives.</p></div></article>
          <article className="reference-benefit"><span className="reference-benefit-icon"><ShieldCheck size={22} /></span><div><h3>Health guarantee</h3><p>Health details and veterinary records are shared as part of the puppy journey.</p></div></article>
          <article className="reference-benefit"><span className="reference-benefit-icon"><Check size={22} /></span><div><h3>Unique and high quality puppies</h3><p>Meet miniature and designer breeds sourced with care.</p></div></article>
        </div>
      </section>
    </div>
  )
}

export default HowItWorksPage
