const header = document.getElementById('header');
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const privacyBtn = document.getElementById('privacy-btn');
const privacyModal = document.getElementById('privacy-modal');
const closeModal = document.getElementById('close-modal');
const modalBackdrop = document.getElementById('modal-backdrop');

let lastScrollY = window.scrollY;
let ticking = false;

function updateHeader() {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    header.style.transform = 'translateY(-100%)';
    header.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
  } else {
    header.style.transform = 'translateY(0)';
    header.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
  }
  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateHeader);
    ticking = true;
  }
});

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

function openModal() {
  privacyModal.classList.remove('hidden');
  privacyModal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeModalFn() {
  privacyModal.classList.add('hidden');
  privacyModal.classList.remove('flex');
  document.body.style.overflow = '';
}

privacyBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFn);
modalBackdrop.addEventListener('click', closeModalFn);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalFn();
});

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = header.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});