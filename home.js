import { checkToken, redirect } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  if (!checkToken()) {
    redirect("/login.html");
  }
  
  const savedProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
  savedProducts.forEach(product => {
    displayProduct(product.name, product.price, product.description);
  });

  document.getElementById("productbtn").addEventListener("click", (event) => {
    event.preventDefault();
    addProduct();
  });
});

function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("dis").value;

  if (name === "" || price === "" || description === "") {
    alert("Iltimos, barcha maydonlarni to'ldiring.");
    return;
  }

  displayProduct(name, price, description);

  const newProduct = { name, price, description };
  const allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
  allProducts.push(newProduct);
  localStorage.setItem("allProducts", JSON.stringify(allProducts));

  document.getElementById("name").value = '';
  document.getElementById("price").value = '';
  document.getElementById("dis").value = '';
}

function displayProduct(name, price, description) {
  const list = document.getElementById("list");
  const listItem = document.createElement("div");
  listItem.innerHTML = `<h2>${name}</h2><p>Narxi:  ${price} $ </p><p>Ta'rif: ${description}</p>`;
  list.appendChild(listItem);
}
