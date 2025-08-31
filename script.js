// Hamburger menu toggle for small screens
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Accessibility: toggle menu with keyboard (Enter/Space)
hamburger.addEventListener('keydown', (e) => {
  if(e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    hamburger.click();
  }
});

// Close menu after clicking a nav link (for mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
    }
  });
});

// Smooth Scroll for all anchor links with hash
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetEl = document.querySelector(this.getAttribute('href'));
    if(targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Update active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY || window.pageYOffset;

  sections.forEach(section => {
    const top = section.offsetTop - 70; // offset for fixed nav height
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if(scrollPos >= top && scrollPos < top + height) {
      navItems.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Contact form validation & feedback (mock)
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', function(e){
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if(!name || !email || !message) {
    formStatus.textContent = 'Please fill out all fields.';
    formStatus.style.color = 'tomato';
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailPattern.test(email)) {
    formStatus.textContent = 'Please enter a valid email address.';
    formStatus.style.color = 'tomato';
    return;
  }

  formStatus.textContent = 'Sending message...';
  formStatus.style.color = '#31b8c6';

  setTimeout(() => {
    formStatus.textContent = 'Message sent successfully! Thank you.';
    form.reset();

    // Clear the message after 5 seconds
    setTimeout(() => {
      formStatus.textContent = '';
    }, 5000);

  }, 1500);
});
