import './style.css';
import { renderHeader } from './components/Header.js';
import { renderHero } from './components/Hero.js';
import { renderCategoryGrid } from './components/CategoryGrid.js';
import { renderMasonryGrid } from './components/MasonryGrid.js';
import { renderHairLengthSection } from './components/HairLengthSection.js';
import { renderStyleChips } from './components/StyleChips.js';
import { renderEditorialFeature } from './components/EditorialFeature.js';
import { renderArticleView } from './components/ArticleView.js';
import { renderCategoryView } from './components/CategoryView.js';
import { renderSearchModal } from './components/SearchView.js';
import { renderAboutView } from './components/AboutView.js';
import { renderContactView } from './components/ContactView.js';
import { renderPrivacyView } from './components/PrivacyView.js';
import { renderTermsView } from './components/TermsView.js';
import { renderDisclaimerView } from './components/DisclaimerView.js';
import { renderSitemapView } from './components/SitemapView.js';
import { renderFooter } from './components/Footer.js';

import { articles } from './data/articles.js';

const DOMAIN = "https://www.trendhaircuts.com";

// Application State
class AppState {
  constructor() {
    this.activeStyle = 'All Styles';
    this.loadedArticlesCount = 6;
  }
}

const appState = new AppState();

// Helper to normalize paths
function getCleanPath() {
  let path = window.location.pathname;

  // If URL has legacy hash like /#/bubble-ponytail-ideas, redirect to clean path!
  if (window.location.hash && window.location.hash.startsWith('#/')) {
    let hashPath = window.location.hash.replace('#/', '/').replace('/article/', '/');
    window.history.replaceState({}, '', hashPath);
    path = window.location.pathname;
  }

  path = path.toLowerCase().trim();
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path || '/';
}

// Google SEO Meta Standards Manager
function updateSeoMetadata(title, description, canonicalUrl, imageUrl = '') {
  // 1. Google Meta Title (Strict 50-60 char optimization)
  document.title = title;

  // 2. Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // 3. Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // 4. OpenGraph Meta Tags
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.setAttribute('content', description);

  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrl);
  }
  ogUrl.setAttribute('content', canonicalUrl);

  if (imageUrl) {
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) {
      ogImg = document.createElement('meta');
      ogImg.setAttribute('property', 'og:image');
      document.head.appendChild(ogImg);
    }
    ogImg.setAttribute('content', imageUrl.startsWith('http') ? imageUrl : `${DOMAIN}${imageUrl}`);
  }
}

