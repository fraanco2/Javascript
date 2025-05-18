let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
let productsContainer = document.getElementById("products-container");

fetch("./db/data.json")
  .then(response => response.json())
  .then(productos => {
    renderProductos(productos);
      activarContadores(productos);   
  })
  .catch(error => {
    Swal.fire({
      title: "Error al cargar los productos",
      text: "Hubo un problema al cargar los productos. Por favor, intenta más tarde.",
      icon: "error",
      confirmButtonText: "Aceptar"
    });
  });
   
// Función para renderizar productos
function renderProductos(productsArray) {
    productsArray.forEach(producto => {
        const card = document.createElement("div");
        const imagen = producto.imagen || "./imagenes/hp.jpg";
        card.innerHTML = `
            <img src="${imagen}" alt="${producto.nombre}" width="100">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <div class="contador-container">
            <button class="minus-button">-</button>
            <span class="counter">1</span>
            <button class="plus-button">+</button>
            </div>
            <button class="productoAgregar" id="${producto.id}">Agregar</button>
        `;

        productsContainer.appendChild(card);
    });

}

function activarContadores(productos) {
    const productosCards = document.querySelectorAll("#products-container > div");

    productosCards.forEach(card => {
        const sumar = card.querySelector(".plus-button");
        const restar = card.querySelector(".minus-button");
        const counter = card.querySelector(".counter");
        const agregarBtn = card.querySelector(".productoAgregar");

        let contador = 1;
        counter.innerHTML = contador;

        sumar.onclick = () => {
            contador++;
            counter.innerHTML = contador;
        };

        restar.onclick = () => {
            contador = Math.max(1, contador - 1);
            counter.innerHTML = contador;
        };

        agregarBtn.onclick = () => {
            const productId = agregarBtn.id;
            const productoSeleccionado = productos.find(p => p.id == productId);
            const productoACarrito = {
                ...productoSeleccionado,
                cantidad: contador,
                imagen: productoSeleccionado.imagen ? productoSeleccionado.imagen.replace("./imagenes", "/imagenes") : "/imagenes/hp.jpg"
            };
            

            const existente = cartProducts.find(p => p.id == productoACarrito.id);
            if (existente) {
                existente.cantidad += contador;
            } else {
                cartProducts.push(productoACarrito);
            }
            
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

             
            Swal.fire({
              title: 'Producto agregado',
              text: `Se ha agregado ${productoACarrito.nombre} x${contador} al carrito.`,
              icon: 'success',
              confirmButtonText: 'Aceptar',
              timer: 2000,
              showConfirmButton: false
              });

            contador = 1;
            counter.innerHTML = contador;
        };
    });
}
