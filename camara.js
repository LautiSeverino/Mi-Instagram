const imgCamera = document.getElementById("imgCamera");
const canvas = document.getElementById("canvas");
const btnAceptar = document.getElementById("btnAceptar");
const btnCancelar = document.getElementById("btnCancelar");
const apiUrl = 'https://6626e00db625bf088c06d1c4.mockapi.io/api/v1/imagenes';
let imagenCargada = false;

const inputCamera = document.createElement("input");
inputCamera.type = "file";
inputCamera.id = "inputCamera";
inputCamera.accept = "camera";
inputCamera.capture = "environment-facing";

inputCamera.addEventListener("change", () => {
    if (inputCamera.value !== "") {
        const file = inputCamera.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                const ctx = canvas.getContext("2d");
                canvas.width = 500;
                canvas.height = 500;
                ctx.drawImage(img, 0, 0, 500, 500);
                imagenCargada = true;
                imgCamera.style.display = "none";
                canvas.style.display = "block";
            };
        };
        reader.readAsDataURL(file);
    }
});

imgCamera.addEventListener("click", () => {
    inputCamera.click();
});

btnAceptar.addEventListener('click', () => {
    const titulo = document.querySelector('input').value;

    if (!imagenCargada) {
        alert("Por favor, carga una imagen antes de continuar.");
        return;
    }

    if (titulo.trim() === "") {
        alert("Por favor, ingresa un título para la imagen.");
        return;
    }

    const imagenBase64 = canvas.toDataURL('image/webp');
    const fecha = new Date().toLocaleString();

    const nuevaImg = {
        imagen: imagenBase64,
        fecha: fecha,
        titulo: titulo
    };

    const opciones = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaImg)
    };

    fetch(apiUrl, opciones)
    .then(response => {
        if (!response.ok) {
            throw new Error("No se pudo cargar la imagen");
        }
        return response.json();
    })
    .then(() => {
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

btnCancelar.addEventListener("click", () => {
    window.location.href = "index.html";
});
