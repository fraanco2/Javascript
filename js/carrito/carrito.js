let cartStorage = localStorage.getItem("cartProducts")
cartStorage = JSON.parse(cartStorage)

let cartContainer = document.getElementById("cart-section")

function renderCarrito(cartItems) {
    cartItems.forEach(producto => {
        const cart = document.createElement("div")
        cart.innerHTML =  `<h3>${producto.nombre}</h3>
                           <p>${producto.precio}</p>`
        cartContainer.appendChild(cart)                   
        
    })
}
renderCarrito(cartStorage)
const total = cartStorage.reduce((contador,producto) => contador + producto.precio, 0)
console.log(total)

const totalElement = document.createElement("p");
totalElement.innerText = `Total: $${total}`;
cartContainer.appendChild(totalElement);

const buttonVaciar = document.getElementById("vaciar-carrito");

if (cartStorage === null) {
    
    buttonVaciar.disabled = true;
} else {
    
    if (cartStorage.length === 0) {
        buttonVaciar.disabled = true;
    } else {
        buttonVaciar.disabled = false;
    }
}

buttonVaciar.onclick =() => {
    localStorage.removeItem("cartProducts");
    cartContainer.innerHTML="";
    
}