(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) a(r);
  new MutationObserver((r) => {
    for (const o of r)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && a(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const o = {};
    return (
      r.integrity && (o.integrity = r.integrity),
      r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : r.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function a(r) {
    if (r.ep) return;
    r.ep = !0;
    const o = n(r);
    fetch(r.href, o);
  }
})();
function u(e) {
  return JSON.parse(localStorage.getItem(e));
}
function d(e, t) {
  localStorage.setItem(e, JSON.stringify(t));
}
function f(e) {
  const t = window.location.search;
  return new URLSearchParams(t).get(e);
}
function c(e, t, n, a) {
  return (t.innerHTML = e), urlParams.get(param);
}
async function i(e) {
  return await (await fetch(e)).text();
}
async function m() {
  const e = await i("../partials/header.html"),
    t = await i("../partials/footer.html"),
    n = document.querySelector("#main-header"),
    a = document.querySelector("#main-footer");
  c(e, n), c(t, a);
}
function l(e) {
  if (e.ok) return e.json();
  throw new Error(`Fetch failed: ${e.status} ${e.statusText}`);
}
class h {
  constructor(t) {
    (this.category = t), (this.path = `../json/${this.category}.json`);
  }
  getData() {
    return fetch(this.path)
      .then(l)
      .then((t) => t);
  }
  async findProductById(t) {
    const a = (await this.getData()).find((r) => r.Id === t);
    return (
      a ||
        console.warn(
          `Product with ID "${t}" not found in ${this.category}.json`,
        ),
      a
    );
  }
}
export { h as P, f as a, u as g, m as l, d as s };
