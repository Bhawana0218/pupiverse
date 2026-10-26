const familyMoments = [
  {
    caption: 'Lulu with her new mummy',
    image: '/reference-assets/media/happy-family-with-their-new-puppy-55.jpeg',
  },
  {
    caption: 'Adorable Maltipoo baby',
    image: '/reference-assets/media/happy-family-with-their-new-puppy-37.jpeg',
  },
  {
    caption: 'My new teddy puppy',
    image: '/reference-assets/media/happy-family-with-their-new-puppy-44.jpeg',
  },
  {
    caption: 'Our new puppies',
    image: '/reference-assets/media/happy-family-with-their-new-puppy-20.jpeg',
  },
  {
    caption: 'New puppy',
    image: '/reference-assets/media/happy-family-with-their-new-puppy-63.jpeg',
  },
  {
    caption: 'Gang of three',
    image: '/reference-assets/media/happy-family-with-their-new-puppy-3.jpeg',
  },
  {
    caption: 'So happy',
    image: '/reference-assets/media/happy-family-with-their-new-puppy-17.jpeg',
  },
  {
    caption: 'New pup',
    image: '/reference-assets/media/happy-family-with-their-new-puppy-53.jpeg',
  },
]

function HappyFamiliesPage() {
  return (
    <div className="reference-page">
      <section className="reference-page-intro">
        <p className="reference-script">our wall of happy endings</p>
        <h1>Happy families</h1>
        <p>Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.</p>
      </section>

      <section className="reference-section reference-families-page">
        <p className="reference-family-count">64 moments and counting</p>
        <blockquote className="reference-family-quote">
          “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
          <cite>Sarah M., Dubai, UAE</cite>
        </blockquote>
        <div className="reference-family-grid">
          {familyMoments.map((moment) => (
            <figure className="reference-family-card" key={moment.caption}>
              <img alt={`A TeddyPups family with their new puppy: ${moment.caption}`} loading="lazy" src={moment.image} />
              <figcaption>{moment.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HappyFamiliesPage
