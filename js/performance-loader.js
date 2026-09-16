// Performance Optimization Loader
// Implements lazy loading, deferred loading, and performance monitoring

(function() {
  'use strict';

  // 1. LAZY LOAD IMAGES
  function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // 2. DEFER NON-CRITICAL CSS
  function loadDeferredCSS() {
    const deferredStyles = document.querySelectorAll('link[rel="preload"][as="style"]');
    deferredStyles.forEach(link => {
      link.rel = 'stylesheet';
    });
  }

  // 3. PRELOAD CRITICAL RESOURCES
  function preloadCriticalResources() {
    // Preload critical fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.as = 'font';
    fontPreload.type = 'font/woff2';
    fontPreload.crossOrigin = 'anonymous';
    fontPreload.href = 'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2';
    document.head.appendChild(fontPreload);
  }

  // 4. OPTIMIZE FONT LOADING
  function optimizeFontLoading() {
    if ('fonts' in document) {
      // Use Font Loading API
      const poppins = new FontFace('Poppins', 
        'url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2)',
        { weight: '400', style: 'normal' }
      );
      
      poppins.load().then(font => {
        document.fonts.add(font);
        document.body.classList.add('fonts-loaded');
      });
    }
  }

  // 5. DEBOUNCE SCROLL EVENTS
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // 6. OPTIMIZE SCROLL PERFORMANCE
  function optimizeScrollPerformance() {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Your scroll handling code here
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // 7. REDUCE LAYOUT THRASHING
  function batchDOMReads() {
    // Read phase
    const reads = [];
    const writes = [];
    
    return {
      read: (fn) => reads.push(fn),
      write: (fn) => writes.push(fn),
      flush: () => {
        reads.forEach(fn => fn());
        writes.forEach(fn => fn());
        reads.length = 0;
        writes.length = 0;
      }
    };
  }

  // 8. PERFORMANCE MONITORING
  function monitorPerformance() {
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Monitor Cumulative Layout Shift
      let clsScore = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
            console.log('CLS:', clsScore);
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }

  // 9. RESOURCE HINTS
  function addResourceHints() {
    // DNS Prefetch for external domains
    const dnsPrefetch = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://cdnjs.cloudflare.com'
    ];
    
    dnsPrefetch.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Preconnect to critical origins
    const preconnect = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    
    preconnect.forEach(origin => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  // 10. COMPRESS AND CACHE
  function setupCaching() {
    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(reg => console.log('Service Worker registered'))
          .catch(err => console.log('Service Worker registration failed'));
      });
    }
  }

  // INITIALIZE ON DOM READY
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Run optimizations
    addResourceHints();
    preloadCriticalResources();
    optimizeFontLoading();
    lazyLoadImages();
    optimizeScrollPerformance();
    
    // Defer non-critical operations
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        loadDeferredCSS();
        monitorPerformance();
        setupCaching();
      });
    } else {
      setTimeout(() => {
        loadDeferredCSS();
        monitorPerformance();
        setupCaching();
      }, 1000);
    }
  }

  // Export utilities
  window.performanceUtils = {
    debounce,
    batchDOMReads,
    lazyLoadImages
  };
})();
