import { ArrowRight, MessageCircle, X } from 'lucide-react'
import { AppLink } from './AppLink'
import { QuantityControl } from './QuantityControl'
import { image } from '../utils/assets'
import { money } from '../utils/format'

export function BagDrawer({ drawer, navigate, selected, bag, subtotal, orderUrl, changeQuantity }) {
  function closeDrawer() {
    drawer.current?.close()
  }

  return <dialog className="drawer" ref={drawer} aria-labelledby="bag-title" onClick={(event) => { if (event.target === event.currentTarget) closeDrawer() }}>
    <div className="drawer-inner">
      <div className="drawer-header"><h2 id="bag-title">Your bag</h2><button type="button" aria-label="Close bag" onClick={closeDrawer}><X size={22} /></button></div>
      {selected.length ? <>
        <ul className="drawer-items">{selected.map(({ id, name, price }) => <li key={id}>
          <img src={image(id)} alt="" /><div className="min-w-0 flex-1"><strong>{name}</strong><p>{money(price)} each</p>
            <QuantityControl value={bag[id]} onDecrease={() => changeQuantity(id, -1)} onIncrease={() => changeQuantity(id, 1)} decreaseLabel={`Decrease quantity of ${name}`} increaseLabel={`Increase quantity of ${name}`} />
          </div>
          <strong>{money(price * bag[id])}</strong>
        </li>)}</ul>
        <div className="drawer-footer"><p className="flex justify-between"><strong>Subtotal</strong><strong>{money(subtotal)}</strong></p><p>Delivery cost is confirmed by the shop.</p><a className="primary" href={orderUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Order on WhatsApp</a></div>
      </> : <div className="empty"><p>Your bag is empty.</p><AppLink to="/shop" navigate={navigate} onClick={closeDrawer}>Browse products <ArrowRight size={14} /></AppLink></div>}
    </div>
  </dialog>
}
