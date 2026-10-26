import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, Heart, PawPrint, ShieldCheck, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { WHATSAPP_URL } from '../siteConfig.js'

const heroPuppyImage =
  '/reference-assets/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg'

const puppyImages = [
  {
    name: 'Max',
    detail: 'Maltipoo · boy · 3 months',
    image: '/reference-assets/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp',
    alt: 'Max, male Maltipoo puppy',
  },
  {
    name: 'Korean Teacup Maltipoo',
    detail: 'girl · 2 months',
    image: '/reference-assets/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg',
    alt: 'Female Korean Teacup Maltipoo puppy',
  },
  {
    name: 'Korean Teacup Poodle',
    detail: 'girl · 2 months',
    image: '/reference-assets/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg',
    alt: 'Female Korean Teacup Poodle puppy',
  },
  {
    name: 'Maltipoo & Cavapoo',
    detail: 'boy · 3 months',
    image: '/reference-assets/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg',
    alt: 'Male Maltipoo and Cavapoo puppy',
  },
  {
    name: 'Toy Poodle',
    detail: 'boy & girl · 2 months',
    image: '/reference-assets/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg',
    alt: 'Toy Poodle puppy',
  },
]

const benefits = [
  {
    icon: <ShieldCheck size={22} />,
    title: 'Vet-checked & healthy',
    description: 'Every puppy comes vaccinated, dewormed, and with a verified health certificate.',
  },
  {
    icon: <Truck size={22} />,
    title: 'Korea to Dubai, safely',
    description: 'Trusted breeders, safe travel, and premium care from start to finish.',
  },
  {
    icon: <Heart size={22} />,
    title: 'Support 24/7',
    description: 'Always here to help, from choosing your puppy to post-delivery support.',
  },
  {
    icon: <PawPrint size={22} />,
    title: 'Trusted by families worldwide',
    description: 'Puppies delivered to loving homes all around the world.',
  },
]

const questions = [
  {
    question: 'Are your puppies vaccinated and health-checked?',
    answer:
      'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.',
  },
  {
    question: 'Can I meet a puppy before I decide?',
    answer:
      'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.',
  },
  {
    question: 'Can I take my puppy home the same day?',
    answer:
      'Local puppies are available immediately, so you can take your puppy home the same day.',
  },
]

function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="reference-hero">
      <div className="reference-hero-inner">
        <div className="reference-hero-art">
          <img
            alt="A tiny apricot TeddyPups puppy held up in the showroom"
            className="reference-hero-image"
            fetchPriority="high"
            src={heroPuppyImage}
          />
          <span className="hero-sticker"><PawPrint size={18} /> your new best friend</span>
          <span className="hero-sticker hero-sticker--small">welcome home</span>
        </div>
        <div className="reference-hero-copy">
          <p className="reference-script">every puppy is family</p>
          <h1 id="hero-title">Premium teacup <span>puppies in Dubai</span></h1>
          <p className="reference-hero-description">
            Meet your new best friend in our Dubai showroom, or order a rare miniature
            breed from trusted breeders worldwide.
          </p>
          <div className="reference-hero-actions">
            <Link className="reference-button reference-button--primary" to="/puppies">
              View available puppies <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a className="reference-button reference-button--outline" href={WHATSAPP_URL} rel="noreferrer" target="_blank">
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="reference-hero-bottom" aria-hidden="true" />
    </section>
  )
}

function ScrollPuppy() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const x = useTransform(
    scrollYProgress,
    [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1],
    ['6vw', '67vw', '74vw', '8vw', '70vw', '14vw', '69vw', '86vw'],
  )
  const y = useTransform(
    scrollYProgress,
    [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1],
    ['16vh', '38vh', '74vh', '22vh', '68vh', '32vh', '76vh', '78vh'],
  )
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1],
    [-8, 8, -6, 9, -9, 7, -5, 6],
  )
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.94, 1], [0, 0.88, 0.88, 0])

  if (prefersReducedMotion) return null

  return (
    <motion.div aria-hidden="true" className="scroll-puppy" style={{ x, y, rotate, opacity }}>
      <img alt="" src={heroPuppyImage} />
      <span className="scroll-puppy-paw"><PawPrint size={15} /></span>
    </motion.div>
  )
}

