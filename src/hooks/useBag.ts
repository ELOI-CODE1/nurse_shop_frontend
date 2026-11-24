import { useEffect, useState } from 'react'
import { products } from '../data/products'
import { money } from '../utils/format'
import { whatsapp } from '../utils/whatsapp'

type Product = (typeof products)[number]
type Bag = Record<string, number>

const STORAGE_KEY = 'nurses-closet-bag'

function emptyBag(): Bag {
  return Object.fromEntries(products.map(({ id }) => [id, 0]))
}

function readBag(): Bag {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyBag()
    const saved = JSON.parse(raw)
    if (typeof saved !== 'object' || saved === null) return emptyBag()
    return Object.fromEntries(
      products.map(({ id }) => [
        id,
        Number.isInteger(saved[id]) && saved[id] > 0 ? saved[id] : 0,
      ])
    )
  } catch (error) {
    // Corrupted localStorage: reset to empty bag and surface the error in dev.
    console.error('[nurses-closet] failed to read bag from localStorage:', error)
    return emptyBag()
  }
}

export function useBag() {
  const [bag, setBag] = useState<Bag>(readBag)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bag))
    } catch {
      // Storage may be unavailable.
    }
  }, [bag])

  function changeQuantity(id: string, amount: number) {
    setBag((current) => ({
      ...current,
      [id]: Math.max(0, (current[id] ?? 0) + amount),
    }))
  }

  function addToBag(product: Product, amount: number) {
    changeQuantity(product.id, amount)
  }

  const selected = products.filter(({ id }) => bag[id] > 0)
  const count = selected.reduce((sum, { id }) => sum + bag[id], 0)
  const subtotal = selected.reduce((sum, { id, price }) => sum + price * bag[id], 0)
  const order = whatsapp([
    "Hi Nurse's Closet! I'd like to order:",
    ...selected.map(({ id, name, price, bundle }) => {
      const line = `${bag[id]} x ${name}${bundle ? ' (2 pairs per bundle)' : ''} - ${money(bag[id] * price)}`
      return line
    }),
    `Subtotal: ${money(subtotal)}`,
    'Please confirm availability, size and color options, and delivery cost.',
  ].join('\n'))

  return { bag, selected, count, subtotal, order, changeQuantity, addToBag }
}
