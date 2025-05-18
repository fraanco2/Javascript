function mostrarFormulario(cart) {
  try {
    Swal.fire({
      title: "Datos del comprador",
      html: `
        <input type="text" id="nombre" class="swal2-input" placeholder="Nombre completo">
        <input type="email" id="email" class="swal2-input" placeholder="Correo electrónico">
        <input type="text" id="direccion" class="swal2-input" placeholder="Dirección de envío">
        <input type="text" id="tarjeta" class="swal2-input" placeholder="Número de tarjeta (**** **** **** ****)">
        <select id="metodo" class="swal2-input">
          <option value="">Selecciona un método de pago</option>
          <option value="Tarjeta de crédito">Tarjeta de crédito</option>
          <option value="Débito">Tarjeta de débito</option>
          <option value="Transferencia">Transferencia</option>
        </select>
      `,
      confirmButtonText: "Pagar",
      cancelButtonText: "Atrás",
      showCancelButton: true,

      didOpen: () => {
        const inputTarjeta = document.getElementById("tarjeta");

        inputTarjeta.addEventListener("input", () => {
          let valorIngresado = inputTarjeta.value;
          let soloNumeros = "";

    // Recorrer cada caracter y verificar si es un número
          for (let i = 0; i < valorIngresado.length; i++) {
          const caracter = valorIngresado[i];
          if (!isNaN(caracter) && caracter !== " ") {
            soloNumeros += caracter;
         }
      }

      inputTarjeta.value = soloNumeros;
     });
   },

      preConfirm: () => {
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const direccion = document.getElementById("direccion").value.trim();
        const tarjeta = document.getElementById("tarjeta").value.trim();
        const metodo = document.getElementById("metodo").value;

        if (!nombre || !email || !direccion || !tarjeta || !metodo) {
          Swal.showValidationMessage("Todos los campos son obligatorios");
          return false;
        }

        generarRecibo(cart, { nombre, email, direccion, tarjeta, metodo });
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "info",
          title: "Compra cancelada",
          text: "Podés seguir comprando o volver a intentarlo.",
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  } catch (error) {
    Swal.fire("Error", "No se pudo proceder con la compra", "error");
  }
}

function generarRecibo(cart, comprador) {
  const cartContainer = document.getElementById("cart-section");

  try {
    cartContainer.innerHTML = "";

    const botonVaciar = document.getElementById("vaciar-carrito");
    if (botonVaciar) {
      botonVaciar.remove();
    }

    const recibo = document.createElement("div");
    recibo.id = "recibo";
    recibo.innerHTML = `
      <h2>Recibo de compra</h2>
      <p><strong>Nombre:</strong> ${comprador.nombre}</p>
      <p><strong>Email:</strong> ${comprador.email}</p>
      <p><strong>Dirección de envío:</strong> ${comprador.direccion}</p>
      <p><strong>Método de pago:</strong> ${comprador.metodo}</p>
      <p><strong>Tarjeta:</strong> **** **** **** ${comprador.tarjeta.slice(-4)}</p>

      <h3>Productos:</h3>
      <ul>
        ${cart.map(p => `<li>${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}</li>`).join("")}
      </ul>
      <p><strong>Total: $${cart.reduce((t, p) => t + p.precio * p.cantidad, 0)}</strong></p>
      <button id="imprimir-recibo">Imprimir recibo</button>
    `;

    cartContainer.appendChild(recibo);

    document.getElementById("imprimir-recibo").onclick = () => {
      window.print();
    };
  } catch (error) {
    Swal.fire("Error", "No se pudo generar el recibo", "error");
  } finally {
   try {
  localStorage.removeItem("cartProducts");
} catch {
  Swal.fire({
    icon: 'warning',
    title: 'Advertencia',
    text: 'No se pudo vaciar el carrito automáticamente. Puede eliminarlo manualmente.',
    timer: 3000,
    showConfirmButton: false
  });
}}}
