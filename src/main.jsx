import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Cross, MapPin, MessageCircle, Minus, Plus, Search, ShoppingBag, Truck, X } from 'lucide-react'
import { createRoot } from 'react-dom/client'
import './style.css'

const products = [
  ['scrubs', 'Classic Scrub Set', 'Workwear', 15, 'V-neck top and matching trousers'],
  ['clogs', 'Printed Clinical Clogs', 'Footwear', 25, 'Two pairs per bundle'],
  ['tote', 'Printed Nurse Tote', 'Accessories', 10, 'Everyday carry bag'],
  ['tumbler', 'Nurse Tumbler', 'Accessories', 15, 'Insulated cup with lid'],
  ['jacket', 'Snap-Front Nurse Jacket', 'Workwear', 12, 'Light layer for your shift'],
  ['watch', 'Clip-On Nurse Watch', 'Accessories', 6, 'Fob watch with clip'],
  ['coat', 'White Lab Coat', 'Workwear', 15, 'Long-sleeve clinical coat'],
  ['cap', 'Tie-Back Scrub Cap', 'Accessories', 5, 'Adjustable clinical cap'],
  ['shoes', 'Slip-On Nursing Shoes', 'Footwear', 15, 'Closed-toe work shoes'],
  ['headband', 'Nurse Headband', 'Accessories', 5, 'Printed stretch headband'],
  ['premium-tote', 'Pink Clinical Tote', 'Accessories', 15, 'Medical print shoulder bag'],
].map(([id, name, category, price, detail]) => ({ id, name, category, price, detail }))

const categories = ['All products', 'Workwear', 'Footwear', 'Accessories']
const phone = '231889388919'
const whatsapp = (message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
const contact = whatsapp("Hi Nurse's Closet! I'd like to ask about your products.")
const money = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
const image = (name) => `/images/${name}.jpg`

function readBag() {
  try {
    const saved = JSON.parse(localStorage.getItem('nurses-closet-bag'))
    return Object.fromEntries(products.map(({ id }) => [id, Number.isSafeInteger(saved?.[id]) && saved[id] > 0 ? saved[id] : 0]))
  } catch {
    return Object.fromEntries(products.map(({ id }) => [id, 0]))
  }
}

function getRoute() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/') return { page: 'home' }
  if (path === '/shop') return { page: 'shop' }
  const match = /^\/products\/([^/]+)$/.exec(path)
  if (match) return { page: 'product', id: decodeURIComponent(match[1]) }
  return { page: 'not-found' }
}

function Link({ to, navigate, children, ...props }) {
  return <a href={to} {...props} onClick={(event) => {
    props.onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target) return
    event.preventDefault()
    navigate(to)
  }}>{children}</a>
}

function ProductCard({ product, navigate, addToBag }) {
  const { id, name, category, price, detail } = product
  return <article className="product">
    <Link to={`/products/${id}`} navigate={navigate} className="product-photo" aria-label={`View ${name}`}><img src={image(id)} alt={name} loading="lazy" /></Link>
    <div className="product-body">
      <p className="product-category">{category}</p>
      <h3><Link to={`/products/${id}`} navigate={navigate}>{name}</Link></h3>
      <p className="detail">{detail}</p>
      <div className="product-bottom"><strong>{money(price)}</strong>
        <button type="button" aria-label={`Add ${name} to bag`} title="Add to bag" onClick={() => addToBag(product, 1)}><Plus size={19} /></button>
      </div>
    </div>
  </article>
}

function Shop({ navigate, addToBag }) {
  const [category, setCategory] = useState(categories[0])
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const term = query.trim().toLowerCase()
  const visible = products.filter(({ name, category: group, detail }) =>
    (category === categories[0] || category === group) &&
    [name, group, detail].join(' ').toLowerCase().includes(term)
  ).sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'name') return a.name.localeCompare(b.name)
    return 0
  })

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
    </div> : <p className="empty">No products match your search. <button type="button" onClick={() => { setQuery(''); setCategory(categories[0]) }}>Clear filters</button></p>}
  </main>
}

