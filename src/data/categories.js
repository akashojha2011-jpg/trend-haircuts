// Main Navigation Structure & Comprehensive Categories (Hair Focused)
export const menuStructure = [
  {
    mainTitle: 'Haircuts & Lengths',
    slug: 'haircuts-lengths',
    subcategories: [
      { name: 'Short Hairstyles & Haircuts', slug: 'short-hairstyles' },
      { name: 'Bob & Lob Haircuts', slug: 'bob-lob-haircuts' },
      { name: 'Pixie Haircuts', slug: 'pixie-haircuts' },
      { name: 'Medium-Length Hairstyles', slug: 'medium-length-hairstyles' },
      { name: 'Long Hairstyles & Haircuts', slug: 'long-hairstyles' },
      { name: 'Layered & Textured Haircuts', slug: 'layered-textured-haircuts' },
      { name: 'Shag & Shaggy Haircuts', slug: 'shag-shaggy-haircuts' },
      { name: 'Wolf Cuts', slug: 'wolf-cuts' }
    ]
  },
  {
    mainTitle: 'Hairstyles & Trends',
    slug: 'hairstyles-trends',
    subcategories: [
      { name: 'Bangs & Fringe Hairstyles', slug: 'bangs-fringe' },
      { name: 'Braided Hairstyles', slug: 'braided-hairstyles' },
      { name: 'Easy & Everyday Hairstyles', slug: 'easy-everyday-hairstyles' },
      { name: 'Special Occasion Hairstyles', slug: 'special-occasion-hairstyles' },
      { name: 'Trending & Modern Hairstyles', slug: 'trending-modern-hairstyles' },
      { name: 'General Haircut & Hairstyle Ideas', slug: 'general-hair-ideas' }
    ]
  },
  {
    mainTitle: 'Hair Types & Age',
    slug: 'hair-types-age',
    subcategories: [
      { name: 'Curly Hairstyles & Haircuts', slug: 'curly-hairstyles' },
      { name: 'Wavy Hairstyles & Haircuts', slug: 'wavy-hairstyles' },
      { name: 'Fine & Thin Hair Styles', slug: 'fine-thin-hair' },
      { name: 'Face Shape & Glasses Hairstyles', slug: 'face-shape-glasses' },
      { name: 'Hairstyles for Women Over 40', slug: 'women-over-40' },
      { name: 'Hairstyles for Women Over 50', slug: 'women-over-50' },
      { name: 'Hairstyles for Older Women', slug: 'older-women' }
    ]
  },
  {
    mainTitle: 'Hair Color',
    slug: 'hair-color',
    subcategories: [
      { name: 'Balayage Hair Color', slug: 'balayage-hair-color' },
      { name: 'Black Hair Color', slug: 'black-hair-color' },
      { name: 'Hair Color Ideas', slug: 'hair-color-ideas' }
    ]
  },
  {
    mainTitle: 'About',
    slug: 'about',
    isDirectLink: true
  }
];

// Featured homepage hair categories
export const categories = [
  {
    id: 'short-hairstyles',
    name: 'Short Hairstyles & Cuts',
    slug: 'short-hairstyles',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
    count: '240+ Ideas',
    description: 'Modern bobs, pixie cuts, wolf cuts, and textured short hair inspiration.'
  },
  {
    id: 'bob-lob-haircuts',
    name: 'Bob & Lob Cuts',
    slug: 'bob-lob-haircuts',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    count: '180+ Ideas',
    description: 'Italian bobs, French lobs, blunt chin-length cuts, and wavy bobs.'
  },
  {
    id: 'bangs-fringe',
    name: 'Bangs & Fringe',
    slug: 'bangs-fringe',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    count: '190+ Ideas',
    description: 'Curtain bangs, wispy fringe, blunt bang cuts, and face-framing layers.'
  },
  {
    id: 'hair-color-ideas',
    name: 'Hair Color Ideas',
    slug: 'hair-color-ideas',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    count: '310+ Ideas',
    description: 'Balayage, honey blonde, espresso brunette, copper red, and subtle highlights.'
  },
  {
    id: 'long-hairstyles',
    name: 'Long Hairstyles',
    slug: 'long-hairstyles',
    image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80',
    count: '260+ Ideas',
    description: 'Flowing romantic waves, long layered cuts, butterfly layers, and volume.'
  },
  {
    id: 'curly-hairstyles',
    name: 'Curly & Wavy Hair',
    slug: 'curly-hairstyles',
    image: 'https://images.unsplash.com/photo-1584297091622-af89822a1065?auto=format&fit=crop&w=800&q=80',
    count: '145+ Ideas',
    description: 'Voluminous curl cuts, coily updo inspiration, and natural texture styles.'
  },
  {
    id: 'braided-hairstyles',
    name: 'Braids & Updos',
    slug: 'braided-hairstyles',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    count: '165+ Ideas',
    description: 'Boho crown braids, Dutch braids, knotless box braids, and elegant updos.'
  },
  {
    id: 'women-over-40',
    name: 'Hairstyles Over 40 & 50',
    slug: 'women-over-40',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    count: '130+ Ideas',
    description: 'Youthful, elegant, and low-maintenance haircuts for mature women.'
  }
];

export const colorCategories = [
  { id: 'blonde', name: 'Dimensional Blonde', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=600&q=80' },
  { id: 'brunette', name: 'Rich Brunette', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
  { id: 'red', name: 'Copper & Warm Red', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80' },
  { id: 'balayage', name: 'Soft Balayage', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80' },
  { id: 'highlights', name: 'Face-Framing Money Pieces', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80' },
  { id: 'black', name: 'Glossy Espresso', image: 'https://images.unsplash.com/photo-1584297091622-af89822a1065?auto=format&fit=crop&w=600&q=80' }
];

export const styleChips = [
  'All Styles',
  'Bob & Lob Cuts',
  'Curtain Bangs',
  'Braided Hairstyles',
  'Easy & Everyday',
  'Wolf Cuts & Shags',
  'Curly & Wavy',
  'Women Over 40/50',
  'Special Occasion',
  'Hair Color Ideas'
];
