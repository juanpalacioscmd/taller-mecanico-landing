// Main JavaScript file for Taller Mecánico Landing
import { siteConfig } from './config.js';

// ===== DOM ELEMENTS =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');

// ===== NAVIGATION FUNCTIONALITY =====
class Navigation {
  constructor() {
    this.init();
  }

  init() {
    this.setupMenuToggle();
    this.setupMenuEventListeners();
    this.setupActiveLinks();
    this.setupSmoothScroll();
    this.setupHeaderScroll();
  }

  setupMenuToggle() {
    // Show menu
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        this.toggleMenu(true);
      });
      
      // Keyboard support for menu toggle
      navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleMenu(true);
        }
      });
    }

    // Hide menu
    if (navClose) {
      navClose.addEventListener('click', () => {
        this.toggleMenu(false);
      });
      
      // Keyboard support for menu close
      navClose.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleMenu(false);
        }
      });
    }
  }

  toggleMenu(show) {
    if (show) {
      navMenu.classList.add('show-menu');
      document.body.style.overflow = 'hidden';
      // Focus first menu item for accessibility
      const firstLink = navMenu.querySelector('.nav__link');
      if (firstLink) firstLink.focus();
    } else {
      navMenu.classList.remove('show-menu');
      document.body.style.overflow = 'auto';
      // Return focus to toggle button
      if (navToggle) navToggle.focus();
    }
  }

  setupMenuEventListeners() {
    // Hide menu when clicking on nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.toggleMenu(false);
      });
    });

    // Hide menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        this.toggleMenu(false);
      }
    });

    // Handle escape key to close menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        this.toggleMenu(false);
      }
    });
  }

  setupActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentSection = entry.target.getAttribute('id');
          this.setActiveLink(currentSection);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  setActiveLink(sectionId) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }

  setupSmoothScroll() {
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupHeaderScroll() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // Add/remove header background based on scroll
      if (currentScrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
      }
      
      // Hide/show header on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
    });
  }
}

// ===== HERO SECTION FUNCTIONALITY =====
class HeroSection {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollIndicator();
    this.setupHeroAnimations();
  }

  setupScrollIndicator() {
    // Add scroll indicator to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
      const scrollIndicator = document.createElement('div');
      scrollIndicator.className = 'scroll-indicator';
      scrollIndicator.innerHTML = `
        <div class="scroll-indicator__text">Desliza para ver más</div>
        <div class="scroll-indicator__arrow">↓</div>
      `;
      hero.appendChild(scrollIndicator);

      // Hide scroll indicator after scrolling
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          scrollIndicator.style.opacity = '0';
        } else {
          scrollIndicator.style.opacity = '1';
        }
      });
    }
  }

  setupHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero__title, .hero__description, .hero__actions, .hero__image');
    
    // Add entrance animations
    heroElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        element.style.transition = 'all 0.6s ease-out';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }
}

// ===== ABOUT SECTION FUNCTIONALITY =====
class AboutSection {
  constructor() {
    this.init();
  }

  init() {
    this.setupImageGallery();
    this.setupAnimations();
  }

  setupImageGallery() {
    const images = document.querySelectorAll('.about__img');
    
    // Add loading placeholder for images
    images.forEach(img => {
      img.style.backgroundColor = 'var(--gray-200)';
      img.style.minHeight = '200px';
      
      // Create placeholder content
      if (!img.src || img.src.includes('placeholder')) {
        this.createImagePlaceholder(img);
      }
      
      img.addEventListener('load', () => {
        img.style.backgroundColor = 'transparent';
      });
      
      img.addEventListener('error', () => {
        this.createImagePlaceholder(img);
      });
    });
  }

