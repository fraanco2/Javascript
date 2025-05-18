let cartStorage = JSON.parse(localStorage.getItem("cartProducts")) || [];
let cartContainer = document.getElementById("cart-section");
const buttonVaciar = document.getElementById("vaciar-carrito");

function renderCarrito(cartItems) {
    cartContainer.innerHTML = ""; 

    if (!cartItems || cartItems.length === 0) {
        cartContainer.innerHTML = "<p>El carrito está vacío</p>";
        buttonVaciar.style.display = "none";
        return;
    }

    buttonVaciar.style.display = "block";
     
    cartItems.forEach(producto => {
        const cart = document.createElement("div");
        cart.innerHTML = `
            <img src="${producto.imagen || './imagenes/hp.jpg'}" alt="${producto.nombre}" width="50">
            <h3>${producto.nombre}</h3>
            <p>Precio unitario: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad || 1}</p>
            <p>Total: $${producto.precio * (producto.cantidad || 1)}</p>
            <input type="number" min="1" max="${producto.cantidad}" value="1" class="input-cantidad" data-id="${producto.id}">
            <button class="eliminar-cantidad" data-id="${producto.id}">Eliminar cantidad</button>`;

        cartContainer.appendChild(cart);
    });

    activarEliminar();
    
    const total = cartItems.reduce((acc, producto) => acc + producto.precio * (producto.cantidad || 1), 0);
    const totalElement = document.createElement("p");
    totalElement.innerText = `Total: $${total}`;
    cartContainer.appendChild(totalElement);

    const finalizar = document.createElement("button");
    finalizar.innerText = "Finalizar compra";
    finalizar.onclick = () => {
        try {
            mostrarFormulario(cartItems);
        } catch (error) {
            Swal.fire("Error", "No se pudo proceder con la compra", "error");
        }
    };

    cartContainer.appendChild(finalizar);
}

function activarEliminar() {
    const botonesEliminar = document.querySelectorAll(".eliminar-cantidad");

    botonesEliminar.forEach(btn => {
        const id = parseInt(btn.getAttribute("data-id"));
        btn.onclick = crearEliminarCantidadHandler(id);
    });
}

function crearEliminarCantidadHandler(id) {
    return function () {
        const input = document.querySelector(`.input-cantidad[data-id="${id}"]`);
        const cantidadAEliminar = parseInt(input.value);
        if (isNaN(cantidadAEliminar) || cantidadAEliminar < 1) {
            Swal.fire("Cantidad inválida", "Por favor ingresá una cantidad válida", "warning");
            return;
        }

        const index = cartStorage.findIndex(p => p.id === id);
        if (index === -1) return;

        const producto = cartStorage[index];

        if (cantidadAEliminar >= producto.cantidad) {
            cartStorage.splice(index, 1);
        } else {
            producto.cantidad -= cantidadAEliminar;
        }

        localStorage.setItem("cartProducts", JSON.stringify(cartStorage));
        renderCarrito(cartStorage);
    };
}

buttonVaciar.onclick = () => {
    Swal.fire({
        title: '¿Vaciar carrito?',
        text: "Esta acción eliminará todos los productos del carrito.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("cartProducts");
            cartStorage = [];
            renderCarrito(cartStorage);

            Swal.fire({
                title: 'Carrito vacío',
                text: 'Todos los productos han sido eliminados.',
                icon: 'info',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
};

renderCarrito(cartStorage);


