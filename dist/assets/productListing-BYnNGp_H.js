import { a as o, P as s } from "./ProductData-ttST_d2O.js";
function i(a) {
  const t = document.createElement("li");
  return (
    t.classList.add("product-card"),
    (t.innerHTML = `
    <a href="../product_pages/product.html?product=${a.Id}">
      <img src="${a.Image}" alt="${a.Name}" />
      <h2 class="card__brand">${a.Name}</h2>
      <p class="product-card__price">$${Number(a.FinalPrice).toFixed(2)}</p>
    </a>
  `),
    t
  );
}
async function u(a) {
  const e = await new s(a).getData(),
    c = document.querySelector(".product-list");
  (c.innerHTML = ""),
    e.forEach((d) => {
      const n = i(d);
      c.appendChild(n);
    });
}
const r = o("category");
r && u(r);
