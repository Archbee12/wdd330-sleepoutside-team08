import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",  // Output directory after build
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),  // Main entry page
        cart: resolve(__dirname, "src/cart/index.html"),  // Cart page
        checkout: resolve(__dirname, "src/checkout/index.html"),  // Checkout page
        product1: resolve(__dirname, "src/product_pages/cedar-ridge-rimrock-2.html"),  // Individual product page 1
        product2: resolve(__dirname, "src/product_pages/marmot-ajax-3.html"),  // Individual product page 2
        product3: resolve(__dirname, "src/product_pages/northface-alpine-3.html"),  // Individual product page 3
        product4: resolve(__dirname, "src/product_pages/northface-talus-4.html"),  // Individual product page 4
        productListing: resolve(__dirname, "src/product_listing/index.html"),  // Product listing page
      },
    },
  },
});
