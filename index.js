// You can see attached the task that s given to all applicants that need
// to be finished within 9 days.
// Need to be developed on two pages, the first page is for listing the
// categories and their products from a JSON file with the functionalities
// of filtering products by categories and adding to the cart(saving into
// local Storage) selected products
// The second page is for displaying selected products from the cart(local
// Storage) with the total amount




let cartItemTitle = document.getElementById("cart-item-title");
let productsInCart = [];
let listaKategorive = document.getElementById("listaKategorive");
let productsDiv = document.getElementById("containerProducts");
let product = document.getElementById("product");
let addToCartButton = document.getElementsByClassName("addToCartBtn");
let kat = document.getElementById("kat");
let itemprice = document.getElementById("itemPrice");
let itemImg = document.getElementById("imageUrl")
let zgjidhKategorin = document.getElementById("options");
let menu = [];

const produktet = './products.json';
async function getProducts(){
    const response = await fetch(produktet);
    menu = await response.json();
    shfaqProduktet(menu);
}
getProducts();



let filterInput = document.getElementById("filterInput");

function filterCategories(){
    let filterValue = filterInput.value.toLowerCase();
    const filteredData = menu.filter((x) => x.name.toLowerCase().indexOf(filterValue) > -1);

    shfaqProduktet(filteredData);
}




function shfaqProduktet(data) {
    let productsListDiv = document.getElementById("productsListDiv");
    productsListDiv ? productsListDiv.innerHTML = "" : null;
    productsDiv ? productsDiv.innerHTML = "" : null;
    data.forEach((d) => {
        for(let i=0; i<d.products.length; i++) {
            let productNote = d.products[i].notes;
            let product = JSON.stringify(d.products[i]);

            if( productNote == null ){
                productNote = "No description Available";
            }
                        
            productsDiv ? productsDiv.innerHTML += `
            <div id="productsListDiv">
                    <div id="product">
                        <div class="container mb-3 mt-3">    
                            <div >
                                <h5 id="" class="productName"> ${d.products[i].name} </h5>
                                <img src="${d.products[i].imageUrl}" id="imageUrl" alt="">
                                <p id="productDescription" class="productDescription" > Ingridients: ${productNote} </p>
                                </br>
                                <p id="">Price with Vat: <span class="priceVat"> ${d.products[i].sellingPriceWithVat} den </span> </p>
                                <p id="">Price without Vat: <span class="priceNoVat"> ${d.products[i].sellingPriceNoVat} den </span> </p>
                                <p id="">Category: <span id="categoryDescr" style="color: black;"> ${d.name} </span> </p>
                                <button class="addToCartBtn" id="${d.products[i].productId}" onclick='getProduct(${product})' > Add to cart </button>        
                            </div>
                        </div>
                    </div>
                </div>
            ` : null;
        }
    });
}




let cart = [];
let qt = [];


function getProduct(product, id) {
    console.log({product, id})
    cart = localStorage.getItem('CART') ? JSON.parse(localStorage.getItem('CART')) : [];
    qt = localStorage.getItem('qt') ? JSON.parse(localStorage.getItem('qt')) : [];
    
    let isInCart = cart.some((x) => x.productId === product.productId);

    console.log( {isInCart} );

    if( isInCart )
    {
        alert("This product is already in cart");
    }

    else
    {
        cart.push( product );
        numberOfCartProducts ? numberOfCartProducts.innerHTML = `${cart.length}` : null;
    }    
    
    localStorage.setItem('CART', JSON.stringify(cart));
    shfaqNeCart();

}



 function shfaqNeCart(){
    let cartItems = document.getElementById('cartItems');
 

    let numberOfProducts = 0;
    if (cartItems) {

    cartItems.innerHTML = "";

    cart.forEach((item) => {
        numberOfProducts++;
        cartItems.innerHTML += `
        
            <div class="cart-row">
            <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${item.imageUrl}" width="100" height="100">
                    <span class="cart-item-title"> ${item.name} </span>
                </div>
                <span class="cart-price cart-column"> ${item.sellingPriceWithVat} den </span>
                <span style="display: none;" class="cart-price-nv cart-column" id="cartPriceNoVat"> ${item.sellingPriceNoVat} den (No Vat)</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1" >
                    <button class="btn btn-danger" type="button" onclick="removeFromCart(${item.productId})"> REMOVE </button>
            </div>
            </div>
        `;

        document.getElementById("totalProductsElement").innerHTML = `<strong class="cart-total-title"> Total Products: </strong> <span class="cart-total-title"> ${numberOfProducts} </span>`;
    })
}

    cartTotal();
}



function cartTotal(){
    let allItems = document.getElementById("numberOfCartProducts");
    let cartItems = document.getElementById('cartItems');
    if ( cartItems ) {
    let cartRows = cartItems.getElementsByClassName('cart-row');
    let total = 0;
    let totalNoVat = 0;
    
    for ( let i = 0; i < cartRows.length; i++ ) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        total += ( price * quantity );
        
       
        let priceNoVatElement = cartRow.getElementsByClassName("cart-price-nv")[0];
        let priceNoVat = parseFloat(priceNoVatElement.innerText.replace('$', ''));
        totalNoVat += ( priceNoVat * quantity );
        

    }
    document.getElementsByClassName("cart-total-price")[0].innerText = `${total.toFixed(2)} den `;
    document.getElementById("cart-total-price-noVat").innerHTML = `${totalNoVat.toFixed(2)} den `;
}
}

function removeFromCart(id){
    console.log(id);
    console.log(cart);

    cart = cart.filter((x)=> x.productId !== id);
    localStorage.setItem('CART', JSON.stringify(cart));
    console.log(cart);
    shfaqNeCart();
    cartTotal();
    
}



window.onload = () => {
    cart = localStorage.getItem('CART') ? JSON.parse(localStorage.getItem('CART')) : [];
    qt = localStorage.getItem('qt') ? JSON.parse(localStorage.getItem('qt')) : [];

    let numberOfCartProducts = document.getElementById("numberOfCartProducts");

    shfaqNeCart();
    let quantityInput = document.getElementsByClassName("cart-quantity-input");
    
    for(let i = 0; i < quantityInput.length; i++) {
        let input = quantityInput[i]; 

        input.addEventListener('change', function(e) {
                
                let inputVal = e.target;

                if( isNaN(inputVal.value) || inputVal.value <= 0 ) {
                    inputVal.value = 1;
                }
                let inputi = inputVal.value;

                localStorage.setItem('QT', JSON.stringify(inputi));
                console.log(inputVal.value);

                console.log(localStorage);

                cartTotal();
            });
    }

    numberOfCartProducts ? numberOfCartProducts.innerHTML = `${cart.length}` : null;

    cartTotal();
}

