
// Loads an HTML partial from a given path and returns a DocumentFragment

export async function loadTemplate(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load template: ${path}`);
  const html = await response.text();
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content;
}

// Renders a DocumentFragment or Node into a target element
export function renderWithTemplate(template, parent) {
  parent.innerHTML = "";
  parent.appendChild(template.cloneNode(true));
}

// Loads header and footer partials into #main-header and #main-footer
// Accepts an optional callback to run after header is loaded (e.g., update cart count)
export async function loadHeaderFooter({
  headerPath = "/partials/header.html",
  footerPath = "/partials/footer.html",
  onHeaderLoaded = null,
  onFooterLoaded = null
} = {}) {
  // Header
  const headerEl = document.getElementById("main-header");
  if (headerEl) {
    const headerFragment = await loadTemplate(headerPath);
    renderWithTemplate(headerFragment, headerEl);
    if (typeof onHeaderLoaded === "function") onHeaderLoaded();
  }
  // Footer
  const footerEl = document.getElementById("main-footer");
  if (footerEl) {
    const footerFragment = await loadTemplate(footerPath);
    renderWithTemplate(footerFragment, footerEl);
    if (typeof onFooterLoaded === "function") onFooterLoaded();
  }
}
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
};
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
};

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param); // uses the passed-in param!
}
