/* ===== CUSTOM CURSOR ===== */
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';

  setTimeout(() => {
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  }, 60);
});

document.querySelectorAll('a, button, .skill-tag, .project-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    cursor.style.background = 'rgba(0, 245, 212, 0.3)';
    cursorRing.style.width = '50px';
    cursorRing.style.height = '50px';
    cursorRing.style.opacity = '1';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'var(--accent-cyan)';
    cursorRing.style.width = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.opacity = '0.6';
  });
});


/* ===== TYPEWRITER ROLE ===== */
const roles = [
  'Software Engineer',
  'Flutter Developer',
  'Cross-Platform Specialist',
  'MSc Computer Science',
  'BCS Professional Member',
];

const roleEl = document.getElementById('typed-role');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeRole() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    roleEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      typingTimeout = setTimeout(typeRole, 2000);
      return;
    }
  } else {
    roleEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 50 : 80;
  typingTimeout = setTimeout(typeRole, speed);
}

window.addEventListener('load', () => {
  setTimeout(typeRole, 800);
});


/* ===== SCROLL REVEAL ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-up, .timeline-item').forEach(el => {
  observer.observe(el);
});


/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.textShadow = '';
      });
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) {
        active.style.color = 'var(--accent-cyan)';
        active.style.textShadow = 'var(--glow)';
      }
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(s => navObserver.observe(s));


/* ===== GLITCH ON LOGO HOVER ===== */
const logo = document.querySelector('.nav-logo');
const glitchChars = '!@#$%^&*<>{}[]|';

logo.addEventListener('mouseenter', () => {
  const original = logo.dataset.text || logo.textContent;
  logo.dataset.text = original;
  let iterations = 0;
  const glitch = setInterval(() => {
    logo.textContent = original.split('').map((char, i) => {
      if (i < iterations) return original[i];
      if (char === ' ' || char === '.') return char;
      return glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }).join('');
    if (iterations >= original.length) {
      logo.textContent = original;
      clearInterval(glitch);
    }
    iterations += 1.5;
  }, 35);
});


/* ===== STAT COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  counterObserver.observe(el);
});