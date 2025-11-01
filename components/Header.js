class CustomHeader extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        header {
          background-color: #0C3C46;
          position: sticky;
          top: 0;
          z-index: 100;
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .scrolled {
          background-color: rgba(12, 60, 70, 0.95);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80px;
        }

        /* Logo sizing - anchor and image use separate classes to avoid conflict */
        .logo-link {
          display: flex;
          align-items: center;
          height: 48px;
          text-decoration: none;
        }

        .logo-img {
          height: 48px;
          width: auto;
          display: block;
          object-fit: contain;
        }

        .logo-text-fallback {
          color: white;
          font-weight: 700;
          font-size: 20px;
          margin-left: 8px;
        }

        .nav-links {
          display: flex;
          gap: 30px;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-links a:hover {
          color: #FF9F1C;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #FF9F1C;
          transition: width 0.3s ease;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        .mobile-menu {
          display: none;
          background-color: #0C3C46;
          padding: 20px;
          position: absolute;
          top: 80px;
          left: 0;
          right: 0;
          z-index: 99;
          box-shadow: 0 5px 10px rgba(0,0,0,0.1);
        }

        .mobile-menu.active {
          display: block;
        }

        .mobile-menu-links {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .mobile-menu-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
        }

        .mobile-menu-links a:hover {
          color: #FF9F1C;
        }

        .cta-button {
          background-color: #FF9F1C;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .cta-button:hover {
          background-color: #e68a00;
        }

        @media (max-width: 1024px) {
          .nav-links {
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }

          .cta-button.desktop {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }
        }
      </style>

      <header id="main-header">
        <div class="container">
          <nav class="nav-container">
            <a href="/" class="logo-link" aria-label="Recurra home">
              <!-- prefer local asset: ./assets/logo.png (place your logo there). Fallback to cloud url below -->
              <img class="logo-img" src="./assets/logo.png" alt="Recurra Logo" onerror="this.dataset.failed='true'; this.style.display='none'">
              <img class="logo-img" src="https://res.cloudinary.com/dmhy8rk7/image/upload/v1761853878/Logo_with_Circular_Arrow_and__R___1_-removebg-preview_wu3ker.png" alt="Recurra Logo" onerror="this.style.display='none'">
              <span class="logo-text-fallback" style="display:none">Recurra</span>
            </a>

            <div class="nav-links">
              <a href="#solutions">Solutions</a>
              <a href="#institutions">For Institutions</a>
              <a href="#pricing">Pricing</a>
              <a href="#resources">Resources</a>
              <a href="#contact">Contact</a>
            </div>

            <!-- desktop CTA -->
            <button class="cta-button desktop" id="sign-in-btn">Sign Up / Sign In</button>

            <button class="mobile-menu-btn" id="mobile-menu-btn">
              <i data-feather="menu"></i>
            </button>

            <button class="cta-button mobile hidden" id="sign-in-btn-mobile">Sign Up / Sign In</button>
          </nav>
        </div>

        <div class="mobile-menu" id="mobile-menu">
          <div class="container">
            <div class="mobile-menu-links">
              <a href="#solutions">Solutions</a>
              <a href="#institutions">For Institutions</a>
              <a href="#pricing">Pricing</a>
              <a href="#resources">Resources</a>
              <a href="#contact">Contact</a>
              <button class="cta-button" id="mobile-get-started">Get Started</button>
            </div>
          </div>
        </div>
      </header>
    `;

    // after setting innerHTML, add a small JS fallback to show text if both images fail
    const logoLink = this.shadowRoot.querySelector('.logo-link');
    const logoImgs = Array.from(this.shadowRoot.querySelectorAll('.logo-img'));
    const fallbackText = this.shadowRoot.querySelector('.logo-text-fallback');

    let loaded = false;
    logoImgs.forEach(img => {
      img.addEventListener('load', () => {
        if (!loaded) {
          loaded = true;
          // show only the loaded image
          logoImgs.forEach(i => { if (i !== img) i.style.display = 'none'; });
          fallbackText.style.display = 'none';
        }
      });
      img.addEventListener('error', () => {
        // if all images errored, show fallback text
        if (logoImgs.every(i => i.complete && (i.naturalWidth === 0 || i.style.display === 'none'))) {
          fallbackText.style.display = 'inline-block';
        }
      });
    });

    // Initialize mobile menu toggle
    const mobileMenuBtn = this.shadowRoot.getElementById('mobile-menu-btn');
    const mobileMenu = this.shadowRoot.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      feather.replace();
    });

    // Sign-in button handlers (calls the global function exposed by firebase-init.js)
    const signInBtn = this.shadowRoot.getElementById('sign-in-btn');
    const signInBtnMobile = this.shadowRoot.getElementById('sign-in-btn-mobile');

    const goToSignPage = () => {
      // navigate to the sign-in page in the same tab
      window.location.href = 'sign.html';
    };

    if (signInBtn) signInBtn.addEventListener('click', goToSignPage);
    if (signInBtnMobile) signInBtnMobile.addEventListener('click', goToSignPage);
    
    // Handle header scroll effect
    const header = this.shadowRoot.getElementById('main-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Replace feather icons
    feather.replace();
  }
}

customElements.define('custom-header', CustomHeader);