export function renderContactView() {
  return `
    <div class="container section-padding" style="max-width: 860px;">
      <header class="text-center" style="margin-bottom: 3rem;">
        <span class="blog-category-badge">Get In Touch</span>
        <h1 class="heading-xl" style="margin-bottom: 0.75rem;">Contact Our Editorial Team</h1>
        <p class="subheading">Have questions, feedback, or editorial requests? We'd love to hear from you.</p>
      </header>

      <div class="legal-page-body" style="background: white; padding: 2.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-light); box-shadow: var(--shadow-sm);">
        <p style="margin-bottom: 2rem;">Fill out the form below or reach us directly at <code>editorial@trendhaircuts.com</code>.</p>
        
        <form style="display: flex; flex-direction: column; gap: 1.5rem;" onsubmit="event.preventDefault(); alert('Thank you for reaching out! Our editorial team will get back to you shortly.');">
          <div>
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.9rem;">Your Full Name</label>
            <input type="text" required placeholder="Jane Doe" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-light); border-radius: var(--radius-md); font-family: inherit; font-size: 0.95rem;" />
          </div>

          <div>
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.9rem;">Your Email Address</label>
            <input type="email" required placeholder="jane@example.com" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-light); border-radius: var(--radius-md); font-family: inherit; font-size: 0.95rem;" />
          </div>

          <div>
            <label style="display: block; font-weight: 600; margin-bottom: 0.5rem; font-size: 0.9rem;">Message or Inquiry</label>
            <textarea required rows="5" placeholder="Share your hair questions, feedback, or press requests..." style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--border-light); border-radius: var(--radius-md); font-family: inherit; font-size: 0.95rem; resize: vertical;"></textarea>
          </div>

          <button type="submit" class="btn-primary" style="align-self: flex-start;">Send Message</button>
        </form>
      </div>
    </div>
  `;
}
