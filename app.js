const hamburger = document.querySelector(".header .nav-bar .nav-list .hamburger");
const mobileMenu = document.querySelector(".header .nav-bar .nav-list ul");
const menuItems = document.querySelectorAll(".header .nav-bar .nav-list ul li a");
const header = document.querySelector(".header.containerHeader");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });
}

if (header) {
  document.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 120) {
      header.style.backgroundColor = "rgba(248, 250, 252, 0.98)";
      header.style.boxShadow = "0 10px 24px rgba(15, 23, 42, 0.08)";
    } else {
      header.style.backgroundColor = "rgba(248, 250, 252, 0.9)";
      header.style.boxShadow = "none";
    }
  });
}

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (hamburger && mobileMenu && mobileMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
    }
  });
});

function bindModal(buttonId, modalId) {
  const button = document.getElementById(buttonId);
  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    $(`#${modalId}`).modal("show");
  });
}

bindModal("myBtn", "carouselModal");
bindModal("myBtn2", "carouselModalSliderz");
bindModal("myBtn3", "carouselModalNC");
bindModal("myBtn4", "carouselModalJS");
bindModal("myBtn5", "carouselModalUI");
bindModal("myBtn6", "carouselModalReact");

const revealTargets = document.querySelectorAll(
  "#services .service-item, #projects .project-item, #about .col-left, #about .col-right, #contact .contact-item"
);

revealTargets.forEach((element) => {
  element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealTargets.forEach((element) => {
    element.classList.add("is-visible");
  });
}


