export function renderEditorialFeature(article) {
  if (!article) return '';

  return `
    <section class="section-padding container">
      <div class="section-header text-center" style="display:block; margin-bottom: 1.75rem;">
        <h2 class="section-title">Editor's Spotlight</h2>
        <p class="subheading">Our featured haircut masterclass of the week</p>
      </div>

      <div class="editorial-card">
        <div class="editorial-img-wrap">
          <img src="${article.heroImage}" alt="${article.title}" loading="lazy" />
        </div>

        <div class="editorial-content">
          <span class="editorial-badge">Featured Masterclass</span>
          <h2 class="editorial-title">${article.title}</h2>
          <p class="editorial-desc">
            ${article.intro.substring(0, 180)}...
          </p>
          <a href="/${article.slug}" class="btn-primary" data-route="article" data-slug="${article.slug}">
            Read Full Lookbook <i data-lucide="arrow-right" size="16"></i>
          </a>
        </div>
      </div>
    </section>
  `;
}
