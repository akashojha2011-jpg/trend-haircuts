export function renderHero() {
  return `
    <section class="hero-section">
      <div class="container hero-content">
        <h1 class="hero-title">Find Your Next Hair Obsession</h1>
        <p class="hero-subtitle">
          Discover beautiful hairstyles, fresh haircut ideas, trending hair colors, and everyday inspiration for every hair length and texture.
        </p>

        <!-- Search Bar -->
        <div class="search-bar-wrap">
          <form id="hero-search-form" class="search-input-group">
            <i data-lucide="search" class="search-icon"></i>
            <input 
              type="text" 
              id="hero-search-input"
              class="search-input" 
              placeholder="Search hairstyles, haircuts, colors and more..."
              autocomplete="off"
            />
            <button type="submit" class="search-submit-btn">Search</button>
          </form>
        </div>

        <!-- Trending Search Tags -->
        <div class="trending-tags">
          <span class="tag-label">Trending:</span>
          <button class="chip-tag" data-tag="Bob Hairstyles">Bob Hairstyles</button>
          <button class="chip-tag" data-tag="Curtain Bangs">Curtain Bangs</button>
          <button class="chip-tag" data-tag="Short Hair">Short Hair</button>
          <button class="chip-tag" data-tag="Hair Color Ideas">Hair Color Ideas</button>
          <button class="chip-tag" data-tag="Easy Hairstyles">Easy Hairstyles</button>
          <button class="chip-tag" data-tag="Curly Hair">Curly Hair</button>
        </div>
      </div>
    </section>
  `;
}
