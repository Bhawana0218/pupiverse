import { Camera, Mail, MapPin, PawPrint, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EMAIL_URL, PHONE_LABEL, PHONE_URL, referenceLogo, WHATSAPP_URL, siteNavigation } from '../siteConfig.js'

function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="brand" to="/" aria-label="TeddyPups home">
            <img className="brand-logo" src={referenceLogo} alt="" />
            <span className="brand-name">TeddyPups</span>
          </Link>
          <p>
            TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies,
            offering premium services and worldwide shipping.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="footer-column">
          <h2>Explore</h2>
          <ul className="footer-links">
            {siteNavigation.map((item) => (
              <li key={item.href}><Link to={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="footer-column">
          <h2>Say hello</h2>
          <ul className="footer-links footer-contact-list">
            <li>
              <a href={WHATSAPP_URL} rel="noreferrer" target="_blank">
                <PawPrint size={16} /> WhatsApp us
              </a>
            </li>
            <li><a href={PHONE_URL}><Phone size={16} /> {PHONE_LABEL}</a></li>
            <li><a href={EMAIL_URL}><Mail size={16} /> Email our team</a></li>
            <li><span><MapPin size={16} /> Visit us in Downtown Dubai</span></li>
            <li>
              <a href="https://www.instagram.com/teddypups.worldwide/" rel="noreferrer" target="_blank">
                <Camera size={16} /> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} TeddyPups U.A.E.</span>
        <span>Every puppy is family</span>
      </div>
    </footer>
  )
}

export default SiteFooter
