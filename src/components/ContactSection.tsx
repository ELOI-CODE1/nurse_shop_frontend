import { MessageCircle } from 'lucide-react'
import { contact } from '../utils/whatsapp'

export function ContactSection() {
  return (
    <section id="contact" className="contact">
      <div className="shell contact-inner">
        <div>
          <p className="eyebrow">Monrovia, Liberia</p>
          <h2>Need help with an order?</h2>
          <p>Message the shop to confirm sizes, stock and delivery costs.</p>
        </div>
        <a className="primary" href={contact} target="_blank" rel="noreferrer">
          <MessageCircle size={18} /> Chat on WhatsApp
        </a>
      </div>
    </section>
  )
}
