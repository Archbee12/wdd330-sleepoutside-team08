import{b as n}from"./utils-BGUWgxOt.js";import{P as s}from"./ProductData-AZKCg8GK.js";function i(a){const t=document.createElement("li");return t.classList.add("product-card"),t.innerHTML=`
    <a href="../product_pages/product.html?product=${a.Id}">
      <img src="${a.Image}" alt="${a.Name}" />
      <h2 class="card__brand">${a.Name}</h2>
      <p class="product-card__price">$${Number(a.FinalPrice).toFixed(2)}</p>
    </a>
  `,t}async function m(a){const e=await new s(a).getData(),r=document.querySelector(".product-list");r.innerHTML="",e.forEach(o=>{const d=i(o);r.appendChild(d)})}const c=n("category");c&&m(c);
