import { menuStructure } from '../data/categories.js';

export function renderHeader() {
  const navItemsHtml = menuStructure.map(menu => {
    if (menu.isDirectLink) {
      return `
        <li class="nav-item">
          <a href="/category/${menu.slug}" class="nav-link" data-route="${menu.slug}">
            <span>${menu.mainTitle}</span>
          </a>
        </li>
      `;
    }

    const subHtml = menu.subcategories ? menu.subcategories.map(sub => `
      <li>
        <a 
          href="/category/${sub.slug}" 
          class="dropdown-item" 
          data-route="category" 
          data-slug="${sub.slug}"
        >
          ${sub.name}
        </a>
      </li>
    `).join('') : '';

    return `
      <li class="nav-item">
        <a class="nav-link">
          <span>${menu.mainTitle}</span>
          <i data-lucide="chevron-down" class="chevron-icon" size="14"></i>
        </a>
        <ul class="dropdown-menu">
          ${subHtml}
        </ul>
      </li>
    `;
  }).join('');

  return `
    <header class="site-header" id="header">
      <div class="container header-inner">
        <!-- Logo -->
        <a href="/" class="logo" data-route="home">
          <span class="logo-icon-box">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 3L11.5 12L6 21" stroke="#e0a96d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18 3L12.5 12L18 21" stroke="#111111" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="12" r="2.2" fill="#e0a96d"/>
            </svg>
          </span>
          <span class="logo-text">Trend <span class="logo-sub">Haircuts</span></span>
        </a>

        <!-- Smart Desktop Navigation with Dropdowns + About -->
        <nav>
          <ul class="desktop-nav">
            ${navItemsHtml}
          </ul>
        </nav>

        <!-- Right Action Icons: Search Icon Only -->
        <div class="header-actions">
          <button class="icon-btn" id="search-trigger-btn" title="Search hairstyles" aria-label="Search">
            <i data-lucide="search"></i>
          </button>

          <button class="icon-btn mobile-toggle" id="mobile-menu-btn" aria-label="Menu">
            <i data-lucide="menu"></i>
          </button>
        </div>
      </div>
    </header>
  `;
}