function PuppySpotlight() {
  return (
    <section aria-labelledby="meet-title" className="reference-section reference-meet">
      <div className="reference-section-head">
        <div>
          <p className="reference-script">from Teddy's sketchbook</p>
          <h2 id="meet-title">Meet the pups</h2>
          <p>Real puppies, real photos, looking for their families right now.</p>
        </div>
        <Link className="reference-text-link" to="/puppies">See all available puppies <ArrowRight size={17} /></Link>
      </div>
      <div className="reference-puppy-row">
        {puppyImages.map((puppy) => (
          <Link className="reference-puppy-card" key={puppy.name} to="/puppies">
            <div className="reference-puppy-image">
              <img alt={puppy.alt} loading="lazy" src={puppy.image} />
              <span className="reference-available"><span /> Available</span>
            </div>
            <div className="reference-puppy-details">
              <h3>{puppy.name}</h3>
              <p>{puppy.detail}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function WaysToMeet() {
  return (
    <section aria-labelledby="ways-title" className="reference-section reference-ways">
      <div className="reference-section-head reference-section-head--center">
        <p className="reference-script">Two ways to meet your puppy</p>
        <h2 id="ways-title">Puppies in Dubai <span>or imported for you</span></h2>
      </div>
      <div className="reference-way-grid">
        <article className="reference-way-card reference-way-card--local">
          <div className="reference-way-image">
            <img
              alt="A small puppy at the TeddyPups Dubai showroom"
              loading="lazy"
              src="/reference-assets/media/FHyoHcIosLZE/60f6e7e00a/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
            />
          </div>
          <div className="reference-way-content">
            <span className="reference-way-label">Puppies in Dubai</span>
            <h3>In our showroom</h3>
            <p>See them, love them, take them home. Come meet our locally available puppies before you decide.</p>
            <Link className="reference-button reference-button--primary" to="/puppies">Meet local puppies <ArrowRight size={17} /></Link>
          </div>
        </article>
        <article className="reference-way-card reference-way-card--import">
          <div className="reference-way-image">
            <img
              alt="A fluffy teacup puppy available to order"
              loading="lazy"
              src="/reference-assets/media/vzf7P8SPCZ-Q/a8db4ee114/b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpg"
            />
          </div>
          <div className="reference-way-content">
            <span className="reference-way-label">Korea · Dubai</span>
            <h3>Imported for you</h3>
            <p>Exclusive Korean teacup puppies, delivered. Order from the world's most reputable breeders and let us handle the import.</p>
            <Link className="reference-button reference-button--outline" to="/how-it-works">See imported puppies <ArrowRight size={17} /></Link>
          </div>
        </article>
      </div>
    </section>
  )
}

function PuppyJourney() {
  const steps = [
    ['1', 'Choose your breed', "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle."],
    ['2', 'Get photos & details', 'Our team will share real photos, health details, and all necessary information directly on WhatsApp.'],
    ['3', 'Secure & safe delivery', 'Once confirmed, we handle everything professionally and ensure your puppy reaches you safely.'],
  ]

  return (
    <section aria-labelledby="journey-title" className="reference-section reference-journey">
      <div className="reference-section-head reference-section-head--center">
        <p className="reference-script">Your puppy journey</p>
        <h2 id="journey-title">A premium, step-by-step concierge experience</h2>
        <p>We make adoption simple, secure, and purely joyful.</p>
      </div>
      <div className="reference-steps">
        {steps.map(([number, title, description]) => (
          <article className="reference-step" key={number}>
            <span className="reference-step-number">{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function PuppyPassport() {
  return (
    <section aria-labelledby="passport-title" className="reference-section reference-passport">
      <div className="reference-passport-heading">
        <p className="reference-script">puppy passport</p>
        <h2 id="passport-title">Why families trust TeddyPups</h2>
      </div>
      <div className="reference-benefits">
        {benefits.map((benefit) => (
          <article className="reference-benefit" key={benefit.title}>
            <span className="reference-benefit-icon">{benefit.icon}</span>
            <div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
            <Check className="reference-benefit-check" size={16} aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  )
}

function HappyFamilies() {
  return (
    <section aria-labelledby="families-title" className="reference-section reference-families">
      <div className="reference-section-head">
        <div>
          <p className="reference-script">our wall of happy endings</p>
          <h2 id="families-title">Happy families & puppies</h2>
          <p>We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients.</p>
        </div>
        <Link className="reference-text-link" to="/happy-families">See all happy families <ArrowRight size={17} /></Link>
      </div>
      <article className="reference-testimonial">
        <div className="reference-testimonial-image">
          <img
            alt="A TeddyPups family with their new puppy"
            loading="lazy"
            src="/reference-assets/media/TUslu26Ueaq-/9c3516c040/edb2f5_6627857aca7e495ea37d9f62d814d323-mv2.jpeg"
          />
        </div>
        <div className="reference-testimonial-copy">
          <span className="reference-stars" aria-label="5 out of 5 stars">★★★★★</span>
          <blockquote>
            “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
          </blockquote>
          <p>Sarah M., Dubai, UAE</p>
        </div>
      </article>
    </section>
  )
}

function FrequentlyAskedQuestions() {
  return (
    <section aria-labelledby="faq-title" className="reference-section reference-faq">
      <div className="reference-section-head">
        <div>
          <p className="reference-script">sniff out a question</p>
          <h2 id="faq-title">Questions, answered</h2>
        </div>
        <Link className="reference-text-link" to="/faq">Read all questions <ArrowRight size={17} /></Link>
      </div>
      <div className="reference-faq-list">
        {questions.map(({ question, answer }) => (
          <details className="reference-faq-item" key={question}>
            <summary>{question}<span aria-hidden="true">+</span></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

function ContactCallout() {
  return (
    <section className="reference-contact">
      <div className="reference-contact-inner">
        <p className="reference-script">every one of them was a Teddy Pup once</p>
        <h2>Ready to meet your new best friend?</h2>
        <p>Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way.</p>
        <div className="reference-hero-actions">
          <a className="reference-button reference-button--primary" href={WHATSAPP_URL} rel="noreferrer" target="_blank">Enquire on WhatsApp <ArrowRight size={17} /></a>
          <Link className="reference-button reference-button--outline" to="/contact">Visit & contact</Link>
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <div className="home-page">
      <HomeHero />
      <PuppySpotlight />
      <WaysToMeet />
      <PuppyJourney />
      <PuppyPassport />
      <HappyFamilies />
      <FrequentlyAskedQuestions />
      <ContactCallout />
      <ScrollPuppy />
    </div>
  )
}

export default HomePage
