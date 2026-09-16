// ── Background Floating Particles ──
function createBackgroundParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const particleCount = 50;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    particle.style.animationDuration = `${Math.random() * 20 + 10}s`;

    container.appendChild(particle);
  }
}

// ── Hover Particles on Facility Cards ──
function createHoverParticles(container) {
  if (!container) return;
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hover-particle');

    const size = Math.random() * 10 + 5;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 0.5;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    particle.style.animation = `hoverFloat ${duration}s ease-in-out ${delay}s infinite`;

    container.appendChild(particle);
  }
}

// ── Scroll: Nav + Progress ──
window.addEventListener('scroll', function () {
  const nav = document.getElementById('mainNav');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 100);
  }

  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    const scrolled = (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
    scrollProgress.style.width = scrolled + '%';
  }
});

// ── Cursor hover effects ──
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) cursor.classList.add('active');
  });
  el.addEventListener('mouseleave', () => {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) cursor.classList.remove('active');
  });
});

// ── Gallery Slider (grid layout — no transform needed) ──
const slides = document.querySelectorAll('.gallery-slide');
function showSlide() {
  slides.forEach(slide => { slide.style.transform = ''; });
}
showSlide();

// ── Hover particle animation keyframe ──
const hoverStyle = document.createElement('style');
hoverStyle.textContent = `
  @keyframes hoverFloat {
    0%   { transform: translate(0, 0) rotate(0deg); opacity: 1; }
    50%  { opacity: 0.8; }
    100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg); opacity: 0; }
  }
`;
document.head.appendChild(hoverStyle);

// ── DOMContentLoaded: init everything ──
document.addEventListener('DOMContentLoaded', function () {

  // Background particles
  createBackgroundParticles();

  // Animate cards on scroll
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.building-card, .facility-card, .laser-card').forEach(card => {
    animateOnScroll.observe(card);
  });

  // Animate generic elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.facility-card').forEach(card => {
    observer.observe(card);
  });

  // Hover particles on facility cards
  document.querySelectorAll('.facility-card').forEach(card => {
    const particleContainer = card.querySelector('.hover-particles');
    if (!particleContainer) return;

    card.addEventListener('mouseenter', () => {
      createHoverParticles(particleContainer);
    });
    card.addEventListener('mouseleave', () => {
      particleContainer.innerHTML = '';
    });
  });

  // YouTube Player — only if element exists
  if (!document.getElementById('youtube-video')) return;

  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.getElementsByTagName('script')[0].parentNode.insertBefore(tag, document.getElementsByTagName('script')[0]);

  let player, timer;

  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('youtube-video', {
      events: {
        onStateChange: function (event) {
          const playIcon = document.getElementById('playIcon');
          const pauseIcon = document.getElementById('pauseIcon');
          if (event.data === YT.PlayerState.PLAYING) {
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
            timer = setInterval(updateTimerDisplay, 1000);
          } else {
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
            clearInterval(timer);
          }
        }
      }
    });
  };

  function updateTimerDisplay() {
    if (!player || !player.getDuration) return;
    const progressBar = document.getElementById('progressBar');
    const timeDisplay = document.getElementById('timeDisplay');
    const currentTime = player.getCurrentTime();
    const duration = player.getDuration();
    if (progressBar) progressBar.style.width = `${(currentTime / duration) * 100}%`;
    if (timeDisplay) timeDisplay.textContent = `${fmt(currentTime)} / ${fmt(duration)}`;
  }

  function fmt(s) {
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  }

  const playBtn = document.getElementById('playBtn');
  const progressContainer = document.getElementById('progressContainer');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  if (playBtn) playBtn.addEventListener('click', () => {
    if (!player) return;
    player.getPlayerState() === YT.PlayerState.PLAYING ? player.pauseVideo() : player.playVideo();
  });

  if (progressContainer) progressContainer.addEventListener('click', (e) => {
    if (!player) return;
    const pos = (e.pageX - progressContainer.getBoundingClientRect().left) / progressContainer.offsetWidth;
    player.seekTo(pos * player.getDuration(), true);
  });

  if (fullscreenBtn) fullscreenBtn.addEventListener('click', () => {
    const iframe = document.querySelector('.youtube-iframe');
    if (!iframe) return;
    if (!document.fullscreenElement) {
      iframe.requestFullscreen().catch(err => console.log(`Fullscreen error: ${err.message}`));
    } else {
      document.exitFullscreen();
    }
  });
});
