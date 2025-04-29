const productos= [
    {
        id: 1,
        nombre: "lenovo",
        precio: 1000
    },
    {
        id: 2,
        nombre: "hp",
        precio: 2500
    },
    {
        id: 3,
        nombre: "samsung",
        precio: 1400
    },
    {
        id: 4,
        nombre: "sony",
        precio: 5000
    },
    {
        id: 5,
        nombre: "apple",
        precio: 3600
    },
    {
        id: 6,
        nombre: "acer",
        precio: 2000
    },
]
let cartProducts =JSON.parse(localStorage.getItem("cartProducts")) || [];
let productsContainer = document.getElementById("products-container")

function renderProductos(productsArray){
    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML =  `<h3>${producto.nombre}</h3>
                          <p>$${producto.precio}</p>
                          <div class="contador-container">
                <button class="minus-button">-</button>
                <span class="counter">0</span>
                <button class="plus-button">+</button>
            </div>
                          <button class="productoAgregar" id="${producto.id}">Agregar</button> `
        productsContainer.appendChild(card)                      
    })
    addtocartbutton();
    activarContadores();
}
renderProductos(productos)

function addtocartbutton( ) {
    const addbutton = document.querySelectorAll(".productoAgregar")
    addbutton.forEach(button =>{
        button.onclick = (e) => {
            const productId = e.currentTarget.id 
            const selecterProducts = productos.find(producto => producto.id == productId)
            cartProducts.push(selecterProducts)
            console.log(cartProducts)

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        } 
    })
}

function activarContadores() {
    const productosCards = document.querySelectorAll("#products-container > div");

    productosCards.forEach(card => {
        const sumar = card.querySelector(".plus-button");
        const restar = card.querySelector(".minus-button");
        const counter = card.querySelector(".counter");
        const agregarBtn = card.querySelector(".productoAgregar");

        let contador = 0;

        sumar.onclick = () => {
            contador++;
            counter.innerHTML = contador;
        };

        restar.onclick = () => {
            contador = Math.max(0, contador - 1);
            counter.innerHTML = contador;
        };

        agregarBtn.onclick = () => {
            const productId = agregarBtn.id;
            const productoSeleccionado = productos.find(p => p.id == productId);

            if (contador > 0) {
                const existente = cartProducts.find(p => p.id == productoSeleccionado.id);

                if (existente) {
                    existente.cantidad += contador;
                } else {
                    productoSeleccionado.cantidad = contador;
                    cartProducts.push(productoSeleccionado);
                }

                localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
                console.log(`Agregado al carrito: ${productoSeleccionado.nombre} x${contador}`);
                contador = 0;
                counter.innerHTML = contador;
            } else {
                console.log("No se agregó nada porque la cantidad es 0");
            }
        };
    });
}