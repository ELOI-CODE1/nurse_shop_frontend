import { Plus } from 'lucide-react'
import { AppLink } from './AppLink'
import { image } from '../utils/assets'
import { money } from '../utils/format'

interface ProductCardProps {
  product: { id: string; name: string; category: string; price: number; detail: string }
  navigate: (to: string) => void
  addToBag: (product: { id: string; name: string; category: string; price: number; detail: string }, amount: number) => void
}

export function ProductCard({ product, navigate, addToBag }: ProductCardProps) {
  const { id, name, category, price, detail } = product
  const portraitImage = id.endsWith('-scrub-set') || id === 'gray-scrub-set-with-tumbler'

  return (
    <article className="product">
      <AppLink
        to={`/products/${id}`}
        navigate={navigate}
        className={`product-photo${portraitImage ? ' product-photo--portrait' : ''}`}
        aria-label={`View ${name}`}
      >
        <img src={image(id)} alt={name} loading="lazy" />
      </AppLink>
      <div className="product-body">
        <p className="product-category">{category}</p>
        <h3>
          <AppLink to={`/products/${id}`} navigate={navigate}>
            {name}
          </AppLink>
        </h3>
        <p className="detail">{detail}</p>
        <div className="product-bottom">
          <strong>{money(price)}</strong>
          <button
            type="button"
            aria-label={`Add ${name} to bag`}
            title="Add to bag"
            onClick={() => addToBag(product, 1)}
          >
            <Plus size={19} />
          </button>
        </div>
      </div>
    </article>
  )
}
