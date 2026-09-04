import { renderMasonryGrid } from './MasonryGrid.js';
import { articles } from '../data/articles.js';

export function renderArticleView(article) {
  if (!article) {
    return `
      <div class="container text-center section-padding">
        <h1 class="heading-lg">Article Not Found</h1>
        <p class="subheading">Sorry, the requested hair guide could not be located.</p>
        <br/>
        <a href="#" class="btn-primary" data-route="home">Return to Inspiration Homepage</a>
      </div>
    `;
  }

  // Generate dynamic extra sections HTML
  const extraSectionsHtml = article.extraSections ? article.extraSections.map(sec => {
    if (sec.stats) {
      const statsGrid = sec.stats.map(st => `
        <div class="stat-card-box">
          <strong class="stat-card-val">${st.val}</strong>
          <span class="stat-card-label">${st.label}</span>
        </div>
      `).join('');

      return `
        <div id="${sec.id}" class="editorial-feature-box">
          <h3 class="font-serif editorial-feature-title">${sec.title}</h3>
          <p class="editorial-feature-desc">${sec.content}</p>
          <div class="stats-grid-wrap">
            ${statsGrid}
          </div>
        </div>
      `;
    } else if (sec.steps) {
      const stepsList = sec.steps.map(st => `<li style="margin-bottom: 0.75rem;">${st}</li>`).join('');

      return `
        <div id="${sec.id}" style="background: white; border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 2.5rem; margin: 4rem 0; box-shadow: var(--shadow-sm); scroll-margin-top: 100px;">
          <span class="blog-category-badge">Editorial Masterclass</span>
          <h3 class="font-serif" style="font-size: 1.8rem; margin-bottom: 1.25rem;">${sec.title}</h3>
          <ol style="padding-left: 1.25rem; font-size: 1.05rem; color: var(--text-secondary); line-height: 1.8;">
            ${stepsList}
          </ol>
        </div>
      `;
    }
    return '';
  }).join('') : '';

  // Generate dynamic FAQs HTML
  const faqsHtml = article.faqs ? `
    <div id="section-faq" style="margin: 4rem 0; scroll-margin-top: 100px;">
      <h3 class="font-serif" style="font-size: 1.85rem; margin-bottom: 1.5rem; text-align: center;">Frequently Asked Questions</h3>
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${article.faqs.map(faq => `
          <div style="background: var(--bg-secondary); padding: 1.5rem 1.75rem; border-radius: var(--radius-md); border-left: 3px solid var(--accent-pink);">
            <h4 style="font-weight: 700; font-size: 1.05rem; margin-bottom: 0.4rem; color: var(--text-primary);">${faq.q}</h4>
            <p style="font-size: 0.98rem; color: var(--text-secondary); margin: 0; line-height: 1.65;">${faq.a}</p>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  // Investopedia-style TOC items HTML (PRESERVE ITEM HEADING NUMBERS IN TOC)
  const mainTocItemsHtml = article.items.map((item, idx) => {
    const itemNum = item.number || (idx + 1);
    const rawTitle = item.title || '';
    const titleWithoutNum = rawTitle.replace(/^\d+\.\s*/, '');
    return `
      <li class="investopedia-toc-item">
        <a href="#item-${itemNum}">${itemNum}. ${titleWithoutNum}</a>
      </li>
    `;
  }).join('');

  const extraTocItemsTopHtml = article.extraSections ? article.extraSections.map(sec => `
    <li class="investopedia-toc-item special-toc-item">
      <a href="#${sec.id}">${sec.title}</a>
    </li>
  `).join('') : '';

  const faqTocItemHtml = article.faqs ? `
    <li class="investopedia-toc-item special-toc-item">
      <a href="#section-faq">Frequently Asked Questions</a>
    </li>
  ` : '';

  // Listicle Items HTML
  const itemsHtml = article.items.map((item, idx) => {
    const itemNum = item.number || (idx + 1);
    const rawTitle = item.title || '';
    const titleWithoutNum = rawTitle.replace(/^\d+\.\s*/, '');

    const descHtml = item.paragraphs && Array.isArray(item.paragraphs)
      ? item.paragraphs.map(p => `<p class="listicle-desc">${p}</p>`).join('')
      : `<p class="listicle-desc">${item.description}</p>`;

    return `
      <div class="listicle-item" id="item-${itemNum}" style="scroll-margin-top: 100px;">
        <h2 class="listicle-item-title" id="heading-${itemNum}">${itemNum}. ${titleWithoutNum}</h2>
        
        <div class="listicle-item-img">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
        </div>

        ${item.whyWeLoveIt ? `
          <div class="why-love-tag">
            <i data-lucide="sparkles" size="14"></i>
            <span>Why We Love It: ${item.whyWeLoveIt}</span>
          </div>
        ` : ''}

        ${descHtml}

        ${item.stylingTip ? `
          <div class="styling-tip-box">
            <div class="styling-tip-header">
              <i data-lucide="lightbulb" size="16"></i>
              <span>Pro Styling Tip</span>
            </div>
            <p class="styling-tip-text">${item.stylingTip}</p>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  // Related Articles
  const relatedArticles = articles.filter(a => a.id !== article.id).slice(0, 4);
  const relatedGridHtml = renderMasonryGrid(relatedArticles);

  return `
    <article class="article-page">
      <!-- SUB-HEADER BREADCRUMB STRIP (CLEAN MAGAZINE STYLE) -->
      <div class="breadcrumb-strip">
        <div class="container">
          <nav class="breadcrumb-clean" aria-label="Breadcrumb">
            <a href="/" data-route="home">Home</a>
            <span class="bc-sep">/</span>
            <a href="/category/${article.categorySlug}" data-route="category" data-slug="${article.categorySlug}">${article.category}</a>
            <span class="bc-sep">/</span>
            <span class="bc-active">${article.title}</span>
          </nav>
        </div>
      </div>

      <!-- Article Header -->
      <header class="article-header container">
        <a href="/category/${article.categorySlug}" class="article-category" data-route="category" data-slug="${article.categorySlug}">
          ${article.category}
        </a>
        <h1 class="article-title">${article.title}</h1>
        
        <div class="article-meta">
          <span class="meta-item">Updated ${article.date}</span>
          <span class="meta-dot">•</span>
          <span class="meta-item">${article.readTime}</span>
          <span class="meta-dot">•</span>
          <span class="meta-item">By Trend Haircuts Editorial Team</span>
        </div>
      </header>

      <!-- Main Horizontal Hero Cover Image -->
      <div class="container text-center">
        <div class="article-main-hero-img">
          <img src="${article.heroImage}" alt="${article.title}" />
        </div>
      </div>

      <!-- Article Body Container -->
      <div class="container article-body-wrap">
        <!-- Intro -->
        ${article.introParagraphs && Array.isArray(article.introParagraphs)
          ? article.introParagraphs.map(p => `<p class="article-intro">${p}</p>`).join('')
          : `<p class="article-intro">${article.intro}</p>`}

        <!-- INVESTOPEDIA-STYLE COLLAPSIBLE TABLE OF CONTENTS -->
        <div class="investopedia-toc-container" id="investopedia-toc">
          <div class="toc-header-bar" id="toc-header-bar">
            <h3 class="toc-heading-title">Table of Contents</h3>
            <button class="toc-toggle-btn" id="toc-toggle-btn">
              <span id="toc-toggle-text">Hide</span>
              <i data-lucide="chevron-up" class="toc-chevron-icon" id="toc-chevron" size="14"></i>
            </button>
          </div>

          <div class="toc-content-wrapper" id="toc-content-wrapper">
            <ul class="investopedia-toc-list">
              ${extraTocItemsTopHtml}
              ${mainTocItemsHtml}
              ${faqTocItemHtml}
            </ul>
          </div>
        </div>

        <!-- Dynamic Extra Sections -->
        ${extraSectionsHtml}

        <!-- Listicle Content -->
        <div class="listicle-content">
          ${itemsHtml}
        </div>

        <!-- Dynamic FAQs -->
        ${faqsHtml}
      </div>

      <!-- You May Also Like Section -->
      <section class="section-padding container" style="border-top: 1px solid var(--border-light); margin-top: 4rem;">
        <div class="section-header text-center" style="display:block;">
          <h2 class="section-title">You May Also Like</h2>
          <p class="subheading">More hair inspiration lookbooks to explore</p>
        </div>
        ${relatedGridHtml}
      </section>
    </article>
  `;
}
