  // Sticky navigation effect
  const nav = document.getElementById('mainNav');
  const logoImg = document.getElementById('logoImg');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  

  // Mobile menu - Handled by mobile-menu.js

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open (using global function from mobile-menu.js)
      if (typeof window.closeMobileMenu === 'function') {
        window.closeMobileMenu();
      }
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Create floating particles
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 8 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100 + 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 15;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    particlesContainer.appendChild(particle);
  }

  // Background Slideshow
  const bgSlides = document.querySelectorAll('.university-bg');
  let currentSlide = 0;
  
  function changeBackground() {
    bgSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % bgSlides.length;
    bgSlides[currentSlide].classList.add('active');
  }
  
  setInterval(changeBackground, 5000);

  // Initialize the slideshow
  changeBackground();

// Video Gallery Functionality
// Video Gallery Functionality
// Video Gallery Functionality - Fixed Version
const videoPreviews = document.querySelectorAll('.video-preview');
const playButtons = document.querySelectorAll('.play-icon');
const videoModal = document.getElementById('videoModal');
let currentModalVideo = null;

// Debugging function
function logVideoState(video, prefix = "") {
console.log(`${prefix} Video State:`, {
  paused: video.paused,
  ended: video.ended,
  currentTime: video.currentTime,
  readyState: video.readyState,
  networkState: video.networkState,
  error: video.error
});
}

// Properly destroy video element
function destroyVideoElement(video) {
if (!video) return;

console.log("Destroying video element...");
logVideoState(video, "Before destruction");

// 1. Stop playback
video.pause();

// 2. Remove all event listeners
video.oncanplay = null;
video.onerror = null;
video.onplay = null;
video.onpause = null;
video.onended = null;

// 3. Remove source and trigger load
video.removeAttribute('src');
const source = video.querySelector('source');
if (source) {
  source.remove();
}
video.load();

// 4. Remove from DOM
video.remove();

console.log("Video element destroyed");
}

// Close modal and completely clean up video
function closeVideoModal() {
console.log("Closing video modal...");

if (currentModalVideo) {
  destroyVideoElement(currentModalVideo);
  currentModalVideo = null;
}

videoModal.classList.remove('active');
videoModal.innerHTML = ''; // Clear all modal content

console.log("Video modal closed and cleaned up");
}

// Open modal with video
function openVideoModal(videoSrc) {
console.log(`Opening video modal for: ${videoSrc}`);

// Close any existing modal first
if (currentModalVideo) {
  closeVideoModal();
}

// Create new modal content
videoModal.innerHTML = `
  <div class="modal-content">
    <span class="close-modal">&times;</span>
    <div class="video-loading">
      <i class="fas fa-spinner fa-spin"></i> Loading video...
    </div>
    <video class="modal-video" id="modalVideo" controls>
      <source src="${videoSrc}" type="video/mp4">
    </video>
    <div class="video-fallback" style="display:none;">
      <p><i class="fas fa-exclamation-triangle"></i> Video could not be loaded</p>
      <button class="retry-btn"><i class="fas fa-sync-alt"></i> Retry</button>
    </div>
  </div>
`;

const modalVideo = videoModal.querySelector('#modalVideo');
currentModalVideo = modalVideo;
const loadingMessage = videoModal.querySelector('.video-loading');
const fallbackMessage = videoModal.querySelector('.video-fallback');
const closeButton = videoModal.querySelector('.close-modal');

// Video event handlers
modalVideo.oncanplay = function() {
  console.log("Video can play");
  loadingMessage.style.display = 'none';
  this.play().catch(e => {
    console.error("Video play failed:", e);
    fallbackMessage.style.display = 'block';
  });
};

modalVideo.onerror = function() {
  console.error("Video error:", this.error);
  loadingMessage.style.display = 'none';
  fallbackMessage.style.display = 'block';
};

modalVideo.onended = function() {
  console.log("Video ended naturally");
  this.currentTime = 0;
};

// Retry button handler
videoModal.querySelector('.retry-btn')?.addEventListener('click', function() {
  console.log("Retrying video load...");
  fallbackMessage.style.display = 'none';
  loadingMessage.style.display = 'block';
  modalVideo.load();
});

// Close button handler
closeButton.addEventListener('click', closeVideoModal);

videoModal.classList.add('active');
console.log("Video modal opened");
}

// Play button handlers
playButtons.forEach((button, index) => {
button.addEventListener('click', function() {
  const videoCard = this.closest('.video-card');
  const videoPreview = videoCard.querySelector('.video-preview');
  const videoSrc = videoPreview.querySelector('source').src;
  openVideoModal(videoSrc);
});
});

// Close modal when clicking outside
videoModal.addEventListener('click', function(e) {
if (e.target === videoModal) {
  closeVideoModal();
}
});

// Preview video hover behavior
videoPreviews.forEach(video => {
video.addEventListener('mouseenter', function() {
  this.muted = true;
  this.play().catch(e => console.log("Preview play ignored:", e));
});

video.addEventListener('mouseleave', function() {
  this.pause();
  this.currentTime = 0;
});
});