  createImagePlaceholder(img) {
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width: 100%;
      height: 200px;
      background: linear-gradient(135deg, var(--gray-200) 0%, var(--gray-300) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-xl);
      color: var(--gray-500);
      font-size: var(--font-size-4xl);
    `;
    
    const icons = ['🔧', '⚙️', '🚗'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    placeholder.textContent = randomIcon;
    
    img.style.display = 'none';
    img.parentNode.appendChild(placeholder);
  }

  setupAnimations() {
    const aboutElements = document.querySelectorAll('.about__text, .about__images');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (entry.target.classList.contains('about__text')) {
              entry.target.classList.add('animate-fade-in-left');
            } else {
              entry.target.classList.add('animate-fade-in-right');
            }
          }, index * 200);
        }
      });
    }, observerOptions);

    aboutElements.forEach(element => observer.observe(element));
  }
}

// ===== SERVICES SECTION FUNCTIONALITY =====
class ServicesSection {
  constructor() {
    this.servicesGrid = document.getElementById('services-grid');
    this.init();
  }

  init() {
    this.renderServices();
    this.setupServiceAnimations();
  }

  renderServices() {
    if (!this.servicesGrid) return;

    const servicesHTML = siteConfig.servicios.map(servicio => `
      <div class="service-card" data-service-id="${servicio.id}">
        <div class="service-card__icon">${this.getServiceIcon(servicio.icono)}</div>
        <h3 class="service-card__title">${servicio.titulo}</h3>
        <p class="service-card__description">${servicio.descripcion}</p>
        <div class="service-card__price">${servicio.precio}</div>
      </div>
    `).join('');

    this.servicesGrid.innerHTML = servicesHTML;
  }

  getServiceIcon(iconName) {
    const icons = {
      'wrench': '🔧',
      'oil-can': '🛢️',
      'brake-disc': '🛞',
      'shock-absorber': '⚙️',
      'computer': '💻',
      'wheel': '🎯'
    };
    return icons[iconName] || '🔧';
  }

  setupServiceAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-fade-in-up');
          }, index * 100);
        }
      });
    }, observerOptions);

    serviceCards.forEach(card => observer.observe(card));
  }
}

// ===== CONTACT INFO FUNCTIONALITY =====
class ContactInfo {
  constructor() {
    this.init();
  }

  init() {
    this.updateContactInfo();
    this.setupDynamicSchedule();
    this.setupContactLinks();
  }

  updateContactInfo() {
    // Update contact information from config
    const { taller } = siteConfig;
    
    // Update phone numbers
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
      link.href = `tel:${taller.telefono}`;
      if (link.textContent.includes('+56')) {
        link.textContent = taller.telefono;
      }
    });

    // Update email links
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
      link.href = `mailto:${taller.email}`;
      if (link.textContent.includes('@')) {
        link.textContent = taller.email;
      }
    });

    // Update WhatsApp link
    const whatsappBtn = document.querySelector('.whatsapp__btn');
    if (whatsappBtn) {
      const whatsappNumber = taller.whatsapp || taller.telefono.replace(/\s/g, '');
      const message = encodeURIComponent('Hola, me interesa conocer sus servicios de taller mecánico');
      whatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${message}`;
    }
  }

  setupDynamicSchedule() {
    const scheduleItems = document.querySelectorAll('.schedule__item');
    const { horarios } = siteConfig.taller;
    
    scheduleItems.forEach(item => {
      const dayElement = item.querySelector('.schedule__day');
      const timeElement = item.querySelector('.schedule__time');
      
      if (dayElement && timeElement) {
        const dayText = dayElement.textContent.toLowerCase();
        
        if (dayText.includes('lun') || dayText.includes('vie')) {
          timeElement.textContent = horarios.lunes_viernes;
        } else if (dayText.includes('sáb')) {
          timeElement.textContent = horarios.sabado;
        } else if (dayText.includes('dom')) {
          timeElement.textContent = horarios.domingo;
        }
      }
    });

    // Add current status indicator
    this.addCurrentStatusIndicator();
  }

  addCurrentStatusIndicator() {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    let isOpen = false;
    let statusText = '';

    // Check if currently open
    if (currentDay >= 1 && currentDay <= 5) { // Monday to Friday
      const openTime = 8 * 60; // 08:00
      const closeTime = 18 * 60; // 18:00
      isOpen = currentTime >= openTime && currentTime < closeTime;
      statusText = isOpen ? 'Abierto ahora' : 'Cerrado';
    } else if (currentDay === 6) { // Saturday
      const openTime = 8 * 60; // 08:00
      const closeTime = 13 * 60; // 13:00
      isOpen = currentTime >= openTime && currentTime < closeTime;
      statusText = isOpen ? 'Abierto ahora' : 'Cerrado';
    } else { // Sunday
      statusText = 'Cerrado';
    }

    // Add status indicator to schedule
    const scheduleContainer = document.querySelector('.contact__schedule');
    if (scheduleContainer) {
      const statusIndicator = document.createElement('div');
      statusIndicator.className = `schedule__status ${isOpen ? 'schedule__status--open' : 'schedule__status--closed'}`;
      statusIndicator.innerHTML = `
        <span class="status__indicator"></span>
        <span class="status__text">${statusText}</span>
      `;
      scheduleContainer.appendChild(statusIndicator);
    }
  }

  setupContactLinks() {
    // Add click tracking for contact methods
    const contactLinks = document.querySelectorAll('.contact__link, .nav__cta, .whatsapp__btn');
    
    contactLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const contactMethod = this.getContactMethod(link);
        console.log(`Contact method used: ${contactMethod}`);
        
        // Add visual feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
          link.style.transform = '';
        }, 150);
      });
    });
  }

  getContactMethod(element) {
    if (element.href.startsWith('tel:')) return 'phone';
    if (element.href.startsWith('mailto:')) return 'email';
    if (element.href.includes('wa.me')) return 'whatsapp';
    return 'unknown';
  }
}

