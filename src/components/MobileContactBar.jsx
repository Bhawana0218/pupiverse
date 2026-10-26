import { MessageCircle, Phone } from 'lucide-react'
import { PHONE_LABEL, PHONE_URL, WHATSAPP_URL } from '../siteConfig.js'

function MobileContactBar() {
  return (
    <aside aria-label="Quick contact" className="mobile-contact-bar">
      <a className="mobile-whatsapp" href={WHATSAPP_URL} rel="noreferrer" target="_blank">
        <MessageCircle size={19} aria-hidden="true" />
        WhatsApp us
      </a>
      <a aria-label={`Call ${PHONE_LABEL}`} href={PHONE_URL}>
        <Phone size={18} aria-hidden="true" />
        Call
      </a>
    </aside>
  )
}

export default MobileContactBar
