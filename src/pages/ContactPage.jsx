import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { EMAIL_URL, PHONE_LABEL, PHONE_URL, whatsappUrl } from '../siteConfig.js'

const puppyOptions = [
  'any puppy (not sure yet)',
  'Max (Maltipoo, boy)',
  'Korean Teacup Maltipoo (girl)',
  'Korean Teacup Poodle (girl)',
  'Maltipoo & Cavapoo (boy)',
  'Toy Poodle (boy & girl)',
  'Maltipoo (girl)',
  'Pomeranian (girl)',
  'Copper (Cavapoo, boy)',
  'Shih Tzu (girl)',
  'Shih Tzu (boy)',
  'Maltipoo (girl) · 2.5 months',
  'Maltipoo (girl) · 2 months',
  'Korean Teacup Pomeranian (girl)',
  'Korean Teacup Pomeranian (girl)',
  'Korean Teacup Pomeranian (boy)',
]

function ContactPage() {
  const [formError, setFormError] = useState('')

  function submitEnquiry(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()
    const phone = String(formData.get('phone') || '').trim()
    const email = String(formData.get('email') || '').trim()
    const area = String(formData.get('area') || '').trim()
    const puppy = String(formData.get('puppyId') || 'any puppy (not sure yet)')
    const message = String(formData.get('message') || '').trim()

    if (!name || !phone) {
      setFormError('Please add your name and phone number so the team can reach you.')
      return
    }

    const enquiry = [
      `Dear TeddyPups, my name is ${name}.`,
      `You can reach me on ${phone}${email ? ` or by email at ${email}` : ''}.`,
      area ? `I live in ${area}.` : '',
      `I'm curious about ${puppy}.`,
      message ? `My message: ${message}` : '',
    ].filter(Boolean).join(' ')

    setFormError('')
    window.open(whatsappUrl(enquiry), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="reference-page">
      <section className="reference-page-intro reference-contact-intro">
        <p className="reference-script">we'd love to hear from you</p>
        <h1>Get in touch with us</h1>
        <p>Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we'd love to hear from you!</p>
      </section>

      <section className="reference-contact-layout">
        <form className="reference-contact-form" onSubmit={submitEnquiry}>
          <p className="reference-form-letter">
            Dear TeddyPups, my name is
            <label className="visually-hidden" htmlFor="contact-name">Your name</label>
            <input autoComplete="name" id="contact-name" name="name" placeholder="your name" required />
            and you can reach me on
            <label className="visually-hidden" htmlFor="contact-phone">Your phone number</label>
            <input autoComplete="tel" id="contact-phone" name="phone" placeholder="+971 50 123 4567" required type="tel" />
            or by email at
            <label className="visually-hidden" htmlFor="contact-email">Your email address (optional)</label>
            <input autoComplete="email" id="contact-email" name="email" placeholder="optional" type="email" />
            . I live in
            <label className="visually-hidden" htmlFor="contact-area">Your area</label>
            <input autoComplete="address-level2" id="contact-area" name="area" placeholder="e.g. Dubai Marina" />
            , and I'm curious about
          </p>
          <label className="visually-hidden" htmlFor="contact-puppy">Puppy you're interested in</label>
          <select id="contact-puppy" name="puppyId">
            {puppyOptions.map((option, index) => (
              <option key={`${option}-${index}`} value={option}>{option}</option>
            ))}
          </select>
          <label className="reference-field-label" htmlFor="contact-message">Your message <span>(optional)</span></label>
          <textarea id="contact-message" name="message" placeholder="Anything else you'd like to tell us…" rows="4" />
          {formError && <p className="reference-form-error" role="alert">{formError}</p>}
          <button className="reference-button reference-button--primary" type="submit">Post my letter <span aria-hidden="true">↗</span></button>
          <p className="reference-form-note">Website with love, a future puppy parent</p>
        </form>

        <aside className="reference-contact-details">
          <a href="https://wa.me/971541676733" rel="noreferrer" target="_blank">
            <span className="reference-contact-icon">↗</span>
            <span><small>WhatsApp</small><strong>+971 54 167 6733</strong></span>
          </a>
          <a href={PHONE_URL}>
            <span className="reference-contact-icon"><Phone size={19} /></span>
            <span><small>Call us</small><strong>{PHONE_LABEL}</strong></span>
          </a>
          <a href={EMAIL_URL}>
            <span className="reference-contact-icon"><Mail size={19} /></span>
            <span><small>Email</small><strong>teddypupsadmin@gmail.com</strong></span>
          </a>
          <div className="reference-contact-location">
            <div className="reference-contact-location-heading">
              <span className="reference-contact-icon"><MapPin size={19} /></span>
              <span><small>Visit us in</small><strong>Downtown Dubai</strong></span>
            </div>
            <img
              alt="A TeddyPups puppy at the Dubai showroom"
              loading="lazy"
              src="/reference-assets/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg"
            />
          </div>
        </aside>
      </section>
    </div>
  )
}

export default ContactPage
