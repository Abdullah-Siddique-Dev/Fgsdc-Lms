// ============================================
// MOBILE MENU FIX - MOVES MENU TO BODY LEVEL
// This ensures menu is not trapped in any container
// ============================================

(function() {
  'use strict';
  
  console.log('Mobile Menu Fix: Loading...');
  
  function fixMobileMenu() {
    var menu = document.getElementById('navLinks');
    var btn = document.getElementById('mobileMenuBtn');
    
    if (!menu || !btn) {
      console.error('Mobile Menu Fix: Elements not found');
      return;
    }
    
    console.log('Mobile Menu Fix: Elements found');
    
    // Store original parent and position
    var originalParent = menu.parentElement;
    var originalNextSibling = menu.nextSibling;
    var menuMoved = false;
    
    // Create a placeholder to mark the original position
    var placeholder = document.createElement('div');
    placeholder.id = 'navLinks-placeholder';
    placeholder.style.display = 'none';
    
    // Listen for button clicks
    btn.addEventListener('click', function() {
      setTimeout(function() {
        var isActive = menu.classList.contains('active');
        
        if (isActive && !menuMoved) {
          // Menu is opening - move it to body
          console.log('Mobile Menu Fix: Moving menu to body level');
          
          // Insert placeholder at original position
          originalParent.insertBefore(placeholder, menu);
          
          // Move menu to body
          document.body.appendChild(menu);
          menuMoved = true;
          
          console.log('Mobile Menu Fix: Menu moved successfully');
        } else if (!isActive && menuMoved) {
          // Menu is closing - move it back
          console.log('Mobile Menu Fix: Moving menu back to nav');
          
          // Wait for close animation
          setTimeout(function() {
            // Move menu back to original position
            if (originalNextSibling) {
              originalParent.insertBefore(menu, originalNextSibling);
            } else {
              originalParent.appendChild(menu);
            }
            
            // Remove placeholder
            if (placeholder.parentElement) {
              placeholder.parentElement.removeChild(placeholder);
            }
            
            menuMoved = false;
            console.log('Mobile Menu Fix: Menu restored to original position');
          }, 300);
        }
      }, 10);
    });
    
    console.log('Mobile Menu Fix: Initialized successfully');
  }
  
  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixMobileMenu);
  } else {
    fixMobileMenu();
  }
  
})();
