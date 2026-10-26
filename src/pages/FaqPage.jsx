import { useMemo, useState } from 'react'
import { MessageCircle, Search } from 'lucide-react'
import { WHATSAPP_URL } from '../siteConfig.js'

const questions = [
  {
    question: 'Are your puppies vaccinated and health-checked?',
    answer: 'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.',
  },
  {
    question: 'Can I meet a puppy before I decide?',
    answer: 'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.',
  },
  {
    question: 'Can I take my puppy home the same day?',
    answer: 'Local puppies are available immediately, so you can take your puppy home the same day.',
  },
  {
    question: 'Do you import puppies from abroad?',
    answer: 'Yes. Through our Order Upon Request service we source rare and premium teacup breeds from the most reputable, certified breeders across Europe, Korea, and beyond — and we handle the import for you.',
  },
  {
    question: 'How does an imported puppy travel to Dubai?',
    answer: 'We manage every part of the import process, including health checks, travel arrangements, and the necessary documentation, so your puppy arrives happy, healthy, and stress-free.',
  },
  {
    question: 'Will I see photos and health details first?',
    answer: 'Yes. Photos, videos, and health certificates are shared before your puppy travels, and our team sends real photos and health details directly on WhatsApp.',
  },
  {
    question: 'Do you deliver?',
    answer: 'Yes. We deliver within Dubai, and our trusted international cargo partners deliver puppies safely to loving homes all around the world.',
  },
  {
    question: 'Which breeds do you usually have?',
    answer: 'Breeds we regularly have include Maltipoo, Pomeranian, Poodle and Bichon, plus rare teacup lines such as Korean teacup poodles, Maltese, Pom and Yorkie.',
  },
  {
    question: 'Is there help after my puppy comes home?',
    answer: 'Yes. Our team is available 24/7 and offers advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend.',
  },
]

function FaqPage() {
  const [query, setQuery] = useState('')
  const filteredQuestions = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    if (!normalizedQuery) return questions

    return questions.filter(({ question, answer }) =>
      `${question} ${answer}`.toLocaleLowerCase().includes(normalizedQuery),
    )
  }, [query])

  return (
    <div className="reference-page reference-faq-page-root">
      <section className="reference-faq-hero">
        <div className="reference-faq-hero-copy">
          <h1>Questions &amp; answers</h1>
          <p className="reference-faq-description">
            Can't find what you're looking for? Message us on WhatsApp — our team is available 24/7.
          </p>
          <label className="reference-faq-search-label" htmlFor="faq-search">
            <span className="reference-script">sniff out a question</span>
          </label>
          <div className="reference-faq-search">
            <Search aria-hidden="true" size={22} />
            <input
              autoComplete="off"
              id="faq-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="delivery, Korea, vaccinated..."
              type="search"
              value={query}
            />
          </div>
          <p aria-live="polite" className="reference-faq-count">
            {filteredQuestions.length === questions.length
              ? '9 notes on the board'
              : `${filteredQuestions.length} ${filteredQuestions.length === 1 ? 'note' : 'notes'} on the board`}
          </p>
          <a className="reference-button reference-button--primary reference-faq-ask" href={WHATSAPP_URL} rel="noreferrer" target="_blank">
            <MessageCircle size={17} /> Ask your own question
          </a>
        </div>
        <div aria-hidden="true" className="reference-faq-board">
          <div className="reference-faq-board-inner">
            <p className="reference-faq-board-title">a little help for you</p>
            {[
              ['little paws, big love', 'honey'],
              ['happy, healthy & home', 'cream'],
              ['your new best friend', 'sage'],
            ].map(([note, color]) => (
              <div className={`reference-faq-note reference-faq-note--${color}`} key={note}>
                <span>{note}</span>
                <span className="reference-faq-note-heart">♥</span>
              </div>
            ))}
            <div className="reference-faq-board-doodle">?</div>
          </div>
        </div>
      </section>

      <section aria-label="Frequently asked questions" className="reference-section reference-faq-list-section">
        <div className="reference-faq-list">
          {filteredQuestions.map(({ question, answer }) => (
            <details className="reference-faq-item" key={question}>
              <summary>{question}<span aria-hidden="true">+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
          {filteredQuestions.length === 0 && (
            <p className="reference-faq-empty">
              No notes match that search yet. Ask our team and we’ll be happy to help.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default FaqPage
