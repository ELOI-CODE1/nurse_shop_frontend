import { useEffect, useMemo, useRef, useState } from 'react'
import { AnnouncementBar } from './components/AnnouncementBar'
import { BagDrawer } from './components/BagDrawer'
import { ErrorBoundary } from './components/ErrorBoundary'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { useBag } from './hooks/useBag'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductPage } from './pages/ProductPage'
import { ShopPage } from './pages/ShopPage'
import { products } from './data/products'
import { getRoute } from './utils/routes'

type Route = ReturnType<typeof getRoute>

type Product = (typeof products)[number]

export function App() {
  const [route, setRoute] = useState<Route>(getRoute)
  const [notice, setNotice] = useState('')
  const drawer = useRef<HTMLDialogElement | null>(null)
  const { bag, selected, count, subtotal, order, changeQuantity, addToBag } = useBag()

  useEffect(() => {
    const onPopState = () => setRoute(getRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  function navigate(to: string) {
    if (window.location.pathname !== to) window.history.pushState(null, '', to)
    setRoute(getRoute())
    window.scrollTo(0, 0)
  }

  function handleAddToBag(product: Product, amount: number) {
    addToBag(product, amount)
    setNotice(`${amount} × ${product.name} added to bag`)
  }

  const productById = useMemo(() => new Map(products.map((p) => [p.id, p])), [])
  const productLookup = route.page === 'product' ? productById.get(route.id ?? '') : null

  return (
    <ErrorBoundary fallback={<NotFoundPage navigate={navigate} />}>
      <AnnouncementBar />
      <SiteHeader route={route} navigate={navigate} count={count} onOpenBag={() => drawer.current?.showModal()} />
      {route.page === 'home' && <HomePage navigate={navigate} addToBag={handleAddToBag} />}
      {route.page === 'shop' && <ShopPage navigate={navigate} addToBag={handleAddToBag} />}
      {productLookup && <ProductPage product={productLookup} navigate={navigate} addToBag={handleAddToBag} />}
      {(route.page === 'not-found' || (route.page === 'product' && !productLookup)) && (
        <NotFoundPage navigate={navigate} />
      )}
      <SiteFooter />
      <p className="sr-only" role="status" aria-live="polite">
        {notice ? `${notice}. ${count} in bag.` : ''}
      </p>
      <BagDrawer
        drawer={drawer}
        navigate={navigate}
        selected={selected}
        bag={bag}
        subtotal={subtotal}
        orderUrl={order}
        changeQuantity={changeQuantity}
      />
    </ErrorBoundary>
  )
}
