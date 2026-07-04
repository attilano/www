/**
 * ATTILANO - Disney-Style Gaming Studio
 * Main JavaScript
 */

(function() {
  'use strict';

  // ========================================
  // DOM Elements
  // ========================================
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const scrollTopBtn = document.querySelector('.scroll-top');
  const preloader = document.querySelector('.preloader');
  const cookieBanner = document.querySelector('.cookie-banner');
  const cookieAcceptBtn = document.getElementById('cookie-accept');
  const cookieDeclineBtn = document.getElementById('cookie-decline');
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  // ========================================
  // Preloader
  // ========================================
  function hidePreloader() {
    if (preloader) {
      preloader.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }

  // Hide preloader after page loads
  window.addEventListener('load', function() {
    setTimeout(hidePreloader, 1000);
  });

  // Fallback: hide preloader after 3 seconds max
  setTimeout(hidePreloader, 3000);

  // ========================================
  // Header Scroll Effect
  // ========================================
  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    
    // Header background on scroll
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Scroll to top button visibility
    if (scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ========================================
  // Mobile Menu Toggle
  // ========================================
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu when clicking on nav links
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // ========================================
  // Scroll to Top
  // ========================================
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========================================
  // Scroll Reveal Animation
  // ========================================
  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(function(element) {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  checkReveal(); // Initial check

  // ========================================
  // Cookie Banner
  // ========================================
  function showCookieBanner() {
    if (!getCookie('attilano_cookies_accepted')) {
      setTimeout(function() {
        if (cookieBanner) {
          cookieBanner.classList.add('visible');
        }
      }, 2000);
    }
  }

  function hideCookieBanner() {
    if (cookieBanner) {
      cookieBanner.classList.remove('visible');
    }
  }

  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
  }

  function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  if (cookieAcceptBtn) {
    cookieAcceptBtn.addEventListener('click', function() {
      setCookie('attilano_cookies_accepted', 'true', 365);
      hideCookieBanner();
    });
  }

  if (cookieDeclineBtn) {
    cookieDeclineBtn.addEventListener('click', function() {
      setCookie('attilano_cookies_accepted', 'false', 365);
      hideCookieBanner();
    });
  }

  showCookieBanner();

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // Form Validation & Submission
  // ========================================
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form fields
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');
      
      // Simple validation
      let isValid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      // Clear previous errors
      [name, email, subject, message].forEach(function(field) {
        if (field) {
          field.style.borderColor = '';
        }
      });
      
      if (!name || !name.value.trim()) {
        if (name) name.style.borderColor = '#e74c3c';
        isValid = false;
      }
      
      if (!email || !emailRegex.test(email.value)) {
        if (email) email.style.borderColor = '#e74c3c';
        isValid = false;
      }
      
      if (!subject || !subject.value.trim()) {
        if (subject) subject.style.borderColor = '#e74c3c';
        isValid = false;
      }
      
      if (!message || !message.value.trim()) {
        if (message) message.style.borderColor = '#e74c3c';
        isValid = false;
      }
      
      if (isValid) {
        // Show success message (in production, send to server)
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      } else {
        alert('Please fill in all required fields correctly.');
      }
    });
  }

  // ========================================
  // Newsletter Form
  // ========================================
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      
      if (emailInput && emailInput.value.trim()) {
        // Show success (in production, send to server)
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
      }
    });
  }

  // ========================================
  // Game Filter
  // ========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const gameCards = document.querySelectorAll('.game-card');

  if (filterBtns.length > 0 && gameCards.length > 0) {
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const filter = this.dataset.filter;
        
        // Update active button
        filterBtns.forEach(function(b) {
          b.classList.remove('active');
        });
        this.classList.add('active');
        
        // Filter games
        gameCards.forEach(function(card) {
          const category = card.dataset.category;
          
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            setTimeout(function() {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(function() {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ========================================
  // Counter Animation
  // ========================================
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(function(counter) {
      if (counter.dataset.animated) return;
      
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        counter.dataset.animated = 'true';
        
        const target = parseInt(counter.dataset.target) || parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const suffix = counter.dataset.suffix || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = function() {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + suffix;
          }
        };
        
        updateCounter();
      }
    });
  }

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters(); // Initial check

  // ========================================
  // Parallax Effect for Hero
  // ========================================
  const heroBlobs = document.querySelectorAll('.hero-blob');
  
  if (heroBlobs.length > 0) {
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      heroBlobs.forEach(function(blob, index) {
        const speed = (index + 1) * 0.1;
        blob.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
      });
    }, { passive: true });
  }

  // ========================================
  // Mouse Move Effect for Floating Elements
  // ========================================
  const floatingIcons = document.querySelectorAll('.floating-icon');
  
  if (floatingIcons.length > 0 && window.innerWidth > 992) {
    document.addEventListener('mousemove', function(e) {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      floatingIcons.forEach(function(icon, index) {
        const speed = (index + 1) * 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        icon.style.transform = 'translate(' + xOffset + 'px, ' + yOffset + 'px)';
      });
    });
  }

  // ========================================
  // Lazy Loading Images
  // ========================================
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  // ========================================
  // Typing Effect
  // ========================================
  const typingElement = document.querySelector('.typing-effect');
  
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    typingElement.style.borderRight = '3px solid var(--primary-pink)';
    
    let index = 0;
    function typeWriter() {
      if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(function() {
          typingElement.style.borderRight = 'none';
        }, 1000);
      }
    }
    
    typeWriter();
  }

  // ========================================
  // Tilt Effect for Cards
  // ========================================
  const tiltCards = document.querySelectorAll('.tilt-card');
  
  if (tiltCards.length > 0) {
    tiltCards.forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.05)';
      });
      
      card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  // ========================================
  // Active Navigation Link
  // ========================================
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPath || 
        (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('/'))) ||
        (href !== 'index.html' && currentPath.includes(href))) {
      link.classList.add('active');
    }
  });

  // ========================================
  // Console Easter Egg
  // ========================================
  console.log('%c🎮 Welcome to Attilano! 🎮', 'font-size: 24px; font-weight: bold; color: #FF6B9D;');
  console.log('%cCreating magical gaming experiences for players around the world.', 'font-size: 14px; color: #C44569;');
  console.log('%cVisit us at: https://www.cojhrhvk.com', 'font-size: 12px; color: #7F8C8D;');

  // ========================================
  // Performance: Debounce Function
  // ========================================
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }

  // ========================================
  // Accessibility: Keyboard Navigation
  // ========================================
  document.addEventListener('keydown', function(e) {
    // ESC to close mobile menu
    if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // ========================================
  // Reduced Motion Support
  // ========================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-normal', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
  }

  // ========================================
  // Print Functionality
  // ========================================
  window.printPage = function() {
    window.print();
  };

})();
