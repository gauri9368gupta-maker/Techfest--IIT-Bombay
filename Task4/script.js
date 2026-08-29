const navbar = document.querySelector('.navbar');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const revealItems = document.querySelectorAll('.reveal');
const statValues = document.querySelectorAll('.stat-value');
const generatorBtn = document.querySelector('.generator-btn');
const ideaSelect = document.getElementById('idea-category');
const ideaOutput = document.querySelector('.output-text');
const loader = document.querySelector('.output-loader');
const projectTrack = document.querySelector('.project-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const contactForm = document.querySelector('.contact-form');
const cursorGlow = document.querySelector('.cursor-glow');

const ideaLibrary = {
  Technology: [
    'Build an AI-powered personal productivity assistant that automatically organizes tasks based on urgency and energy levels.',
    'Create a wearable device that detects creative flow state and suggests adaptive prompts for deep work.',
    'Design a low-code platform that helps communities prototype smart city solutions using real-time local data.'
  ],
  Education: [
    'Launch a learning platform that turns every lesson into an interactive challenge designed around individual student strengths.',
    'Build a peer mentoring app that connects learners with project-based experiences matched to their interests.',
    'Create an adaptive curriculum engine that personalizes study plans based on confidence, pace, and comprehension.'
  ],
  Healthcare: [
    'Develop a remote care dashboard that blends chronic condition tracking with predictive wellness coaching.',
    'Create a digital health companion that helps patients navigate appointments, medications, and recovery with clarity.',
    'Design a community health platform that identifies gaps in access and connects users to local support services.'
  ],
  Environment: [
    'Build a climate action app that turns local sustainability habits into measurable community impact.',
    'Create a smart waste management system that helps neighborhoods reduce material loss through real-time insights.',
    'Design an urban green intelligence tool that helps cities optimize cooling, water use, and biodiversity strategies.'
  ],
  Business: [
    'Launch a founder dashboard that blends customer insights, market signals, and momentum data into one decision layer.',
    'Create a B2B discovery platform that helps small businesses unlock partnerships and new revenue opportunities.',
    'Build a customer journey analytics tool that surfaces friction points before they affect retention or growth.'
  ],
  Entertainment: [
    'Design a collaborative storytelling platform where fans help shape the plot, characters, and worldbuilding in real time.',
    'Create an immersive experience engine that blends live performance, audience influence, and personalized narratives.',
    'Build a community-driven creator studio that turns fan ideas into short-form interactive experiences.'
  ]
};

function setNavbarState() {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

function handleSmoothScroll(event) {
  const link = event.currentTarget;
  const targetId = link.getAttribute('href');

  if (!targetId || !targetId.startsWith('#')) return;

  const target = document.querySelector(targetId);
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (window.innerWidth <= 760) {
    navMenu.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
}

navLinks.forEach((link) => {
  link.addEventListener('click', handleSmoothScroll);
});

window.addEventListener('scroll', setNavbarState, { passive: true });
setNavbarState();

menuToggle?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: '0px 0px -30px 0px'
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const valueEl = entry.target;
      const target = Number(valueEl.dataset.target || 0);
      const suffix = target >= 500 ? '+' : '';
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));

      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          valueEl.textContent = `${target}${suffix}`;
          clearInterval(interval);
          return;
        }
        valueEl.textContent = `${current}${suffix}`;
      }, 18);

      statObserver.unobserve(valueEl);
    });
  },
  { threshold: 0.5 }
);

statValues.forEach((item) => statObserver.observe(item));

function generateIdea() {
  const category = ideaSelect.value;
  const ideas = ideaLibrary[category] || ideaLibrary.Technology;
  const selectedIdea = ideas[Math.floor(Math.random() * ideas.length)];

  loader.classList.add('visible');
  ideaOutput.style.opacity = '0';

  setTimeout(() => {
    ideaOutput.textContent = `"${selectedIdea}"`;
    ideaOutput.style.opacity = '1';
    loader.classList.remove('visible');
  }, 900);
}

generatorBtn?.addEventListener('click', generateIdea);

const artifactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('active', isActive);
        });
      }
    });
  },
  {
    threshold: 0.55,
    rootMargin: '-10% 0px -30% 0px'
  }
);

sections.forEach((section) => artifactObserver.observe(section));

prevBtn?.addEventListener('click', () => {
  projectTrack.scrollBy({ left: -420, behavior: 'smooth' });
});

nextBtn?.addEventListener('click', () => {
  projectTrack.scrollBy({ left: 420, behavior: 'smooth' });
});

function showFieldError(input, message) {
  const parent = input.closest('.field-group');
  const errorEl = parent.querySelector('.error-message');
  parent.classList.add('error');
  errorEl.textContent = message;
}

function clearFieldError(input) {
  const parent = input.closest('.field-group');
  const errorEl = parent.querySelector('.error-message');
  parent.classList.remove('error');
  errorEl.textContent = '';
}

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const successMessage = document.querySelector('.success-message');
  let isValid = true;

  if (!nameInput.value.trim()) {
    showFieldError(nameInput, 'Please enter your name.');
    isValid = false;
  } else {
    clearFieldError(nameInput);
  }

  if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
    showFieldError(emailInput, 'Please enter a valid email address.');
    isValid = false;
  } else {
    clearFieldError(emailInput);
  }

  if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
    showFieldError(messageInput, 'Please enter a message with at least 10 characters.');
    isValid = false;
  } else {
    clearFieldError(messageInput);
  }

  if (!isValid) {
    successMessage.textContent = '';
    return;
  }

  successMessage.textContent = 'Thanks! Your message has been sent successfully.';
  contactForm.reset();
});

const particleCount = 32;
const hero = document.querySelector('.hero');

for (let i = 0; i < particleCount; i += 1) {
  const dot = document.createElement('span');
  const size = Math.random() * 4 + 2;
  const left = Math.random() * 100;
  const top = Math.random() * 100;
  const delay = Math.random() * 6;
  const duration = Math.random() * 10 + 8;

  dot.style.position = 'absolute';
  dot.style.left = `${left}%`;
  dot.style.top = `${top}%`;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.borderRadius = '50%';
  dot.style.background = 'rgba(142, 176, 255, 0.8)';
  dot.style.boxShadow = '0 0 18px rgba(130, 164, 255, 0.7)';
  dot.style.opacity = (Math.random() * 0.7 + 0.25).toString();
  dot.style.animation = `floatCard ${duration}s ease-in-out ${delay}s infinite`;
  hero?.appendChild(dot);
}

window.addEventListener('pointermove', (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
  document.body.classList.add('cursor-visible');
});

window.addEventListener('pointerleave', () => {
  document.body.classList.remove('cursor-visible');
});

if (document.readyState === 'complete') {
  document.body.classList.add('loaded');
} else {
  window.addEventListener('load', () => document.body.classList.add('loaded'));
}
