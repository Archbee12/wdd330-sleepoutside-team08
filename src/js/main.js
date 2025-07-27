import { updateCartCount } from "./CartCount.mjs";
import { loadHeaderFooter, initSearchBar } from "./utils.mjs";
import Alert from "./Alert.mjs";

const alert = new Alert("/json/alerts.json");
alert.init();


loadHeaderFooter().then(() => {
  initSearchBar(); // ✅ Attaches search form listener
  updateCartCount(); // ✅ Runs after header is injected
});
