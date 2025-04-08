// Variables
let productos = [];
let precios = [];
let total = 0;
// Arrays
let productosDisponibles = [
    { nombre: "Remeras", precio: 500 },
    { nombre: "Pantalones", precio: 1000 },
    { nombre: "Calzados", precio: 2000 },
    { nombre: "Gorras", precio: 300 },
    { nombre: "Mochilas", precio: 1500 }
];

// Función para agregar productos
function agregarProducto(nombre, precio) {
    productos.push(nombre);
    precios.push(precio);
    console.log("Producto agregado: " + nombre + " por $" + precio);
}

// Función para mostrar productos disponibles
function mostrarProductosDisponibles() {
    let listado = "Productos disponibles:\n";
    for (let i = 0; i < productosDisponibles.length; i++) {
        listado += (i + 1) + ". " + productosDisponibles[i].nombre + " - $" + productosDisponibles[i].precio + "\n";
    }
    return listado;
}

// Función para calcular el total
function calcularTotal() {
    total = 0;
    for (let i = 0; i < precios.length; i++) {
        total = total + precios[i];
    }
    return total;
}

// Función para mostrar resumen de compras
function mostrarResumen() {
    if (productos.length == 0) {
        alert("No has agregado productos.");
    } else {
        let resumen = "Resumen de compras:\n";
        for (let i = 0; i < productos.length; i++) {
            resumen += productos[i] + " - $" + precios[i] + "\n";
        }
        resumen += "\nTotal: $" + calcularTotal();
        alert(resumen);
    }
}

// Bucle
while (true) {
    let accion = prompt("¿Qué te gustaría hacer?\n1. Agregar producto\n2. Ver resumen\n3. Salir");
    
    if (accion == "1") {
        alert(mostrarProductosDisponibles()); 
        let indice = prompt("Elige el número del producto:");

        let productoSeleccionado = productosDisponibles[indice - 1];

        if (productoSeleccionado != undefined) {
            agregarProducto(productoSeleccionado.nombre, productoSeleccionado.precio);
        } else {
            alert("Opción no válida.");
        }

    } else if (accion == "2") {
        mostrarResumen();
    } else if (accion == "3") {
        alert("Gracias por usar el gestor de compras.");
        break;
    } else {
        alert("Opción no válida.");
    }
}

