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

  // Mailto fallback (replace with backend if needed)
  const subject = encodeURIComponent('Quote Request — Sri Vari Contractors');
  const body = encodeURIComponent(
    `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || '-'}\nLocation: ${data.location || '-'}\n\nProject details:\n${data.message || '-'}`
  );
  window.location.href = `mailto:smbsshanmugam@gmail.com?subject=${subject}&body=${body}`;

  if (quoteStatus) quoteStatus.textContent = 'Opening your email client...';
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
  window.location.href = `mailto:smbsshanmugam@gmail.com?subject=${subject}&body=${body}`;
});
