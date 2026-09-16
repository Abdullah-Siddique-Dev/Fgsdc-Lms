 // Debug: Check if script is loading
 console.log('Main.js loaded successfully!');
 
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

 // Background Slideshow - Simple instant change
 const bgSlides = document.querySelectorAll('.home-bg');
 let currentSlide = 0;
 
 function changeBackground() {
   // Remove active from all slides
   bgSlides.forEach(slide => slide.classList.remove('active'));
   
   // Move to next slide
   currentSlide = (currentSlide + 1) % bgSlides.length;
   
   // Add active to current slide
   bgSlides[currentSlide].classList.add('active');
 }
 
 setInterval(changeBackground, 5000);

 // Initialize the slideshow
 bgSlides[0].classList.add('active');


 // Video section — only run if video element exists
 const videoContainer = document.getElementById('videoContainer');
 const collegeVideo = document.getElementById('collegeVideo');

 if (videoContainer && collegeVideo) {

 const videoObserver = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
     if (entry.isIntersecting) {
       videoContainer.classList.add('visible');
     }
   });
 }, { threshold: 0.3 });
 videoObserver.observe(videoContainer);

 // Video Player Functionality
 const playButton = document.getElementById('playButton');
 const videoCloseBtn = document.getElementById('videoCloseBtn');
 const playPauseBtn = document.getElementById('playPauseBtn');
 const progressBar = document.getElementById('progressBar');
 const progressContainer = document.getElementById('progressContainer');
 const timeDisplay = document.getElementById('timeDisplay');
 const muteBtn = document.getElementById('muteBtn');
 const volumeSlider = document.getElementById('volumeSlider');
 const fullscreenBtn = document.getElementById('fullscreenBtn');

 function formatTime(seconds) {
   const minutes = Math.floor(seconds / 60);
   const secs = Math.floor(seconds % 60);
   return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
 }

 function updateProgress() {
   const progress = (collegeVideo.currentTime / collegeVideo.duration) * 100;
   progressBar.style.width = `${progress}%`;
   timeDisplay.textContent = `${formatTime(collegeVideo.currentTime)} / ${formatTime(collegeVideo.duration)}`;
 }

 function setProgress(e) {
   const width = this.clientWidth;
   const clickX = e.offsetX;
   collegeVideo.currentTime = (clickX / width) * collegeVideo.duration;
 }

 function togglePlayPause() {
   if (collegeVideo.paused) {
     collegeVideo.play();
     playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
     playButton.style.display = 'none';
     showClickFeedback('play');
   } else {
     collegeVideo.pause();
     playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
     showClickFeedback('pause');
   }
 }

 function showClickFeedback(type) {
   const existing = videoContainer.querySelector('.video-click-feedback');
   if (existing) existing.remove();
   const feedback = document.createElement('div');
   feedback.className = 'video-click-feedback';
   feedback.innerHTML = type === 'play' ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
   videoContainer.appendChild(feedback);
   requestAnimationFrame(() => {
     feedback.classList.add('show');
     setTimeout(() => {
       feedback.classList.add('hide');
       setTimeout(() => feedback.remove(), 300);
     }, 500);
   });
 }

 function toggleMute() {
   collegeVideo.muted = !collegeVideo.muted;
   muteBtn.innerHTML = collegeVideo.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
   volumeSlider.value = collegeVideo.muted ? 0 : collegeVideo.volume;
 }

 function setVolume() {
   collegeVideo.volume = this.value;
   collegeVideo.muted = this.value == 0;
   muteBtn.innerHTML = this.value == 0 ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
 }

 function toggleFullscreen() {
   if (!document.fullscreenElement) {
     videoContainer.requestFullscreen().catch(err => console.error(err.message));
     fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
   } else {
     document.exitFullscreen();
     fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
   }
 }

 function closeVideo() {
   collegeVideo.pause();
   playButton.style.display = 'flex';
 }

 collegeVideo.addEventListener('timeupdate', updateProgress);
 collegeVideo.addEventListener('ended', () => {
   playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
   playButton.style.display = 'flex';
 });
 collegeVideo.addEventListener('click', togglePlayPause);
 progressContainer.addEventListener('click', setProgress);
 playButton.addEventListener('click', togglePlayPause);
 playPauseBtn.addEventListener('click', togglePlayPause);
 muteBtn.addEventListener('click', toggleMute);
 volumeSlider.addEventListener('input', setVolume);
 fullscreenBtn.addEventListener('click', toggleFullscreen);
 videoCloseBtn.addEventListener('click', closeVideo);
 collegeVideo.volume = volumeSlider.value;

 } // end video guard



 const aboutParticles = document.getElementById('aboutParticles');
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
   particle.style.background = `rgba(${Math.floor(Math.random() * 106) + 48}, ${Math.floor(Math.random() * 147)}, ${Math.floor(Math.random() * 255)}, ${opacity})`;
   
   aboutParticles.appendChild(particle);
 }

 // FAQ Accordion Functionality
 const faqItems = document.querySelectorAll('.faq-item');
 
 faqItems.forEach(item => {
   const question = item.querySelector('.faq-question');
   
   question.addEventListener('click', () => {
     // Close all other items
     faqItems.forEach(otherItem => {
       if (otherItem !== item && otherItem.classList.contains('active')) {
         otherItem.classList.remove('active');
       }
     });
     
     // Toggle current item
     item.classList.toggle('active');
   });
 });

 // Animate about section on scroll
 const aboutObserver = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
     if (entry.isIntersecting) {
       entry.target.querySelector('.about-content').style.animation = 'fadeInUp 1s ease forwards 0.3s';
     }
   });
 }, { threshold: 0.1 });

 aboutObserver.observe(document.querySelector('.about-section'));


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
 anchor.addEventListener('click', function(e) {
   e.preventDefault();
   const targetId = this.getAttribute('href');
   const targetSection = document.querySelector(targetId);
   if (targetSection) {
     targetSection.scrollIntoView({ behavior: 'smooth' });
   }
 });
});
// Scroll indicator removed

