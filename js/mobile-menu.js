// ============================================
// MOBILE MENU - FORCE VISIBILITY VERSION
// ============================================

console.log('=== MOBILE MENU SCRIPT LOADED ===');

(function() {
  'use strict';
  
  function initMobileMenu() {
    console.log('Initializing mobile menu...');
    
    var btn = document.getElementById('mobileMenuBtn');
    var menu = document.getElementById('navLinks');
    
    if (!btn || !menu) {
      console.error('ERROR: Mobile menu elements not found!');
      return;
    }
    
    console.log('✓ Both elements found successfully');
    
    // Toggle menu
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('=== BUTTON CLICKED ===');
      
      var isActive = menu.classList.contains('active');
      
      if (isActive) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    
    // Close menu when clicking links
    var links = menu.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function(e) {
        console.log('Link clicked - closing menu');
        closeMenu();
      });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (menu.classList.contains('active')) {
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
          console.log('Clicked outside - closing menu');
          closeMenu();
        }
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('active')) {
        console.log('Escape pressed - closing menu');
        closeMenu();
      }
    });
    
    function openMenu() {
      console.log('>>> OPENING MENU <<<');
      
      // Add active class
      menu.classList.add('active');
      document.body.classList.add('menu-open');
      
      // FORCE z-index with inline style (highest priority)
      menu.style.zIndex = '2147483647';
      menu.style.position = 'fixed';
      menu.style.visibility = 'visible';
      menu.style.opacity = '1';
      
      // Change button icon
      btn.innerHTML = '<i class="fas fa-times"></i>';
      btn.setAttribute('aria-expanded', 'true');
      btn.style.zIndex = '2147483647';
      
      // Force all page content to lower z-index
      var homeSection = document.querySelector('.home-section');
      var homeContent = document.querySelector('.home-content');
      var homeBgs = document.querySelectorAll('.home-bg');
      
      if (homeSection) {
        homeSection.style.zIndex = '0';
      }
      if (homeContent) {
        homeContent.style.zIndex = '0';
      }
      homeBgs.forEach(function(bg) {
        bg.style.zIndex = '0';
      });
      
      console.log('Menu opened with forced z-index');
    }
    
    function closeMenu() {
      console.log('>>> CLOSING MENU <<<');
      
      // Remove active class
      menu.classList.remove('active');
      document.body.classList.remove('menu-open');
      
      // Remove inline styles
      menu.style.zIndex = '';
      
      // Change button icon
      btn.innerHTML = '<i class="fas fa-bars"></i>';
      btn.setAttribute('aria-expanded', 'false');
      
      // Reset page content z-index
      var homeSection = document.querySelector('.home-section');
      var homeContent = document.querySelector('.home-content');
      
      if (homeSection) {
        homeSection.style.zIndex = '';
      }
      if (homeContent) {
        homeContent.style.zIndex = '';
      }
      
      console.log('Menu closed');
    }
    
    console.log('✓ Mobile menu initialized successfully');
// Expose functions globally for other scripts
window.openMobileMenu = openMenu;
window.closeMobileMenu = closeMenu;
window.toggleMobileMenu = function() {
  if (menu.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
};
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
  
})();

console.log('=== MOBILE MENU SCRIPT END ===');
