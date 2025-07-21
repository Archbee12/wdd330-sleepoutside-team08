import{g as s,s as i}from"./utils-BGUWgxOt.js";function u(){const t=s("so-cart");if(!t||t.length===0){document.querySelector(".product-list").innerHTML=`
      <li style="text-align: center; padding: 2rem;">Your cart is empty.</li>`;return}const e=t.map(a=>y(a)).join("");document.querySelector(".product-list").innerHTML=e,d(t),f(),p()}function y(t){const e=t.Quantity||1,a=(t.FinalPrice*e).toFixed(2);return`<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${t.Image}" alt="${t.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${t.Name}</h2>
    </a>
    <p class="cart-card__color">${t.Colors[0].ColorName}</p>
    
    <label for="qty-${t.Id}">Qty:</label>
    <input 
      type="number" 
      id="qty-${t.Id}" 
      class="quantity-input" 
      value="${e}" 
      min="1" 
      data-id="${t.Id}" 
    />

    <p class="cart-card__subtotal">Subtotal: $${a}</p>

    <button class="remove-item" data-id="${t.Id}">Remove</button>
  </li>`}function g(t){return t.reduce((a,r)=>a+r.FinalPrice*(r.Quantity||1),0).toFixed(2)}function d(t){const e=document.querySelector(".cart-summary");e&&e.remove();const r=`
    <section class="cart-summary" style="text-align:right; margin: 2rem;">
      <hr />
      <p><strong>Total:</strong> $${g(t)}</p>
    </section>
  `;document.querySelector(".products").insertAdjacentHTML("beforeend",r)}function f(){document.querySelectorAll(".quantity-input").forEach(t=>{t.addEventListener("change",e=>{const a=parseInt(e.target.value),r=e.target.dataset.id;if(a<1||isNaN(a)){e.target.value=1;return}let c=s("so-cart")||[];const o=c.findIndex(n=>n.Id===r);if(o>-1){c[o].Quantity=a,i("so-cart",c);const n=t.closest(".cart-card").querySelector(".cart-card__subtotal"),m=(c[o].FinalPrice*a).toFixed(2);n.textContent=`Subtotal: $${m}`;const l=document.querySelector(".cart-summary");l&&l.remove(),d(c)}})})}function p(){document.querySelectorAll(".remove-item").forEach(t=>{t.addEventListener("click",e=>{const a=e.target.dataset.id;let r=s("so-cart")||[];r=r.filter(c=>c.Id!==a),i("so-cart",r),u()})})}u();
