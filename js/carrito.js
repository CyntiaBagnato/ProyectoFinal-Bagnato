let carritoConProductos = localStorage.getItem("carrito-con-productos");
carritoConProductos = JSON.parse(carritoConProductos);


const carritoVacio = document.querySelector("#carrito-vacio");
const carritoContenidos = document.querySelector("#carrito-contenidos");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
let botonEliminar = document.querySelectorAll(".carrito-contenido-eliminar");
const botonVaciar = document.querySelector("#carrito-vaciar");
const precioTotal = document.querySelector("#total");
const botonPagar = document.querySelector("#pagar");

function cargarProductosCarrito(){
if(carritoConProductos && carritoConProductos.length > 0){

    carritoVacio.classList.add("disabled");
    carritoContenidos.classList.remove("disabled");
    carritoAcciones.classList.remove("disabled");
    carritoComprado.classList.add("disabled");

    carritoContenidos.innerHTML = "";

    carritoConProductos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("carrito-contenido");
        div.innerHTML = `
        <img  class="carrito-contenido-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="carrito-contenido-nombre">
            <small>Titulo</small>
            <h3>${producto.titulo}</h3>
        </div>
        <div class="carrito-contenido-cantidad">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-contenido-precio">
            <small>Precio</small>
            <p>${producto.precio}</p>
        </div>
        <div class="carrito-contenido-subtotal">
            <small>Subtotal</small>
            <p>$ ${producto.precio * producto.cantidad}</p>
        </div>
        <button id="${producto.id}" class="carrito-contenido-eliminar"><i class="bi bi-trash3"></i></button>
        `
    carritoContenidos.append(div);
    })
}else{

    carritoVacio.classList.remove("disabled");
    carritoContenidos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.add("disabled");
}
botonEliminarActualizar();
actualizarTotal();
}

cargarProductosCarrito();


function botonEliminarActualizar(){
    botonEliminar = document.querySelectorAll(".carrito-contenido-eliminar");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {

    Toastify({
        text: "Producto Eliminado",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ce267a, #da70ef, #ce267a)",
          borderRadius: "2rem",
          textTransform: "uppercase",
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = carritoConProductos.findIndex(producto => producto.id === idBoton);
   
    carritoConProductos.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("carrito-con-productos", JSON.stringify(carritoConProductos));

}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito(){

    Swal.fire({
        title: 'Estás seguro?',
        text: "Se borrarán todos los productos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar todo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            carritoConProductos.length = 0;
    localStorage.setItem("carrito-con-productos", JSON.stringify(carritoConProductos));
    cargarProductosCarrito();
          Swal.fire(
            'Eliminados!',
            'El carrito está vacío.',
            'success'
          )
        }
      })
}

function actualizarTotal(){
    const totalCalculado = carritoConProductos.reduce((acc,producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;

}

botonPagar.addEventListener("click", pagarCarrito);

function pagarCarrito(){

    carritoConProductos.length = 0;
    localStorage.setItem("carrito-con-productos", JSON.stringify(carritoConProductos));

    carritoVacio.classList.add("disabled");
    carritoContenidos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.remove("disabled");
}

