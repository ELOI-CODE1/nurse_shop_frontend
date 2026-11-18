import { useEffect, useState } from 'react'
import { products } from '../data/products'
import { money } from '../utils/format'
import { whatsapp } from '../utils/whatsapp'

const STORAGE_KEY = 'nurses-closet-bag'

function emptyBag() {
  return Object.fromEntries(products.map(({ id }) => [id, 0]))
}

function readBag() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Object.fromEntries(products.map(({ id }) => [id, Number.isSafeInteger(saved?.[id]) && saved[id] > 0 ? saved[id] : 0]))
  } catch {
    return emptyBag()
  }
}

export function useBag() {
  const [bag, setBag] = useState(readBag)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bag))
    } catch {
      // Storage may be unavailable.
    }
  }, [bag])

  function changeQuantity(id, amount) {
    setBag((current) => ({ ...current, [id]: Math.max(0, (current[id] ?? 0) + amount) }))
  }

  function addToBag(product, amount) {
    changeQuantity(product.id, amount)
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

  return { bag, selected, count, subtotal, order, changeQuantity, addToBag }
}
