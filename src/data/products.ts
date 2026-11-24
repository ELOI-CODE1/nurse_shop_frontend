export interface Product {
  id: string
  name: string
  category: string
  price: number
  detail: string
  bundle?: boolean
}

type ProductRow = [string, string, string, number, string, boolean?]

const productData: ProductRow[] = [
  // Existing products (PNG images)
  ['lavender-scrub-set', 'Lavender V-Neck Scrub Set', 'Workwear', 15, 'Lavender V-Neck top and matching jogger trousers, shown with a matching head cover.', false],
  ['light-blue-scrub-set', 'Light Blue Pocket Scrub Set', 'Workwear', 15, 'Light blue scrub top with pockets and matching jogger trousers.', false],
  ['black-scrub-set', 'Black Classic Scrub Set', 'Workwear', 15, 'Black scrub top and matching jogger trousers.', false],
  ['gray-scrub-set-with-tumbler', 'Gray Scrub Set with Nurse Tumbler', 'Workwear', 30, 'Gray scrub set shown with a branded nurse tumbler.', false],

  // New products — $6 Nurse Fob Watches (Accessories)
  ['nurse-fob-watch-black', 'Nurse Fob Watch "Nurse in Progress"', 'Accessories', 6, 'Black clip-on nurse fob watch with "Nurse in progress" design.', false],
  ['nurse-fob-watch-silver', 'Nurse Fob Watch Silver', 'Accessories', 6, 'Silver metal clip-on nurse fob watch with quartz movement.', false],
  ['nurse-fob-watch-classic', 'Nurse Fob Watch Classic', 'Accessories', 6, 'Classic clip-on nurse fob watch for everyday shifts.', false],

  // New products — $10 Nurse Tote Bags (Accessories)
  ['nurse-tote-grey', 'Nurse Tote Medical Pattern Grey', 'Accessories', 10, 'Grey canvas tote bag with medical instrument pattern.', false],
  ['nurse-tote-pink', 'Nurse Tote Pink Medical', 'Accessories', 10, 'Pink tote bag with nurse and medical supply illustration.', false],
  ['nurse-tote-blue', 'Nurse Tote Blue Medical', 'Accessories', 10, 'Blue-themed nurse tote bag with medical pattern.', false],
  ['nurse-tote-red', 'Nurse Tote Red Medical', 'Accessories', 10, 'Red accent nurse tote bag with medical supplies design.', false],
  ['nurse-tote-white', 'Nurse Tote White Medical', 'Accessories', 10, 'White nurse tote bag with clean medical illustration.', false],

  // New products — $12.50 Scrub Jackets (Workwear)
  ['scrub-jacket-multi', 'Scrub Jacket Multi-Color', 'Workwear', 12.5, 'Scrub jacket shown in pink, purple, blue, green and navy colors.', false],
  ['scrub-jacket-purple', 'Scrub Jacket Purple', 'Workwear', 12.5, 'Purple snap-front nurse scrub jacket with pockets.', false],

  // New products — $15 Tumblers & Clogs (Accessories / Footwear)
  ['nurse-tumbler-green', 'Nurse Tumbler Green Nutrition Facts', 'Accessories', 15, 'Green insulated tumbler with "Nurse Nutrition Facts" design.', false],
  ['nurse-clogs-black', 'Nurse Clogs Medical Pattern Black', 'Footwear', 15, 'Black printed clinical clogs with medical pattern, two pairs per bundle.', true],
  ['nurse-clogs-colorful', 'Nurse Clogs Colorful Medical', 'Footwear', 15, 'Colorful printed clinical clogs with medical symbols.', true],
  ['nurse-clogs-blue', 'Nurse Clogs Blue Medical', 'Footwear', 15, 'Blue-themed printed clinical clogs for work shifts.', true],
  ['nurse-clogs-pink', 'Nurse Clogs Pink Medical', 'Footwear', 15, 'Pink printed clinical clogs with nurse-themed pattern.', true],
  ['nurse-tumbler-pink', 'Nurse Tumbler Pink', 'Accessories', 15, 'Pink insulated nurse tumbler with lid.', false],
  ['nurse-tumbler-blue', 'Nurse Tumbler Blue', 'Accessories', 15, 'Blue insulated nurse tumbler with lid.', false],
  ['nurse-clogs-white', 'Nurse Clogs White Medical', 'Footwear', 15, 'White printed clinical clogs for healthcare professionals.', true],
]

export const products: Product[] = productData.map(
  ([id, name, category, price, detail, bundle = false]) => ({ id, name, category, price, detail, bundle })
)

export const categories = ['All products', 'Workwear', 'Footwear', 'Accessories'] as const
