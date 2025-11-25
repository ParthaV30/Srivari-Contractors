// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
fadeEls.forEach(el => observer.observe(el));

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
navToggle?.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// Gallery slider with auto-play
const slides = document.querySelector('.gallery-slider .slides');
const images = document.querySelectorAll('.gallery-slider img');
const prevBtn = document.querySelector('.gallery-slider .prev');
const nextBtn = document.querySelector('.gallery-slider .next');

let index = 0;
let autoPlayInterval;

function showSlide(i) {
  if (!slides || images.length === 0) return;
  if (i < 0) index = images.length - 1;
  else if (i >= images.length) index = 0;
  else index = i;
  slides.style.transform = `translateX(-${index * 100}%)`;
}

// Manual navigation
prevBtn?.addEventListener('click', () => {
  showSlide(index - 1);
  resetAutoPlay();
});
nextBtn?.addEventListener('click', () => {
  showSlide(index + 1);
  resetAutoPlay();
});

// Swipe support for mobile
let startX = 0;
slides?.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});
slides?.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) { showSlide(index + 1); resetAutoPlay(); }
  if (endX - startX > 50) { showSlide(index - 1); resetAutoPlay(); }
});

// Auto-play every 5 seconds
function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    showSlide(index + 1);
  }, 5000);
}
function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  startAutoPlay();
}

// Initialize gallery
showSlide(0);
startAutoPlay();

// Video slider
const videoSlides = document.querySelector('.video-slider .video-slides');
const videos = document.querySelectorAll('.video-slider video');
const videoPrevBtn = document.querySelector('.video-slider .prev');
const videoNextBtn = document.querySelector('.video-slider .next');

let videoIndex = 0;

function showVideo(i) {
  if (!videoSlides || videos.length === 0) return;
  if (i < 0) videoIndex = videos.length - 1;
  else if (i >= videos.length) videoIndex = 0;
  else videoIndex = i;
  videoSlides.style.transform = `translateX(-${videoIndex * 100}%)`;
  
  // Pause all videos except the current one
  videos.forEach((video, idx) => {
    if (idx !== videoIndex) {
      video.pause();
    }
  });
}

// Video navigation
videoPrevBtn?.addEventListener('click', () => {
  showVideo(videoIndex - 1);
});
videoNextBtn?.addEventListener('click', () => {
  showVideo(videoIndex + 1);
});

// Initialize video slider
showVideo(0);

// Quote Modal logic
const quoteModal = document.getElementById('quoteModal');
const quoteForm = document.getElementById('quoteForm');
const quoteStatus = document.getElementById('quoteStatus');
const closeBtn = document.querySelector('.modal .close');

// Open modal when "Get a Quote" buttons are clicked
document.querySelectorAll('.btn').forEach(btn => {
  if (btn.textContent.toLowerCase().includes('get a quote')) {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (quoteModal) {
        quoteModal.style.display = 'flex';
        quoteModal.setAttribute('aria-hidden', 'false');
      }
    });
  }
});

// Close modal
closeBtn?.addEventListener('click', () => {
  quoteModal.style.display = 'none';
  quoteModal.setAttribute('aria-hidden', 'true');
});
window.addEventListener('click', e => {
  if (e.target === quoteModal) {
    quoteModal.style.display = 'none';
    quoteModal.setAttribute('aria-hidden', 'true');
  }
});

// Handle form submission
quoteForm?.addEventListener('submit', e => {
  e.preventDefault();
  if (quoteStatus) quoteStatus.textContent = 'Sending...';

  const data = Object.fromEntries(new FormData(quoteForm).entries());

  // WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `*Quote Request - Sri Vari Contractors*\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || '-'}\nLocation: ${data.location || '-'}\n\nProject details:\n${data.message || '-'}`
  );
  
  // Email message
  const subject = encodeURIComponent('Quote Request — Sri Vari Contractors');
  const body = encodeURIComponent(
    `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || '-'}\nLocation: ${data.location || '-'}\n\nProject details:\n${data.message || '-'}`
  );
  
  // Open WhatsApp first
  window.open(`https://wa.me/918088880042?text=${whatsappMessage}`, '_blank');
  
  // Then open email
  setTimeout(() => {
    window.location.href = `mailto:viswatamil444@gmail.com?subject=${subject}&body=${body}`;
  }, 500);

  if (quoteStatus) quoteStatus.textContent = 'Opening WhatsApp and Email...';
});

// Contact form simple feedback (optional)
const contactForm = document.getElementById('contactForm');
const pageStatus = document.getElementById('status');
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm).entries());
  if (pageStatus) pageStatus.textContent = 'Thank you. We will contact you shortly.';
  const subject = encodeURIComponent('Contact — Sri Vari Contractors');
  const body = encodeURIComponent(
    `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || '-'}\nLocation: ${data.location || '-'}\n\nMessage:\n${data.message || '-'}`
  );
  // WhatsApp message
  const whatsappMsg = encodeURIComponent(
    `*Contact - Sri Vari Contractors*\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || '-'}\nLocation: ${data.location || '-'}\n\nMessage:\n${data.message || '-'}`
  );
  
  // Open WhatsApp
  window.open(`https://wa.me/918088880042?text=${whatsappMsg}`, '_blank');
  
  // Then open email
  setTimeout(() => {
    window.location.href = `mailto:viswatamil444@gmail.com?subject=${subject}&body=${body}`;
  }, 500);
});
