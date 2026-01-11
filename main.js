// main.js

// ------------ NAV TOGGLE (MOBILE) ------------
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav__toggle");
  const navLinks = document.getElementById("navLinks");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("nav__links--open");
    });

    // Close when clicking a link (on small screens)
    navLinks.addEventListener("click", (e) => {
      if (e.target.classList.contains("nav__link")) {
        navLinks.classList.remove("nav__links--open");
      }
    });
  }

  // ------------ SCROLL REVEAL ANIMATION ------------
  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach((el) => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver isn't supported
    reveals.forEach((el) => el.classList.add("reveal--visible"));
  }

  // ------------ SIMPLE PARALLAX ON HERO IMAGE ------------
  const heroPhoto = document.querySelector(".hero__photo-wrap");
  if (heroPhoto) {
    const strength = 16; // movement intensity
    window.addEventListener("mousemove", (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * strength;
      const y = (e.clientY / innerHeight - 0.5) * strength;
      heroPhoto.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  }

  // ------------ CONTACT FORM (FAKE SUBMIT) ------------
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = contactForm.name.value.trim();
      if (!name) {
        formStatus.textContent = "Please add your name so I know who to reply to.";
        return;
      }

      formStatus.textContent =
        "Thank you, " +
        name +
        "! Your message isn’t really being sent (this is a static GitHub Page), " +
        "but this is where it would be processed.";
      contactForm.reset();
    });
  }
});


    // ------------ SCROLLSPY (ACTIVE NAV LINK ON SCROLL) ------------
  const navLinksAll = document.querySelectorAll('.nav__links .nav__link');
  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.offsetHeight : 0;

  const sections = [
    document.getElementById('top'),
    document.getElementById('about'),
    document.getElementById('book'),
    document.getElementById('contact')
  ].filter(Boolean);

  const setActiveLink = (sectionId) => {
    navLinksAll.forEach((a) => a.classList.remove('nav__link--active'));
    const active = Array.from(navLinksAll).find(
      (a) => (a.getAttribute('href') || '') === `#${sectionId}`
    );
    if (active) active.classList.add('nav__link--active');
  };

  // If you are basically at the bottom, force "contact" active
  const handleBottom = () => {
    const pxFromBottom = 4; // tolerance
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - pxFromBottom;

    if (atBottom) setActiveLink('contact');
  };

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        // Bottom override (fixes short last section)
        handleBottom();

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveLink(visible.target.id);
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5],
        rootMargin: `-${headerHeight + 10}px 0px -45% 0px`
      }
    );

    sections.forEach((s) => spy.observe(s));
    setActiveLink('top');

    window.addEventListener('scroll', handleBottom, { passive: true });
  } else {
    setActiveLink('top');
  }