function ProductDetail({ product, navigate, addToBag }) {
  const [quantity, setQuantity] = useState(1)
  return <main className="shell product-page">
    <Link className="back-link" to="/shop" navigate={navigate}><ArrowLeft size={17} /> Back to shop</Link>
    <div className="product-layout">
      <div className="detail-photo"><img src={image(product.id)} alt={product.name} /></div>
      <div className="product-info">
        <p className="eyebrow">{product.category}</p>
        <h1 className="page-title">{product.name}</h1>
        <p className="detail-price">{money(product.price)}</p>
        <p className="detail-description">{product.detail}.</p>
        <p className="detail-description">Made for everyday shifts. Contact the shop to confirm available sizes, colors and delivery costs.</p>
        <div className="detail-actions">
          <div className="quantity detail-quantity" aria-label="Quantity">
            <button type="button" aria-label="Decrease quantity" disabled={quantity === 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={17} /></button>
            <output aria-label="Selected quantity">{quantity}</output>
            <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}><Plus size={17} /></button>
          </div>
          <button className="primary" type="button" onClick={() => addToBag(product, quantity)}><ShoppingBag size={18} /> Add {quantity} to bag</button>
        </div>
        <p className="detail-help"><Truck size={18} /> Delivery available in Monrovia</p>
      </div>
    </div>
  </main>
}

