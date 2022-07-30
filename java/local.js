
// se crea el local storage para que me guarde todos los productos del carrito
let Productocarrito;
if(JSON.parse(localStorage.getItem('Productocarrito')))
{
    Productocarrito=JSON.parse(localStorage.getItem('Productocarrito'))
}
else
{
    localStorage.setItem('Productocarrito',JSON.stringify([]))
    Productocarrito=JSON.parse(localStorage.getItem('Productocarrito'))
}