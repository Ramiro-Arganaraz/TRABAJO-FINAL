//primero se consulta si existe algo en el local storage en el caso de no existir lo crea, si existe lo muestra

if (JSON.parse(localStorage.getItem("Productocarrito"))) {
  Productocarrito = JSON.parse(localStorage.getItem("Productocarrito"));
} else {
  localStorage.setItem("Productocarrito", JSON.stringify([]));
  Productocarrito = JSON.parse(localStorage.getItem("Productocarrito"));
}

const totalcompra = () => {
  return Productocarrito.reduce(
    (aux, productoencarrito) =>
      aux + productoencarrito.precio * productoencarrito.cantidad,
    0
  );
};

let subtotal = 0;
subtotal = totalcompra();

let cuota = 0;
let dto = 0;

const cuerpo = document.getElementById("carrito");

Productocarrito.length === 0 && console.log("carrito vacio");

if (!Productocarrito.length) {
  let alarmacarrito = `
    <div>
    <h1 id="texto">Carrito vacio</h1>
    <a class="volver" href="Trabajofinal.html">
    <button>volver</button>
    </a>
    <div>`;
  cuerpo.innerHTML += alarmacarrito;
} else {
  const table = `
    <div>
        <table id="tabla" class="center table-hover">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Productos</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio</th>
                </tr>
            </thead>
            <tbody id='tbody'>
            </tbody>
            <tfoot>
                <tr>
                    <th scope="row"></th>
                    <th></th>
                    <th>Total</th>
                    <th id="total">$${totalcompra().toLocaleString()}</th>
                </tr>
            </tfoot>
        </table>
        <div id="opciones">
        <a class="volver" href="Trabajofinal.html">
        <button id="volver">volver</button>
        </a>
        <button id="borrarcarrito">Borrar Todo</button>
        </div>
    </div>
    `;
  cuerpo.innerHTML += table;
  const tbody = document.getElementById("tbody");
  Productocarrito.forEach((productos) => {
    const element = productos;
    const { id, nombre, precio, cantidad } = element;
    const cart = `
        <tr scope="row" id=${id}>
        <th><button onclick="borrarproducto(${id})" >borrar</th>
        <th>${nombre}</th>
        <th>${cantidad}</th>
        <th>$${(cantidad * precio).toLocaleString()}</th>
        </tr>
        `;
    tbody.innerHTML += cart;
  });

  //
  // Borrar producto del carrito
  //

  function buscarIdProducto(id) {
    const idBuscado = Productocarrito.find(
      (idBuscado) => Number(idBuscado.id) === id
    );
    return (resultadoBusqueda = idBuscado);
  }
  function borrarproducto(id) {
    const productoporeliminar = buscarIdProducto(id);
    const indice = Productocarrito.indexOf(productoporeliminar);
    Productocarrito.splice(indice, 1);
    localStorage.setItem("Productocarrito", JSON.stringify(Productocarrito));
    location.reload();
  }

  borrarcarrito.onclick = () => {
    Swal.fire({
      title: "desea eliminar el carrito?",
      text: "no se puede revertir este paso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI",
    }).then((result) => {
      if (result.isConfirmed) {
        Productocarrito = [];
        localStorage.clear();
        console.log(Productocarrito);
        Swal.fire("Eliminaste Todo!", "Todos los productos fueron borrados.", "success").then(
          () => {
            window.location = "carrito.html";
          }
        );
      }
    });
  };
}
//
//fin de borrar producto del carrito
//
const form = document.getElementById("form");
const formulario = `
        <form id="formulario" >
        <label>Ingrese su nombre</label>
            <input type="text" id="nombreu" placeholder="ingrese tu nombre">
            <br>
            <label for="recipient-name" class="col-form-label">Mail:</label>
            <input type="email" class="form-control" id="correou" placeholder="Ingrese tu correo" name="email">
            <br>
            <label>Ingrese su numero de telefono</label>
            <input type="number" id="telefono" placeholder="telefono">
            <br>
            <label>Ingrese su domicilio</label>
            <input type="text" id="direccion" placeholder="direccion">

            <input type="button" id="comprar" value="comprar">
        </form>`;
form.innerHTML = formulario;

function terminarcompra() {
  class personas {
    constructor(nombreu,correou , telefono, direccion) {
      this.nombreu = nombreu;
      this.correou=correou;
      this.telefono = telefono;
      this.direccion = direccion;
    }
  }
  let nombreu = document.getElementById("nombreu");
  let correou=document.getElementById("correou")
  let telefono = document.getElementById("telefono");
  let direccion = document.getElementById("direccion");

  let usuario = new personas(nombreu.value, correou.value, telefono.value, direccion.value);

  if (!Productocarrito.length) {
    alert("no hay productos en el carrito");
  } else {
    if (
      (nombreu.value = null) ||
      (correou.value=null) ||
      (telefono.value = null) ||
      (direccion.value = null)
    ) {
      alert("faltan datos");
    } else {
      console.log(Productocarrito);
      console.log(usuario);
      const dia = moment().format("LLL");
      let copiaventa = { ...Productocarrito, ...usuario, dia };
      console.log(copiaventa);

      let venta = JSON.stringify(Productocarrito) + JSON.stringify(usuario);

      Swal.fire({
        title: "Genera la compra de todo?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Compra Exitosa!", "Ya nos encontramos preparando su envio.", "success").then(
            () => {
              console.log(venta + dia);
              Productocarrito = [];
              localStorage.clear();
              console.log(Productocarrito);
              window.location = "carrito.html";
            }
          );
        }
      });
    }
  }
}
let comprar = document.getElementById("comprar");

comprar.onclick = (e) => {
  e.preventDefault();
  terminarcompra();
};

$("#exampleModal").on("show.bs.modal", function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var recipient = button.data("whatever"); // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this);
  modal.find(".modal-title").text("New message to " + recipient);
  modal.find(".modal-body input").val(recipient);
});
let contacto = document.getElementById("contacto");
let contact = `
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