// Main Router & Renderer
function renderApp() {
  const appEl = document.getElementById('app');
  const path = getCleanPath();

  let route = 'home';
  let slug = '';

  if (path === '/' || path === '/home') {
    route = 'home';
  } else if (path.startsWith('/category/')) {
    route = 'category';
    slug = path.replace('/category/', '');
  } else if (path === '/about') {
    route = 'about';
  } else if (path === '/contact') {
    route = 'contact';
  } else if (path === '/privacy') {
    route = 'privacy';
  } else if (path === '/terms') {
    route = 'terms';
  } else if (path === '/disclaimer') {
    route = 'disclaimer';
  } else if (path === '/sitemap') {
    route = 'sitemap';
  } else {
    // DIRECT ARTICLE URL! (e.g. /bubble-ponytail-ideas or /stunning-sleek-low-ponytail-that-stand-out)
    route = 'article';
    slug = path.replace('/', '').replace('article/', '');
  }

  let bodyContent = '';

  if (route === 'home') {
    updateSeoMetadata(
      'Trend Haircuts — Modern Hairstyles & Cut Inspiration',
      'Discover thousands of hand-curated hairstyle ideas, trendy haircuts, curtain bangs, bobs, braids, updos and daily hair styling guides on Trend Haircuts.',
      `${DOMAIN}/`
    );

    const featuredArticle = articles.find(a => a.isFeatured) || articles[0];
    
    // Select 6 latest blogs, ensuring no two blogs are from the same category
    const sortedArticles = [...articles].sort((a, b) => new Date(b.date || '2026-07-01') - new Date(a.date || '2026-07-01'));
    const trendingArticles = [];
    const usedCategories = new Set();
    
    for (const art of sortedArticles) {
      if (!usedCategories.has(art.category)) {
        trendingArticles.push(art);
        usedCategories.add(art.category);
        if (trendingArticles.length === 6) break;
      }
    }
    if (trendingArticles.length < 6) {
      for (const art of sortedArticles) {
        if (!trendingArticles.includes(art)) {
          trendingArticles.push(art);
          if (trendingArticles.length === 6) break;
        }
      }
    }

    const visibleArticles = articles.slice(0, appState.loadedArticlesCount);

    bodyContent = `
      ${renderHero()}
      ${renderCategoryGrid()}
      
      <!-- Section 3: Trending Now (6 latest blogs from unique categories, no pagination) -->
      <section class="section-padding container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Trending Hair Ideas Right Now</h2>
            <p class="subheading">Viral haircuts and color trends currently inspiring stylists worldwide</p>
          </div>
        </div>
        ${renderMasonryGrid(trendingArticles, { gridId: 'trending-grid', itemsPerPage: 6, showPagination: false })}
      </section>

      ${renderHairLengthSection()}

      <!-- Section 6: Most Popular Ideas -->
      <section class="section-padding container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Most Loved Hair Guides</h2>
            <p class="subheading">Top read and shared hairstyle lookbooks</p>
          </div>
        </div>
        ${renderMasonryGrid(visibleArticles, { gridId: 'most-loved-grid', itemsPerPage: 6 })}
      </section>

      ${renderStyleChips(appState.activeStyle)}
      ${renderEditorialFeature(featuredArticle)}
    `;
  } else if (route === 'article') {
    const cleanSlug = slug.toLowerCase().trim();
    const targetArticle = articles.find(a => 
      a.slug === cleanSlug || 
      a.id === cleanSlug || 
      a.slug.replace(/[^a-z0-9]+/g, '-') === cleanSlug.replace(/[^a-z0-9]+/g, '-') ||
      a.id.replace(/[^a-z0-9]+/g, '-') === cleanSlug.replace(/[^a-z0-9]+/g, '-')
    );

    if (!targetArticle) {
      updateSeoMetadata(
        'Article Not Found | Trend Haircuts',
        'We could not find the requested hairstyle guide on Trend Haircuts.',
        `${DOMAIN}/${slug}`
      );

      bodyContent = `
        <div class="container section-padding text-center" style="padding: 6rem 1rem;">
          <h1 class="category-page-title" style="margin-bottom: 1rem;">Article Not Found</h1>
          <p class="subheading" style="margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
            We couldn't find the requested hairstyle guide (<code>/${slug}</code>). It may have been renamed or moved.
          </p>
          <a href="/" class="cta-btn" style="display: inline-block; padding: 0.85rem 2rem; background: #000; color: #fff; border-radius: 999px; text-decoration: none; font-weight: 600;">
            Return to Homepage
          </a>
        </div>
      `;
    } else {
      // Google Meta Title Standard for Articles: <Title> | Trend Haircuts
      const metaTitle = `${targetArticle.title} | Trend Haircuts`;
      const metaDesc = targetArticle.intro.length > 155 ? `${targetArticle.intro.substring(0, 152)}...` : targetArticle.intro;
      
      updateSeoMetadata(
        metaTitle,
        metaDesc,
        `${DOMAIN}/${targetArticle.slug}`,
        targetArticle.heroImage
      );

      bodyContent = renderArticleView(targetArticle);
    }
  } else if (route === 'category') {
    const categoryName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    updateSeoMetadata(
      `${categoryName} Hairstyles & Cut Ideas | Trend Haircuts`,
      `Explore top hand-curated ${categoryName} hairstyle lookbooks, photo galleries, and professional styling guides on Trend Haircuts.`,
      `${DOMAIN}/category/${slug}`
    );

    bodyContent = renderCategoryView(slug, null);
  } else if (route === 'about') {
    updateSeoMetadata(
      'About Us | Trend Haircuts Editorial Team',
      'Learn about Trend Haircuts, your daily destination for hand-curated haircut listicles, trend guides, and hair care masterclasses.',
      `${DOMAIN}/about`
    );
    bodyContent = renderAboutView();
  } else if (route === 'contact') {
    updateSeoMetadata(
      'Contact Us | Trend Haircuts Editorial Team',
      'Get in touch with the Trend Haircuts editorial and styling team.',
      `${DOMAIN}/contact`
    );
    bodyContent = renderContactView();
  } else if (route === 'privacy') {
    updateSeoMetadata(
      'Privacy Policy | Trend Haircuts',
      'Privacy policy and data protection terms for Trend Haircuts readers.',
      `${DOMAIN}/privacy`
    );
    bodyContent = renderPrivacyView();
  } else if (route === 'terms') {
    updateSeoMetadata(
      'Terms of Service | Trend Haircuts',
      'Terms of service and reader agreement for Trend Haircuts.',
      `${DOMAIN}/terms`
    );
    bodyContent = renderTermsView();
  } else if (route === 'disclaimer') {
    updateSeoMetadata(
      'Editorial Disclaimer | Trend Haircuts',
      'Editorial disclosure and hair styling safety disclaimers for Trend Haircuts.',
      `${DOMAIN}/disclaimer`
    );
    bodyContent = renderDisclaimerView();
  } else if (route === 'sitemap') {
    updateSeoMetadata(
      'HTML Sitemap | Trend Haircuts',
      'Complete directory and sitemap of all published haircut guides, category boards, and articles on Trend Haircuts.',
      `${DOMAIN}/sitemap`
    );
    bodyContent = renderSitemapView();
  }

  appEl.innerHTML = `
    ${renderHeader()}
    <main>${bodyContent}</main>
    ${renderFooter()}
    ${renderSearchModal()}
  `;

  // Refresh Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  attachEventListeners();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Global click interceptor for clean History API navigation
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;

  const href = link.getAttribute('href');
  if (!href) return;

  // Ignore external links, mailto, tel, xml sitemap
  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || href.endsWith('.xml')) {
    return;
  }

  // Handle in-page anchor smooth scrolling (e.g. #item-1, #investopedia-toc)
  if (href.startsWith('#')) {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  // Handle internal SPA navigation
  if (href.startsWith('/')) {
    e.preventDefault();
    if (window.location.pathname !== href) {
      window.history.pushState({}, '', href);
      renderApp();
    }
  }
});

