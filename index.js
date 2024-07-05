const apiUrl = 'https://6626e00db625bf088c06d1c4.mockapi.io/api/v1/imagenes';

const imagenesContainer = document.getElementById('imagenes-container');

function cargarImagenes() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            
            imagenesContainer.innerHTML = '';
            data.forEach((imagen, index) => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                        <img src="${imagen.imagen}" alt="${imagen.titulo}">
                        <div class="card-content">
                            <h2>${imagen.titulo}</h2>
                            <p>${imagen.fecha}</p>
                            <button class="btnEliminar" data-id="${imagen.id}">Eliminar</button>
                        </div>
                    `;
                imagenesContainer.appendChild(card);
                if (index === data.length - 1) {
                    card.style.marginBottom = '120px';
                }
            });

            document.querySelectorAll('.btnEliminar').forEach(button => {
                button.addEventListener('click', eliminarImagen);
            });
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}

function eliminarImagen(event) {
    const imagenId = event.target.getAttribute('data-id');
    fetch(`${apiUrl}/${imagenId}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                cargarImagenes();
            } else {
                console.error('Error al eliminar la imagen');
            }
        })
        .catch(error => console.error('Error al eliminar la imagen:', error));
}

cargarImagenes();
