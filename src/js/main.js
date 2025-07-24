import { updateCartCount } from "./CartCount.mjs";
import { loadHeaderFooter, initSearchBar } from "./utils.mjs";
import Alert from "./Alert.mjs";

const alert = new Alert("/json/alerts.json");
alert.init();

// loadHeaderFooter().then(() => {
//   initSearchBar(); // ✅ Makes the search form work
// });
//   updateCartCount();

// })
// Call this on load
// loadHeaderFooter().then(() => {
//   updateCartCount(); // ✅ Now header is in the DOM, no error
// });

loadHeaderFooter().then(() => {
  initSearchBar();      // ✅ Attaches search form listener
  updateCartCount();    // ✅ Runs after header is injected
});
