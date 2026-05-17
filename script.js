const form = document.querySelector("#requestForm");
const statusNode = document.querySelector(".form-status");
const anchorLinks = document.querySelectorAll('a[href^="#"]');

const getHeaderOffset = () => {
  const header = document.querySelector(".topbar");
  const isMobile = window.matchMedia("(max-width: 620px)").matches;

  return header && !isMobile ? header.getBoundingClientRect().height : 0;
};

const scrollToHashTarget = (hash, behavior = "smooth") => {
  if (!hash || hash === "#") return;

  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top: Math.max(top, 0), behavior });
};

anchorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");
    const target = hash ? document.getElementById(hash.slice(1)) : null;

    if (!hash || !target) return;

    event.preventDefault();
    history.pushState(null, "", hash);
    scrollToHashTarget(hash);
  });
});

window.addEventListener("hashchange", () => {
  requestAnimationFrame(() => scrollToHashTarget(window.location.hash, "auto"));
});

window.addEventListener("load", () => {
  requestAnimationFrame(() => scrollToHashTarget(window.location.hash, "auto"));
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const goal = String(data.get("goal") || "").trim();

  statusNode.textContent = `${name || "Заявка"} принята: ${goal || "поиск жилья"}. Мы свяжемся и уточним параметры.`;
  form.reset();
});
