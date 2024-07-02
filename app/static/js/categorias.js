//Como ven consumi una api direcatamente usando este código. así el front no se carga desde el back
//A su vez si la conexión es exitosa crea elementos "li" en el contenedor de categorias, osea crea una lista con las categorias
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    fetchCategorias();
});

function fetchCategorias() {
    console.log('Fetching categories...');
    fetch('/listadoCategorias')
        .then(response => {
            console.log('Respuesta recibida:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data);
            const categoriaList = document.getElementById('categoria_list');
            categoriaList.innerHTML = '';
            data.forEach(categoria => {
                const listItem = document.createElement('li');
                listItem.textContent = categoria;
                categoriaList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Problemas con la operación fetch', error);
        });
}
