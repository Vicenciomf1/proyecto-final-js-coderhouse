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

//Y acá van los eventos y los nodos:

//En esta parte inserto cada producto desde la API
const contenedor = document.getElementById('productosContenedor');
let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

fetch('/assets/db/bdfalsa.json')  //Traigo los datos de una API, de una base de datos falsa
    // .then(respuesta => { //Esto lo pongo si es una API Real
    //     if (respuesta.ok) {
    //     return respuesta.json() //Si la respuesta me llega con un status 2xx de respuesta, entonces agarro al objeto HTTP Response, y con el método .json() pido los datos como objetos JS parseados desde una string JSON de la respuesta.
    //     }
    //     throw respuesta; //Si es que pasa del return, entonces hubo cualquier otra cosa como error, y dejo que lo agarre el siguiente catch (throw es de lanzar)
    // })  
    .then((respuesta) => respuesta.json()) //Este es cuando se prueba con un JSON local
    .then((datos) => {  //Con esos datos hago lo siguiente...
        productos = datos; //Guardo los productos para utilizarlos después también
        for (const {nombre, descripcion, precio, foto} of productos){  //Inserto el HTML de cada uno y formo el componente de cada producto
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
    })
    .catch((error) => console.log(error));  //Si hubo algún error, lo muestro en consola


//Y en esta sección me encargo de meter los productos en el carrito, si la anterior era para traer los productos y mostrarlos, esta es para registrar cuáles de aquellos fueron comprados

contenedor.addEventListener('click', function(evento){  //Hay que hacer este paso previo para poder agregar el event handler a los nodos generados dinámicamente con la consulta a la API
    if (evento.target.classList.contains('productobtn')){  //Si clickeas en añadir un producto, entonces ahora sí haz algo
        let producto = evento.target.id;  //Con esta parte determino qué producto es el que disparó el evento
        comprar(producto, carrito); //Y lo agrego al carrito

        localStorage.setItem('carrito', JSON.stringify(carrito)); //Me encargo de que los datos (el estado) puedan estar actualizdos entre cada página
        renderizarContador(carrito);

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


