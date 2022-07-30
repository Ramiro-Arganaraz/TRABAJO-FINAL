
let verTodo = document.getElementById("verTodo");

// se da inicio al fetch para traer todos los productos

const fetchLocalProductos = () => {
  fetch("/java/productos.json")
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      mostrarProductos(result.producto);
    })
    .catch((error) => {
      console.error(error);
    });
};
fetchLocalProductos();

//funcion para insertar los objetos junto con el DOM

function mostrarProductos(producto) {
  producto.forEach((product) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card m-3");
    card.setAttribute("style", "width: 18rem;");
    let card_header = document.createElement("div");
    card_header.setAttribute("class", "card-header");
    let imagen = document.createElement("img");
    let imgprod = product.imagen;
    imagen.setAttribute("id","imagenpr")
    imagen.setAttribute("class", "card-img-top");
    imagen.setAttribute("src", imgprod);
    imagen.setAttribute("alt", "Card image cap");
    let nombre = document.createElement("h1");
    nombre.innerText = product.nombre;
    card_header.append(nombre);
    let precio = document.createElement("h2");
    precio.innerText = '$'+ product.precio.toLocaleString();

    let botoncompra = document.createElement("button");
    botoncompra.setAttribute("id", product.id);
    botoncompra.setAttribute("class", " btn btn-success");

    botoncompra.innerHTML = "agregar";

    card.append(card_header, imagen, precio, botoncompra);
    verTodo.append(card);

    //se agrega el producto al carrito

    botoncompra.addEventListener("click", function (e) {
      const boton = e.target;
      const idBoton = boton.getAttribute("id");

      //se genera un nuevo array para ferivicar si el producto existe o no en el carrito
      //en el caso de existir se le suma la cantidad

      const productoencontrado = producto.find((prod) => prod.id == idBoton);
      const encarrito = Productocarrito.find(
        (prod) => prod.id == productoencontrado.id
      );
        Swal.fire("agregaste " + product.nombre + " al carrito");
      if (!encarrito) {
        Productocarrito.push({ ...productoencontrado, cantidad: 1 });
      } else {
        let carritofiltrado = Productocarrito.filter(
          (product) => product.id != encarrito.id
        );
        Productocarrito = [
          ...carritofiltrado,
          { ...encarrito, cantidad: encarrito.cantidad + 1 },
        ];
      }
      localStorage.setItem("Productocarrito", JSON.stringify(Productocarrito));
          setTimeout(() => {
            location.reload()      
          }, 2000);
      
    });
    
  });
  const contador = document.getElementById("contador");
  // contador.innerHTML=Productocarrito.length

  contador.innerHTML = Productocarrito.reduce(
    (acc, prod) => acc + prod.cantidad,
    0
  );
  
}

// ventana modal para la seccion de el contacto via mail el mismo con una libreria llamada formsubmit

$("#exampleModal").on("show.bs.modal", function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var recipient = button.data("whatever"); // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this);
  modal.find(".modal-title").text("New message to " + recipient);
  modal.find(".modal-body input").val(recipient);
});

let contacto = document.getElementById("Contacto");
let contact = `
    <a href="https://api.whatsapp.com/send?phone=XXXXXXXXXXXX&text=M%C3%A1s+informaci%C3%B3n">
        <img id="imgwp" src="wp.png">
    </a>
    <a data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">
    <img id="imgm" src="https://image.shutterstock.com/image-vector/go-mail-icon-vector-illustration-260nw-1929331298.jpg">
    </a>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New message</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form class="form-group" action="https://formsubmit.co/3524771dbea60b9b1ab76c5aab893e6b" method="POST">
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Mail:</label>
            <input type="email" class="form-control" id="recipient-name" name="email">
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">escribenos:</label>
            <textarea class="form-control" id="message-text" name="mensaje"></textarea>
          </div>
          <div class="form-group">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
      `;
contacto.innerHTML = contact;

//se incia el filtrado de producto dependiendo de la categoria del mismo
let buscador=document.getElementById("filtrarproducto")
let filtrar=document.getElementById("filtro")

function filtro(producto) {
  
  const filtrosdeproductos=producto.filter((product)=>product.categoria===buscador.value)
  console.log(filtrosdeproductos)

  filtrosdeproductos.forEach((filter)=>{
    let cardfilter = document.createElement("div");
    cardfilter.setAttribute("class", "card m-3");
    cardfilter.setAttribute("style", "width: 18rem;");
    let card_header_filter = document.createElement("div");
    card_header_filter.setAttribute("class", "card-header");
    let imagen = document.createElement("img");
    let imgprod = filter.imagen;
    imagen.setAttribute("class", "card-img-top");
    imagen.setAttribute("src", imgprod);
    imagen.setAttribute("alt", "Card image cap");
    let nombre_filter = document.createElement("h1");
    nombre_filter.innerText = filter.nombre;
    card_header_filter.append(nombre_filter);
    let precio = document.createElement("h2");
    precio.innerText = '$'+filter.precio;

    let botoncompra = document.createElement("button");
    botoncompra.setAttribute("id", filter.id);
    botoncompra.setAttribute("class", " btn btn-success");

    botoncompra.innerHTML = "agregar";

    cardfilter.append(card_header_filter, imagen, precio, botoncompra);
    verTodo.append(cardfilter);
    botoncompra.addEventListener("click", function (e) {
      const boton = e.target;
      const idBoton = boton.getAttribute("id");
      const productoencontrado = producto.find((prod) => prod.id == idBoton);
      const encarrito = Productocarrito.find(
        (prod) => prod.id == productoencontrado.id
      );
        Swal.fire("agregaste " + filter.nombre + " al carrito");
      if (!encarrito) {
        Productocarrito.push({ ...productoencontrado, cantidad: 1 });
      } else {
        let carritofiltrado = Productocarrito.filter(
          (product) => product.id != encarrito.id
        );
        Productocarrito = [
          ...carritofiltrado,
          { ...encarrito, cantidad: encarrito.cantidad + 1 },
        ];
      }
      localStorage.setItem("Productocarrito", JSON.stringify(Productocarrito));
    });
  });
  }

  //se consulta en el fetch la relacion de los productos con el filtro

  const fetchLocalProductosfilter = () => {
    fetch("/java/productos.json")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        filtro(result.producto);
      })
      .catch((error) => {
        console.error(error);
      });
  };

//tanto el buscador como el filtrar es consulta para generar sobre el valor insertado

  buscador.onchange=()=>{
    verTodo.innerHTML=''
    fetchLocalProductosfilter();
  }
  filtrar.onclick=(e)=>{
e.preventDefault()
    verTodo.innerHTML=''
    fetchLocalProductosfilter();
  }