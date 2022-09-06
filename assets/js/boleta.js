//Acá van las funciones para manejar el DOM
function insertar_carro_vacio(){ //Ojo con esto, debería de aprender más de scope y de tener la costumbre de meter las variables dentro en vez de que modifiquen las globales
    tablaProductos.innerHTML = `
    <tr>
        <td class="text-center">Aún no hay productos en tu carrito</td>
        <td class="text-center">0</td>
        <td class="text-center">$0</td>
        <td class="text-center">$0</td>
    </tr>
    `
}
function rellenar_carrito(){
    for (const {nombre, cantidad, precio} of carrito) { //Obtengo cada producto desde el localStorage, por cada producto del carrito, obtengo su nombre, cantidad y precio
        let fila = tablaProductos.insertRow(0); //Creo la fila para este producto
        //Inserto una celda para cada atributo
        let producto_tabla = fila.insertCell(0);
        let cantidad_Tabla = fila.insertCell(1);
        let precio_tabla = fila.insertCell(2);
        let total = fila.insertCell(3);

        //Estilizo cada celda
        producto_tabla.className = 'text-center';
        cantidad_Tabla.className = 'text-center';
        precio_tabla.className = 'text-center';
        total.className = 'text-center';

        //Ingreso sus valores, accediendo a los atributos de cada producto
        producto_tabla.innerHTML = nombre;
        cantidad_Tabla.innerHTML = cantidad;
        precio_tabla.innerHTML = `$${precio} pesos`;
        total.innerHTML = `$${precio * cantidad} pesos`;
    }
}

function calcular_subtotal(carrito){
    let subtotal = 0;
    for (const {precio, cantidad} of carrito){  //Hago una suma de todos los subtotales al multiplicar cada precio por la cantidad de cada producto, y sumarlo todo. Aprovecho de obtener el precio y la cantidad de cada producto, de cada producto del carrito
        let subtotal_producto = precio * cantidad;
        subtotal += subtotal_producto;
    }
    return subtotal;
}

function insertar_totales(carrito, descuento){
    let subtotal = calcular_subtotal(carrito);
    let descontado = subtotal * descuento;

    let columna = document.querySelectorAll('#contenedorCheckout tr td:nth-child(3)'); //Mapeo cada td de valor de las tres filas, me quedarían los tres nodos en orden desde la primera fila (la del subtotal), hasta la última del total.
    let nodo_subtotal = columna[0];
    let nodo_descuento = columna[1];
    let nodo_total = columna[2];
    
    nodo_subtotal.innerText = `$${subtotal} pesos`;
    nodo_descuento.innerText = `$${descontado} pesos`;
    nodo_total.innerText = `$${subtotal-descontado} pesos`;
}


//Acá uso los eventos para manejar el DOM en base a la interacción el usuario

function calcular_todo() {
    //Ahora empiezo a preparar su salida:
    carrito.length?rellenar_carrito():insertar_carro_vacio(); //Esta función me inserta la tabla de productos, si el carro está vacío, rellena con un placeholder de que no tiene nada, si tiene productos, entonces los rellena
    insertar_totales(carrito, descuento); //Esta función me inserta el total de la boleta
}

//Defino cada valor
let descuento = 0;
let carrito = JSON.parse(localStorage.getItem('carrito')) || []; //El carrito lo obtengo del local storage desde la página del carrito en el index
let formularioDescuento = document.getElementById('descuento');  //El formulario de descuento es seleccionado
let btnReseteoCarro = document.getElementById('resetearCarro');
let tablaProductos = document.getElementById('contenedorProductos');

formularioDescuento.addEventListener('submit', function(evento){
    evento.preventDefault();  //Evitamos que actualice la página
    let porcentajeDcto = formularioDescuento.children[1].value; //Y obtenemos el valor del descuento
    descuento = porcentajeDcto/100;
    insertar_totales(carrito, descuento); //Luego aplicamos tal descuento al hacer que calcule el descuento de nuevo, sólo la sección del descuento para evitar insertar todo de nuevo
});

btnReseteoCarro.addEventListener('click', function(){
    Swal.fire({
        title: "Estás a punto de borrar/reiniciar tu carrito",
        text: "Podrías perder permanentemente las compras guardadas, ¿estás segur@ de esta decisión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, estoy segur@, bórralo",
        cancelButtonText: "No, me arrepentí, tráeme de vuelta"
    }).then( function(result){
        if (result.isConfirmed){
            carrito = [];
            localStorage.clear();
            calcular_todo();
            Swal.fire({
                title: "Eliminado!",
                icon: "success",
                text: "Has borrado tu carrito exitosamente"
            });
        } else {
            Swal.fire({
                title: "Tu carrito no ha sido eliminado :)",
                icon: "success",
                text: "Uf, eso estuvo cerca"
            });
        }
    });
});

calcular_todo(); //Para la ejecución inicial, este es el punto de entrada