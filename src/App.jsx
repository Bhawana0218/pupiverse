import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import ReferenceSnapshotPage from './components/ReferenceSnapshotPage.jsx'
import './reference-fonts.css'
import './reference-site.css'
import './pup-enhancements.css'

function PuppyDetailPage() {
  const { slug } = useParams()
  return <ReferenceSnapshotPage page="puppy-detail" slug={slug} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReferenceSnapshotPage page="home" />} />
        <Route path="/puppies" element={<ReferenceSnapshotPage page="puppies" />} />
        <Route path="/puppies/:slug" element={<PuppyDetailPage />} />
        <Route path="/happy-families" element={<ReferenceSnapshotPage page="happy-families" />} />
        <Route path="/gone-home" element={<ReferenceSnapshotPage page="gone-home" />} />
        <Route path="/how-it-works" element={<ReferenceSnapshotPage page="how-it-works" />} />
        <Route path="/faq" element={<ReferenceSnapshotPage page="faq" />} />
        <Route path="/contact" element={<ReferenceSnapshotPage page="contact" />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
