export const WHATSAPP_URL =
  'https://wa.me/971541676733?text=Hi%20TeddyPups!%20I%27d%20love%20to%20know%20more%20about%20your%20puppies.'

export const PHONE_URL = 'tel:+971541676733'

export const PHONE_LABEL = '+971 54 167 6733'

export const EMAIL_URL = 'mailto:teddypupsadmin@gmail.com'

export function whatsappUrl(message) {
  return `https://wa.me/971541676733?text=${encodeURIComponent(message)}`
}

export const siteNavigation = [
  { label: 'Home', href: '/' },
  { label: 'Puppies', href: '/puppies' },
  { label: 'Happy families', href: '/happy-families' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Visit & contact', href: '/contact' },
]

export const referenceLogo =
  '/reference-assets/brand/logo.png'
