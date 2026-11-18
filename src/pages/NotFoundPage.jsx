import { ArrowRight } from 'lucide-react'
import { AppLink } from '../components/AppLink'

export function NotFoundPage({ navigate }) {
  return <main className="shell missing-page"><h1 className="page-title">Page not found</h1><p>We couldn't find that product or page.</p><AppLink className="primary" to="/shop" navigate={navigate}>Browse products <ArrowRight size={18} /></AppLink></main>
}