// Event Listeners & Interactive Logic
function attachEventListeners() {
  // Sticky header shadow on scroll
  const header = document.getElementById('header');
  window.onscroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  // Investopedia-style TOC Toggle Handler
  const tocHeaderBar = document.getElementById('toc-header-bar');
  const tocContainer = document.getElementById('investopedia-toc');
  const tocToggleText = document.getElementById('toc-toggle-text');

  if (tocHeaderBar && tocContainer) {
    tocHeaderBar.addEventListener('click', () => {
      tocContainer.classList.toggle('collapsed');
      const isCollapsed = tocContainer.classList.contains('collapsed');
      if (tocToggleText) {
        tocToggleText.textContent = isCollapsed ? 'Show' : 'Hide';
      }
    });
  }

  // Handle TOC smooth scrolling directly on click
  document.querySelectorAll('.investopedia-toc-list a, .toc-list a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.replace('#', '');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Quick Search Tags
  document.addEventListener('click', (e) => {
    const tagBtn = e.target.closest('.chip-tag, .chip-btn');
    if (tagBtn && tagBtn.dataset.tag) {
      const tagText = tagBtn.dataset.tag;
      openSearchModal(tagText);
    }

    // Style Chips filter
    if (tagBtn && tagBtn.dataset.style) {
      const style = tagBtn.dataset.style;
      document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
      tagBtn.classList.add('active');
      appState.activeStyle = style;
    }
  });

  // Mobile Menu Drawer Handler
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMobileDrawerBtn = document.getElementById('close-mobile-drawer-btn');
  const mobileDrawerOverlay = document.getElementById('mobile-drawer-overlay');

  const openMobileDrawer = () => {
    mobileDrawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileDrawer = () => {
    mobileDrawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  mobileMenuBtn?.addEventListener('click', openMobileDrawer);
  closeMobileDrawerBtn?.addEventListener('click', closeMobileDrawer);
  mobileDrawerOverlay?.addEventListener('click', (e) => {
    if (e.target === mobileDrawerOverlay) closeMobileDrawer();
  });

  // Mobile Accordion Toggle
  document.querySelectorAll('.mobile-drawer-accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.accordion;
      const targetEl = document.getElementById(targetId);
      btn.classList.toggle('active');
      targetEl?.classList.toggle('active');
    });
  });

  // Close mobile drawer on link navigation
  document.querySelectorAll('#mobile-drawer-overlay a').forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });

  // Search Modal Trigger
  const searchBtn = document.getElementById('search-trigger-btn');
  const searchModal = document.getElementById('search-modal');
  const closeSearchBtn = document.getElementById('close-search-modal-btn');

  const openSearchModal = (query = '') => {
    searchModal?.classList.add('active');
    const input = document.getElementById('modal-search-input');
    if (input) {
      input.value = query;
      input.focus();
      filterSearchResults(query);
    }
  };

  searchBtn?.addEventListener('click', () => openSearchModal(''));
  closeSearchBtn?.addEventListener('click', () => searchModal?.classList.remove('active'));

  // Live Modal Search Filter
  const modalInput = document.getElementById('modal-search-input');
  modalInput?.addEventListener('input', (e) => {
    filterSearchResults(e.target.value);
  });

  function filterSearchResults(query) {
    const resultsContainer = document.getElementById('modal-search-results');
    if (!resultsContainer) return;
    
    const q = query.toLowerCase().trim();
    if (!q) {
      resultsContainer.innerHTML = renderMasonryGrid(articles);
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const filtered = articles.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.category.toLowerCase().includes(q) ||
      a.intro.toLowerCase().includes(q)
    );

    resultsContainer.innerHTML = renderMasonryGrid(filtered);
    if (window.lucide) window.lucide.createIcons();
  }

  // Hero Search Form
  const heroSearchForm = document.getElementById('hero-search-form');
  heroSearchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = document.getElementById('hero-search-input')?.value;
    openSearchModal(val || '');
  });

  // Load More Button
  const loadMoreBtn = document.getElementById('load-more-btn');
  loadMoreBtn?.addEventListener('click', () => {
    appState.loadedArticlesCount += 4;
    renderApp();
  });
}

// Expose global render function for pagination & interactive components
window.renderAppGlobal = renderApp;

// Listen to Browser Back / Forward & Custom Pagination Events
window.addEventListener('popstate', renderApp);
window.addEventListener('render-app', renderApp);

// Initial App Launch (runs immediately if DOM is already parsed)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}

// Bulk Content Copy & Select All Protection (Preserves Image Copying & Input Fields)
document.addEventListener('copy', (e) => {
  const selection = window.getSelection();
  const selectedText = selection ? selection.toString() : '';
  if (selectedText && selectedText.trim().length > 30) {
    e.preventDefault();
    if (e.clipboardData) {
      e.clipboardData.setData('text/plain', '');
    }
  }
});

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === 'a' || e.key === 'A')) {
    const target = e.target;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
      return;
    }
    e.preventDefault();
  }
});
