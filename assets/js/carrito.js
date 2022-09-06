
//Acá va la función de procesamiento
function comprar(producto_agregado, carrito){  //Optimicé esta función, ahora está más legible y escalable
    let compra = productos.find(producto_disponible => producto_disponible.nombre === producto_agregado); //Determino qué producto se está comprando
    let idEnCarro = carrito.findIndex(producto => producto.nombre === producto_agregado); //Determino si el producto ya está en el carrito, y si ya está, reutilizo su id
    if (idEnCarro === -1) { //Si no está, el índice será -1
        compra['cantidad'] = 1;  //Si ha sido comprado por primera vez, entonces sólo agrégale el producto con una cantidad de 1
        carrito.push(compra);
    } else {
        let productoRepetido = carrito[idEnCarro];
        productoRepetido.cantidad += 1; //Si ya ha sido comprado antes, entonces sólo agrégale +1 a su cantidad
    }
    return carrito;
}

//Y acá van los eventos y los nodos para agregar los objetos al carrito

//En esta parte inserto cada producto desde la API
const contenedor = document.getElementById('productosContenedor');
let productos = [];
fetch('assets/db/bdfalsa.json')  //Traigo los datos de una API, de una base de datos falsa
    .then((respuesta) => respuesta.json())  //Con el objeto HTTP Response, pido los datos como objetos JS parseados de una string JSON.
    .then((datos) => {  //Con esos datos hago lo siguiente...
        productos = datos; //Guardo los productos para utilizarlos después también
        for (const {nombre, descripcion, precio, foto} of productos){  //Inserto el HTML de cada uno
            const un_producto = document.createElement('div');
            un_producto.setAttribute('class', 'col-6 col-md-4 col-lg-3 col-xl-2');
            un_producto.innerHTML = `
                <div class="producto p-3">
                    <img class="producto__foto" src=${foto}>
                    <div class="producto__contenido">
                        <h4 class="producto__contenido--titulo">${nombre}</h4>
                        <p class="producto__contenido--texto">${descripcion}</p>
                        <p class="producto__contenido--texto">Precio: $${precio}</p>
                        <button id="${nombre}" class="btn btn-primary productobtn" type="button">Agregar!</button>
                    </div>
                </div>
            `;
            contenedor.append(un_producto);  //Y finalmente ingreso todo esto a su contenedor, se repite el proceso por cada producto
        }
    });

let btnComprar = document.getElementById('comprar');  //Este es el botón para llevar hacia el carro de compra
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

contenedor.addEventListener('click', function(evento){  //Hay que hacer este paso previo para poder agregar el event handler a los nodos generados dinámicamente con la consulta a la API
    if (evento.target.classList.contains('productobtn')){  //Si clickeas en añadir un producto, entonces ahora sí haz algo
        let producto = evento.target.id;  //Con esta parte determino qué producto es el que disparó el evento
        comprar(producto, carrito); //Y lo agrego al carrito
        Toastify({ //Y luego doy feedback de lo añadido
            text: `Has comprado un/a ${producto}!`,
            duration: 3000,
            close: true,
            gravity: 'bottom',
            position: 'right',
            className: 'alerta'
        }).showToast();
    }
});

// btnComprar.addEventListener('click', function(evento) {  //Cuando la persona quiera ir al carrito de compra, ahí recién le agrego todo el carrito
//     localStorage.setItem('carrito', JSON.stringify(carrito));
// });




