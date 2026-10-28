const buscador = document.getElementById("buscarProducto");
const listaProductos = document.getElementById("listaProductos");
const contadorProductos = document.getElementById("contadorProductos");
if (buscador && listaProductos) {
const productos = listaProductos.querySelectorAll(".producto");
    function contarProductos() {
        let visibles = 0;
        productos.forEach(function(producto) {
            if (producto.parentElement.style.display !== "none") {
                visibles++;
            }
        });
        if (contadorProductos) {
            contadorProductos.textContent = visibles + " productos Existentesgit";
        }
    }
    buscador.addEventListener("input", function() {
        const texto = buscador.value.toLowerCase();
        productos.forEach(function(producto) {
            const nombre = producto.querySelector("h3").textContent.toLowerCase();
            if (nombre.includes(texto)) {
                producto.parentElement.style.display = "";
            } else {
                producto.parentElement.style.display = "none";
            }
        });
        contarProductos();
    });
    contarProductos();
}
const botonesProductos = document.querySelectorAll(".seleccionar-producto");
botonesProductos.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const nombre = boton.getAttribute("data-producto");
        localStorage.setItem("productoSeleccionado", nombre);
        window.location.href = "ventas.html";
    });
});
const nombresProductos = [
    "Odyssey Homme",
    "Odyssey Homme White Edition",
    "Odyssey Femme",
    "Odyssey Femme White Edition",
    "Odyssey Mandarin Sky",
    "Odyssey Mandarin Sky Elixir",
    "Odyssey Mandarin Sky Vintage Edition",
    "Odyssey Mega Man",
    "Odyssey Aqua",
    "Odyssey Aqua Edition",
    "Odyssey Aoud",
    "Odyssey Tyrant",
    "Odyssey Tyrant Special Edition",
    "Odyssey Wild One",
    "Odyssey Wild One Gold Edition",
    "Odyssey Spectra",
    "Odyssey Spectra Blue Edition",
    "Odyssey Spectra Rainbow Edition",
    "Odyssey Limoni Fresh",
    "Odyssey Limoni Fresh Edition",
    "Odyssey Candee",
    "Odyssey Candee Special Edition",
    "Odyssey Dubai Chocolat",
    "Odyssey Artisto",
    "Odyssey BA HA MAS",
    "Odyssey Eau de Montagne",
    "Odyssey Go Mango",
    "Odyssey Black Forest",
    "Odyssey Marshmallow",
    "Odyssey Revolution",
    "Odyssey Toffee Coffee",
    "Odyssey Soda Pop",
    "Odyssey Pink Pop",
    "Odyssey Li'chi Lush",
    "Odyssey French Kiss",
    "Odyssey Nexus",
    "Odyssey Bloody Hot",
    "Odyssey Jalapeach-O",
    "Odyssey Ring My Bell",
    "Odyssey Discovery Set",
    "Odyssey Spectra 4 PCS Gift Set",
    "Odyssey Tyrant 4 PCS Gift Set",
    "Odyssey Candee 4 PCS Gift Set",
    "Odyssey Aqua Gift Set",
    "Odyssey Mega Gift Set",
    "Odyssey Homme White Edition Gift Set",
    "Odyssey Toffee Coffee Body Spray",
    "Odyssey Spectra Blu Body Spray",
    "Odyssey Revolution Body Spray",
    "Odyssey Marshmallow Body Spray",
    "Odyssey Go Mango Body Spray",
    "Odyssey Eau de Montagne Body Spray",
    "Odyssey Black Forest Body Spray",
    "Odyssey Dubai Chocolat Body Spray",
    "Odyssey Homme Body Mist",
    "Odyssey Homme White Edition Body Mist",
    "Odyssey Mandarin Sky Body Mist",
    "Odyssey Mandarin Sky Elixir Body Mist",
    "Odyssey Aqua Body Mist",
    "Odyssey Aoud Body Mist",
    "Odyssey Candee Body Mist",
    "Odyssey Limoni Body Mist",
    "Odyssey Mega Body Spray",
    "Odyssey Tyrant Body Mist",
    "Odyssey Wild One Body Mist"
];
const selectorVenta = document.getElementById("productoVenta");
if (selectorVenta) {
    nombresProductos.forEach(function(nombre) {
        const opcion = document.createElement("option");
        opcion.value = nombre;
        opcion.textContent = nombre;
        selectorVenta.appendChild(opcion);
    });
    const productoGuardado = localStorage.getItem("productoSeleccionado");

    if (productoGuardado) {
        selectorVenta.value = productoGuardado;
        localStorage.removeItem("productoSeleccionado");
    }
}
const formularioVenta = document.getElementById("formularioVenta");
function obtenerVentas() {
    return JSON.parse(localStorage.getItem("ventasKJNOX")) || [];
}
function mostrarVentas() {
    const tabla = document.getElementById("tablaVentas");
    const totalTexto = document.getElementById("totalVentas");
    if (!tabla || !totalTexto) {
        return;
    }

    tabla.textContent = "";
    const ventas = obtenerVentas();
    let totalGeneral = 0;
    ventas.forEach(function(venta) {
        const fila = document.createElement("tr");
        const celdaCliente = document.createElement("td");
        const celdaProducto = document.createElement("td");
        const celdaCantidad = document.createElement("td");
        const celdaTotal = document.createElement("td");
        celdaCliente.textContent = venta.cliente;
        celdaProducto.textContent = venta.producto;
        celdaCantidad.textContent = venta.cantidad;
        celdaTotal.textContent = "$" + venta.total.toFixed(2);
        fila.appendChild(celdaCliente);
        fila.appendChild(celdaProducto);
        fila.appendChild(celdaCantidad);
        fila.appendChild(celdaTotal);
        tabla.appendChild(fila);
        totalGeneral += venta.total;
    });
    totalTexto.textContent ="Total de ventas: $" + totalGeneral.toFixed(2);
}
if (formularioVenta) {
    formularioVenta.addEventListener("submit", function(evento) {
        evento.preventDefault();
        const cliente = document.getElementById("cliente").value.trim();
        const producto = document.getElementById("productoVenta").value;
        const cantidad = Number(document.getElementById("cantidad").value);
        const precio = Number(document.getElementById("precio").value);
        const mensaje = document.getElementById("mensajeVenta");
        if (cliente === "" || producto === "" ||
            cantidad < 1 || precio <= 0 ||
            !Number.isFinite(cantidad) || !Number.isFinite(precio)) {
            mensaje.textContent = "Revisa los datos ingresados.";
            return;
        }
        const venta = {
            cliente: cliente,
            producto: producto,
            cantidad: cantidad,
            precio: precio,
            total: cantidad * precio
        };
        const ventas = obtenerVentas();
        ventas.push(venta);
        localStorage.setItem("ventasKJNOX", JSON.stringify(ventas));
        mensaje.textContent = "La venta se guardó correctamente.";
        formularioVenta.reset();
        mostrarVentas();
    });
    mostrarVentas();
}
const botonBorrarVentas = document.getElementById("borrarVentas");
if (botonBorrarVentas) {
    botonBorrarVentas.addEventListener("click", function() {
        const confirmar = confirm("¿Quieres borrar todos los registros de ventas?");
        if (confirmar) {
            localStorage.removeItem("ventasKJNOX");
            mostrarVentas();
            const mensaje = document.getElementById("mensajeVenta");
            if (mensaje) {
                mensaje.textContent = "Se borraron los registros.";
            }
        }
    });
}
const formularioContacto = document.getElementById("formularioContacto");
if (formularioContacto) {
    formularioContacto.addEventListener("submit", function(evento) {
        evento.preventDefault();
        const nombre = document.getElementById("nombreContacto").value.trim();
        const correo = document.getElementById("correoContacto").value.trim();
        const asunto = document.getElementById("asuntoContacto").value.trim();
        const mensaje = document.getElementById("mensajeContacto").value.trim();
        const respuesta = document.getElementById("respuestaContacto");
        if (!nombre || !correo || !asunto || !mensaje) {
            respuesta.textContent = "Completa todos los campos.";
            return;
        }
        const mensajes = JSON.parse(
            localStorage.getItem("mensajesKJNOX")
        ) || [];
        mensajes.push({
            nombre: nombre,
            correo: correo,
            asunto: asunto,
            mensaje: mensaje
        });
        localStorage.setItem("mensajesKJNOX", JSON.stringify(mensajes));
        respuesta.textContent ="El mensaje se guardó en este navegador.";
        formularioContacto.reset();
    });
}