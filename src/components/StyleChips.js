import { styleChips } from '../data/categories.js';

export function renderStyleChips(activeStyle = 'All Styles') {
  const chipsHtml = styleChips.map(style => `
    <button 
      class="chip-btn ${style === activeStyle ? 'active' : ''}" 
      data-style="${style}"
    >
      ${style}
    </button>
  `).join('');

  return `
    <section class="section-padding container">
      <div class="section-header text-center" style="display:block; margin-bottom: 1.5rem;">
        <h2 class="section-title">Browse by Hairstyle & Occasion</h2>
        <p class="subheading">Filter hairstyles by specific cut, braid, or event type</p>
      </div>

      <div class="chips-flex">
        ${chipsHtml}
      </div>
    </section>
  `;
}
