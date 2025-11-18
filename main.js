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
