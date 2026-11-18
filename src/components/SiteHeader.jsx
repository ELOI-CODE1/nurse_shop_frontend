import { Cross, ShoppingBag } from 'lucide-react'
import { AppLink } from './AppLink'

export function SiteHeader({ route, navigate, count, onOpenBag }) {
  function handleContact(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    if (route.page !== 'home') navigate('/')
    requestAnimationFrame(() => document.getElementById('contact')?.scrollIntoView())
  }

  return <header className="site-header">
    <div className="shell flex items-center justify-between gap-4">
      <AppLink className="brand" to="/" navigate={navigate} aria-label="Nurse's Closet home"><span><Cross size={18} /></span>Nurse's Closet</AppLink>
      <nav className="flex items-center gap-4 sm:gap-8" aria-label="Main navigation">
        <AppLink to="/" navigate={navigate} aria-current={route.page === 'home' ? 'page' : undefined}>Home</AppLink>
        <AppLink to="/shop" navigate={navigate} aria-current={route.page === 'shop' ? 'page' : undefined}>Shop</AppLink>
        <a href="/#contact" onClick={handleContact}>Contact</a>
      </nav>
      <button className="bag-button" type="button" onClick={onOpenBag}><ShoppingBag size={18} /> <span className="bag-label">Bag</span> <span>{count}</span></button>
    </div>
  </header>
}
