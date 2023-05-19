

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
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

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn();
  parentElement.innerHTML = htmlString;
  if(callback) {
    callback();
}
}


export function setSuperscript(){
  const backpackSuperscript = document.getElementById("superscript");
  let cartItems = getLocalStorage("so-cart");
  if (cartItems.length == 0){
    backpackSuperscript.style.display = "none"
  }else{
    backpackSuperscript.innerText = cartItems.length
    
  }
}

function loadTemplate(path) {
  // wait what?  we are returning a new function? 
  // this is called currying and can be very helpful.
  return async function () {
      const res = await fetch(path);
      if (res.ok) {
      const html = await res.text();
      return html;
      }
  };
} 

export function loadHeaderFooter(){
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");
  renderWithTemplate(headerTemplateFn, headerElement, setSuperscript);
  renderWithTemplate(footerTemplateFn, footerElement);
}