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

// retrieve data from localstorage with error handling
export function getLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error parsing JSON from localStorage key "${key}":`, error);
    return null;
  }
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click, with element existence check
export function setClick(selector, callback) {
  const el = qs(selector);
  if (!el) {
    console.warn(`setClick: Element not found for selector "${selector}"`);
    return;
  }
  el.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback(event);
  });
  el.addEventListener("click", callback);
}

// get URL query parameter by name
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
export function alertMessage(message, scroll=true) {
  const alertElement = document.createElement('div');
  alertElement.classList.add('alert');
  alertElement.innerHTML = message;

  // Append to the top of the body or form
  document.body.insertBefore(alertElement, document.body.firstChild);

  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Remove after 5 seconds
  setTimeout(() => {
    alertElement.remove();
  }, 5000);
}

