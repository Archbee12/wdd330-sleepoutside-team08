// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get URL parameter
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// render a list of items using a template function
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn).join('');
  if (clear) parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML(position, htmlStrings);
}

// render a single element with optional callback
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// convert fetch response to JSON
export function convertToJson(response) {
  return response.json();
}

// load HTML template as text
async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// load header and footer into the DOM
export function loadHeaderFooter() {
  const headerPromise = fetch("/partials/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("#main-header").innerHTML = data;
    });

  const footerPromise = fetch("/partials/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("#main-footer").innerHTML = data;
    });

  return Promise.all([headerPromise, footerPromise]);
}

// calculate discount info for a product
export function getDiscountInfo(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const discountPercent = isDiscounted
    ? Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100)
    : 0;

  return { isDiscounted, discountPercent };
}



export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export function initSearchBar() {
  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = document.getElementById("searchInput").value.trim();
      if (query) {
        window.location.href = `/product_listing/index.html?search=${encodeURIComponent(query)}`;
      }
    });
  }
}

export function initComments(productId) {
  const commentSection = document.getElementById("comments-section");
  const commentList = document.getElementById("comments-list");
  const commentForm = document.getElementById("comment-form");
  const commentTextarea = commentForm.querySelector("textarea");

  // Load saved comments from localStorage
  let comments = JSON.parse(localStorage.getItem(`comments_${productId}`)) || [];
  renderComments(comments);

  // Handle new comment submission
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newComment = commentTextarea.value.trim();
    if (newComment) {
      comments.push(newComment);
      localStorage.setItem(`comments_${productId}`, JSON.stringify(comments));
      renderComments(comments);
      commentTextarea.value = "";
    }
  });

  function renderComments(comments) {
    commentList.innerHTML = "";
    comments.forEach((comment) => {
      const li = document.createElement("li");
      li.textContent = comment;
      commentList.appendChild(li);
    });
  }
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `
    <p>${message}</p>
    <span class="close-btn">X</span>
  `;

  // Close the alert when X is clicked
  alert.addEventListener('click', function (e) {
    if (e.target.classList.contains('close-btn')) {
      alert.remove();
    }
  });

  const main = document.querySelector('main');
  main.prepend(alert); // this stacks newest on top

  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
