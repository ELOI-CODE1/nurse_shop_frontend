import { useCallback, useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { categories, products } from '../data/products'

type Product = (typeof products)[number]
type Category = (typeof categories)[number]
type Sort = 'featured' | 'price-asc' | 'price-desc' | 'name'

const DEFAULT_CATEGORY: Category = categories[0]
const DEFAULT_SORT: Sort = 'featured'

function parseCategory(value: string | null): Category {
  return categories.includes(value as Category) ? (value as Category) : DEFAULT_CATEGORY
}

function parseSort(value: string | null): Sort {
  return ['featured', 'price-asc', 'price-desc', 'name'].includes(value ?? '') ? (value as Sort) : DEFAULT_SORT
}

function buildSearchParams(category: Category, query: string, sort: Sort): string {
  const params = new URLSearchParams()
  if (category !== DEFAULT_CATEGORY) params.set('category', category)
  if (query) params.set('q', query)
  if (sort !== DEFAULT_SORT) params.set('sort', sort)
  return params.toString()
}

interface ShopPageProps {
  navigate: (to: string) => void
  addToBag: (product: Product, amount: number) => void
}

export function ShopPage({ navigate, addToBag }: ShopPageProps) {
  const [category, setCategoryState] = useState<Category>(DEFAULT_CATEGORY)
  const [query, setQueryState] = useState('')
  const [sort, setSortState] = useState<Sort>(DEFAULT_SORT)

  // Hydrate filter state from the URL on mount so links are shareable and refresh-safe.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setCategoryState(parseCategory(params.get('category')))
    setQueryState(params.get('q') ?? '')
    setSortState(parseSort(params.get('sort')))
  }, [])

  // Keep the URL in sync whenever filters change (without a full page reload).
  const syncUrl = useCallback(
    (cat: Category, q: string, s: Sort) => {
      const qs = buildSearchParams(cat, q, s)
      const url = `${window.location.pathname}${qs ? `?${qs}` : ''}`
      if (window.location.search !== qs) {
        window.history.pushState(null, '', url)
      }
    },
    []
  )

  const setCategory = useCallback((cat: Category) => {
    setCategoryState(cat)
    syncUrl(cat, query, sort)
  }, [query, sort, syncUrl])

  const setQuery = useCallback((value: string) => {
    setQueryState(value)
    syncUrl(category, value, sort)
  }, [category, sort, syncUrl])

  const setSort = useCallback((s: Sort) => {
    setSortState(s)
    syncUrl(category, query, s)
  }, [category, query, syncUrl])

  const term = query.trim().toLowerCase()
  const visible = useMemo(() => {
    return products
      .filter(({ name, category: group, detail }) =>
        (category === DEFAULT_CATEGORY || category === group) &&
        [name, group, detail].join(' ').toLowerCase().includes(term)
      )
      .sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price
        if (sort === 'price-desc') return b.price - a.price
        if (sort === 'name') return a.name.localeCompare(b.name)
        return 0
      })
  }, [category, sort, term])

  function clearFilters() {
    setQueryState('')
    setCategoryState(DEFAULT_CATEGORY)
    setSortState(DEFAULT_SORT)
    window.history.replaceState(null, '', window.location.pathname)
  }

  return (
    <main className="shell catalog">
      <div className="catalog-heading">
        <div>
          <p className="eyebrow">The collection</p>
          <h1 className="page-title">Shop shift essentials</h1>
        </div>
        <label className="search">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search products"
            aria-label="Search products"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <div className="shop-controls">
        <div className="filters" aria-label="Filter products">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={item === category}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="sort">
          Sort by{' '}
          <select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </label>
      </div>
      <p className="result-count">{visible.length} {visible.length === 1 ? 'product' : 'products'}</p>
      {visible.length ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} navigate={navigate} addToBag={addToBag} />
          ))}
        </div>
      ) : (
        <p className="empty">
          No products match your search. <button type="button" onClick={clearFilters}>Clear filters</button>
        </p>
      )}
    </main>
  )
}
