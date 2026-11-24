/// <reference types="vite/client" />

export const phone = import.meta.env.VITE_WHATSAPP_PHONE ?? '231889388919'

export const whatsapp = (message: string): string =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

export const contact = whatsapp("Hi Nurse's Closet! I'd like to ask about your products.")
