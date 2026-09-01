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
import { renderFooter } from './components/Footer.js';

import { articles } from './data/articles.js';

// Application State
class AppState {
  constructor() {
    this.activeStyle = 'All Styles';
    this.loadedArticlesCount = 6;
  }
}

const appState = new AppState();

// Main Router & Renderer
function renderApp() {
  const appEl = document.getElementById('app');
  let rawHash = window.location.hash.replace('#/', '').replace('#', '');

  // Handle in-page anchor smooth scrolling without re-rendering app
  if (rawHash.startsWith('item-') || rawHash.startsWith('section-')) {
    const targetEl = document.getElementById(rawHash);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  let route = 'home';
  let slug = '';

  if (rawHash.startsWith('article/')) {
    route = 'article';
    slug = rawHash.replace('article/', '');
  } else if (rawHash.startsWith('category/')) {
    route = 'category';
    slug = rawHash.replace('category/', '');
  } else if (rawHash === 'home' || !rawHash) {
    // DEFAULT ROUTE IS HOMEPAGE
    route = 'home';
  } else if (rawHash === 'about') {
    route = 'about';
  } else if (rawHash === 'contact') {
    route = 'contact';
  } else if (rawHash === 'privacy') {
    route = 'privacy';
  } else if (rawHash === 'terms') {
    route = 'terms';
  } else if (rawHash === 'disclaimer') {
    route = 'disclaimer';
  }

  let bodyContent = '';

  if (route === 'home') {
    const featuredArticle = articles.find(a => a.isFeatured) || articles[0];
    const trendingArticles = articles.filter(a => a.isTrending);
    const visibleArticles = articles.slice(0, appState.loadedArticlesCount);

    bodyContent = `
      ${renderHero()}
      ${renderCategoryGrid()}
      
      <!-- Section 3: Trending Now -->
      <section class="section-padding container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Trending Hair Ideas Right Now</h2>
            <p class="subheading">Viral haircuts and color trends currently inspiring stylists worldwide</p>
          </div>
        </div>
        ${renderMasonryGrid(trendingArticles)}
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
        ${renderMasonryGrid(visibleArticles)}
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
      bodyContent = `
        <div class="container section-padding text-center" style="padding: 6rem 1rem;">
          <h1 class="category-page-title" style="margin-bottom: 1rem;">Article Not Found</h1>
          <p class="subheading" style="margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
            We couldn't find the requested hairstyle guide (<code>/article/${slug}</code>). It may have been renamed or moved.
          </p>
          <a href="#/home" class="cta-btn" style="display: inline-block; padding: 0.85rem 2rem; background: #000; color: #fff; border-radius: 999px; text-decoration: none; font-weight: 600;">
            Return to Homepage
          </a>
        </div>
      `;
    } else {
      bodyContent = renderArticleView(targetArticle);
    }
  } else if (route === 'category') {
    bodyContent = renderCategoryView(slug, null);
  } else if (route === 'about') {
    bodyContent = renderAboutView();
  } else if (route === 'contact') {
    bodyContent = renderContactView();
  } else if (route === 'privacy') {
    bodyContent = renderPrivacyView();
  } else if (route === 'terms') {
    bodyContent = renderTermsView();
  } else if (route === 'disclaimer') {
    bodyContent = renderDisclaimerView();
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

// Listen to Hash Changes
window.addEventListener('hashchange', renderApp);

// Initial App Launch
document.addEventListener('DOMContentLoaded', renderApp);
