import { articles } from '../data/articles.js';
import { categories } from '../data/categories.js';

export function renderSitemapView() {
  const categoriesHtml = categories.map(cat => `
    <li>
      <a href="/category/${cat.slug}" data-route="category" data-slug="${cat.slug}">
        <strong>${cat.name}</strong>
      </a>
    </li>
  `).join('');

  const articlesHtml = articles.map(art => `
    <li>
      <a href="/${art.slug}" data-route="article" data-slug="${art.slug}">
        ${art.title}
      </a>
      <span style="font-size: 0.85rem; color: #888; margin-left: 6px;">(${art.category})</span>
    </li>
  `).join('');

  return `
    <div class="container section-padding" style="padding-top: 3rem; padding-bottom: 5rem;">
      <div style="max-width: 900px; margin: 0 auto;">
        <nav class="breadcrumb" aria-label="Breadcrumb" style="margin-bottom: 1.5rem;">
          <a href="/" data-route="home">Home</a> &gt; <span>Sitemap</span>
        </nav>

        <h1 class="category-page-title" style="margin-bottom: 1rem;">HTML Sitemap</h1>
        <p class="subheading" style="margin-bottom: 2.5rem;">
          Complete overview of all published hairstyle lookbooks, category boards, and guides on Trend Haircuts.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2.5rem;">
          <div>
            <h2 style="font-family: var(--font-serif); font-size: 1.4rem; font-weight: 700; margin-bottom: 1rem; border-bottom: 2px solid var(--accent-pink); padding-bottom: 0.4rem;">
              Hairstyle Categories
            </h2>
            <ul style="list-style: disc; padding-left: 1.25rem; line-height: 2;">
              ${categoriesHtml}
            </ul>

            <h2 style="font-family: var(--font-serif); font-size: 1.4rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; border-bottom: 2px solid var(--accent-pink); padding-bottom: 0.4rem;">
              Company & Legal
            </h2>
            <ul style="list-style: disc; padding-left: 1.25rem; line-height: 2;">
              <li><a href="/about" data-route="about">About Us</a></li>
              <li><a href="/contact" data-route="contact">Contact Editorial</a></li>
              <li><a href="/privacy" data-route="privacy">Privacy Policy</a></li>
              <li><a href="/terms" data-route="terms">Terms of Service</a></li>
              <li><a href="/disclaimer" data-route="disclaimer">Editorial Disclaimer</a></li>
              <li><a href="/sitemap.xml" target="_blank" rel="noopener">XML Sitemap (for Search Engines)</a></li>
            </ul>
          </div>

          <div>
            <h2 style="font-family: var(--font-serif); font-size: 1.4rem; font-weight: 700; margin-bottom: 1rem; border-bottom: 2px solid var(--accent-pink); padding-bottom: 0.4rem;">
              All Published Haircut Guides (${articles.length})
            </h2>
            <ul style="list-style: circle; padding-left: 1.25rem; line-height: 1.8; max-height: 700px; overflow-y: auto; padding-right: 0.5rem;">
              ${articlesHtml}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}
