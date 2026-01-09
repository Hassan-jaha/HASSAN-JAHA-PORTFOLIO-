/* ===== MENU MOBILE ===== */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* ===== PARTICLES BACKGROUND ===== */
particlesJS("particles-js", {
  particles: {
    number: {
      value: window.innerWidth < 768 ? 40 : 80
    },
    size: { value: 3 },
    move: { speed: 1 }
  },
  retina_detect: true
});

/* ===== BACK TO TOP ===== */
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

/* ===== LOGO INTRO (SANS CLICK, SANS OVERLAY) ===== */
document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".logo");
  const overlay = document.getElementById("intro-overlay");
  if (!logo || !overlay) return;

  const text = logo.textContent;
  let i = 0;

  document.body.classList.add("intro-playing");

  logo.textContent = "";
  logo.classList.add("intro-active");

  const typing = setInterval(() => {
    logo.textContent += text[i];
    i++;

    if (i === text.length) {
      clearInterval(typing);

      setTimeout(() => {
        logo.classList.remove("intro-active");
        document.body.classList.remove("intro-playing");

        overlay.classList.add("hide");

        // نحيد overlay نهائيا
        setTimeout(() => {
          overlay.remove();
        }, 1500);
      }, 1200);
    }
  }, 180);
});


document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const toggle = document.getElementById("music-toggle");

  if (!music || !toggle) return;

  music.volume = 0.25;
  music.muted = true;

  let isPlaying = false;

  const playMusic = () => {
    music.muted = false;
    music.play().then(() => {
      isPlaying = true;
      toggle.textContent = "⏸";
      toggle.classList.remove("paused");
    }).catch(err => {
      console.warn("Play blocked:", err);
    });
  };

  const pauseMusic = () => {
    music.pause();
    isPlaying = false;
    toggle.textContent = "🔊";
    toggle.classList.add("paused");
  };

  // toggle click
  toggle.addEventListener("click", () => {
    isPlaying ? pauseMusic() : playMusic();
  });

  // autoplay AU SCROLL (desktop)
  let started = false;
  const startOnScroll = () => {
    if (started || window.innerWidth < 768) return;
    started = true;
    playMusic();
    window.removeEventListener("scroll", startOnScroll);
  };

  window.addEventListener("scroll", startOnScroll);
});


/* ===== ABOUT TEXT APPEAR ON SCROLL ===== */
document.addEventListener("DOMContentLoaded", () => {
  const aboutText = document.querySelector(".about-summary");
  if (!aboutText) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutText.classList.add("show");
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(aboutText);
});
