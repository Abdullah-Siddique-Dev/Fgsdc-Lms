 // Navigation Scroll Effect
 window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    // Scroll Indicator
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.scrollY / scrollTotal) * 100;
    scrollProgress.style.height = scrollPercentage + '%';
  });

  // Mobile Menu - Handled by mobile-menu.js

  // Video Player Functionality
  const cricketVideo = document.getElementById('cricketVideo');
  const cricketPlayButton = document.getElementById('cricketPlayButton');
  const cricketPlayPauseBtn = document.getElementById('cricketPlayPauseBtn');
  const cricketProgressBar = document.getElementById('cricketProgressBar');
  const cricketProgressContainer = document.getElementById('cricketProgressContainer');
  const cricketTimeDisplay = document.getElementById('cricketTimeDisplay');
  const cricketMuteBtn = document.getElementById('cricketMuteBtn');
  const cricketVolumeSlider = document.getElementById('cricketVolumeSlider');
  const cricketFullscreenBtn = document.getElementById('cricketFullscreenBtn');
  const cricketVideoCloseBtn = document.getElementById('cricketVideoCloseBtn');
  const cricketVideoContainer = document.getElementById('cricketVideoContainer');

  if (cricketVideo && cricketPlayButton && cricketPlayPauseBtn) {

  cricketPlayButton.addEventListener('click', function() {
    cricketVideoContainer.classList.add('playing');
    cricketVideo.play();
    cricketPlayButton.style.display = 'none';
    cricketPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  });

  cricketPlayPauseBtn.addEventListener('click', function() {
    if (cricketVideo.paused) {
      cricketVideo.play();
      this.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      cricketVideo.pause();
      this.innerHTML = '<i class="fas fa-play"></i>';
    }
  });

  cricketVideo.addEventListener('timeupdate', function() {
    const progress = (cricketVideo.currentTime / cricketVideo.duration) * 100;
    cricketProgressBar.style.width = progress + '%';
    
    // Update time display
    const currentMinutes = Math.floor(cricketVideo.currentTime / 60);
    const currentSeconds = Math.floor(cricketVideo.currentTime % 60);
    const durationMinutes = Math.floor(cricketVideo.duration / 60);
    const durationSeconds = Math.floor(cricketVideo.duration % 60);
    cricketTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds} / ${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
  });

  cricketProgressContainer.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const pos = (e.pageX - rect.left) / this.offsetWidth;
    cricketVideo.currentTime = pos * cricketVideo.duration;
  });

  cricketMuteBtn.addEventListener('click', function() {
    cricketVideo.muted = !cricketVideo.muted;
    this.innerHTML = cricketVideo.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
  });

  cricketVolumeSlider.addEventListener('input', function() {
    cricketVideo.volume = this.value;
    cricketVideo.muted = (this.value == 0);
    cricketMuteBtn.innerHTML = cricketVideo.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
  });

  cricketFullscreenBtn.addEventListener('click', function() {
    if (!document.fullscreenElement) {
      cricketVideoContainer.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  });

  cricketVideoCloseBtn.addEventListener('click', function() {
    cricketVideo.pause();
    cricketVideo.currentTime = 0;
    cricketVideoContainer.classList.remove('playing');
    cricketPlayButton.style.display = 'flex';
    cricketPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    cricketProgressBar.style.width = '0%';
  });

  cricketVideo.addEventListener('ended', function() {
    cricketVideo.currentTime = 0;
    cricketVideoContainer.classList.remove('playing');
    cricketPlayButton.style.display = 'flex';
    cricketPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    cricketProgressBar.style.width = '0%';
  });

  } // end cricket video guard

  // Carousel Functionality
  function setupCarousel(carouselId, prevBtnId, nextBtnId, indicatorsId) {
    const carousel = document.getElementById(carouselId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const indicators = document.getElementById(indicatorsId);
    if (!carousel || !prevBtn || !nextBtn || !indicators) return;
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicatorDots = indicators.querySelectorAll('.indicator');
    if (!slides.length) return;
    let currentIndex = 0;
    let intervalId;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
          slide.classList.add('active');
        }
      });
      
      indicatorDots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
          dot.classList.add('active');
        }
      });
      
      currentIndex = index;
    }

    function nextSlide() {
      let newIndex = (currentIndex + 1) % slides.length;
      showSlide(newIndex);
    }

    function prevSlide() {
      let newIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(newIndex);
    }

    function startAutoSlide() {
      intervalId = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
      clearInterval(intervalId);
    }

    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });

    indicatorDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        stopAutoSlide();
        startAutoSlide();
      });
    });

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();
    showSlide(0);
  }

  // Initialize all carousels
  if (document.getElementById('ballThrowCarousel')) {
    setupCarousel('ballThrowCarousel', 'ballPrevBtn', 'ballNextBtn', 'ballIndicators');
  }
  if (document.getElementById('javelinCarousel')) {
    setupCarousel('javelinCarousel', 'javelinPrevBtn', 'javelinNextBtn', 'javelinIndicators');
  }

  // Floating Particles
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size between 2px and 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation duration between 10s and 20s
    const duration = Math.random() * 10 + 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Random delay
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    particlesContainer.appendChild(particle);
  }

  // Green Particles Animation
  const greenParticles = document.getElementById('greenParticles');
  const greenParticleCount = 40;

  for (let i = 0; i < greenParticleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('green-particle');
    
    // Random size between 2px and 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation duration between 10s and 20s
    const duration = Math.random() * 10 + 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Random delay
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    greenParticles.appendChild(particle);
  }

  // Animate cards when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.visit-card').forEach(card => {
    observer.observe(card);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });






  // ceremony
      // Add some interactive effects
      document.addEventListener('DOMContentLoaded', function() {
      // Add animation to category cards on scroll
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.category-card').forEach(card => {
        observer.observe(card);
      });

      // Award item hover handled by CSS only
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



// ── Teacher Day Carousel ──
(function () {
  const slides = document.querySelectorAll('.teacher-carousel-slide');
  const dots   = document.querySelectorAll('.teacher-dot');
  const prev   = document.getElementById('teacherPrev');
  const next   = document.getElementById('teacherNext');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function show(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    timer = setInterval(() => show(current + 1), 4000);
  }

  function resetAuto() {
    clearInterval(timer);
    startAuto();
  }

  prev.addEventListener('click', () => { show(current - 1); resetAuto(); });
  next.addEventListener('click', () => { show(current + 1); resetAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      show(parseInt(dot.dataset.index));
      resetAuto();
    });
  });

  startAuto();
})();
