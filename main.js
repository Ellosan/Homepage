// main.js

// 1) Device-aware body class via matchMedia
(function deviceClass() {
  const body = document.body;
  const mqPhone  = window.matchMedia('(max-width: 599px)');
  const mqTablet = window.matchMedia('(min-width: 600px) and (max-width: 1023px)');

  function applyClass() {
    body.classList.remove('device-phone', 'device-tablet', 'device-desktop');
    if (mqPhone.matches)      body.classList.add('device-phone');
    else if (mqTablet.matches) body.classList.add('device-tablet');
    else                       body.classList.add('device-desktop');
  }

  applyClass();
  mqPhone.addEventListener('change', applyClass);
  mqTablet.addEventListener('change', applyClass);
  window.addEventListener('resize', applyClass);
})();

// 2) Scroll-in animations using IntersectionObserver
(function revealOnScroll() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('reveal-in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal-in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  items.forEach(el => io.observe(el));
})();
