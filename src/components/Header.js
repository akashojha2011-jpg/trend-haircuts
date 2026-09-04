import { menuStructure } from '../data/categories.js';

export function renderHeader() {
  const navItemsHtml = menuStructure.map(menu => {
    if (menu.isDirectLink) {
      return `
        <li class="nav-item">
          <a href="/${menu.slug}" class="nav-link" data-route="${menu.slug}">
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

  const mobileNavItemsHtml = menuStructure.map((menu, idx) => {
    if (menu.isDirectLink) {
      return `
        <li class="mobile-drawer-nav-item">
          <a href="/${menu.slug}" class="mobile-drawer-link" data-route="${menu.slug}">
            ${menu.mainTitle}
          </a>
        </li>
      `;
    }

    const subHtml = menu.subcategories ? menu.subcategories.map(sub => `
      <li>
        <a 
          href="/category/${sub.slug}" 
          class="mobile-drawer-sublink" 
          data-route="category" 
          data-slug="${sub.slug}"
        >
          ${sub.name}
        </a>
      </li>
    `).join('') : '';

    return `
      <li class="mobile-drawer-nav-item">
        <button class="mobile-drawer-accordion-btn" data-accordion="mobile-acc-${idx}">
          <span>${menu.mainTitle}</span>
          <i data-lucide="chevron-down" class="chevron-icon" size="16"></i>
        </button>
        <ul class="mobile-drawer-accordion-content" id="mobile-acc-${idx}">
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
          <img src="/images/logo.png" alt="Trend Haircuts" class="site-logo-img" />
        </a>

        <!-- Smart Desktop Navigation with Dropdowns -->
        <nav>
          <ul class="desktop-nav">
            ${navItemsHtml}
          </ul>
        </nav>

        <!-- Right Action Icons: Search & Burger Toggle -->
        <div class="header-actions">
          <button class="icon-btn" id="search-trigger-btn" title="Search hairstyles" aria-label="Search">
            <i data-lucide="search"></i>
          </button>

          <button class="icon-btn mobile-toggle" id="mobile-menu-btn" title="Open navigation menu" aria-label="Open navigation menu">
            <i data-lucide="menu"></i>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Drawer Overlay (Outside Header) -->
    <div class="mobile-drawer-overlay" id="mobile-drawer-overlay">
      <div class="mobile-drawer-content">
        <div class="mobile-drawer-header">
          <a href="/" class="logo" data-route="home">
            <img src="/images/logo.png" alt="Trend Haircuts" class="site-logo-img" />
          </a>
          <button class="icon-btn" id="close-mobile-drawer-btn" aria-label="Close menu">
            <i data-lucide="x"></i>
          </button>
        </div>

        <div class="mobile-drawer-body">
          <ul class="mobile-drawer-list">
            ${mobileNavItemsHtml}
          </ul>

          <div class="mobile-drawer-footer">
            <a href="/about" data-route="about">About Us</a>
            <a href="/contact" data-route="contact">Contact Editorial</a>
            <a href="/sitemap" data-route="sitemap">Sitemap</a>
            <a href="/privacy" data-route="privacy">Privacy Policy</a>
            <a href="/terms" data-route="terms">Terms of Service</a>
            <a href="/disclaimer" data-route="disclaimer">Editorial Disclaimer</a>
          </div>
        </div>
      </div>
    </div>
  `;
}
