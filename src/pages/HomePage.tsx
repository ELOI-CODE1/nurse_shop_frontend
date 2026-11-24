import { ArrowRight } from 'lucide-react'
import { AppLink } from '../components/AppLink'
import { ContactSection } from '../components/ContactSection'
import { ProductCard } from '../components/ProductCard'
import { ServiceStrip } from '../components/ServiceStrip'
import { products } from '../data/products'
type Product = (typeof products)[number]

export function HomePage({ navigate, addToBag }: { navigate: (to: string) => void; addToBag: (product: Product, amount: number) => void }) {
  const featuredIds = ['lavender-scrub-set', 'light-blue-scrub-set', 'black-scrub-set', 'gray-scrub-set-with-tumbler']
  const featuredProducts = featuredIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => product !== undefined)

  return (
    <main>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">Monrovia's clinical wear shop</p>
          <h1>Ready for<br />your next <em>shift.</em></h1>
          <p className="hero-description">Shop scrubs, comfortable footwear and everyday accessories for nurses and healthcare professionals.</p>
          <AppLink className="primary" to="/shop" navigate={navigate}>
            Shop the collection <ArrowRight size={18} />
          </AppLink>
        </div>
      </section>
      <ServiceStrip />
      <section className="shell home-products">
        <div className="home-products-heading">
          <div>
            <p className="eyebrow">The collection</p>
            <h2>Shift essentials</h2>
          </div>
          <AppLink to="/shop" navigate={navigate}>
            View all products <ArrowRight size={17} />
          </AppLink>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} navigate={navigate} addToBag={addToBag} />
          ))}
        </div>
      </section>
      <ContactSection />
    </main>
  )
}
