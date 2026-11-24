import { Minus, Plus } from 'lucide-react'

interface QuantityControlProps {
  value: number
  minimum?: number
  onDecrease: () => void
  onIncrease: () => void
  label?: string
  decreaseLabel?: string
  increaseLabel?: string
  className?: string
}

export function QuantityControl({
  value,
  minimum = 0,
  onDecrease,
  onIncrease,
  label = 'Quantity',
  decreaseLabel = 'Decrease quantity',
  increaseLabel = 'Increase quantity',
  className = '',
}: QuantityControlProps) {
  return (
    <div className={`quantity ${className}`} aria-label={label}>
      <button type="button" aria-label={decreaseLabel} disabled={value <= minimum} onClick={onDecrease}>
        <Minus size={17} />
      </button>
      <output aria-label="Selected quantity">{value}</output>
      <button type="button" aria-label={increaseLabel} onClick={onIncrease}>
        <Plus size={17} />
      </button>
    </div>
  )
}
