const hamburger = document.querySelector(".header .nav-bar .nav-list .hamburger");
const mobileMenu = document.querySelector(".header .nav-bar .nav-list ul");
const menuItems = document.querySelectorAll(".header .nav-bar .nav-list ul li a");
const header = document.querySelector(".header.containerHeader");

function setMenuOpen(isOpen) {
  if (!hamburger || !mobileMenu) {
    return;
  }

  hamburger.classList.toggle("active", isOpen);
  mobileMenu.classList.toggle("active", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
  hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("active");
    setMenuOpen(isOpen);
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
    if (mobileMenu && mobileMenu.classList.contains("active")) {
      setMenuOpen(false);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }
  if (mobileMenu && mobileMenu.classList.contains("active")) {
    setMenuOpen(false);
  }
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

async function updateVisitCount() {
  const visitCountElements = [
    document.getElementById("visit-count"),
    document.getElementById("visit-count-hero"),
  ].filter(Boolean);

  if (visitCountElements.length === 0 || typeof fetch !== "function") {
    return;
  }

  if (window.location.protocol === "file:") {
    return;
  }

  const countedKey = "visit_counted:v1";

  const shouldIncrement = (() => {
    try {
      if (window.sessionStorage.getItem(countedKey) === "1") {
        return false;
      }
      window.sessionStorage.setItem(countedKey, "1");
      return true;
    } catch {
      return true;
    }
  })();

  const endpoint = shouldIncrement ? "/api/visits?mode=up" : "/api/visits?mode=get";

  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) {
      return;
    }

    const data = await response.json();

    const value =
      (typeof data?.value === "number" && data.value) ||
      (typeof data?.counter?.value === "number" && data.counter.value) ||
      (typeof data?.count === "number" && data.count) ||
      (typeof data?.data?.value === "number" && data.data.value);

    if (typeof value === "number") {
      const formatted = value.toLocaleString();
      visitCountElements.forEach((element) => {
        element.textContent = formatted;
      });
    }
  } catch {
  }
}

updateVisitCount();


