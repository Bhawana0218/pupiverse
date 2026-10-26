const familyMoments = [
  {
    caption: 'Lulu with her new mummy',
    image: '/reference-assets/media/TUslu26Ueaq-/9c3516c040/edb2f5_6627857aca7e495ea37d9f62d814d323-mv2.jpeg',
  },
  {
    caption: 'Adorable Maltipoo baby',
    image: '/reference-assets/media/OcgEePeBmGuu/41fb22320b/edb2f5_adf88f7400c848249d60698fca0336e9-mv2.jpeg',
  },
  {
    caption: 'My new teddy puppy',
    image: '/reference-assets/media/RYkyuv4DBCTC/d9e02a0dc8/edb2f5_7ed2ee1ba89b4230b52f5e3981b1b198-mv2.jpeg',
  },
  {
    caption: 'Our new puppies',
    image: '/reference-assets/media/d267R4d3lMSv/96d8604ca3/edb2f5_02b95a69a2c24c7e81b60e6d8c01baf7-mv2.jpeg',
  },
  {
    caption: 'New puppy',
    image: '/reference-assets/media/XqxhmNftVKic/5adf2f28fe/edb2f5_37f5218f73e842b88ee3ae0c911bcafa-mv2.jpeg',
  },
  {
    caption: 'Gang of three',
    image: '/reference-assets/media/1II_yVrwWdOG/c07a8ef9f1/edb2f5_258010c661f64f3b8b952c5a2f7677de-mv2.jpeg',
  },
  {
    caption: 'So happy',
    image: '/reference-assets/media/bKP7vwN0R2OU/1aa47534b5/edb2f5_b8d76dffb97f46b5a9f2aaf9c1067b4b-mv2.jpeg',
  },
  {
    caption: 'New pup',
    image: '/reference-assets/media/ToVkYw_K3UrY/81a2bd9ac1/edb2f5_582a3767e5eb408f9684a7e623229dc4-mv2.jpeg',
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
