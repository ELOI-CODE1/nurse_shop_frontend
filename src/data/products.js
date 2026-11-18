export const products = [
  ['scrubs', 'Classic Scrub Set', 'Workwear', 15, 'V-neck top and matching trousers'],
  ['clogs', 'Printed Clinical Clogs', 'Footwear', 25, 'Two pairs per bundle'],
  ['tote', 'Printed Nurse Tote', 'Accessories', 10, 'Everyday carry bag'],
  ['tumbler', 'Nurse Tumbler', 'Accessories', 15, 'Insulated cup with lid'],
  ['jacket', 'Snap-Front Nurse Jacket', 'Workwear', 12, 'Light layer for your shift'],
  ['watch', 'Clip-On Nurse Watch', 'Accessories', 6, 'Fob watch with clip'],
  ['coat', 'White Lab Coat', 'Workwear', 15, 'Long-sleeve clinical coat'],
  ['cap', 'Tie-Back Scrub Cap', 'Accessories', 5, 'Adjustable clinical cap'],
  ['shoes', 'Slip-On Nursing Shoes', 'Footwear', 15, 'Closed-toe work shoes'],
  ['headband', 'Nurse Headband', 'Accessories', 5, 'Printed stretch headband'],
  ['premium-tote', 'Pink Clinical Tote', 'Accessories', 15, 'Medical print shoulder bag'],
].map(([id, name, category, price, detail]) => ({ id, name, category, price, detail }))

export const categories = ['All products', 'Workwear', 'Footwear', 'Accessories']
