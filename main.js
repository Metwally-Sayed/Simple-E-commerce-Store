const card = document.getElementById('shop');
const cartPage = document.getElementById('cartPage');
const cart = document.getElementById('cart-items');

let shopData = [
  {
    product_name: 'Pizza',
    product_price: '112.5',
    product_image:
      'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    added_to_cart: false,
  },
  {
    product_name: 'Cola',
    product_price: '12.5',
    product_image:
      'https://images.unsplash.com/photo-1572490362434-f3bc9c3f2e0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    added_to_cart: false,
  },
  {
    product_name: 'Pasta',
    product_price: '142.3',
    product_image:
      'https://images.unsplash.com/photo-1608897013039-887f21d8c804?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=692&q=80',
    added_to_cart: false,
  },
  {
    product_name: 'Coffee',
    product_price: '11.5',
    product_image:
      'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    added_to_cart: false,
  },
  {
    product_name: 'FrenchToast',
    product_price: '41',
    product_image:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80',
    added_to_cart: false,
  },
  {
    product_name: 'Water',
    product_price: '10',
    product_image:
      'https://images.unsplash.com/photo-1616118132534-381148898bb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    added_to_cart: false,
  },
];

let savedDataInStorage = JSON.parse(localStorage.getItem('data')) || [];

let cartProduct = savedDataInStorage || [];

const generateShop = () => {
  return (card.innerHTML = shopData
    .map((item) => {
      return `
    <div id=${item.product_name} class="item">
      <div class="popup-wrapper open" id="perviwePage">
        <div class="popup-page">
          <div class="image-container">
             <img  src=${item.product_image} alt="">
          </div>
         <div class="item-data-container">
    <h3>${item.product_name}</h3>
    <br>
    <p>
    price: ${item.product_price}
    </p>
    <div id="added ${item.product_name}">
    </div>
    </div>
    </div>
  </div>
    <img  src=${item.product_image} alt="">
    <div class="details">
      <h2>${item.product_name}</h2>
      <div>
        <p class="price"> Price:
        <span class="">
        ${item.product_price} EGP
        </span>
        </p>
        <div class="button" id="button+${item.product_name}">
          <button class="btn" onClick={cartHandler(${item.product_name})}> 
          Add To Cart </button>
          <button class="btn" onClick={openModelHandler(${item.product_name})} > Show More </button>
           </div>
        </div>
      </div>
    </div>
    `;
    })
    .join(''));
};

generateShop();

const cartHandler = (productName) => {
  const name = productName.id;

  shopData.find((item) => {
    if (item.product_name === name && item.added_to_cart === false) {
      item.added_to_cart = true;
      update(item);
      addAndRemoveHandler(shopData);
      cartItemsGenerator();
    } else if (item.product_name === name && item.added_to_cart === true) {
      item.added_to_cart = false;
      update(item);
      addAndRemoveHandler(cartProduct);
      cartItemsGenerator();
    }
  });
  localStorage.setItem('data', JSON.stringify(cartProduct));
};

const addAndRemoveHandler = (array, value) => {
  const selectedItem = array.filter((item) => item.added_to_cart === true);
  cartProduct = [...selectedItem];
};

const openingCartHandler = () => {
  if (cartPage.classList.contains('open-cart') === true) {
    cartPage.classList.remove('open-cart');
  } else {
    cartPage.classList.add('open-cart');
  }
};

const update = (selectedItem) => {
  const button = document.getElementById(`button+${selectedItem.product_name}`);
  const added = document.getElementById(`added ${selectedItem.product_name}`);

  if (selectedItem.added_to_cart === true) {
    button.innerHTML = `<button class="btn" onClick={cartHandler(${selectedItem.product_name})}> Remove From Cart </button> 
    <button class="btn" onClick={openModelHandler(${selectedItem.product_name})}> Show More </button>`;
    added.innerHTML = ` <br> <p> added to your cart </p>`;
  } else if (selectedItem.added_to_cart === false) {
    button.innerHTML = `<button class="btn" onClick={cartHandler(${selectedItem.product_name})}> Add To Cart </button> 
    <button class="btn" onClick={openModelHandler(${selectedItem.product_name})}> Show More </button>`;
    added.innerHTML = `<br> <p> not in your cart anymore </p>`;
  }
};

const openModelHandler = (product) => {
  const name = product.id;
  const itemcard = document.getElementById(`${name}`);
  const popup = itemcard.getElementsByClassName('popup-wrapper')[0].classList;
  const slectedItem = shopData.find((item) => {
    if (item.product_name === itemcard.id) {
      if (popup.contains('open')) {
        popup.remove('open');
      } else if (!popup.contains('open')) {
        popup.add('open');
      }
    }
    return item.product_name === name;
  });
};

const cartItemsGenerator = () => {
  const cartCounter = document.getElementById('cartAmount');
  if (cartProduct.length == 0) {
    cartCounter.innerText = cartProduct.length;
    return (cart.innerHTML = `<p> your cart is empty</p>`);
  } else if (cartProduct.length >= 1) {
    cartCounter.innerText = cartProduct.length;
    return (cart.innerHTML = cartProduct
      .map((item) => {
        return `<div class="cart-items">
      <div class="item-image-container">
        <img
          class="item-image"
          src="${item.product_image}"
          alt=""
        />
      </div>
      <div class="item-data-container">
        <h5>${item.product_name}</h5>
        <p class="price">${item.product_price} EGP</p>
      </div>
    </div>
    `;
      })
      .join(''));
  }
};

cartItemsGenerator();
