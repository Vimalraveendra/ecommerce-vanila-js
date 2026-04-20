const cartItemNoEl = document.querySelector(".cart span");
const cartItemEl = document.querySelector(".cart");
const itemsEl = document.getElementById("items");
const itemsContainerEl = document.querySelector(".items-container");
const menuContainerEL = document.querySelector(".menu-container");
const dropContainerEl = document.querySelector(".dropdown-container");
const dropListEl = document.querySelector(".dropdown-list");
const totalContainerEl = document.querySelector(".total-container");
const menu = document.getElementsByName("menu-outline")[0];
const navEl = document.getElementsByTagName("nav")[0];

const products = [
  { id: 1, name: "Black T-Shirt", tag: "black t-shirt", price: 12, cartNo: 0 },
  { id: 2, name: "Grey T-Shirt", tag: "grey t-shirt", price: 15, cartNo: 0 },
  { id: 3, name: "Black Shirt", tag: "black shirt", price: 25, cartNo: 0 },
  {
    id: 4,
    name: "Red T-Shirt",
    tag: "red t-shirt",
    price: 20,
    cartNo: 0,
  },
  {
    id: 5,
    name: "Blue Shirt",
    tag: "blue shirt",
    price: 24,
    cartNo: 0,
  },
  { id: 6, name: "Stripe Shirt", tag: "stripe shirt", price: 25, cartNo: 0 },
  {
    id: 7,
    name: "White T-Shirt",
    tag: "white t-shirt",
    price: 22,
    cartNo: 0,
  },
  { id: 8, name: "Check Shirt", tag: "check shirt", price: 26, cartNo: 0 },
];

// This basically says ‘If there is no fragment identifier, make the location hash #home.
// if(!location.hash){
//     location.hash="#home"
// }

// we have an event listener, its a function which waits for events!
//  In the event listener, we wait for a ‘hashchange’, which means that
// whenever the fragment identifier in the URL is changed, this function
// will then be fired up.
window.addEventListener("hashchange", () => {
  console.log(location.hash);
});

// dynamically render the index.html items when the page loads

function renderMenuContainer(products) {
  products.forEach((product) => {
    // only render in the index dot html page
    if (menuContainerEL) {
      menuContainerEL.innerHTML += `
        <div class="image-container">
            <div class="image">
                <img src="./assets/${product.tag}.png" alt="${product.name}">
            </div>
            <div class='title'>
            <h3>${product.name}</h3>
            <h4>$${product.price}</h4>
        </div>
        <button class="add-cart">Add to cart</button>
        
      </div> 
      
  `;
    }
  });

  const cartEle = document.querySelectorAll(".add-cart");

  // iterating over the array of cartElm(in our case there are 8 cartItem button)
  for (let i = 0; i < cartEle.length; i++) {
    cartEle[i].addEventListener("click", () => {
      addToCart(products[i]);
      totalPrice(products[i]);
    });
  }
}

renderMenuContainer(products);

// whenever the page loads, invoking the function to render
// totalCartItem from local storage
function onLoadGetCartNumbers() {
  let cartNumber = parseInt(localStorage.getItem("cartNumber"));
  if (cartNumber >= 0) {
    cartItemNoEl.textContent = cartNumber;
  }
}

onLoadGetCartNumbers();

function addToCart(item) {
  // the item we are getting from the localStorage is a string
  // inorder to convert string to a number we use parseInt
  let cartNumber = parseInt(localStorage.getItem("cartNumber"));
  // here we checking if the cartNumber already exist in the cart
  // if it exists we increment the cartNumber by 1.else set it to 1.

  if (cartNumber) {
    localStorage.setItem("cartNumber", cartNumber + 1);
    cartItemNoEl.textContent = cartNumber + 1;
  } else {
    localStorage.setItem("cartNumber", 1);
    cartItemNoEl.textContent = 1;
  }

  setItemToLs(item);
}

