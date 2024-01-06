import { createHorizontalProductCard } from "./createHorizontalProdCard.js";
import { findProductInCart } from "./utils/findProductInCart.js";

let cartContainer = document.getElementById("cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart);

cartContainer.addEventListener("click", (event) => {
    cart = cart.filter(({ _id }) => _id !== event.target.dataset.id);
    cartContainer.innerHTML = " ";
    // createProductCard(cart, cartContainer, findProductInCart, "cart");
    createHorizontalProductCard(cart, cartContainer);
    localStorage.setItem("cart", JSON.stringify(cart));
})


createHorizontalProductCard(cart, cartContainer, findProductInCart, "cart");

const cartLength = document.querySelector(".item-count")
cartLength.innerText = cart.length;

const productPrice = document.querySelector(".product-price")
const priceAfterDiscount = cart.reduce((acc, cur) => acc + cur.newPrice, 0);
productPrice.innerText = priceAfterDiscount;

const discount = document.querySelector("#discount");

const priceBeforeDiscount = cart.reduce((acc, cur) => acc + cur.oldPrice, 0)

const discountedAmount = priceBeforeDiscount - priceAfterDiscount;

discount.innerText = discountedAmount;

const totalAmount = document.querySelector(".amount")
totalAmount.innerText = priceAfterDiscount - discountedAmount + 100;

const message = document.querySelector(".message");
message.innerText = discountedAmount;