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