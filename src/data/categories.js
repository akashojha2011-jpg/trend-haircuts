// Main Navigation Structure & Comprehensive Categories (Active Published Only)
export const menuStructure = [
  {
    mainTitle: 'Haircuts & Lengths',
    slug: 'haircuts-lengths',
    subcategories: [
      { name: 'Bob & Lob Haircuts', slug: 'bob-lob-haircuts' },
      { name: 'Pixie Haircuts', slug: 'pixie-haircuts' },
      { name: 'Layered Bob Haircuts', slug: 'layered-bob-haircuts' },
      { name: 'Layered Haircut Ideas', slug: 'layered-haircuts' }
    ]
  },
  {
    mainTitle: 'Hairstyles & Trends',
    slug: 'hairstyles-trends',
    subcategories: [
      { name: 'Updo Hairstyles', slug: 'updo-hairstyles' },
      { name: 'Bun Hairstyles', slug: 'bun-hairstyles' },
      { name: 'Bangs & Fringe Hairstyles', slug: 'bangs-fringe' },
      { name: 'Braided Hairstyles', slug: 'braided-hairstyles' },
      { name: 'Easy & Everyday Hairstyles', slug: 'easy-everyday-hairstyles' }
    ]
  },
  {
    mainTitle: 'Hair Types & Age',
    slug: 'hair-types-age',
    subcategories: [
      { name: 'Curly Hairstyles & Haircuts', slug: 'curly-hairstyles' },
      { name: 'Layered Curly Hairstyles', slug: 'layered-curly-hairstyles' },
      { name: 'Fine & Thin Hair Styles', slug: 'fine-thin-hair' },
      { name: 'Face Shape & Glasses Hairstyles', slug: 'face-shape-glasses' },
      { name: 'Hairstyles for Older Women', slug: 'older-women' },
      { name: 'Hair Color for Older Women', slug: 'hair-color-older-women' }
    ]
  },
  {
    mainTitle: 'Hair Color',
    slug: 'hair-color',
    subcategories: [
      { name: 'Hair Color Ideas', slug: 'hair-color-ideas' },
      { name: 'Balayage Hair Color', slug: 'balayage-hair-color' },
      { name: 'Blonde Balayage Hair', slug: 'blonde-balayage-hair' },
      { name: 'Black Hair Color', slug: 'black-hair-color' }
    ]
  },
  {
    mainTitle: 'About',
    slug: 'about',
    isDirectLink: true
  }
];

// Featured homepage hair categories (Active Published Only)
export const categories = [
  {
    id: 'updo-hairstyles',
    name: 'Updo Hairstyles',
    slug: 'updo-hairstyles',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    count: '12 Ideas',
    description: 'French twists, chignons, braided updos, and formal hair styling inspiration.'
  },
  {
    id: 'bun-hairstyles',
    name: 'Bun Hairstyles',
    slug: 'bun-hairstyles',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    count: '11 Ideas',
    description: 'Messy buns, sleek office buns, low hair buns, and everyday bun hairstyles.'
  },
  {
    id: 'bob-lob-haircuts',
    name: 'Bob & Lob Cuts',
    slug: 'bob-lob-haircuts',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    count: '10 Ideas',
    description: 'Italian bobs, French lobs, blunt chin-length cuts, and wavy bobs.'
  },
  {
    id: 'bangs-fringe',
    name: 'Bangs & Fringe',
    slug: 'bangs-fringe',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    count: '10 Ideas',
    description: 'Curtain bangs, wispy fringe, blunt bang cuts, and face-framing layers.'
  },
  {
    id: 'hair-color-ideas',
    name: 'Hair Color Ideas',
    slug: 'hair-color-ideas',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    count: '93 Ideas',
    description: 'Balayage, honey blonde, espresso brunette, copper red, and subtle highlights.'
  },
  {
    id: 'curly-hairstyles',
    name: 'Curly & Wavy Hair',
    slug: 'curly-hairstyles',
    image: 'https://images.unsplash.com/photo-1584297091622-af89822a1065?auto=format&fit=crop&w=800&q=80',
    count: '21 Ideas',
    description: 'Voluminous curl cuts, coily updo inspiration, and natural texture styles.'
  },
  {
    id: 'braided-hairstyles',
    name: 'Braids & Updos',
    slug: 'braided-hairstyles',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    count: '10 Ideas',
    description: 'Boho crown braids, Dutch braids, knotless box braids, and elegant updos.'
  },
  {
    id: 'layered-haircuts',
    name: 'Layered Haircuts',
    slug: 'layered-haircuts',
    image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80',
    count: '15 Ideas',
    description: 'Face-framing layers, long layers, textured cuts, and bouncy blowouts.'
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
  'Updo Hairstyles',
  'Bun Hairstyles',
  'Bob & Lob Cuts',
  'Curtain Bangs',
  'Braided Hairstyles',
  'Easy & Everyday',
  'Curly & Wavy',
  'Hair Color Ideas',
  'Layered Haircuts'
];
