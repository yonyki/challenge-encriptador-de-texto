//Inicialización de las const y variables
const d = document;
const textArea = d.querySelector(".form_msj");
const imagenMuneco = d.querySelector(".resultado_img");
const loader = d.querySelector(".loader");
const resultadoTitulo = d.querySelector(".resultado_titulo");
const resultadoTexto = d.querySelector(".resultado_texto");
const botonEncriptar = d.querySelector(".form_btn");
const botonDesencriptar = d.querySelectorAll(".form_btn");
const botonCopiar = d.querySelector(".result_btn");

const llaves = [
    ["a", "ai"],
    ["e", "enter"],
    ["i", "imes"],
    ["o", "ober"],
    ["u", "ufat"]
];

// Función para validar el mensaje
function validarMensaje(mensaje) {
    const regex = /[^a-z\s]/
    if (regex.test(mensaje)) {
        alert("El texto debe estar en minúsculas, sin acentos y sin caracteres especiales");
        return false;
    }
    return true;
}

//Función para encriptar el texto
function encriptarMensaje(mensaje){
    let mensajeEncriptado = "";
    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let encriptada = letra;

        for (let j = 0; j < llaves.length; j++) {
            if (letra === llaves[j][0]) {
                encriptada = llaves[j][1];
                break;
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
};

//Función para desencriptar el texto
function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for (let i = 0; i < llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0])
    }
    return mensajeDesencriptado
};

//Ocultar elementos
textArea.addEventListener("input", (e) =>{
    imagenMuneco.style.display = "none";
    loader.classList.remove("hidden");
    resultadoTitulo.textContent = "Recibiendo mensaje...";
    resultadoTexto.textContent = ""
});

//Función del botón "Encriptar"
botonEncriptar.addEventListener("click", (e) =>{
    e.preventDefault();
    let mensaje = textArea.value;
    if (!validarMensaje(mensaje)) {
        return;
    }
    let mensajeEncriptado = encriptarMensaje(mensaje);
    resultadoTexto.textContent = mensajeEncriptado;
    botonCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "Mensaje encriptado:";
    loader.classList.add("hidden");
});

botonDesencriptar[1].addEventListener("click", (e) =>{
    e.preventDefault();
    loader.classList.remove("hidden");
    let mensaje = textArea.value;
    if (!validarMensaje(mensaje)) {
        return;
    }
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultadoTexto.textContent = mensajeDesencriptado;
    botonCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "Mensaje desencriptado:";
    loader.classList.add("hidden");
});

botonCopiar.addEventListener("click", () =>{
    let textoCopiado = resultadoTexto.textContent;
    navigator.clipboard.writeText(textoCopiado).then(() =>{
        imagenMuneco.style.display = "block";
        resultadoTitulo.textContent = "¡El texto se copió con éxito!"
        resultadoTexto.textContent = "";
        botonCopiar.classList.add("hidden");
    });
});