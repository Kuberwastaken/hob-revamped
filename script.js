const header = document.querySelector("[data-header]");
const progress = document.querySelector(".scroll-progress");
const slides = [...document.querySelectorAll("[data-hero-slide]")];
const dots = [...document.querySelectorAll("[data-slide-target]")];
const reveals = [...document.querySelectorAll(".reveal")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  document.body.classList.add("no-motion");
}

let activeSlide = 0;
let slideTimer;

function setSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeSlide);
  });
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeSlide);
  });
}

function startHeroRotation() {
  if (reduceMotion || slides.length < 2) return;
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => setSlide(activeSlide + 1), 5200);
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    setSlide(Number(dot.dataset.slideTarget));
    startHeroRotation();
  });
});

function updateChrome() {
  const scrolled = window.scrollY > 32;
  header?.classList.toggle("is-scrolled", scrolled);

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollRatio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  progress?.style.setProperty("--scroll-progress", `${Math.min(scrollRatio * 100, 100)}%`);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -60px 0px",
  }
);

reveals.forEach((element) => revealObserver.observe(element));

window.addEventListener("scroll", updateChrome, { passive: true });
window.addEventListener("resize", updateChrome);

updateChrome();
setSlide(0);
startHeroRotation();