// Previous JavaScript remains the same until the about section

 // Updated Gallery Carousel Functionality for 6 images
 const carouselEl = document.querySelector('.gallery-carousel');
 const slides = carouselEl ? carouselEl.querySelectorAll('.gallery-slide') : [];
 const dots = document.querySelectorAll('.gallery-dot');
 const prevArrow = document.querySelector('.prev-arrow');
 const nextArrow = document.querySelector('.next-arrow');
 let currentIndex = 0;
 let slideInterval;

 if (!slides.length || !prevArrow || !nextArrow) {
   console.warn('Gallery carousel elements not found');
 } else {

 // Show current slide
 function showSlide(index) {
   if (index >= slides.length) {
     index = 0;
   } else if (index < 0) {
     index = slides.length - 1;
   }
   
   slides.forEach(slide => slide.classList.remove('active'));
   dots.forEach(dot => dot.classList.remove('active'));
   
   slides[index].classList.add('active');
   if (dots[index]) dots[index].classList.add('active');
   currentIndex = index;
 }

 function nextSlide() { showSlide(currentIndex + 1); }
 function prevSlide() { showSlide(currentIndex - 1); }
 function startSlideShow() { slideInterval = setInterval(nextSlide, 3000); }
 function pauseSlideShow() { clearInterval(slideInterval); }

 nextArrow.addEventListener('click', () => { nextSlide(); pauseSlideShow(); startSlideShow(); });
 prevArrow.addEventListener('click', () => { prevSlide(); pauseSlideShow(); startSlideShow(); });

 dots.forEach(dot => {
   dot.addEventListener('click', () => {
     showSlide(parseInt(dot.getAttribute('data-index')));
     pauseSlideShow();
     startSlideShow();
   });
 });

 showSlide(0);
 startSlideShow();

 carouselEl.addEventListener('mouseenter', pauseSlideShow);
 carouselEl.addEventListener('mouseleave', startSlideShow);

 } // end carousel guard



    // Previous JavaScript remains the same until admission section

 // Admission Tab Functionality
 const tabBtns = document.querySelectorAll('.tab-btn');
 const tabContents = document.querySelectorAll('.tab-content');

 tabBtns.forEach(btn => {
   btn.addEventListener('click', () => {
     const tabId = btn.getAttribute('data-tab');
     
     // Remove active class from all buttons and contents
     tabBtns.forEach(btn => btn.classList.remove('active'));
     tabContents.forEach(content => content.classList.remove('active'));
     
     // Add active class to clicked button and corresponding content
     btn.classList.add('active');
     document.querySelector(`.${tabId}-tab`).classList.add('active');
   });
 });

 // Download Prospectus Button Animation
 const downloadBtn = document.getElementById('downloadProspectus');
 
 downloadBtn.addEventListener('mouseenter', () => {
   downloadBtn.style.animation = 'none';
   void downloadBtn.offsetWidth; // Trigger reflow
   downloadBtn.style.animation = 'laserBorder 2s linear infinite';
 });
 
 downloadBtn.addEventListener('mouseleave', () => {
   downloadBtn.style.animation = 'none';
 });

 // Create floating particles for admission section
 const admissionParticles = document.getElementById('admissionParticles');
 const admissionParticleCount = 30;
 
 for (let i = 0; i < admissionParticleCount; i++) {
   const particle = document.createElement('div');
   particle.classList.add('admission-particle');
   
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
   particle.style.background = `rgba(${Math.floor(Math.random() * 106) + 48}, ${Math.floor(Math.random() * 147)}, ${Math.floor(Math.random() * 255)}, ${opacity})`;
   
   admissionParticles.appendChild(particle);
 }


     // Previous JavaScript remains the same until gallery section

 // Gallery Particles Animation
 const galleryParticles = document.getElementById('galleryParticles');
 const galleryParticleCount = 20;
 
 for (let i = 0; i < galleryParticleCount; i++) {
   const particle = document.createElement('div');
   particle.classList.add('gallery-particle');
   
   // Random properties
   const size = Math.random() * 8 + 3;
   const posX = Math.random() * 100;
   const posY = Math.random() * 100;
   const delay = Math.random() * 15;
   const duration = Math.random() * 15 + 10;
   const opacity = Math.random() * 0.3 + 0.1;
   
   particle.style.width = `${size}px`;
   particle.style.height = `${size}px`;
   particle.style.left = `${posX}%`;
   particle.style.top = `${posY}%`;
   particle.style.animationDelay = `${delay}s`;
   particle.style.animationDuration = `${duration}s`;
   particle.style.opacity = opacity;
   particle.style.background = `rgba(${Math.floor(Math.random() * 106) + 48}, ${Math.floor(Math.random() * 147)}, ${Math.floor(Math.random() * 255)}, ${opacity})`;
   
   galleryParticles.appendChild(particle);
 }

 // Gallery Hover Effect Enhancement
 const galleryItems = document.querySelectorAll('.gallery-item');
 
 galleryItems.forEach(item => {
   item.addEventListener('mouseenter', function() {
     // Scale down the other item
     galleryItems.forEach(otherItem => {
       if (otherItem !== this) {
         otherItem.style.flex = '0.5';
       }
     });
   });
   
   item.addEventListener('mouseleave', function() {
     // Reset all items
     galleryItems.forEach(item => {
       item.style.flex = '1';
     });
   });
 });

 // Add this to your existing JavaScript
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





