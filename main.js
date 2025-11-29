// main.js

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const headingWrap = document.getElementById("xmasHeading");
    const sparkleLayer = document.getElementById("sparkleLayer");
    const SPARKLE_COUNT = 35;

    // Create sparkles with random positions & delays
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      const s = document.createElement("div");
      s.className = "sparkle";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.animationDelay = (Math.random() * 2) + "s";
      sparkleLayer.appendChild(s);
    }

    const sparkles = Array.from(document.querySelectorAll(".sparkle"));

    function updateSparkles() {
      const rect = headingWrap.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // Distance of heading center from viewport center
      const headingCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distance = Math.abs(headingCenter - viewportCenter);

      // 1 when in center, fades as it moves away
      let intensity = 1 - distance / (viewportHeight * 0.8);
      intensity = Math.max(0, Math.min(1, intensity));

      sparkles.forEach((s, index) => {
        // small vertical parallax based on scroll
        const floatOffset = (window.scrollY * 0.05 + index * 3) % 20;
        s.style.opacity = (0.1 + 0.9 * intensity).toString();
        s.style.transform = `translateY(${-floatOffset}px) scale(${0.5 + 0.7 * intensity})`;
      });
    }

    updateSparkles();
    window.addEventListener("scroll", updateSparkles);
    window.addEventListener("resize", updateSparkles);
  });
</script>

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
