import './styles.css';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const revealItems = document.querySelectorAll('.reveal');
const themeToggle = document.querySelector('.theme-toggle');

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  if (themeToggle) {
    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀' : '☾';
    themeToggle.querySelector('.theme-label').textContent = isDark ? 'Light mode' : 'Dark mode';
  }
};

const savedTheme = localStorage.getItem('portfolio-theme');
setTheme(savedTheme || (prefersDark.matches ? 'dark' : 'light'));

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', nextTheme);
  setTheme(nextTheme);
});

prefersDark.addEventListener?.('change', (event) => {
  if (!localStorage.getItem('portfolio-theme')) setTheme(event.matches ? 'dark' : 'light');
});

if ('IntersectionObserver' in window && !prefersReducedMotion.matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.setAttribute('tabindex', '-1');
  });
});
