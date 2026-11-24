export interface Route {
  page: 'home' | 'shop' | 'product' | 'not-found'
  id?: string
}

export function getRoute(): Route {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  if (path === '/') return { page: 'home' }
  if (path === '/shop') return { page: 'shop' }

  const match = /^\/products\/([^/]+)$/.exec(path)
  if (match) return { page: 'product', id: decodeURIComponent(match[1]) }

  return { page: 'not-found' }
}
