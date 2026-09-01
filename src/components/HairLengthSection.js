export function renderHairLengthSection() {
  const lengths = [
    {
      title: 'Short Haircuts',
      subtitle: 'BOBS, PIXIES & SHAGS',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
      slug: 'short-hairstyles'
    },
    {
      title: 'Medium Haircuts',
      subtitle: 'LOBS, CURTAIN BANGS & LAYERS',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
      slug: 'medium-length-hairstyles'
    },
    {
      title: 'Long Haircuts',
      subtitle: 'ROMANTIC WAVES & BUTTERFLY LAYERS',
      image: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80',
      slug: 'long-hairstyles'
    }
  ];

  const cardsHtml = lengths.map(len => `
    <a 
      href="/category/${len.slug}" 
      class="length-card" 
      data-route="category" 
      data-slug="${len.slug}"
      style="display: block; text-decoration: none;"
    >
      <img src="${len.image}" alt="${len.title}" loading="lazy" />
      <div class="length-card-overlay">
        <span class="length-card-subtitle">${len.subtitle}</span>
        <h3 class="length-card-title">${len.title}</h3>
        <div class="length-card-link">
          <span>Explore Lookbooks</span>
          <i data-lucide="arrow-right" size="16"></i>
        </div>
      </div>
    </a>
  `).join('');

  return `
    <section class="section-padding container">
      <div class="section-header">
        <div>
          <h2 class="section-title">Browse Hairstyles by Length</h2>
          <p class="subheading">Find cut inspiration tailored to your hair length</p>
        </div>
      </div>

      <div class="hair-length-grid">
        ${cardsHtml}
      </div>
    </section>
  `;
}
