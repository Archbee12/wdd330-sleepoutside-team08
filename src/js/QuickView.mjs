import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices();
const modal = document.getElementById("quickViewModal");

function buildModal(product) {
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
      <h3>${product.Name}</h3>
      <p><strong>Price:</strong> $${product.FinalPrice.toFixed(2)}</p>
      <p>${product.DescriptionHtmlSimple}</p>
    </div>
  `;
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  modal.innerHTML = ""; // Clean up
}

export function initQuickView() {
  document.body.addEventListener("click", async (e) => {
    if (e.target.classList.contains("quick-view-btn")) {
      const id = e.target.dataset.id;
      const product = await dataSource.findProductById(id);
      buildModal(product);
    }
    if (e.target.id === "quickViewModal" || e.target.classList.contains("close-button")) {
      closeModal();
    }
  });
}
