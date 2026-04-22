/* ============================================================
   SPENJENN GRIND — main.js
   Athletic Luxury Edition
   ============================================================ */

(function () {
  'use strict';

  /* ── Page intro splash ── */
  var intro = document.getElementById('pageIntro');
  if (intro) {
    setTimeout(function () {
      intro.classList.add('hidden');
    }, 900);
  }

  /* ── Navigation scroll behaviour ── */
  var nav = document.getElementById('nav');

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  if (nav && !document.querySelector('.hero')) {
    nav.classList.add('scrolled');
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Mobile hamburger ── */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ── Active nav link ── */
  var page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Scroll fade-in (IntersectionObserver) ── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.fade-in').forEach(function (el) {
    io.observe(el);
  });

  /* ── Animated stat counters ── */
  var statNums = document.querySelectorAll('.stat-num[data-target]');
  if (statNums.length) {
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 1400;
        var startTime = null;

        function tick(now) {
          if (!startTime) startTime = now;
          var elapsed = now - startTime;
          var progress = Math.min(elapsed / duration, 1);
          var ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(ease * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      });
    }, { threshold: 0.6 });

    statNums.forEach(function (el) { counterIO.observe(el); });
  }

  /* ── Floating Book CTA ── */
  var floatCta = document.querySelector('.float-cta');
  if (floatCta) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 420) {
        floatCta.classList.add('show');
      } else {
        floatCta.classList.remove('show');
      }
    }, { passive: true });
  }

  /* ── NBA photo tilt effect ── */
  document.querySelectorAll('.nba-photo').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      var y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
      card.style.transform = 'perspective(800px) rotateY(' + x + 'deg) rotateX(' + y + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  /* ── Hero parallax (subtle) ── */
  var heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      heroBg.style.transform = 'scale(1.04) translateY(' + (scrolled * 0.15) + 'px)';
    }, { passive: true });
  }

})();
