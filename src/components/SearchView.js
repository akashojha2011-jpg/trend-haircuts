import { renderMasonryGrid } from './MasonryGrid.js';
import { articles } from '../data/articles.js';

export function renderSearchModal(savedPins = []) {
  return `
    <div class="modal-backdrop" id="search-modal">
      <div class="search-modal-container">
        <div class="modal-header">
          <h2 class="modal-title">What Are You Looking For?</h2>
          <button class="modal-close-btn" id="close-search-modal-btn" aria-label="Close search">
            <i data-lucide="x"></i>
          </button>
        </div>

        <div class="search-input-group" style="margin-bottom: 1.5rem;">
          <i data-lucide="search" class="search-icon"></i>
          <input 
            type="text" 
            id="modal-search-input" 
            class="search-input" 
            placeholder="hairstyles, haircuts & more..." 
            autofocus
          />
        </div>

        <div class="trending-tags" style="justify-content: flex-start; margin-bottom: 1.5rem;">
          <span class="tag-label">Popular Searches:</span>
          <button class="chip-tag modal-quick-tag" data-tag="Short Hairstyles">Short Hairstyles</button>
          <button class="chip-tag modal-quick-tag" data-tag="Hair Color Ideas">Hair Color Ideas</button>
          <button class="chip-tag modal-quick-tag" data-tag="Bob Haircuts">Bob Haircuts</button>
          <button class="chip-tag modal-quick-tag" data-tag="Curtain Bangs">Curtain Bangs</button>
          <button class="chip-tag modal-quick-tag" data-tag="Easy Hairstyles">Easy Hairstyles</button>
        </div>

        <div class="search-results-area" id="modal-search-results">
          ${renderMasonryGrid(articles, savedPins)}
        </div>
      </div>
    </div>
  `;
}
