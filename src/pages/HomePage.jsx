import { ArrowRight } from 'lucide-react'
import { AppLink } from '../components/AppLink'
import { ContactSection } from '../components/ContactSection'
import { ProductCard } from '../components/ProductCard'
import { ServiceStrip } from '../components/ServiceStrip'
import { products } from '../data/products'
import { image } from '../utils/assets'

export function HomePage({ navigate, addToBag }) {
  const featuredProducts = ['scrubs', 'clogs', 'tote', 'tumbler'].map((id) => products.find((product) => product.id === id))
  return <main>
    <section className="hero shell">
      <div className="hero-copy">
        <p className="eyebrow">Monrovia's clinical wear shop</p>
        <h1>Ready for<br />your next <em>shift.</em></h1>
        <p className="hero-description">Shop scrubs, comfortable footwear and everyday accessories for nurses and healthcare professionals.</p>
        <AppLink className="primary" to="/shop" navigate={navigate}>Shop the collection <ArrowRight size={18} /></AppLink>
      </div>
      <div className="hero-photo"><img src={image('hero')} alt="Nurse wearing teal scrubs" /></div>
    </section>
    <ServiceStrip />
    <section className="shell home-products">
      <div className="home-products-heading"><div><p className="eyebrow">The collection</p><h2>Shift essentials</h2></div><AppLink to="/shop" navigate={navigate}>View all products <ArrowRight size={17} /></AppLink></div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-4">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} navigate={navigate} addToBag={addToBag} />)}</div>
    </section>
    <ContactSection />
  </main>
}
