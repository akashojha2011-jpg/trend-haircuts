import { renderMasonryGrid } from './MasonryGrid.js';
import { categories } from '../data/categories.js';
import { articles } from '../data/articles.js';

export function renderCategoryView(slug, subcategorySlug = null) {
  let cat = categories.find(c => c.slug === slug);
  
  if (!cat) {
    // Check if subcategory
    for (const mainCat of categories) {
      if (mainCat.subcategories) {
        const sub = mainCat.subcategories.find(s => s.slug === slug);
        if (sub) {
          cat = { name: sub.name, description: `Hand-curated hair listicles and inspiration for ${sub.name}.` };
          break;
        }
      }
    }
  }

  if (!cat) {
    cat = {
      name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      description: 'Explore hand-curated haircut listicles and styling inspiration.'
    };
  }

  // Filter articles strictly matching category slug or subcategory slug
  const filteredArticles = articles.filter(a => 
    a.categorySlug === slug || 
    a.category.toLowerCase() === cat.name.toLowerCase() ||
    (slug === 'all')
  );

  const gridHtml = filteredArticles.length > 0
    ? renderMasonryGrid(filteredArticles, { gridId: `category-grid-${slug}`, itemsPerPage: 6 })
    : `
      <div class="text-center" style="padding: 4rem 1rem;">
        <h3 class="heading-md" style="margin-bottom: 0.75rem;">No Articles Published Yet</h3>
        <p class="subheading" style="margin-bottom: 2rem;">We haven't published blog posts under <strong>${cat.name}</strong> yet. Check back soon!</p>
        <a href="/" class="btn-primary" data-route="home">Explore Published Hair Guides</a>
      </div>
    `;

  return `
    <div class="category-page">
      <header class="category-header">
        <div class="container">
          <!-- BREADCRUMB NAVIGATION -->
          <nav class="breadcrumb-clean" aria-label="Breadcrumb" style="justify-content: center; margin-bottom: 1rem;">
            <a href="/" data-route="home">Home</a>
            <span class="bc-sep">/</span>
            <span class="bc-active">${cat.name}</span>
          </nav>

          <h1 class="category-page-title">${cat.name}</h1>
          <p class="category-page-desc">${cat.description}</p>
        </div>
      </header>

      <div class="container section-padding">
        ${gridHtml}
      </div>
    </div>
  `;
}
