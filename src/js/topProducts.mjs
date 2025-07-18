import ProductData from "./ProductData.mjs";

// Renders the Top Products section with discount indicators
export async function renderTopProducts() {
  const dataSource = new ProductData("tents");
  const products = await dataSource.getData();
  const topProductIds = ["880RR", "985RF", "985PR", "344YJ"];
  const topProducts = products.filter(p => topProductIds.includes(p.Id));

  const productList = document.querySelector(".product-list");
  if (!productList) return;

  productList.innerHTML = topProducts.map(product => {
    const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
    let discountBadge = "";
    if (isDiscounted) {
      const percent = Math.round(
        100 * (1 - product.FinalPrice / product.SuggestedRetailPrice)
      );
      discountBadge = `<span class="discount-badge">-${percent}%</span>`;
    }
    return `
      <li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">    
          <img src="${product.Image}" alt="${product.Name}" />
          <h3 class="card__brand">${product.Brand.Name}</h3>
          <h2 class="card__name">${product.NameWithoutBrand}</h2>
          <p class="product-card__price">$${product.FinalPrice.toFixed(2)} ${discountBadge}</p>
        </a>
      </li>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", renderTopProducts);
