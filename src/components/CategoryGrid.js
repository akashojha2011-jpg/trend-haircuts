import { categories } from '../data/categories.js';

export function renderCategoryGrid() {
  const creativeThemes = [
    { bg: 'linear-gradient(135deg, #FCEFF3 0%, #F6DCE4 100%)', textColor: '#242124', accent: '#E88AA4', icon: 'scissors' },
    { bg: 'linear-gradient(135deg, #F9F1EB 0%, #EEE7E1 100%)', textColor: '#242124', accent: '#D77692', icon: 'sparkles' },
    { bg: 'linear-gradient(135deg, #F5E8EE 0%, #ECD2DD 100%)', textColor: '#242124', accent: '#C86B85', icon: 'smile' },
    { bg: 'linear-gradient(135deg, #FFF0ED 0%, #FCDCD6 100%)', textColor: '#242124', accent: '#E87A5D', icon: 'palette' },
    { bg: 'linear-gradient(135deg, #F4F0F9 0%, #E8DFEE 100%)', textColor: '#242124', accent: '#9B72AA', icon: 'waves' },
    { bg: 'linear-gradient(135deg, #FAF3E6 0%, #F3E5CC 100%)', textColor: '#242124', accent: '#C8963E', icon: 'sun' },
    { bg: 'linear-gradient(135deg, #FAF0F4 0%, #F4D5E1 100%)', textColor: '#242124', accent: '#D85C8A', icon: 'heart' },
    { bg: 'linear-gradient(135deg, #F7F5F0 0%, #EBE6DC 100%)', textColor: '#242124', accent: '#8C7A6B', icon: 'star' }
  ];

  const cardsHtml = categories.map((cat, index) => {
    const theme = creativeThemes[index % creativeThemes.length];
    return `
      <a 
        href="/category/${cat.slug}" 
        class="creative-category-card" 
        data-route="category" 
        data-slug="${cat.slug}"
        style="background: ${theme.bg}; text-decoration: none;"
      >
        <div class="card-top-bar">
          <span class="card-icon-badge" style="color: ${theme.accent};">
            <i data-lucide="${theme.icon}" size="20"></i>
          </span>
        </div>

        <div class="card-creative-content">
          <h3 class="card-creative-title">${cat.name}</h3>
          <p class="card-creative-desc">${cat.description}</p>
          <div class="card-explore-link" style="color: ${theme.accent};">
            <span>Explore Collection</span>
            <i data-lucide="arrow-right" class="arrow-icon" size="16"></i>
          </div>
        </div>
      </a>
    `;
  }).join('');

  return `
    <section class="section-padding container">
      <div class="section-header">
        <div>
          <h2 class="section-title">Explore Hair & Beauty Ideas</h2>
          <p class="subheading">Curated visual boards, cut guides, and trend collections</p>
        </div>
      </div>
      <div class="category-cards-grid">
        ${cardsHtml}
      </div>
    </section>
  `;
}
