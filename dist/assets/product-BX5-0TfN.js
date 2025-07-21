import { g as m, s as h, a as g, P as C } from "./ProductData-ttST_d2O.js";
class y {
  constructor(t, e) {
    (this.productId = t), (this.product = {}), (this.dataSource = e);
  }
  async init() {
    if (
      ((this.product = await this.dataSource.findProductById(this.productId)),
      !this.product)
    ) {
      document.querySelector("main").innerHTML = `
        <h2 style="text-align:center; padding:2rem;">Product not found.</h2>`;
      return;
    }
    this.renderProductDetails();
    const t = document.getElementById("addToCart");
    t && t.addEventListener("click", this.addProductToCart.bind(this));
  }
  addProductToCart() {
    let t = m("so-cart") || [];
    const e = t.findIndex((o) => o.Id === this.product.Id);
    e > -1
      ? (t[e].quantity = (t[e].quantity || 1) + 1)
      : ((this.product.quantity = 1), t.push(this.product)),
      h("so-cart", t);
  }
  renderProductDetails() {
    var s, u, l;
    const t = document.getElementById("productBrand");
    t &&
      (t.textContent =
        ((s = this.product.Brand) == null ? void 0 : s.Name) ||
        "Brand Not Found");
    const e = document.getElementById("productName");
    e &&
      (e.textContent =
        this.product.NameWithoutBrand || this.product.Name || "Product Name");
    const o = document.querySelector("#productPrice");
    isDiscounted
      ? (o.innerHTML = `
        <span class="final-price">$${this.product.FinalPrice.toFixed(2)}</span>
        <span class="original-price">$${this.product.SuggestedRetailPrice.toFixed(2)}</span>
      `)
      : (o.textContent = `$${this.product.FinalPrice.toFixed(2)}`),
      (document.querySelector("#productColor").textContent =
        this.product.Colors[0].ColorName),
      (document.querySelector("#productDesc").innerHTML =
        this.product.DescriptionHtmlSimple);
    const d = document.getElementById("productImage");
    d &&
      ((d.src = this.product.Image || "../images/default.jpg"),
      (d.alt = this.product.NameWithoutBrand || this.product.Name));
    const n = document.querySelector("#productPrice");
    if (n) {
      const p = parseFloat(this.product.FinalPrice) || 0;
      n.textContent = `$${p.toFixed(2)}`;
    }
    const c = document.querySelector("#productColor");
    c &&
      (c.textContent =
        ((l = (u = this.product.Colors) == null ? void 0 : u[0]) == null
          ? void 0
          : l.ColorName) || "Unknown");
    const i = document.querySelector("#productDesc");
    i &&
      (i.innerHTML =
        this.product.DescriptionHtmlSimple || "No description available.");
    const a = document.getElementById("addToCart");
    a && (a.dataset.id = this.product.Id);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const r = g("product"),
    t = new C("tents"),
    e = new y(r, t),
    o = document.createElement("p");
  (o.textContent = "⏳ Loading product..."),
    (o.style.textAlign = "center"),
    document.querySelector("main").appendChild(o),
    r &&
      e.init().then(() => {
        o.remove();
      });
});