function setItemToLs(item) {
  // checking items already persist in the local storage
  // and converting JSON format to a object format
  let cartItems = JSON.parse(localStorage.getItem("cartItem"));

  let items = [];

  //  checking the condition if the item is not present in
  // the local storage and cartItem length is greater than zero.
  if (cartItems !== null && cartItems.length > 0) {
    cartItems.map((product) => {
      // when we add new item other than first item we need to
      // check cartNo is 0. In that case we need to update cartNo
      // to 1 & push that item to cartItems,but holding the previous
      //  item

      if (item.id === product.id) {
        item.cartNo = product.cartNo + 1;
      } else {
        if (item.cartNo === 0) {
          item.cartNo = 1;
        }
        items.push(product);
      }
    });
    items.push(item);
  }
  // initially we are setting the item cartNo to 1. &
  // updating the  item and pushing inside the array
  else {
    item.cartNo = 1;
    items.push(item);
  }

  //  converting object format to JSON format &
  // setting the items to the local storage

  localStorage.setItem("cartItem", JSON.stringify(items));

  //  if cartItems already in our local storage
  // if(cartItems !==null){
  //     if(cartItems[item.tag]===undefined){
  //         cartItems={
  //             ...cartItems,
  //             [item.tag]:item
  //         }
  //     }
  // cartItems[item.tag].cartItem +=1;
  // }else{
  // item.cartItem =1;
  // cartItems = {
  //      [item.tag]:item
  //  }
  // }

  //  converting object format to JSON format &
  // setting the items to the local storage
  // localStorage.setItem('cartItem',JSON.stringify(cartItems))
}

function totalPrice(item) {
  let cartPrice = localStorage.getItem("totalPrice");

  if (cartPrice !== undefined) {
    //  if cartPrice already in our local storage
    if (cartPrice !== null) {
      cartPrice = parseInt(cartPrice);
      localStorage.setItem("totalPrice", cartPrice + item.price);
    } else {
      localStorage.setItem("totalPrice", item.price);
    }
  }
}

function showCartItems() {
  let cartItems = localStorage.getItem("cartItem");
  cartItems = JSON.parse(cartItems);

  // grabing the total price of the cartItem
  let cartPrice = localStorage.getItem("totalPrice");

  if (cartItems && itemsContainerEl) {
    // clearing the the container
    itemsEl.innerHTML = "";
    cartItems.map((item) => {
      //  to add more cartItems
      itemsEl.innerHTML += `
            <div class ="products">
            <div class="product">
           <ion-icon name="close-circle-outline" class="close" onclick=removeCartItems(${
             item.id
           })></ion-icon>
            <img src="./assets/${item.tag}.png", alt="red-shirt">
            <h2 class="name">${item.name}</h2>
            </div>
            <div class="price">$${item.price}</div>  
            <div class="quantity">
            <ion-icon name="caret-forward-circle-outline" onclick=updateQuantity((${
              item.id
            }),event)></ion-icon>
            ${item.cartNo > 0 ? `${item.cartNo}` : 0}
            <ion-icon name="caret-back-circle-outline" onclick =updateQuantity((${
              item.id
            }),event)></ion-icon>
            </div>  
            <div class="total">$${
              item.cartNo > 0 ? `${item.cartNo * item.price}` : 0
            }</div>
            </div> 
          `;
    });
    itemsContainerEl.innerHTML += `
      <div class="totalPriceContainer">
       <h4 class="totalTitle">Total Price</h4>
       <h4 class="totalPrice">$${cartPrice > 0 ? `${cartPrice}` : 0},00</h4>
      </div>
      `;
  }
}

function removeCartItems(id) {
  let items = [];
  // let element = event.target.parentNode.parentNode.children[1].children[0].textContent||event.target.parentNode.children[2].textContent;

  let cartItems = JSON.parse(localStorage.getItem("cartItem"));
  let cartPrice = parseInt(localStorage.getItem("totalPrice"));
  let cartNumber = parseInt(localStorage.getItem("cartNumber"));
  // // when we click on the delete icon, removing that element
  // event.target.parentNode.parentNode.remove();

  // iterating through the cartItems received from the local
  // storage & filtering the item based on the condition & pushing
  //  that item into items array
  cartItems.forEach((item) => {
    if (item.id !== id) {
      items.push(item);
    } else {
      // reducing the total price whenever an item is removed from the
      // localStorage
      localStorage.setItem(
        "cartNumber",
        JSON.stringify(cartNumber - item.cartNo)
      );
      localStorage.setItem(
        "totalPrice",
        JSON.stringify(cartPrice - item.cartNo * item.price)
      );
    }
    // updating the localStorage with new items & cartNumber
    localStorage.setItem("cartItem", JSON.stringify(items));

    // reloading the changes that happened to the localStorage
    // & implementing that on the webpage.
    window.location.reload();
  });
}

