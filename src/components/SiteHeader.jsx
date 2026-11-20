import { Cross, ShoppingBag } from 'lucide-react'
import { AppLink } from './AppLink'

export function SiteHeader({ route, navigate, count, onOpenBag }) {
  return <header className="site-header">
    <div className="shell flex items-center justify-between gap-4">
      <AppLink className="brand" to="/" navigate={navigate} aria-label="Nurse's Closet home"><span><Cross size={18} /></span>Nurse's Closet</AppLink>
      <nav className="flex items-center gap-4 sm:gap-8" aria-label="Main navigation">
        <AppLink to="/" navigate={navigate} aria-current={route.page === 'home' ? 'page' : undefined}>Home</AppLink>
        <AppLink to="/shop" navigate={navigate} aria-current={route.page === 'shop' ? 'page' : undefined}>Shop</AppLink>
      </nav>
      <button className="bag-button" type="button" onClick={onOpenBag}><ShoppingBag size={18} /> <span className="bag-label">Bag</span> <span>{count}</span></button>
    </div>
  </header>
}
