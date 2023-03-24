let productos = [];

fetch("./js/productos.json")
.then(Response => Response.json())
.then(data => {
    productos = data;
    cargarProductos(productos);
})

const contenedorProductos = document.getElementById('productos');
const botonCategorias = document.querySelectorAll(".boton-categoria");
const tituloCategorias = document.querySelector("tituloP");
let botonAgregar = document.querySelectorAll(".producto-agregar");
const cantidadCarrito = document.querySelector("#numerito");

function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(p =>{
        
        const productosContainer = document.createElement('div');
        productosContainer.innerHTML=`
        <div>
        <img src="${p.imagen}" alt="imagen producto">
        <div class="producto-detalles">
             <h3 class="producto-titulo">${p.titulo}</h3>
             <p class="producto-precio">$ ${p.precio}</p>
             <button class="producto-agregar" id="${p.id}">Agregar</button>
        </div>
        </div>
        `;

        contenedorProductos.append(productosContainer);
        
})
botonAgregarActualizar();
}


 


botonCategorias.forEach(boton => {
    boton.addEventListener("click", (e) =>{

        botonCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            
           const cambioCategorias = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloP.innerText = cambioCategorias.categoria.nombre;
            
            const productosCategorias = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosCategorias);
        } else{
            tituloP.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
});



function botonAgregarActualizar(){
    botonAgregar = document.querySelectorAll(".producto-agregar");

    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
};

let carritoConProductos;

let carritoConProductosLS = localStorage.getItem("carrito-con-productos");
if(carritoConProductosLS){
    carritoConProductos = JSON.parse(carritoConProductosLS);
    actualizarCantidadCarrito();
} else{
    carritoConProductos = [];
}


function agregarAlCarrito(e){

    Toastify({
        text: "Producto Agregado",
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

    const idProd = e.currentTarget.id;
    const prodAgregado = productos.find(producto => producto.id === idProd);

    if(carritoConProductos.some(producto => producto.id === idProd)){
        const Index = carritoConProductos.findIndex(producto => producto.id === idProd);
        carritoConProductos[Index].cantidad++;
    } else {
        prodAgregado.cantidad = 1;
        carritoConProductos.push(prodAgregado);
    }
    actualizarCantidadCarrito();

    localStorage.setItem("carrito-con-productos", JSON.stringify(carritoConProductos));
}


function actualizarCantidadCarrito(){
    let nuevaCantidadCarrito = carritoConProductos.reduce((acc, producto) => acc + producto.cantidad, 0);
    cantidadCarrito.innerText= nuevaCantidadCarrito;
}