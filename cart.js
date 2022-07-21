
function order(){
    alert(`Order placed successfully. Thank you`);
    localStorage.clear();
    document.location.reload();
}


function removeFromCart(id){
    console.log(id);
    console.log(cart);
    
    cart = cart.filter((x)=> x.productId !== id);
    localStorage.setItem('CART', JSON.stringify(cart));
    shfaqNeCart();
    cartTotal();
    
}





