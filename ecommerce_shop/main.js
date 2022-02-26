let carts = document.querySelectorAll('.add-cart');

let products = [
  {
    name: 'Bitcoin',
    tag: 'btc',
    price: 38000,
    inCart: 0,
  },
  {
    name: 'Ethereum',
    tag: 'eth',
    price: 2500,
    inCart: 0,
  },
  {
    name: 'Cardano',
    tag: 'ada1',
    price: 1,
    inCart: 0,
  },
  {
    name: 'Luna Terra',
    tag: 'luna',
    price: 55,
    inCart: 0,
  },
  {
    name: 'Binance Coin',
    tag: 'bnb',
    price: 500,
    inCart: 0,
  },
  {
    name: 'ChainLink',
    tag: 'link',
    price: 15,
    inCart: 0,
  },
  {
    name: 'Solana',
    tag: 'sol',
    price: 100,
    inCart: 0,
  },
  {
    name: 'Polkadot',
    tag: 'dot',
    price: 16,
    inCart: 0,
  },
  {
    name: 'Avalanche',
    tag: 'avax',
    price: 80,
    inCart: 0,
  },
  {
    name: 'Cronos',
    tag: 'cro',
    price: 1,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

// This function will keep the data when reloading the page
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

// this function updates the cart numbers
function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost');

  console.log('my cartCost is', cartCost);
  console.log(typeof cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);
  } else {
    localStorage.setItem('totalCost', product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector('.products');
  let cartCost = localStorage.getItem('totalCost');

  console.log(cartItems);
  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="product">
        <button type="button" >Remove</button>
        <img src="./images/${item.tag}.png" width ='120px' height ='120px'>
        <span>${item.name}</span>
      </div>
      <div class="price">$${item.price},00</div>
      <div class="quantity">
      <span>${item.inCart}</span>
      </div>
      <div class="total">
      $${item.inCart * item.price},00
      </div>

      
      `;
    });
    productContainer.innerHTML += `
      <div class="basketTotalContainer"></div>
      <h4 class="basketTotalTitle">
          Basket Total
      </h4>
      <h4 class="basketTotal">
          $${cartCost},00
      </h4>

    
    
    
    
    `;
  }
}

onLoadCartNumbers();
displayCart();
