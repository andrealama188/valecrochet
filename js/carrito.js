document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // CARGAR CARRITO
    // =========================

    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];



    // =========================
    // CONTADOR CARRITO
    // =========================

    function actualizarContador() {

    var contador = document.getElementById("contadorCarrito");

    if (!contador) {
        return;
    }

    var cantidadTotal = 0;

    var carritoGuardado =
        JSON.parse(localStorage.getItem("carrito")) || [];

    for (var i = 0; i < carritoGuardado.length; i++) {

        cantidadTotal += Number(
            carritoGuardado[i].cantidad
        );

    }

    contador.innerHTML = cantidadTotal;
}


    // =========================
    // BOTONES COMPRAR
    // =========================

    var botones = document.querySelectorAll(".btn-comprar");

    for (var i = 0; i < botones.length; i++) {

        botones[i].onclick = function () {

            var nombre = this.dataset.nombre;
            var precio = Number(this.dataset.precio);
            var imagen = this.dataset.imagen;
            var tamano = this.dataset.tamano || "No especificado";

            var existe = false;


            // Buscar producto existente

            for (var j = 0; j < carrito.length; j++) {

                if (carrito[j].nombre == nombre) {

                    carrito[j].cantidad++;

                    existe = true;

                    break;

                }

            }


            // Agregar producto nuevo

            if (!existe) {

                carrito.push({

                    nombre: nombre,

                    precio: precio,

                    imagen: imagen,

                    tamano: tamano,

                    cantidad: 1,

                    favorito: false

                });

            }


            localStorage.setItem(
                "carrito",
                JSON.stringify(carrito)
            );


            actualizarContador();

        };

    }


    // =========================
    // MOSTRAR CARRITO
    // =========================

   var lista = document.getElementById("listaCarrito");

   // ACTUALIZAR CARRITO
   actualizarContador();

    if (lista) {

    mostrarCarrito();

     }

    function mostrarCarrito() {

        lista.innerHTML = "";

        var total = 0;


        for (var i = 0; i < carrito.length; i++) {

            // TOTAL GENERAL
            total += carrito[i].precio * carrito[i].cantidad;


            lista.innerHTML += `

            <div class="row producto mb-4 align-items-center">

                <!-- IMAGEN -->

                <div class="col-lg-3 mb-3">

                    <img 
                        src="${carrito[i].imagen}" 
                        class="imagen-producto-carrito"
                    >

                </div>


                <!-- INFORMACIÓN -->

                <div class="col-lg-5 mb-3">

                    <p>
                        <strong>
                            ${carrito[i].nombre}
                        </strong>
                    </p>


                    <p>
                        Tamaño: ${carrito[i].tamano}
                    </p>


                   <!-- ELIMINAR -->

<button 
    class="btn btn-icono"
    onclick="eliminarProducto(${i})"
>

    <i class="fas fa-trash"></i>

</button>


<!-- FAVORITO -->

<button 
    class="btn btn-icono btn-favorito ${carrito[i].favorito ? "activo" : ""}"
    onclick="favoritoProducto(${i})"
>

    <i class="fas fa-heart"></i>

</button>

                </div>


                <!-- CANTIDAD Y PRECIO -->

                <div class="col-lg-4">

                    <p class="text-center titulo-cantidad">

                        <strong>
                            Cantidad
                        </strong>

                    </p>


                    <div class="d-flex justify-content-center align-items-center">

                        <button 
                            class="btn btn-menos"
                            onclick="restarCantidad(${i})"
                        >

                            −

                        </button>


                        <input 
                            type="text"
                            class="form-control cantidad-input mx-2"
                            value="${carrito[i].cantidad}"
                            readonly
                        >


                        <button 
                            class="btn btn-mas"
                            onclick="sumarCantidad(${i})"
                        >

                            +

                        </button>

                    </div>


                    <!-- PRECIO UNITARIO -->

                    <p class="precio-producto">

                        <strong>
                            S/${carrito[i].precio.toFixed(2)}
                        </strong>

                    </p>

                </div>

            </div>

            <hr>

            `;

        }


        // =========================
        // RESUMEN
        // =========================

        var subtotal = document.getElementById("subtotal");
        var totalElemento = document.getElementById("total");


        if (subtotal) {

            subtotal.innerHTML =
                "S/" + total.toFixed(2);

        }


        if (totalElemento) {

            totalElemento.innerHTML =
                "S/" + total.toFixed(2);

        }


        // =========================
        // TÍTULO
        // =========================

        var titulo = document.getElementById("titulo-carrito");

        if (titulo) {

            var cantidadArticulos = 0;

            for (var x = 0; x < carrito.length; x++) {

                cantidadArticulos += Number(
                    carrito[x].cantidad
                );

            }

            titulo.innerHTML =
                "CARRITO - " +
                cantidadArticulos +
                " Artículos";

        }


        actualizarContador();

    }

        // =========================
        // MÉTODOS DE PAGO
        // =========================

        var metodosPago = document.querySelectorAll(".metodo-pago");

        var medioPagoSeleccionado = "";

        for (var i = 0; i < metodosPago.length; i++) {

            metodosPago[i].onclick = function () {

                // Quitar selección anterior

                for (var j = 0; j < metodosPago.length; j++) {

                    metodosPago[j].classList.remove("seleccionado");

                }


                // Seleccionar este medio

                this.classList.add("seleccionado");

                medioPagoSeleccionado = this.dataset.metodo;


                // Mostrar texto

                var textoMedio =
                    document.getElementById("medioPagoSeleccionado");

                if (textoMedio) {

                    textoMedio.innerHTML =
                        "Medio de pago: <strong>" +
                        medioPagoSeleccionado +
                        "</strong>";

                }

            };

        }


            // =========================
            // SUMAR
            // =========================

            window.sumarCantidad = function (i) {

                carrito[i].cantidad++;

                guardarCambios();

            };


            // =========================
            // RESTAR
            // =========================

            window.restarCantidad = function (i) {

                if (carrito[i].cantidad > 1) {

                    carrito[i].cantidad--;

                } else {

                    carrito.splice(i, 1);

                }

                guardarCambios();

            };


            // =========================
            // ELIMINAR
            // =========================

            window.eliminarProducto = function (i) {

                carrito.splice(i, 1);

                guardarCambios();

            };


            // =========================
            // FAVORITO
            // =========================

            window.favoritoProducto = function (i) {

                carrito[i].favorito =
                    !carrito[i].favorito;

                localStorage.setItem(
                    "carrito",
                    JSON.stringify(carrito)
                );

                mostrarCarrito();

            };


            // =========================
            // GUARDAR CAMBIOS
            // =========================

            function guardarCambios() {

                localStorage.setItem(
                    "carrito",
                    JSON.stringify(carrito)
                );

                mostrarCarrito();

            }


            // =========================
        // REALIZAR PAGO POR WHATSAPP
        // =========================

        var btnRealizarPago = document.getElementById("btnRealizarPago");

        if (btnRealizarPago) {

            btnRealizarPago.onclick = function () {

                // Verificar si hay productos

                if (carrito.length === 0) {

                    alert("Tu carrito está vacío.");

                    return;

                }


        // =========================
        // CREAR MENSAJE
        // =========================

        var mensaje =
            "Hola, quiero realizar el siguiente pedido de Vale Crochet:\n\n";

        var totalPedido = 0;


        // =========================
        // PRODUCTOS
        // =========================

        for (var i = 0; i < carrito.length; i++) {

            var producto = carrito[i];

            var cantidad = Number(producto.cantidad);

            var precio = Number(producto.precio);

            var subtotalProducto =
                cantidad * precio;


            totalPedido += subtotalProducto;


            mensaje +=
                "• " +
                producto.nombre +
                " x" +
                cantidad +
                " - S/" +
                subtotalProducto.toFixed(2) +
                "\n";

        }


            // =========================
            // TOTAL
            // =========================

            mensaje +=
                "\nTotal: S/" +
                totalPedido.toFixed(2);


            // =========================
            // MEDIO DE PAGO
            // =========================

          if (medioPagoSeleccionado === "") {

        alert("Por favor, selecciona un medio de pago.");

        return;

    }

    mensaje +=
        "\nMedio de pago: " +
        medioPagoSeleccionado;


            // =========================
            // WHATSAPP
            // =========================

            var telefono = "51933071109";

            var url =
                "https://wa.me/" +
                telefono +
                "?text=" +
                encodeURIComponent(mensaje);


            window.open(url, "_blank");

        };

    }

    });