/* chatbot*/

document.addEventListener('DOMContentLoaded', function() {
 // DOM Elements
 const chatbotToggle = document.getElementById('chatbotToggle');
 const chatbotWindow = document.getElementById('chatbotWindow');
 const chatbotClose = document.getElementById('chatbotClose');
 const chatbotBody = document.getElementById('chatbotBody');
 const chatbotInput = document.getElementById('chatbotInput');
 const chatbotSend = document.getElementById('chatbotSend');
 
 // Chatbot state
 let isTyping = false;
 let conversationHistory = [];
 let currentContext = null;
 
 // Enhanced knowledge base for the chatbot
 const knowledgeBase = {
   greetings: [
     "Hello! <span class='emoji'>👋</span> Welcome to FG Science Degree College. How can I assist you today?",
     "Hi there! <span class='emoji'>😊</span> I'm the FGSD College Assistant. What would you like to know?",
     "Greetings! <span class='emoji'>🎓</span> How may I help you with information about our college?"
   ],
   islamicGreetings: [
     "Wa Alaikum Assalam! <span class='emoji'>🕌</span> Welcome to FGSD College Assistant. How can I help you today?",
     "Assalamu Alaikum! <span class='emoji'>☪️</span> What information do you need about our college?",
     "Wa Alaikum Assalam Warahmatullah! <span class='emoji'>🙏</span> How can I assist you with FGSD College today?"
   ],
   farewells: [
     "Goodbye! <span class='emoji'>👋</span> If you have more questions later, I'm always here to help.",
     "Thank you for chatting with me. <span class='emoji'>😊</span> Have a wonderful day!",
     "Farewell! <span class='emoji'>🎓</span> Remember, you can always return if you need more information."
   ],
   thanks: [
     "You're very welcome! <span class='emoji'>😊</span> Is there anything else I can help you with?",
     "My pleasure! <span class='emoji'>🌟</span> Don't hesitate to ask if you have more questions.",
     "Happy to help! <span class='emoji'>👍</span> Let me know if you need anything else about FGSD College."
   ],
   okResponses: [
     "Great! <span class='emoji'>👍</span> What else would you like to know?",
     "Understood! <span class='emoji'>👌</span> How can I further assist you?",
     "Got it! <span class='emoji'>😊</span> Do you have any other questions about FGSD College?"
   ],
   admissions: {
     general: `Here's information about our admissions process:
     <div class="highlight-box">
       <strong>Admission Requirements:</strong><br>
       - Minimum 45% marks in previous qualification<br>
       - Original documents + photocopies<br>
       - Passport-size photographs<br>
       - Character certificate<br>
       - Migration certificate (if applicable)
     </div>
     Would you like details about HSSC or BS admissions?`,
     hssc: `Here's detailed information about HSSC (Intermediate) admissions:
     <div class="highlight-box">
       <strong>HSSC Programs:</strong><br>
       - Pre-Medical (Biology, Chemistry, Physics)<br>
       - Pre-Engineering (Math, Chemistry, Physics)<br>
       - ICS (Computer Science, Math, Physics/Stats)<br>
       - General Science (Combination of science subjects)
     </div>
     <div class="highlight-box">
       <strong>Requirements:</strong><br>
       - SSC/Matric with at least 45% marks<br>
       - Science subjects for Pre-Medical/Pre-Engineering<br>
       - Admission test may be required
     </div>`,
     bachelor: `Here's information about our Bachelor's programs:
     <div class="highlight-box">
       <strong>BS Programs:</strong><br>
       - BS Computer Science (4 years) — min 50%<br>
       - BS Physics with Data Science (4 years) — min 45%
     </div>
     <div class="highlight-box">
       <strong>Requirements:</strong><br>
       - BS Computer Science: FSc Pre-Engineering, Pre-Medical, or ICS with Mathematics (min 50%)<br>
       - BS Physics with Data Science: FSc Pre-Medical or Pre-Engineering with Physics &amp; Maths (min 45%)<br>
       - Special focus: AI, Machine Learning &amp; Quantum Computing<br>
       - Merit-based admission
     </div>`,
     documents: `Here are the required documents for admission:
     <div class="highlight-box">
       <strong>For All Programs:</strong><br>
       - Original result card + photocopies<br>
       - Character certificate<br>
       - Form-B or CNIC copy<br>
       - 2 passport-size photos<br>
       - Migration certificate (if from another board)
     </div>
     <div class="highlight-box">
       <strong>Additional for BS Programs:</strong><br>
       - Domicile certificate<br>
       - HSSC transcript<br>
       - Recommendation letter (optional)
     </div>`,
     quota: `Here's our quota information:
     <div class="highlight-box">
       <strong>Quota System:</strong><br>
       - Army: 40% seats (requires service proof)<br>
       - POF: 40% seats (requires employment proof)<br>
       - Civil: 45% seats (requires service certificate)<br>
       - Disabled: 40% seats (requires disability certificate)
     </div>`,
     deadline: `Here are our admission deadlines:
     <div class="highlight-box">
       <strong>Typical Admission Periods:</strong><br>
       - HSSC admissions: August to September<br>
       - BS program admissions: September to October<br>
       - Late admissions may be available with fee
     </div>
     Please check our notice board for exact dates each year.`,
     fee: `Here's our fee structure:
     <div class="highlight-box">
       <strong>HSSC Programs:</strong><br>
       - Monthly fee: PKR 5,000-7,000<br>
       - Admission fee (one-time): PKR 10,000<br>
       - Security deposit (refundable): PKR 5,000
     </div>
     <div class="highlight-box">
       <strong>BS Programs:</strong><br>
       - Monthly fee: PKR 7,000-<br>
       - Admission fee (one-time): PKR 10,000<br>
       - Security deposit (refundable): PKR 10,000
     </div>
     Note: Fees are subject to change. Scholarships may be available.`
   },
   programs: {
     hssc: `Here's information about our HSSC programs:
     <div class="highlight-box">
       <strong>Pre-Medical:</strong><br>
       - Subjects: Biology, Chemistry, Physics<br>
       - Prepares for medical fields<br>
       - Strong foundation in life sciences
     </div>
     <div class="highlight-box">
       <strong>Pre-Engineering:</strong><br>
       - Subjects: Mathematics, Chemistry, Physics<br>
       - Prepares for engineering fields<br>
       - Focus on core sciences
     </div>
     <div class="highlight-box">
       <strong>ICS (Computer Science):</strong><br>
       - Subjects: Computer Science, Mathematics, Physics/Statistics<br>
       - Prepares for IT and computer science fields<br>
       - Programming fundamentals
     </div>`,
     bs: `Here's information about our Bachelor's programs:
     <div class="highlight-box">
       <strong>BS Computer Science (4 years):</strong><br>
       - Special focus: SE, AI, ML, Cyber Security &amp; Cloud Computing<br>
       - Key Courses: Programming, Algorithms, Databases, Networks<br>
       - Modern computer labs &amp; industry projects<br>
       - Eligibility: FSc Pre-Engineering, Pre-Medical, or ICS with Maths (min 50%)
     </div>
     <div class="highlight-box">
       <strong>BS Physics with Data Science (4 years):</strong><br>
       - Special focus: AI, Machine Learning &amp; Quantum Computing<br>
       - Key Courses: Quantum Mechanics, Electrodynamics, Data Science<br>
       - Eligibility: FSc Pre-Medical/Pre-Engineering (Physics &amp; Maths) — min 45%<br>
       - Well-equipped physics labs<br>
       - Research opportunities
     </div>`,
     features: `Here are key features of our programs:
     <div class="highlight-box">
       <strong>Program Highlights:</strong><br>
       - Qualified faculty with industry experience<br>
       - State-of-the-art labs and facilities<br>
       - Research opportunities<br>
       - Career preparation services<br>
       - Internship programs<br>
       - Guest lectures from experts
     </div>`
   },
   university: {
     about: `Here's about our NUP affiliation:
     <div class="highlight-box">
       <strong>National University of Pakistan (NUP):</strong><br>
       - Recognized by HEC Pakistan<br>
       - Premier institution for higher education<br>
       - Focus on science and technology<br>
       - Multiple campuses across Pakistan
     </div>`,
     recognition: `Here's about degree recognition:
     <div class="highlight-box">
       <strong>Degree Recognition:</strong><br>
       - NUP degrees recognized by HEC<br>
       - Valid for government and private sector<br>
       - Acceptable for higher education abroad<br>
       - Meets international standards
     </div>`,
     benefits: `Here are benefits of NUP affiliation:
     <div class="highlight-box">
       <strong>Benefits:</strong><br>
       - Academic excellence<br>
       - Research opportunities<br>
       - Expert faculty<br>
       - Career preparation<br>
       - Global recognition<br>
       - Scholarship opportunities
     </div>`,
     ranking: `Here's about university ranking:
     <div class="highlight-box">
       <strong>NUP Rankings:</strong><br>
       - Ranked among top 50 universities in Pakistan<br>
       - Particularly strong in science and technology<br>
       - Growing reputation internationally<br>
       - Recognized for research output
     </div>`
   },
   facilities: `Here's about our college facilities:
   <div class="highlight-box">
     <strong>Campus Facilities:</strong><br>
     - Modern classrooms with multimedia<br>
     - Well-equipped science labs<br>
     - Computer labs with high-speed internet<br>
     - Library with digital resources<br>
     - Sports facilities<br>
     - Cafeteria<br>
     - Auditorium for events<br>
     - Secure parking
   </div>`,
   contact: `Here's our contact information:
   <div class="highlight-box">
     <strong>FG Science Degree College</strong><br>
     Address: QPFG+7RC, Street No. 9 - Phase 4, Officers Colony Wah Cantt, 47010 Pakistan<br>
     Phone: +92 51 1234567<br>
     Email: info@fgsdcollege.edu.pk<br>
     Website: www.fgsdcollege.edu.pk
   </div>`,
   faculty: `Here's about our faculty:
   <div class="highlight-box">
     <strong>Our Faculty:</strong><br>
     - Highly qualified with advanced degrees<br>
     - Industry experience in relevant fields<br>
     - Research-active members<br>
     - Regular professional development<br>
     - Student-centered teaching approach
   </div>`,
   scholarship: `Here's about scholarships:
   <div class="highlight-box">
     <strong>Scholarship Information:</strong><br>
     - Merit-based scholarships for top performers<br>
     - Need-based financial aid available<br>
     - Special scholarships for female students<br>
     - Quota-specific scholarships<br>
     - Application deadline: Usually in September
   </div>`,
   default: "I'm here to help with information about FGSD College. Could you please be more specific about what you need? Here are some topics I can help with:<br><br>- Admissions (HSSC/BS)<br>- Programs offered<br>- College facilities<br>- Contact information<br>- Faculty and scholarships"
 };
 
 // Enhanced quick replies
 const quickReplies = {
   initial: ["Admissions", "Programs", "Facilities", "Contact", "About NUP"],
   admissions: ["HSSC Admission", "BS Admission", "Documents", "Quota", "Deadlines", "Fees"],
   programs: ["HSSC Programs", "BS Programs", "Program Features"],
   university: ["About NUP", "Recognition", "Benefits", "Ranking"],
   afterAnswer: ["Thanks!", "More details", "Another question", "Main menu"],
   facilities: ["Classrooms", "Labs", "Library", "Sports"],
   support: ["Visit college", "Call us", "Email query"]
 };
 
 // Initialize chatbot with welcome message
 setTimeout(() => {
   addBotMessage(getRandomResponse(knowledgeBase.greetings), true, quickReplies.initial);
 }, 500);
 
 // Event Listeners
 chatbotToggle.addEventListener('click', toggleChatbot);
 chatbotClose.addEventListener('click', closeChatbot);
 chatbotSend.addEventListener('click', sendMessage);
 chatbotInput.addEventListener('keypress', function(e) {
   if (e.key === 'Enter') sendMessage();
 });
 
 // Chatbot Functions
 function toggleChatbot() {
   chatbotWindow.classList.toggle('active');
   createParticles();
   if (chatbotWindow.classList.contains('active')) {
     chatbotInput.focus();
     if (conversationHistory.length === 0) {
       setTimeout(() => {
         addBotMessage("Welcome to FGSD College Assistant! <span class='emoji'>🎓</span> I can help you with:", true, quickReplies.initial);
       }, 300);
     }
   }
 }
 
 function closeChatbot() {
   chatbotWindow.classList.remove('active');
 }
 
 function sendMessage() {
   const message = chatbotInput.value.trim();
   if (message === '') return;
   
   addUserMessage(message);
   chatbotInput.value = '';
   
   conversationHistory.push({
     type: 'user',
     content: message,
     timestamp: new Date()
   });
   
   showTypingIndicator();
   
   setTimeout(() => {
     processUserMessage(message);
   }, 1000 + Math.random() * 1000);
 }
 
 function processUserMessage(message) {
   const lowerMessage = message.toLowerCase();
   let response = '';
   let showReplies = true;
   let replyOptions = quickReplies.afterAnswer;
   
   // Check for Islamic greetings
   if (/assalam|salam|salaam|سلام/.test(lowerMessage)) {
       response = getRandomResponse(knowledgeBase.islamicGreetings);
       replyOptions = quickReplies.initial;
   }
   // Check for greetings
   else if (/hi|hello|hey|greet/.test(lowerMessage)) {
       response = getRandomResponse(knowledgeBase.greetings);
       replyOptions = quickReplies.initial;
   }
   // Check for farewells
   else if (/bye|goodbye|see you|take care/.test(lowerMessage)) {
       response = getRandomResponse(knowledgeBase.farewells);
       showReplies = false;
       createConfetti();
   }
   // Check for thank you
   else if (/thank|thanks|shukria|شکریہ/.test(lowerMessage)) {
       response = getRandomResponse(knowledgeBase.thanks);
       replyOptions = quickReplies.initial;
       createConfetti();
   }
   // Check for OK responses
   else if (/^ok$|okay|acha|ٹھیک ہے/.test(lowerMessage)) {
       response = getRandomResponse(knowledgeBase.okResponses);
       replyOptions = quickReplies.initial;
   }
   // Admissions
   else if (/admission|admit|apply|داخلہ/.test(lowerMessage)) {
       response = knowledgeBase.admissions.general;
       replyOptions = quickReplies.admissions;
       currentContext = 'admissions';
   }
   // HSSC Admission
   else if (/hssc|inter|fsc|intermediate|انٹر/.test(lowerMessage) && currentContext === 'admissions') {
       response = knowledgeBase.admissions.hssc;
   }
   // BS Admission
   else if (/bs|bachelor|degree|بی ایس/.test(lowerMessage) && currentContext === 'admissions') {
       response = knowledgeBase.admissions.bachelor;
   }
   // Documents
   else if (/document|paper|required|ضروری دستاویزات/.test(lowerMessage) && currentContext === 'admissions') {
       response = knowledgeBase.admissions.documents;
   }
   // Quota
   else if (/quota|کوٹہ/.test(lowerMessage) && currentContext === 'admissions') {
       response = knowledgeBase.admissions.quota;
   }
   // Deadline
   else if (/deadline|date|last date|آخری تاریخ/.test(lowerMessage) && currentContext === 'admissions') {
       response = knowledgeBase.admissions.deadline;
   }
   // Fee
   else if (/fee|charge|price|فیس/.test(lowerMessage) && currentContext === 'admissions') {
       response = knowledgeBase.admissions.fee;
   }
   // Programs
   else if (/program|course|subject|کورس/.test(lowerMessage)) {
       response = "We offer these programs:<br><br>- HSSC (Intermediate)<br>- BS Computer Science<br>- BS Physics";
       replyOptions = quickReplies.programs;
       currentContext = 'programs';
   }
   // HSSC Programs
   else if (/hssc|inter|fsc|intermediate|انٹر/.test(lowerMessage) && currentContext === 'programs') {
       response = knowledgeBase.programs.hssc;
   }
   // BS Programs
   else if (/bs|bachelor|degree|بی ایس/.test(lowerMessage) && currentContext === 'programs') {
       response = knowledgeBase.programs.bs;
   }
   // Program Features
   else if (/feature|benefit|facility|سہولت/.test(lowerMessage) && currentContext === 'programs') {
       response = knowledgeBase.programs.features;
   }
   // NUP
   else if (/nup|university|affiliation|یونیورسٹی/.test(lowerMessage)) {
       response = knowledgeBase.university.about;
       replyOptions = quickReplies.university;
       currentContext = 'university';
   }
   // NUP Recognition
   else if (/recogni|accept|valid|مانگتا/.test(lowerMessage) && currentContext === 'university') {
       response = knowledgeBase.university.recognition;
   }
   // NUP Benefits
   else if (/benefit|advantage|فائدہ/.test(lowerMessage) && currentContext === 'university') {
       response = knowledgeBase.university.benefits;
   }
   else if (/rank|position|standing|درجہ/.test(lowerMessage) && currentContext === 'university') {
       response = knowledgeBase.university.ranking;
   }
   // Facilities
   else if (/facilit|lab|library|ground|سہولیات/.test(lowerMessage)) {
       response = knowledgeBase.facilities;
       replyOptions = quickReplies.facilities;
       currentContext = 'facilities';
   }
   // Contact
   else if (/contact|address|phone|email|رابطہ/.test(lowerMessage)) {
       response = knowledgeBase.contact;
       replyOptions = quickReplies.support;
   }
   // Faculty
   else if (/teacher|faculty|professor|استاد/.test(lowerMessage)) {
       response = knowledgeBase.faculty;
   }
   // Scholarship
   else if (/scholar|financial aid|fee concession|تعلیمی وظیفہ/.test(lowerMessage)) {
       response = knowledgeBase.scholarship;
   }
   // Default response
   else {
       response = knowledgeBase.default;
       replyOptions = quickReplies.initial;
       currentContext = null;
   }
   
   // Add bot response to conversation
   conversationHistory.push({
       type: 'bot',
       content: response,
       timestamp: new Date()
   });
   
   // Display response
   hideTypingIndicator();
   addBotMessage(response, showReplies, replyOptions);
 }
 
 function getRandomResponse(responses) {
   return responses[Math.floor(Math.random() * responses.length)];
 }
 
 function addUserMessage(message) {
   const messageElement = document.createElement('div');
   messageElement.className = 'chatbot-message user-message';
   
   const bubbleElement = document.createElement('div');
   bubbleElement.className = 'message-bubble';
   bubbleElement.innerHTML = message;
   
   const timeElement = document.createElement('div');
   timeElement.className = 'message-time';
   timeElement.textContent = getCurrentTime();
   
   messageElement.appendChild(bubbleElement);
   messageElement.appendChild(timeElement);
   
   chatbotBody.appendChild(messageElement);
   scrollToBottom();
 }
 
 function addBotMessage(message, showReplies = false, replyOptions = []) {
   const messageElement = document.createElement('div');
   messageElement.className = 'chatbot-message bot-message';
   
   const bubbleElement = document.createElement('div');
   bubbleElement.className = 'message-bubble';
   bubbleElement.innerHTML = message;
   
   const timeElement = document.createElement('div');
   timeElement.className = 'message-time';
   timeElement.textContent = getCurrentTime();
   
   messageElement.appendChild(bubbleElement);
   messageElement.appendChild(timeElement);
   
   chatbotBody.appendChild(messageElement);
   scrollToBottom();
   
   if (showReplies && replyOptions.length > 0) {
       addQuickReplies(replyOptions);
   }
 }
 
 function addQuickReplies(replies) {
   const repliesContainer = document.createElement('div');
   repliesContainer.className = 'quick-replies';
   
   replies.forEach(reply => {
       const button = document.createElement('button');
       button.className = 'quick-reply';
       button.textContent = reply;
       button.addEventListener('click', () => {
           chatbotInput.value = reply;
           sendMessage();
           repliesContainer.remove();
       });
       repliesContainer.appendChild(button);
   });
   
   chatbotBody.appendChild(repliesContainer);
   scrollToBottom();
 }
 
 function showTypingIndicator() {
   if (isTyping) return;
   
   isTyping = true;
   
   const typingElement = document.createElement('div');
   typingElement.className = 'chatbot-message bot-message';
   typingElement.id = 'typingIndicator';
   
   const bubbleElement = document.createElement('div');
   bubbleElement.className = 'typing-indicator';
   
   for (let i = 0; i < 3; i++) {
       const dot = document.createElement('div');
       dot.className = 'typing-dot';
       bubbleElement.appendChild(dot);
   }
   
   typingElement.appendChild(bubbleElement);
   chatbotBody.appendChild(typingElement);
   scrollToBottom();
 }
 
 function hideTypingIndicator() {
   isTyping = false;
   const typingElement = document.getElementById('typingIndicator');
   if (typingElement) {
       typingElement.remove();
   }
 }
 
 function getCurrentTime() {
   const now = new Date();
   return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
 }
 
 function scrollToBottom() {
   chatbotBody.scrollTop = chatbotBody.scrollHeight;
 }
 
 // Visual Effects
 function createParticles() {
   for (let i = 0; i < 20; i++) {
       const particle = document.createElement('div');
       particle.className = 'chatbot-particle';
       
       // Random position around the toggle button
       const angle = Math.random() * Math.PI * 2;
       const distance = 30 + Math.random() * 20;
       const x = Math.cos(angle) * distance;
       const y = Math.sin(angle) * distance;
       
       particle.style.left = `calc(50% + ${x}px)`;
       particle.style.top = `calc(50% + ${y}px)`;
       
       // Random size and color
       const size = 1 + Math.random() * 3;
       particle.style.width = `${size}px`;
       particle.style.height = `${size}px`;
       
       const colors = ['#1a3e72', '#f7c744', '#0a2d5a', '#ffffff'];
       particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
       
       chatbotToggle.appendChild(particle);
       
       // Animate and remove
       setTimeout(() => {
           particle.style.transform = `translate(${x * 2}px, ${y * 2}px)`;
           particle.style.opacity = '0';
           
           setTimeout(() => {
               particle.remove();
           }, 1000);
       }, 50);
   }
 }
 
 function createConfetti() {
   for (let i = 0; i < 50; i++) {
       const confetti = document.createElement('div');
       confetti.className = 'confetti';
       
       // Random position at top of window
       confetti.style.left = `${Math.random() * 100}%`;
       
       // Random color
       const colors = ['#1a3e72', '#f7c744', '#0a2d5a', '#4CAF50', '#FF5722', '#9C27B0'];
       confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
       
       // Random size and shape
       const size = 5 + Math.random() * 10;
       confetti.style.width = `${size}px`;
       confetti.style.height = `${size}px`;
       
       if (Math.random() > 0.5) {
           confetti.style.borderRadius = '50%';
       } else {
           confetti.style.transform = `rotate(${Math.random() * 90}deg)`;
       }
       
       // Random animation duration
       const duration = 3 + Math.random() * 3;
       confetti.style.animationDuration = `${duration}s`;
       
       chatbotWindow.appendChild(confetti);
       
       // Remove after animation
       setTimeout(() => {
           confetti.remove();
       }, duration * 1000);
   }
 }
 
 // Initialize some visual effects
 setInterval(() => {
   if (chatbotWindow.classList.contains('active')) {
       createLaserEffect();
       createSmokeEffect();
   }
 }, 3000);
 
 function createLaserEffect() {
   const laser = document.createElement('div');
   laser.className = 'laser-beam';
   
   // Random position from top
   laser.style.top = `${10 + Math.random() * 80}%`;
   laser.style.left = '0';
   
   // Random width and angle
   const angle = -10 + Math.random() * 20;
   const width = 50 + Math.random() * 150;
   laser.style.width = `${width}px`;
   laser.style.transform = `rotate(${angle}deg)`;
   
   chatbotWindow.appendChild(laser);
   
   // Animate
   setTimeout(() => {
       laser.style.width = '0';
       laser.style.opacity = '0';
       
       setTimeout(() => {
           laser.remove();
       }, 1000);
   }, 50);
 }
 
 function createSmokeEffect() {
   const smoke = document.createElement('div');
   smoke.className = 'smoke';
   
   // Random position at bottom
   smoke.style.bottom = '0';
   smoke.style.left = `${10 + Math.random() * 80}%`;
   
   // Random size
   const size = 5 + Math.random() * 15;
   smoke.style.width = `${size}px`;
   smoke.style.height = `${size}px`;
   
   chatbotWindow.appendChild(smoke);
   
   // Animate
   setTimeout(() => {
       smoke.style.bottom = `${20 + Math.random() * 60}%`;
       smoke.style.left = `${parseFloat(smoke.style.left) + -10 + Math.random() * 20}%`;
       smoke.style.opacity = '0';
       smoke.style.transform = 'scale(2)';
       
       setTimeout(() => {
           smoke.remove();
       }, 2000);
   }, 50);
 }
});

