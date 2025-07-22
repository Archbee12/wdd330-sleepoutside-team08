import { g as d, l as i, P as l } from "./ProductData-ttST_d2O.js";
function u() {
  const n = d("so-cart") || [],
    e = document.getElementById("cart-count"),
    a = n.length;
  a > 0
    ? ((e.textContent = a), e.classList.remove("hide"))
    : e.classList.add("hide");
}
i();
u();
async function m() {
  const e = await new l("tents").getData(),
    a = ["880RR", "985RF", "985PR", "344YJ"],
    o = e.filter((t) => a.includes(t.Id)),
    c = document.querySelector(".product-list");
  c &&
    (c.innerHTML = o
      .map((t) => {
        const r = t.FinalPrice < t.SuggestedRetailPrice;
        let s = "";
        return (
          r &&
            (s = `<span class="discount-badge">-${Math.round(100 * (1 - t.FinalPrice / t.SuggestedRetailPrice))}%</span>`),
          `
      <li class="product-card">
        <a href="/product_pages/index.html?product=${t.Id}">
          <img src="${t.Image.replace("../", "/")}" alt="${t.Name}" />
          <h3 class="card__brand">${t.Brand.Name}</h3>
          <h2 class="card__name">${t.NameWithoutBrand}</h2>
          <p class="product-card__price">$${t.FinalPrice.toFixed(2)} ${s}</p>
        </a>
      </li>
    `
        );
      })
      .join(""));
}
document.addEventListener("DOMContentLoaded", m);
