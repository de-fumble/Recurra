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
        
        .logo {
          height: 120px;
          width: auto;
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
            <a href="/" class="logo">
              <img src="https://res.cloudinary.com/dmhy8rk7q/image/upload/v1761853878/Logo_with_Circular_Arrow_and__R___1_-removebg-preview_wu3ker.png" alt="Recurra Logo" class="logo" height="70" width="auto">
            </a>
            
            <div class="nav-links">
              <a href="#solutions">Solutions</a>
              <a href="#institutions">For Institutions</a>
              <a href="#pricing">Pricing</a>
              <a href="#resources">Resources</a>
              <a href="#contact">Contact</a>
              
            </div>
            
            <button class="mobile-menu-btn" id="mobile-menu-btn">
              <i data-feather="menu"></i>
            </button>
            
            <button class="cta-button mobile hidden">Get Started</button>
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
              <button class="cta-button">Get Started</button>
            </div>
          </div>
        </div>
      </header>
    `;
    
    // Initialize mobile menu toggle
    const mobileMenuBtn = this.shadowRoot.getElementById('mobile-menu-btn');
    const mobileMenu = this.shadowRoot.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      feather.replace();
    });
    
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