function App() {
  const [route, setRoute] = useState(getRoute)
  const [bag, setBag] = useState(readBag)
  const [notice, setNotice] = useState('')
  const drawer = useRef(null)

  useEffect(() => {
    const onPopState = () => setRoute(getRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  useEffect(() => { try { localStorage.setItem('nurses-closet-bag', JSON.stringify(bag)) } catch { /* Storage may be unavailable. */ } }, [bag])

  function navigate(to) {
    if (window.location.pathname !== to) window.history.pushState(null, '', to)
    setRoute(getRoute())
    window.scrollTo(0, 0)
  }
  function changeQuantity(id, amount) {
    setBag((current) => ({ ...current, [id]: Math.max(0, (current[id] ?? 0) + amount) }))
  }
  function addToBag(product, amount) {
    changeQuantity(product.id, amount)
    setNotice(`${amount} × ${product.name} added to bag`)
  }

  const selected = products.filter(({ id }) => bag[id] > 0)
  const count = selected.reduce((sum, { id }) => sum + bag[id], 0)
  const subtotal = selected.reduce((sum, { id, price }) => sum + price * bag[id], 0)
  const order = whatsapp([
    "Hi Nurse's Closet! I'd like to order:",
    ...selected.map(({ id, name, price }) => `${bag[id]} x ${name}${id === 'clogs' ? ' (2 pairs per bundle)' : ''} - ${money(bag[id] * price)}`),
    `Subtotal: ${money(subtotal)}`,
    'Please confirm availability, size and color options, and delivery cost.'
  ].join('\n'))
  const product = route.page === 'product' ? products.find(({ id }) => id === route.id) : null

  return <>
    <div className="announcement"><MapPin size={13} /> Monrovia, Liberia <span>·</span> Delivery available</div>
    <header className="site-header">
      <div className="shell flex items-center justify-between gap-4">
        <Link className="brand" to="/" navigate={navigate} aria-label="Nurse's Closet home"><span><Cross size={18} /></span>Nurse's Closet</Link>
        <nav className="flex items-center gap-4 sm:gap-8" aria-label="Main navigation">
          <Link to="/shop" navigate={navigate} aria-current={route.page === 'shop' ? 'page' : undefined}>Shop</Link>
          <a href="/#contact" onClick={(event) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
            event.preventDefault()
            if (route.page !== 'home') navigate('/')
            requestAnimationFrame(() => document.getElementById('contact')?.scrollIntoView())
          }}>Contact</a>
        </nav>
        <button className="bag-button" type="button" onClick={() => drawer.current?.showModal()}><ShoppingBag size={18} /> <span className="bag-label">Bag</span> <span>{count}</span></button>
      </div>
    </header>
    {route.page === 'home' && <main>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">Monrovia's clinical wear shop</p>
          <h1>Ready for<br />your next <em>shift.</em></h1>
          <p className="hero-description">Shop scrubs, comfortable footwear and everyday accessories for nurses and healthcare professionals.</p>
          <Link className="primary" to="/shop" navigate={navigate}>Shop the collection <ArrowRight size={18} /></Link>
        </div>
        <div className="hero-photo"><img src={image('hero')} alt="Nurse wearing teal scrubs" /></div>
      </section>
      <div className="shell service-strip">
        <span><Truck size={18} /> Delivery available</span><span><MessageCircle size={18} /> Order on WhatsApp</span><span><ShoppingBag size={18} /> Prices in USD</span>
      </div>
      <section className="shell home-products">
        <div className="home-products-heading"><div><p className="eyebrow">The collection</p><h2>Shift essentials</h2></div><Link to="/shop" navigate={navigate}>View all products <ArrowRight size={17} /></Link></div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-4">{products.slice(0, 4).map((item) => <ProductCard key={item.id} product={item} navigate={navigate} addToBag={addToBag} />)}</div>
      </section>
      <section id="contact" className="contact">
        <div className="shell contact-inner"><div><p className="eyebrow">Monrovia, Liberia</p><h2>Need help with an order?</h2><p>Message the shop to confirm sizes, stock and delivery costs.</p></div>
          <a className="primary" href={contact} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Chat on WhatsApp</a>
        </div>
      </section>
    </main>}
    {route.page === 'shop' && <Shop navigate={navigate} addToBag={addToBag} />}
    {product && <ProductDetail key={product.id} product={product} navigate={navigate} addToBag={addToBag} />}
    {(route.page === 'not-found' || (route.page === 'product' && !product)) && <main className="shell missing-page"><h1 className="page-title">Page not found</h1><p>We couldn't find that product or page.</p><Link className="primary" to="/shop" navigate={navigate}>Browse products <ArrowRight size={18} /></Link></main>}
    <footer className="shell flex flex-wrap items-center justify-between gap-4 py-6 text-sm">
      <span>© {new Date().getFullYear()} Nurse's Closet</span>
      <div className="flex flex-wrap items-center gap-5"><a href={`tel:+${phone}`}>+231 889 388 919</a><a href="https://www.facebook.com/profile.php?id=61559504650346&sk=photos_by" target="_blank" rel="noreferrer">Facebook</a></div>
    </footer>
    <p className="sr-only" role="status" aria-live="polite">{notice ? `${notice}. ${count} in bag.` : ''}</p>
    <dialog className="drawer" ref={drawer} aria-labelledby="bag-title" onClick={(event) => { if (event.target === event.currentTarget) drawer.current.close() }}>
      <div className="drawer-inner">
        <div className="drawer-header"><h2 id="bag-title">Your bag</h2><button type="button" aria-label="Close bag" onClick={() => drawer.current.close()}><X size={22} /></button></div>
        {selected.length ? <>
          <ul className="drawer-items">{selected.map(({ id, name, price }) => <li key={id}>
            <img src={image(id)} alt="" /><div className="min-w-0 flex-1"><strong>{name}</strong><p>{money(price)} each</p>
              <div className="quantity"><button type="button" aria-label={`Decrease quantity of ${name}`} onClick={() => changeQuantity(id, -1)}><Minus size={14} /></button><span>{bag[id]}</span><button type="button" aria-label={`Increase quantity of ${name}`} onClick={() => changeQuantity(id, 1)}><Plus size={14} /></button></div></div>
            <strong>{money(price * bag[id])}</strong>
          </li>)}</ul>
          <div className="drawer-footer"><p className="flex justify-between"><strong>Subtotal</strong><strong>{money(subtotal)}</strong></p><p>Delivery cost is confirmed by the shop.</p><a className="primary" href={order} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Order on WhatsApp</a></div>
        </> : <div className="empty"><p>Your bag is empty.</p><Link to="/shop" navigate={navigate} onClick={() => drawer.current.close()}>Browse products <ArrowRight size={14} /></Link></div>}
      </div>
    </dialog>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
