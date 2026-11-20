const pngImages = new Set([
  'lavender-scrub-set',
  'light-blue-scrub-set',
  'black-scrub-set',
  'gray-scrub-set-with-tumbler',
])

export const image = (name) => `/images/${name}.${pngImages.has(name) ? 'png' : 'jpg'}`