// Ensure videos are stopped when page is hidden
document.addEventListener('visibilitychange', function() {
if (document.hidden && currentModalVideo) {
  console.log("Page hidden - stopping video");
  closeVideoModal();
}
});

// Clean up on page unload
window.addEventListener('beforeunload', function() {
if (currentModalVideo) {
  console.log("Page unloading - cleaning up video");
  closeVideoModal();
}
});
// Close modal when clicking outside
videoModal.addEventListener('click', function(e) {
if (e.target === videoModal) {
  videoModal.classList.remove('active');
  const modalVideo = videoModal.querySelector('#modalVideo');
  if (modalVideo) {
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }
}
});
  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.video-card, .topper-card, .program-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);

  // Create about particles
  const aboutParticles = document.createElement('div');
  aboutParticles.classList.add('particles');
  aboutParticles.id = 'aboutParticles';
  document.querySelector('.university-description').appendChild(aboutParticles);
  
  const aboutParticleCount = 20;
  
  for (let i = 0; i < aboutParticleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('about-particle');
    
    // Random properties
    const size = Math.random() * 10 + 5;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 15 + 10;
    const opacity = Math.random() * 0.4 + 0.1;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.opacity = opacity;
    particle.style.background = `rgba(${Math.floor(Math.random() * 56) + 200}, ${Math.floor(Math.random() * 56) + 200}, ${Math.floor(Math.random() * 56) + 200}, ${opacity})`;
    
    aboutParticles.appendChild(particle);
  }

  // Highlight effect for features
  const highlights = document.querySelectorAll('.highlight');
  
  highlights.forEach(highlight => {
    highlight.addEventListener('mouseenter', function() {
      this.style.color = 'var(--accent)';
    });
    
    highlight.addEventListener('mouseleave', function() {
      this.style.color = 'var(--primary)';
    });
  });

  // Responsive adjustments
  function handleResize() {
    if (window.innerWidth < 768) {
      // Mobile adjustments
    } else {
      // Desktop adjustments
    }
  }

  window.addEventListener('resize', handleResize);
  handleResize();

// Function to handle cross-page section scrolling
function scrollToSection(page, sectionId) {
  // Check if we're already on the target page
  if (window.location.href.includes(page)) {
    // Scroll to section if it exists
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    return false; // Prevent default link behavior
  }
  // If not on the target page, let the link load normally
  return true;
}

// Alternative: Force scroll after page load (if coming from another page)
window.onload = function() {
  const hash = window.location.hash;
  if (hash) {
    const targetSection = document.querySelector(hash);
    if (targetSection) {
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }, 500); // Small delay to ensure page is fully loaded
    }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  animateOnScroll(); // Run immediately
  window.addEventListener('scroll', animateOnScroll);
  
  // Force reflow to trigger animations
  document.querySelectorAll('.video-card, .topper-card, .program-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px)';
  });
});

// Scroll indicator removed

// Animate programs on scroll
function animateProgramsOnScroll() {
const programCards = document.querySelectorAll('.program-card');
const triggerBottom = window.innerHeight / 5 * 4;

programCards.forEach(card => {
  const cardTop = card.getBoundingClientRect().top;
  
  if (cardTop < triggerBottom) {
    card.classList.add('visible');
  }
});
}

// Run on load and scroll
window.addEventListener('load', animateProgramsOnScroll);
window.addEventListener('scroll', animateProgramsOnScroll);


document.addEventListener('DOMContentLoaded', function() {
  // Create golden particles for BS Students section
  function createParticles(containerId, count = 20) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random properties
      const size = Math.random() * 5 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = Math.random() * 10 + 15;
      const opacity = Math.random() * 0.3 + 0.1;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.opacity = opacity;
      particle.style.background = `rgba(247, 199, 68, ${opacity})`;
      particle.style.boxShadow = `0 0 ${size*2}px rgba(247, 199, 68, ${opacity})`;
      particle.style.borderRadius = '50%';
      
      container.appendChild(particle);
    }
  }
  
  // Initialize particles for both images
  createParticles('particles1');
  createParticles('particles2');
  
  // Add subtle scale effect
  const studentGroups = document.querySelectorAll('.student-group');
  studentGroups.forEach(group => {
    group.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)';
    });
    
    group.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
});

document.querySelectorAll('.nav-links a[href="#admission"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
  e.preventDefault();
  
  // Close mobile menu if open
  if (navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }
  
  // Scroll to admission section
  document.getElementById('admission').scrollIntoView({
    behavior: 'smooth'
  });
});
});




const cursor = document.querySelector('.custom-cursor');  

document.addEventListener('mousemove', (e) => {  
cursor.style.left = e.clientX + 'px';  
cursor.style.top = e.clientY + 'px';  
});  

// Hover effects  
document.querySelectorAll('a, button').forEach(el => {  
el.addEventListener('mouseenter', () => cursor.classList.add('hover'));  
el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));  
});  

// Click effect  
document.addEventListener('mousedown', () => cursor.classList.add('click'));  
document.addEventListener('mouseup', () => cursor.classList.remove('click'));