/* =========================
   Navbar interactions
========================= */
const navbar = document.querySelector(".navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("active");
  });
}

window.addEventListener("scroll", () => {
  if (!navbar) return;
  if (window.scrollY > 10) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");
});

/* =========================
   Rooms reveal animation
========================= */
const roomCards = document.querySelectorAll(".room-card");
function revealRooms() {
  if (!roomCards.length) return;
  const triggerBottom = window.innerHeight / 1.2;
  roomCards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) card.classList.add("active");
  });
}
window.addEventListener("scroll", revealRooms);
revealRooms();

/* =========================
   Carousel (GSAP optional)
========================= */
const canAnimate =
  typeof window.gsap !== "undefined" &&
  typeof window.Draggable !== "undefined";

if (canAnimate) {
  class Carousel {
    constructor(carousel) {
      this.carousel = carousel;
      this.track = carousel.querySelector(".carousel-track");
      if (!this.track) return;

      this.slides = Array.from(this.track.children);
      if (!this.slides.length) return;

      this.prevBtn = carousel.querySelector(".prev");
      this.nextBtn = carousel.querySelector(".next");
      this.dotsContainer = carousel.querySelector(".carousel-dots");

      this.slides.forEach((slide) => {
        this.track.appendChild(slide.cloneNode(true));
      });

      this.allSlides = Array.from(this.track.children);
      this.slideCount = this.slides.length;

      this.position = 0;
      this.velocity = 0;
      this.isInteracting = false;

      this.AUTO_SPEED = 0.055;
      this.FRICTION = 0.955;
      this.PARALLAX = 38;
      this.init();
    }

    init() {
      this.createDots();
      this.measure();
      this.bind();
      this.startRAF();
    }

    measure() {
      this.slideWidth = this.slides[0].offsetWidth || 1;
      this.totalWidth = this.slideWidth * this.slideCount;
    }

    createDots() {
      if (!this.dotsContainer) return;
      this.dotsContainer.innerHTML = "";
      for (let i = 0; i < this.slideCount; i++) {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");
        this.dotsContainer.appendChild(dot);
      }
      this.dots = Array.from(this.dotsContainer.children);
    }

    bind() {
      this.prevBtn?.addEventListener("click", () => this.nudge(1));
      this.nextBtn?.addEventListener("click", () => this.nudge(-1));

      this.dots?.forEach((dot, i) => {
        dot.addEventListener("click", () => this.goTo(i));
      });

      this.carousel.addEventListener(
        "mouseenter",
        () => (this.isInteracting = true),
      );
      this.carousel.addEventListener(
        "mouseleave",
        () => (this.isInteracting = false),
      );

      Draggable.create(this.track, {
        type: "x",
        inertia: true,
        onPress: () => (this.isInteracting = true),
        onDrag: function () {
          this.velocity = this.deltaX * 0.045;
        }.bind(this),
        onRelease: function () {
          this.velocity += this.getVelocity("x") * 0.004;
          this.isInteracting = false;
        }.bind(this),
      });

      window.addEventListener("resize", () => this.measure());
    }

    nudge(direction) {
      this.velocity += direction * this.slideWidth * 0.05;
    }

    goTo(index) {
      const target = -index * this.slideWidth;
      gsap.to(this, {
        velocity: (target - this.position) * 0.015,
        duration: 1.2,
        ease: "power4.out",
      });
    }

    updateDots() {
      if (!this.dots) return;
      const index =
        Math.abs(Math.round(this.position / this.slideWidth)) % this.slideCount;
      this.dots.forEach((dot) => dot.classList.remove("active"));
      this.dots[index]?.classList.add("active");
    }

    startRAF() {
      gsap.ticker.add(() => {
        if (!this.isInteracting) {
          this.velocity += this.AUTO_SPEED;
        }

        this.position += this.velocity;
        this.velocity *= this.FRICTION;

        if (this.position <= -this.totalWidth) {
          this.position += this.totalWidth;
        }
        if (this.position >= 0) {
          this.position -= this.totalWidth;
        }

        gsap.set(this.track, {
          x: this.position,
          force3D: true,
        });

        this.allSlides.forEach((slide, i) => {
          const img = slide.querySelector("img") || slide;
          const offset = (this.position + i * this.slideWidth) / this.slideWidth;

          gsap.set(img, {
            x: offset * this.PARALLAX,
            scale: 1.04 + Math.abs(offset) * 0.02,
            force3D: true,
          });
        });

        this.updateDots();
      });
    }
  }

  document.querySelectorAll(".carousel").forEach((c) => new Carousel(c));
}
