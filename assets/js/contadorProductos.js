function renderizarContador(carritoExterno=null){ //Esta función es para actualizar el contador de productos en el carrito, pongo la opción de ingresar un argumento para evitar el cálculo dos veces si es que ya se tiene el valor
    let carrito = carritoExterno || []; //Por defecto está el valor del localStorage, pero si no hay nada, entonces como el null es falsoso, entonces quedará un array vacío.
    let cantidadProductos = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0); //Acá determino la cantidad de productos en el carrito
    let contador = document.querySelector('.estadoCantidadProductos');  //Este es el contador de productos en el carrito
    contador.innerText = `(${cantidadProductos})`;  //Este es el contador de productos en el carrito
};

renderizarContador(JSON.parse(localStorage.getItem('carrito'))); //Hago esto para que las demás páginas puedan también acceder a este contador sin tener que ejecutarlo desde el HTML dentro de su etiqueta <script></script>.