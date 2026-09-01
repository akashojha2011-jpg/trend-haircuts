import { colorCategories } from '../data/categories.js';

export function renderHairColorCarousel() {
  const cardsHtml = colorCategories.map(col => `
    <div class="color-card" data-route="category" data-slug="hair-color" data-filter="${col.id}">
      <img src="${col.image}" alt="${col.name}" loading="lazy" />
      <div class="color-card-overlay">
        <h3 class="color-card-name">${col.name}</h3>
      </div>
    </div>
  `).join('');

  return `
    <section class="section-padding container">
      <div class="section-header">
        <div>
          <h2 class="section-title">Hair Color You'll Want to Screenshot</h2>
          <p class="subheading">Close-up dimensional shade guides and balayage formulas</p>
        </div>
        <a href="#/hair-color" class="section-link" data-route="category" data-slug="hair-color">
          View All Shades <i data-lucide="chevron-right"></i>
        </a>
      </div>

      <div class="carousel-wrap">
        ${cardsHtml}
      </div>
    </section>
  `;
}
