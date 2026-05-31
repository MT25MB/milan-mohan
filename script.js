/* ============================================================
   Milan Mohan — Personal Website Scripts
   ============================================================ */

(function () {
    'use strict';

    // ===================== DOM REFERENCES =====================
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const themeToggle = document.getElementById('themeToggle');
    const abstractToggle = document.getElementById('abstractToggle');
    const abstractContent = document.getElementById('abstractContent');
    const backToTop = document.getElementById('backToTop');
    const navLinkEls = document.querySelectorAll('.nav__link');
    const revealEls = document.querySelectorAll('.reveal');

    // ===================== SMOOTH SCROLL =====================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
            }
        });
    });

    // ===================== MOBILE MENU TOGGLE =====================
    navToggle.addEventListener('click', function () {
        this.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
        }
    });

    // ===================== THEME TOGGLE =====================
    var STORAGE_KEY = 'milan-website-theme';

    function getPreferredTheme() {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }

    // Initialize theme on load
    setTheme(getPreferredTheme());

    themeToggle.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        var next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem(STORAGE_KEY)) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ===================== NAV SCROLL EFFECT =====================
    function onScroll() {
        var scrollY = window.scrollY;

        // Add scrolled class to nav
        if (scrollY > 20) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        // Back to top button visibility
        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ===================== BACK TO TOP =====================
    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===================== ACTIVE NAV LINK HIGHLIGHTING =====================
    var sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        var scrollY = window.scrollY + 100;

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinkEls.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();

    // ===================== SCROLL REVEAL ANIMATIONS =====================
    var revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.05,
            rootMargin: '0px 0px 50px 0px'
        }
    );

    revealEls.forEach(function (el) {
        revealObserver.observe(el);
    });

    // Fallback: if elements are already in view on load, reveal them immediately
    setTimeout(function () {
        revealEls.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('visible');
                revealObserver.unobserve(el);
            }
        });
    }, 100);

    // Safety net: reveal everything after 3 seconds in case observer fails
    setTimeout(function () {
        revealEls.forEach(function (el) {
            if (!el.classList.contains('visible')) {
                el.classList.add('visible');
                revealObserver.unobserve(el);
            }
        });
    }, 3000);

    // ===================== ABSTRACT TOGGLE =====================
    abstractToggle.addEventListener('click', function () {
        var isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);

        if (!isExpanded) {
            abstractContent.classList.add('open');
            abstractContent.style.maxHeight = abstractContent.scrollHeight + 'px';
        } else {
            abstractContent.style.maxHeight = '0';
            setTimeout(function () {
                abstractContent.classList.remove('open');
            }, 400);
        }
    });

    // ===================== KEYBOARD NAVIGATION =====================
    document.addEventListener('keydown', function (e) {
        // Escape closes mobile menu
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.focus();
        }
    });

    // ===================== TYPED EFFECT FOR TAGLINE (OPTIONAL) =====================
    // Adds a subtle cursor blink to the tagline on first load
    var tagline = document.querySelector('.hero__tagline');
    if (tagline) {
        tagline.style.borderRight = '2px solid var(--color-accent)';
        tagline.style.paddingRight = '4px';
        tagline.style.animation = 'cursorBlink 1s step-end infinite';
    }
})();
