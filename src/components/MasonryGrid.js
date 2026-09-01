// Store pagination states per grid container instance
const gridPageStates = {};

export function renderMasonryGrid(articlesList = [], options = {}) {
  if (!articlesList || articlesList.length === 0) {
    return `<p class="text-muted text-center" style="grid-column: 1/-1; padding: 2rem;">No hair articles found.</p>`;
  }

  const gridId = options.gridId || 'main-article-grid';
  const itemsPerPage = options.itemsPerPage || 6; // Default 6 (2 rows of 3 articles each)
  
  if (!(gridId in gridPageStates)) {
    gridPageStates[gridId] = 1;
  }
  
  let currentPage = gridPageStates[gridId];
  const totalPages = Math.ceil(articlesList.length / itemsPerPage);
  
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;
  gridPageStates[gridId] = currentPage;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = articlesList.slice(startIndex, startIndex + itemsPerPage);

  const cardsHtml = paginatedArticles.map(art => {
    return `
      <a 
        href="/${art.slug}" 
        class="article-card" 
        data-route="article" 
        data-slug="${art.slug}"
        style="display: block; text-decoration: none;"
      >
        <div class="article-image-wrap">
          <img src="${art.heroImage}" alt="${art.title}" loading="lazy" />
        </div>

        <div class="article-card-body">
          <span class="blog-category-badge">${art.category}</span>
          <h3 class="article-card-title">${art.title}</h3>
        </div>
      </a>
    `;
  }).join('');

  // Pagination HTML with Arrow Controls
  let paginationHtml = '';
  if (totalPages > 1) {
    let pageNumbersHtml = '';
    for (let i = 1; i <= totalPages; i++) {
      const activeClass = i === currentPage ? 'active' : '';
      pageNumbersHtml += `
        <button 
          class="pagination-btn pagination-num ${activeClass}" 
          data-grid-id="${gridId}" 
          data-target-page="${i}"
        >
          ${i}
        </button>
      `;
    }

    const prevDisabled = currentPage === 1 ? 'disabled' : '';
    const nextDisabled = currentPage === totalPages ? 'disabled' : '';

    paginationHtml = `
      <div class="pagination-container" id="pagination-${gridId}">
        <button 
          class="pagination-btn pagination-prev" 
          data-grid-id="${gridId}" 
          data-target-page="${currentPage - 1}"
          ${prevDisabled}
        >
          <i data-lucide="chevron-left" size="18"></i>
          <span>Previous</span>
        </button>
        
        ${pageNumbersHtml}

        <button 
          class="pagination-btn pagination-next" 
          data-grid-id="${gridId}" 
          data-target-page="${currentPage + 1}"
          ${nextDisabled}
        >
          <span>Next</span>
          <i data-lucide="chevron-right" size="18"></i>
        </button>
      </div>
    `;
  }

  return `
    <div id="${gridId}-wrapper">
      <div class="masonry-grid" id="${gridId}">
        ${cardsHtml}
      </div>
      ${paginationHtml}
    </div>
  `;
}

// Global click event listener for Pagination Arrow buttons
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.pagination-btn');
  if (!btn || btn.disabled) return;

  const gridId = btn.getAttribute('data-grid-id');
  const targetPage = parseInt(btn.getAttribute('data-target-page'), 10);

  if (gridId && !isNaN(targetPage)) {
    gridPageStates[gridId] = targetPage;
    
    // Re-render app to update pagination & grid view
    window.dispatchEvent(new Event('hashchange'));
    
    // Smooth scroll to top of grid wrapper
    const wrapper = document.getElementById(`${gridId}-wrapper`);
    if (wrapper) {
      wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});
