import{l as i,i as u,u as d,g as s}from"./CartCount-B4q7_aba.js";i().then(()=>{u(),d()});function n(){let t=s("so-cart")||[];const o=t.map(r=>q(r));document.querySelector(".product-list").innerHTML=o.join(""),document.querySelectorAll(".remove-btn").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.id;t=t.map(a=>(a.Id===c&&(a.quantity=(a.quantity||1)-1),a)).filter(a=>a.quantity>0),localStorage.setItem("so-cart",JSON.stringify(t)),n(),d()})}),document.querySelectorAll(".increase").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.id;let a=s("so-cart")||[];a=a.map(e=>(e.Id==c&&(e.quantity=(e.quantity||1)+1),e)),localStorage.setItem("so-cart",JSON.stringify(a)),n()})}),document.querySelectorAll(".decrease").forEach(r=>{r.addEventListener("click",()=>{const c=r.dataset.id;let a=s("so-cart")||[];a=a.map(e=>(e.Id==c&&(e.quantity=(e.quantity||1)-1),e)),localStorage.setItem("so-cart",JSON.stringify(a)),n()})}),y(t)}function y(t){const o=document.querySelector(".cart-footer"),r=o.querySelector(".cart-total");if(t.length>0){const c=t.reduce((a,e)=>{const l=e.quantity||1;return a+e.FinalPrice*l},0);o.classList.remove("hide"),r.innerHTML=`<h3>Total: $${c.toFixed(2)}</h3>`}else o.classList.add("hide")}function q(t){return`<li class="cart-card divider" data-id="${t.Id}">
    <span class="remove-btn" data-id="${t.Id}">❌</span>
    <a href="#" class="cart-card__image">
      <img
        src="${t.Images.PrimaryMedium}"
        alt="${t.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${t.Name}</h2>
    </a>
    <p class="cart-card__color">${t.Colors[0].ColorName}</p>
    <div class="quantity-controls">
      <button class="decrease" data-id="${t.Id}">-</button>
      <span class="cart-card__quantity">Qty: ${t.quantity||1}</span>
      <button class="increase" data-id="${t.Id}">+</button>
    </div>
    <p class="cart-card__price">$${(t.FinalPrice*(t.quantity||1)).toFixed(2)}</p>
  </li>`}n();
