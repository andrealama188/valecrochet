function validarFormulario() {

    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var asunto = document.getElementById("asunto").value;
    var mensaje = document.getElementById("mensaje").value;


    if (nombre == "") {
        alert("Ingrese su nombre");
        return false;
    }

    if (correo == "") {
        alert("Ingrese su correo electrónico");
        return false;
    }

    if (asunto == "") {
        alert("Ingrese el asunto");
        return false;
    }

    if (mensaje == "") {
        alert("Ingrese el mensaje");
        return false;
    }


    // MENSAJE DE CONFIRMACIÓN

    alert("¡Formulario enviado! Gracias por contactarnos.");


    // BORRAR LOS DATOS DESPUÉS DE ACEPTAR

    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("asunto").value = "";
    document.getElementById("mensaje").value = "";


    return false;
}