/*contact*/

document.addEventListener('DOMContentLoaded', function() {
   // Create floating particles for contact section
   const contactParticles = document.getElementById('contactParticles');
   const particleCount = 25;
   
   for (let i = 0; i < particleCount; i++) {
     const particle = document.createElement('div');
     particle.classList.add('contact-particle');
     
     // Random properties
     const size = Math.random() * 10 + 5;
     const posX = Math.random() * 100;
     const posY = Math.random() * 100 + 100;
     const delay = Math.random() * 15;
     const duration = Math.random() * 15 + 10;
     const opacity = Math.random() * 0.6 + 0.2;
     
     particle.style.width = `${size}px`;
     particle.style.height = `${size}px`;
     particle.style.left = `${posX}%`;
     particle.style.top = `${posY}%`;
     particle.style.animationDelay = `${delay}s`;
     particle.style.animationDuration = `${duration}s`;
     particle.style.opacity = opacity;
     particle.style.background = `rgba(247, 199, 68, ${opacity})`;
     
     contactParticles.appendChild(particle);
   }
   
   // Add laser beam effect to map container on hover
   const mapContainer = document.querySelector('.map-container');
   
   mapContainer.addEventListener('mouseenter', function() {
     this.style.animation = 'laserBorder 1.5s infinite linear';
   });
   
   mapContainer.addEventListener('mouseleave', function() {
     this.style.animation = 'laserBorder 3s infinite linear';
   });
   
   // Add subtle glow to contact info boxes on hover
   const contactInfos = document.querySelectorAll('.contact-info');
   
   contactInfos.forEach(info => {
     info.addEventListener('mouseenter', function() {
       this.style.boxShadow = '0 15px 40px rgba(106, 48, 147, 0.2)';
     });
     
     info.addEventListener('mouseleave', function() {
       this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
     });
   });
 });

 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
 anchor.addEventListener('click', function (e) {
     e.preventDefault();
     
     document.querySelector(this.getAttribute('href')).scrollIntoView({
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

// ============================================
// 1st Year Result 2026 Full Image Modal
// ============================================
(function initResultImageModal() {
  const modal = document.getElementById('fullImageModal');
  const openBtn = document.getElementById('viewFullImageBtn');
  const posterTrigger = document.getElementById('posterClickTrigger');
  const closeBtn = document.getElementById('closeModalBtn');
  const backdrop = document.getElementById('modalBackdrop');

  if (modal) {
    function openModal() {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (posterTrigger) posterTrigger.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    // Close on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }
})();