function totalPrice(item) {
  let cartPrice = localStorage.getItem("totalPrice");

  //  if cartPrice already in our local storage
  if (cartPrice !== null) {
    cartPrice = parseInt(cartPrice);
    localStorage.setItem("totalPrice", cartPrice + item.price);
  } else {
    localStorage.setItem("totalPrice", item.price);
  }
}

showCartItems();

function updateQuantity(id, event) {
  let items = [];
  let icon = event.target.name;
  let cartNumber = parseInt(localStorage.getItem("cartNumber"));
  let cartItems = JSON.parse(localStorage.getItem("cartItem"));
  let cartPrice = parseInt(localStorage.getItem("totalPrice"));
  cartItems.forEach((item) => {
    if (
      item.id === id &&
      icon === "caret-forward-circle-outline" &&
      item.cartNo >= 0
    ) {
      item.cartNo += 1;
      localStorage.setItem("cartNumber", JSON.stringify(cartNumber + 1));
      localStorage.setItem(
        "totalPrice",
        JSON.stringify(cartPrice + item.price)
      );
    }
    if (
      item.id === id &&
      icon === "caret-back-circle-outline" &&
      item.cartNo > 0
    ) {
      item.cartNo -= 1;
      localStorage.setItem("cartNumber", JSON.stringify(cartNumber - 1));
      localStorage.setItem(
        "totalPrice",
        JSON.stringify(cartPrice - item.price)
      );
    }
    items.push(item);
  });

  // updating the localStorage with new items & cartNumber
  localStorage.setItem("cartItem", JSON.stringify(items));

  window.location.reload();
}

//  rendering the dropdown cart items
cartItemNoEl.addEventListener("click", () => {
  if (menuContainerEL) {
    dropContainerEl.classList.toggle("display");
    renderDropDown();
  }
});

function renderDropDown() {
  const cartItems = JSON.parse(localStorage.getItem("cartItem"));
  let cartPrice = localStorage.getItem("totalPrice");
  dropListEl.classList.toggle("animate");
  dropListEl.innerHTML = "";
  if (cartItems.length > 0) {
    cartItems.forEach((item) => {
      dropListEl.innerHTML += `
            <div class ='dropdown'>
            <div class="dropdown-image">
                <img src="./assets/${item.tag}.png" alt="">
            </div>
            <div class='dropdown-title'>
            <h3>${item.name}</h3>
            <h4>${item.cartNo} X $${item.price}</h4>
         </div> 
         <div class="quantity">
            <ion-icon name="caret-forward-circle-outline" onclick=updateQuantity((${item.id}),event) ></ion-icon>
             ${item.cartNo}
            <ion-icon name="caret-back-circle-outline" onclick=updateQuantity((${item.id}),event) ></ion-icon>
            </div>
         
            <div class="remove">
                <ion-icon name="close-circle-outline" class="close" onclick=removeCartItems(${item.id})></ion-icon>
                 </div>
         
             </div>    
         
            `;
    });
  } else {
    dropListEl.innerHTML = `
        <div class="empty">Your cart is empty</div>
        `;
  }
  totalContainerEl.innerHTML = `
      <button class="dropdown-btn" onclick ="location.href='cartItem.html'">View All</button>
    <div class='total-amount'>
        <h5><span>Total Amount:</span> $${cartPrice},00</h5>
        
    </div>
      `;
}

window.addEventListener("resize", () => {
  if (window.innerWidth >= 550 && navEl.classList[1] === "menu") {
    navEl.classList.toggle("menu");
  }
});

const displayDropdown = (event) => {
  event.preventDefault();
  event.target === menu ? navEl.classList.toggle("menu") : null;
};

menu.addEventListener("click", displayDropdown);
