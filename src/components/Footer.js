export function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Col 1: About & Mission -->
          <div>
            <div class="footer-logo">
              <span>Tress & Trend</span> <span style="color:var(--accent-pink);">✨</span>
            </div>
            <p class="footer-desc">
              Your daily beauty destination for hand-curated haircut listicles, hair color guides, styling masterclasses, and hairstyle trend inspiration.
            </p>
          </div>

          <!-- Col 2: Haircuts & Lengths -->
          <div>
            <h4 class="footer-col-title">Haircuts & Lengths</h4>
            <ul class="footer-links">
              <li><a href="#/category/short-hairstyles" data-route="category" data-slug="short-hairstyles">Short Haircuts & Bobs</a></li>
              <li><a href="#/category/bob-lob-haircuts" data-route="category" data-slug="bob-lob-haircuts">Bob & Lob Haircuts</a></li>
              <li><a href="#/category/pixie-haircuts" data-route="category" data-slug="pixie-haircuts">Pixie Cuts</a></li>
              <li><a href="#/category/medium-length-hairstyles" data-route="category" data-slug="medium-length-hairstyles">Medium-Length Hair</a></li>
              <li><a href="#/category/long-hairstyles" data-route="category" data-slug="long-hairstyles">Long Hairstyles</a></li>
              <li><a href="#/category/layered-textured-haircuts" data-route="category" data-slug="layered-textured-haircuts">Layered & Textured Cuts</a></li>
            </ul>
          </div>

          <!-- Col 3: Styling & Trends -->
          <div>
            <h4 class="footer-col-title">Hairstyles & Color</h4>
            <ul class="footer-links">
              <li><a href="#/category/bangs-fringe" data-route="category" data-slug="bangs-fringe">Curtain Bangs & Fringe</a></li>
              <li><a href="#/category/hair-color-ideas" data-route="category" data-slug="hair-color-ideas">Hair Color & Balayage</a></li>
              <li><a href="#/category/curly-hairstyles" data-route="category" data-slug="curly-hairstyles">Curly & Wavy Hair</a></li>
              <li><a href="#/category/braided-hairstyles" data-route="category" data-slug="braided-hairstyles">Braids & Updos</a></li>
              <li><a href="#/category/women-over-40" data-route="category" data-slug="women-over-40">Hairstyles Over 40 & 50</a></li>
              <li><a href="#/category/easy-everyday-hairstyles" data-route="category" data-slug="easy-everyday-hairstyles">Easy Everyday Styles</a></li>
            </ul>
          </div>

          <!-- Col 4: Legal & Company Pages -->
          <div>
            <h4 class="footer-col-title">Company & Legal</h4>
            <ul class="footer-links">
              <li><a href="#/about" data-route="about">About Us</a></li>
              <li><a href="#/contact" data-route="contact">Contact Editorial</a></li>
              <li><a href="#/privacy" data-route="privacy">Privacy Policy</a></li>
              <li><a href="#/terms" data-route="terms">Terms of Service</a></li>
              <li><a href="#/disclaimer" data-route="disclaimer">Editorial Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Tress & Trend Hair Magazine. All rights reserved.</p>
          <div style="display:flex; gap:1.5rem;">
            <a href="#/privacy" data-route="privacy">Privacy</a>
            <a href="#/terms" data-route="terms">Terms</a>
            <a href="#/disclaimer" data-route="disclaimer">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
