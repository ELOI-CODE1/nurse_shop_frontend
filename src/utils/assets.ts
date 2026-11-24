const pngImages = new Set([
  'lavender-scrub-set',
  'light-blue-scrub-set',
  'black-scrub-set',
  'gray-scrub-set-with-tumbler',
])

// Maps product id -> actual image filename in public/images/
const jpegMap = new Map([
  // $6 Nurse Fob Watches
  ['nurse-fob-watch-black', '6usd.jpeg'],
  ['nurse-fob-watch-silver', '6usd (2).jpeg'],
  ['nurse-fob-watch-classic', '6usd (3).jpeg'],
  // $10 Nurse Tote Bags
  ['nurse-tote-grey', '10usd.jpeg'],
  ['nurse-tote-pink', '10usd (2).jpeg'],
  ['nurse-tote-blue', '10usd (3).jpeg'],
  ['nurse-tote-red', '10usd (4).jpeg'],
  ['nurse-tote-white', '10usd (5).jpeg'],
  // $12.50 Scrub Jackets
  ['scrub-jacket-multi', '12.50usd.jpeg'],
  ['scrub-jacket-purple', '12.50usd (2).jpeg'],
  // $15 Tumblers & Clogs
  ['nurse-tumbler-green', '15usd.jpeg'],
  ['nurse-clogs-black', '15usd (2).jpeg'],
  ['nurse-clogs-colorful', '15usd (3).jpeg'],
  ['nurse-clogs-blue', '15usd (4).jpeg'],
  ['nurse-clogs-pink', '15usd (5).jpeg'],
  ['nurse-tumbler-pink', '15usd (6).jpeg'],
  ['nurse-tumbler-blue', '15usd (7).jpeg'],
  ['nurse-clogs-white', '15usd (8).jpeg'],
  ['nurse-clogs-grey', '15usd (9).jpeg'],
])

export const image = (name: string): string => {
  if (pngImages.has(name)) return `/images/${name}.png`
  const jpeg = jpegMap.get(name)
  if (jpeg) return `/images/${jpeg}`
  return `/images/${name}.jpg`
}
