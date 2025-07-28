import{r as n,a as c,l as o,u as d,b as l}from"./CartCount-B4q7_aba.js";import{E as u}from"./ExternalServices-OHBWtN4X.js";function m(s){var t;const{isDiscounted:a,discountPercent:e}=c(s);return`
    <li class="product-card">
      <a href="../product_pages/index.html?product=${s.Id}">
        <div class="product-card__image-wrapper">
          <img src="${(t=s.Images)==null?void 0:t.PrimaryMedium}" alt="${s.Name}">
          ${a?`<span class="discount-badge">${e}% OFF</span>`:""}
        </div>
        <h2>${s.Brand.Name}</h2>
        <h3>${s.Name}</h3>
        <p class="product-card__price">
          $${s.FinalPrice}
          ${a?`<span class="original-price">$${s.SuggestedRetailPrice}</span>`:""}
        </p>
      </a>
    </li>
  `}class h{constructor(a,e,t){this.category=a,this.dataSource=e,this.listElement=t,this.products=[]}async init(){const e=new URLSearchParams(window.location.search).get("search");let t=[];e?(document.querySelector(".title").textContent=`Search results for "${e}"`,t=await this.dataSource.searchProducts(e)):(t=await this.dataSource.getData(this.category),document.querySelector(".title").textContent=this.category),this.products=t,t.length===0?this.listElement.innerHTML="<p>No products found.</p>":this.renderList(t);const r=document.getElementById("sort");r&&r.addEventListener("change",i=>{this.displaySortList(i.target.value)})}displaySortList(a){let e=[...this.products];a==="name"?e.sort((t,r)=>t.Name.localeCompare(r.Name)):a==="price"&&e.sort((t,r)=>t.FinalPrice-r.FinalPrice),this.renderList(e)}renderList(a){n(m,this.listElement,a,"afterbegin",!0)}}document.addEventListener("DOMContentLoaded",async()=>{await o(),d();const s=l("category")||"tents",a=document.querySelector(".product-list"),e=new u(s);new h(s,e,a).init()});
