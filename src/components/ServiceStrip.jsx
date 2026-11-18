import { MessageCircle, ShoppingBag, Truck } from 'lucide-react'

export function ServiceStrip() {
  return <div className="shell service-strip">
    <span><Truck size={18} /> Delivery available</span><span><MessageCircle size={18} /> Order on WhatsApp</span><span><ShoppingBag size={18} /> Prices in USD</span>
  </div>
}
