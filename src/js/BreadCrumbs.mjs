export function updateBreadcrumb(type, data) {
  const breadcrumb = document.getElementById("breadcrumb");
  if (!breadcrumb) return;

  // Convert category to Sentence case
  const formatCategory = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  if (type === "home") {
    breadcrumb.innerHTML = "";
  } else if (type === "listing") {
    breadcrumb.innerHTML = `${formatCategory(data.category)} → (${data.count} items)`;
  } else if (type === "product") {
    breadcrumb.innerHTML = `${formatCategory(data.category)}`;
  }
}
