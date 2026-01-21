class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .navbar {
          transition: all 0.3s ease;
        }
        .navbar.scrolled {
          @apply shadow-md bg-white;
        }
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: #E67E22;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .mobile-menu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }
        .mobile-menu.open {
          max-height: 500px;
        }
      </style>
      <nav class="navbar fixed w-full z-50 bg-primary-500 text-white">
        <div class="container mx-auto px-4 py-4">
          <div class="flex justify-between items-center">
            <a href="/" class="flex items-center space-x-2">
              <i data-feather="home" class="w-6 h-6"></i>
              <span class="text-xl font-bold">GMII Bukit Zaitun</span>
            </a>
            
            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center space-x-8">
              <a href="/" class="nav-link">Beranda</a>
              <a href="/about" class="nav-link">Tentang Kami</a>
              <a href="/services" class="nav-link">Ibadah</a>
              <a href="/events" class="nav-link">Acara</a>
              <a href="/contact" class="nav-link">Kontak</a>
              <a href="/give" class="bg-secondary-500 hover:bg-secondary-600 px-4 py-2 rounded-full font-medium transition">
                Persembahan
              </a>
            </div>
            
            <!-- Mobile Menu Button -->
            <button id="mobile-menu-button" class="md:hidden focus:outline-none">
              <i data-feather="menu" class="w-6 h-6"></i>
            </button>
          </div>
          
          <!-- Mobile Navigation -->
          <div id="mobile-menu" class="mobile-menu md:hidden mt-4">
            <div class="flex flex-col space-y-3 pb-3">
              <a href="/" class="px-2 py-1 hover:bg-primary-400 rounded">Beranda</a>
              <a href="/about" class="px-2 py-1 hover:bg-primary-400 rounded">Tentang Kami</a>
              <a href="/services" class="px-2 py-1 hover:bg-primary-400 rounded">Ibadah</a>
              <a href="/events" class="px-2 py-1 hover:bg-primary-400 rounded">Acara</a>
              <a href="/contact" class="px-2 py-1 hover:bg-primary-400 rounded">Kontak</a>
              <a href="/give" class="bg-secondary-500 hover:bg-secondary-600 px-4 py-2 rounded-full font-medium text-center mt-2 transition">
                Persembahan
              </a>
            </div>
          </div>
        </div>
      </nav>
    `;

    // Initialize feather icons in shadow DOM
    const featherScript = document.createElement('script');
    featherScript.src = 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js';
    this.shadowRoot.appendChild(featherScript);
    
    // Mobile menu toggle
    const mobileMenuButton = this.shadowRoot.getElementById('mobile-menu-button');
    const mobileMenu = this.shadowRoot.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const icon = mobileMenuButton.querySelector('i');
        if (mobileMenu.classList.contains('open')) {
          icon.setAttribute('data-feather', 'x');
        } else {
          icon.setAttribute('data-feather', 'menu');
        }
        feather.replace();
      });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = this.shadowRoot.querySelector('.navbar');
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
}

customElements.define('custom-navbar', CustomNavbar);
