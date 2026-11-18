import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { categories, products } from '../data/products'

export function ShopPage({ navigate, addToBag }) {
  const [category, setCategory] = useState(categories[0])
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const term = query.trim().toLowerCase()
  const visible = useMemo(() => products.filter(({ name, category: group, detail }) =>
    (category === categories[0] || category === group) &&
    [name, group, detail].join(' ').toLowerCase().includes(term)
  ).sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'name') return a.name.localeCompare(b.name)
    return 0
  }), [category, sort, term])

  function clearFilters() {
    setQuery('')
    setCategory(categories[0])
  }

  return <main className="shell catalog">
    <div className="catalog-heading">
      <div><p className="eyebrow">The collection</p><h1 className="page-title">Shop shift essentials</h1></div>
      <label className="search"><Search size={18} /><input type="search" placeholder="Search products" aria-label="Search products" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
    </div>
    <div className="shop-controls">
      <div className="filters" aria-label="Filter products">
        {categories.map((item) => <button type="button" key={item} aria-pressed={item === category} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <label className="sort">Sort by <select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}>
        <option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name: A to Z</option>
      </select></label>
    </div>
    <p className="result-count">{visible.length} {visible.length === 1 ? 'product' : 'products'}</p>
    {visible.length ? <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-4">
      {visible.map((product) => <ProductCard key={product.id} product={product} navigate={navigate} addToBag={addToBag} />)}
    </div> : <p className="empty">No products match your search. <button type="button" onClick={clearFilters}>Clear filters</button></p>}
  </main>
}