// ===== CONTACT FORM FUNCTIONALITY =====
class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.submitBtn = document.getElementById('submit-btn');
    this.formMessage = document.getElementById('form-message');
    this.init();
  }

  init() {
    if (!this.form) return;
    
    this.setupFormValidation();
    this.setupFormSubmission();
  }

  setupFormValidation() {
    const inputs = this.form.querySelectorAll('.form__input, .form__textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
      case 'nombre':
        if (!value) {
          errorMessage = 'El nombre es requerido';
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = 'El nombre debe tener al menos 2 caracteres';
          isValid = false;
        }
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errorMessage = 'El email es requerido';
          isValid = false;
        } else if (!emailRegex.test(value)) {
          errorMessage = 'Ingresa un email válido';
          isValid = false;
        }
        break;
        
      case 'telefono':
        const phoneRegex = /^(\+56|56)?[0-9]{8,9}$/;
        if (!value) {
          errorMessage = 'El teléfono es requerido';
          isValid = false;
        } else if (!phoneRegex.test(value.replace(/\s/g, ''))) {
          errorMessage = 'Ingresa un teléfono válido (ej: +56912345678)';
          isValid = false;
        }
        break;
        
      case 'mensaje':
        if (!value) {
          errorMessage = 'El mensaje es requerido';
          isValid = false;
        } else if (value.length < 10) {
          errorMessage = 'El mensaje debe tener al menos 10 caracteres';
          isValid = false;
        }
        break;
    }

    if (errorElement) {
      errorElement.textContent = errorMessage;
      field.style.borderColor = isValid ? '' : 'var(--error)';
    }

    return isValid;
  }

  clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
      errorElement.textContent = '';
      field.style.borderColor = '';
    }
  }

  validateForm() {
    const requiredFields = this.form.querySelectorAll('[required]');
    let isFormValid = true;

    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  setupFormSubmission() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!this.validateForm()) {
        this.showMessage('Por favor, corrige los errores en el formulario', 'error');
        return;
      }

      this.setLoadingState(true);

      try {
        const formData = new FormData(this.form);
        const response = await this.submitToFormspree(formData);
        
        if (response.ok) {
          this.showMessage('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
          this.form.reset();
        } else {
          throw new Error('Error en el envío');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        this.showMessage('Error al enviar el mensaje. Por favor, intenta nuevamente o llámanos directamente.', 'error');
      } finally {
        this.setLoadingState(false);
      }
    });
  }

  async submitToFormspree(formData) {
    // For now, simulate form submission
    // In production, replace with actual Formspree endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ok: true });
      }, 1500);
    });
  }

  setLoadingState(isLoading) {
    if (isLoading) {
      this.submitBtn.classList.add('loading');
      this.submitBtn.disabled = true;
    } else {
      this.submitBtn.classList.remove('loading');
      this.submitBtn.disabled = false;
    }
  }

  showMessage(message, type) {
    this.formMessage.textContent = message;
    this.formMessage.className = `form__message form__message--${type}`;
    this.formMessage.style.display = 'block';
    
    // Auto-hide success messages
    if (type === 'success') {
      setTimeout(() => {
        this.formMessage.style.display = 'none';
      }, 5000);
    }
  }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.about__content, .contact__content');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    animatedElements.forEach(element => observer.observe(element));
  }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupLazyLoading();
    this.preloadCriticalImages();
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
      });
    }
  }

  preloadCriticalImages() {
    const criticalImages = [
      '/src/assets/images/hero-mechanic.jpg',
      '/src/assets/icons/logo.svg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  new Navigation();
  new HeroSection();
  new AboutSection();
  new ServicesSection();
  new ContactInfo();
  new ContactForm();
  new ScrollAnimations();
  new PerformanceOptimizer();

  // Add loading complete class to body
  document.body.classList.add('loaded');
  
  // Show staging banner only in staging environment
  const stagingBanner = document.getElementById('staging-banner');
  if (stagingBanner && window.location.pathname.includes('/staging/')) {
    stagingBanner.style.display = 'block';
  } else if (stagingBanner) {
    stagingBanner.style.display = 'none';
  }
  
  console.log('Taller Mecánico AutoFix - Website loaded successfully! 🔧');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
});

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}