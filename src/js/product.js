if (productId) {
  product.init().then((product) => {
    loadingEl.remove(); // Remove loading once product is rendered

    const brandElement = qs("#productBrand");
    const nameElement = qs("#productName");
    const imageElement = qs("#productImage");
    const priceElement = qs("#productPrice");
    const descElement = qs("#productDesc");
    const colorElement = qs("#productColor");

    brandElement.textContent = product.Brand.Name;
    nameElement.textContent = product.NameWithoutBrand;
    imageElement.src = product.Image;
    imageElement.alt = `Image of ${product.NameWithoutBrand}`;
    priceElement.textContent = `$${product.FinalPrice.toFixed(2)}`;
    descElement.innerHTML = product.DescriptionHtmlSimple;
    colorElement.textContent = product.Colors.join(", ");

    // ✅ Apply discount logic
    const discount = getDiscountInfo(product);
    if (discount.isDiscounted) {
      const discountText = document.createElement("p");
      discountText.textContent = `${discount.discountPercent}% OFF!`;
      discountText.classList.add("product-card__discount");
      priceElement.appendChild(discountText);
    }

    // Add to Cart functionality
    const addToCartButton = qs("#addToCart");
    addToCartButton.addEventListener("click", () => {
      // You'll need to define or import this function
      addProductToCart(product);
    });
  });
}
