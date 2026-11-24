import { ArrowLeft, ShoppingBag, Truck } from 'lucide-react'
import { useState } from 'react'
import { AppLink } from '../components/AppLink'
import { QuantityControl } from '../components/QuantityControl'
import { image } from '../utils/assets'
import { money } from '../utils/format'

type Product = {
  id: string
  name: string
  category: string
  price: number
  detail: string
  bundle?: boolean
}

interface ProductPageProps {
  product: Product
  navigate: (to: string) => void
  addToBag: (product: Product, amount: number) => void
}

export function ProductPage({ product, navigate, addToBag }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1)
  const portraitImage = product.id.endsWith('-scrub-set') || product.id === 'gray-scrub-set-with-tumbler'

  return (
    <main className="shell product-page">
      <AppLink className="back-link" to="/shop" navigate={navigate}>
        <ArrowLeft size={17} /> Back to shop
      </AppLink>
      <div className="product-layout">
        <div className={`detail-photo${portraitImage ? ' detail-photo--portrait' : ''}`}>
          <img src={image(product.id)} alt={product.name} />
        </div>
        <div className="product-info">
          <p className="eyebrow">{product.category}</p>
          <h1 className="page-title">{product.name}</h1>
          <p className="detail-price">{money(product.price)}</p>
          <p className="detail-description">
            {product.detail}{/[.!?]$/.test(product.detail) ? '' : '.'}
          </p>
          <p className="detail-description">Made for everyday shifts. Contact the shop to confirm available sizes, colors and delivery costs.</p>
          <div className="detail-actions">
            <QuantityControl
              className="detail-quantity"
              value={quantity}
              minimum={1}
              onDecrease={() => setQuantity((value) => Math.max(1, value - 1))}
              onIncrease={() => setQuantity((value) => value + 1)}
            />
            <button className="primary" type="button" onClick={() => addToBag(product, quantity)}>
              <ShoppingBag size={18} /> Add {quantity} to bag
            </button>
          </div>
          <p className="detail-help">
            <Truck size={18} /> Delivery available in Monrovia
          </p>
        </div>
      </div>
    </main>
  )
}
