export const phone = '231889388919'

export const whatsapp = (message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

export const contact = whatsapp("Hi Nurse's Closet! I'd like to ask about your products.")
