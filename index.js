import { createProductCard } from "./createProductCard.js";
import { products } from "./db/products.js";
import { findProductInCart } from "./utils/findProductInCart.js";

const productContainer = document.getElementById("products");
const filterContainer = document.querySelector(".side-bar")
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// const findProductInCart = (cart, prodId) => {
//     const isProductInCart =
//     cart && cart.length > 0 && cart.some(({_id}) => _id === prodId);
//     return isProductInCart;
// }


// for(let product of products) {
//     const cardContainer = document.createElement("div");
//     cardContainer.classList.add(
//     "card",
//     "card-vertical",
//     "d-flex",
//     "direction-column",
//     "relative",
//     "shadow"
//     );

//     /**Image container */
//     const imageContainer = document.createElement("div");
//     imageContainer.classList.add("card-image-container");

//     const image = document.createElement("img");
//     image.classList.add("card-image");
//     image.setAttribute("src", product.img);
//     image.setAttribute("alt", product.name);

//     imageContainer.appendChild(image)

//     /**Card Details Container */
//     const cardDetailsContainer = document.createElement("div");
//     cardDetailsContainer.classList.add("card-details");

//     const brandContainer = document.createElement("div");
//     brandContainer.classList.add("card-title")
//     brandContainer.innerText= product.brand;
//     cardDetailsContainer.appendChild(brandContainer);

//     /**Card Description Container */
//     const descriptionContainer = document.createElement("div");
//     descriptionContainer.classList.add("card-description");
    
//     /** Product Name */
//     const name = document.createElement("p");
//     name.classList.add("card-des");
//     name.innerText = product.name;
//     descriptionContainer.appendChild(name);

//     /**Product Price */
//     const price = document.createElement("p");
//     price.classList.add("card-price");
//     price.innerText = `Rs ${product.newPrice}`;
    
//     const oldPrice = document.createElement("span");
//     oldPrice.classList.add("price-strike-through");
//     oldPrice.innerText =`  Rs. ${product.oldPrice}`;
//     price.appendChild(oldPrice);

//     const discount = document.createElement("span");
//     discount.classList.add("discount");
//     discount.innerText = ` (${product.discount}% OFF)`;
//     price.appendChild(discount);

//     descriptionContainer.appendChild(price);

//     /**Rating Container */
//     const ratings = document.createElement("p");
//     ratings.classList.add("d-flex", "align-center");

//     const rating = document.createElement("span")
//     rating.innerText = product.rating;
//     ratings.appendChild(rating);

//     const star = document.createElement("span");
//     star.classList.add("material-icons-outlined", "star");
//     star.innerText = "star";
//     ratings.appendChild(star);
//     descriptionContainer.appendChild(ratings)
    
//     // CTA Button Container.
//     const ctaButton = document.createElement("div");
//     ctaButton.classList.add("cta-btn")

//     const cardButton = document.createElement("button")
//     cardButton.classList.add(
//     "button",
//     "btn-primary",
//     "btn-icon",
//     "cart-btn",
//     "d-flex",
//     "align-center",
//     "justify-center",
//     "gap",
//     "cursor",
//     "btn-margin"
//     );
//     cardButton.setAttribute("data-id", product._id);
//     const cart = document.createElement("span");
//     cart.classList.add("material-icons-outlined");
//     cart.innerText = "shopping_cart";
//     cardButton.appendChild(cart);

//     const btnText = document.createElement("span");
//     cardButton.innerText = "Add to cart";
//     cart.appendChild(btnText)

//     ctaButton.appendChild(cardButton)
//     cardContainer.appendChild(imageContainer)
//     cardContainer.appendChild(cardDetailsContainer)
//     cardContainer.appendChild(descriptionContainer)
//     cardContainer.appendChild(ctaButton)

//     productContainer.appendChild(cardContainer);
// };

productContainer.addEventListener("click", (event) => {
    const isProductInCart = findProductInCart(cart, event.target.dataset.id);
    if(!isProductInCart){
        const productToAddToCart = products.filter(
        ({_id}) => _id === event.target.dataset.id
    );
    cart = [...cart, ...productToAddToCart];
    localStorage.setItem("cart", JSON.stringify(cart));
    // console.log(cart);
    const cartBtn = event.target;
    cartBtn.innerHTML = "Go To Cart <span class='material-icons-outlined'>shopping_cart</span>";
    }else {
        location.href = "cart.html";
    }
});

filterContainer.addEventListener("click", (event) => {
    const updatedProducts = products.filter(
        ({ rating }) => rating >= Number(event.target.dataset.rating)
    );
    productContainer.innerHTML = "";
    createProductCard(
    updatedProducts,
    productContainer,
    findProductInCart,
    "products"
    );
});

createProductCard(products, productContainer, findProductInCart, "products")