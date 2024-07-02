//Consumir endpoint de obtener usuarios (Vista principal)
/*document.addEventListener('DOMContentLoaded', () =>{
    console.log("DOM fully loaded and parsed");
    fetchUsuarios();
});

function fetchUsuarios(){
    console.log('Fetching users..');
    fetch('/admin/users')
    .then(response => {
        console.log('Respuesta recibida:', response);
        if(!response.ok){
            throw new Error('Network response was not ok' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos recibidos:', data);
        const listaUsuarios=document.getElementById('lista_usuarios');
        listaUsuarios.innerHTML='';
        data.forEach(user => {
            const li = document.createElement('li');
            li.textContent=`ID: ${user.id}, Username: ${user.username}, Email: ${user.email}, Rol: ${user.role}`;
            listaUsuarios.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Problemas con la operación fetch', error);
    });
};*/


//Consumo de endpoinds por selección y mostrar datos en lista
document.addEventListener('DOMContentLoaded' , function(){
    window.fetchData = function(type) {
        let endpoint;
        if(type==='usuarios'){
            endpoint = '/admin/users';
        } else if(type==='noticias'){
            endpoint = '/admin/noticias';
        }
        if(endpoint){
            fetch(endpoint)
            .then(response => {
                if(!response.ok){
                    throw new Error('Error de conexión con el endpoint'+ response.statusText);
                }
                return response.json();
            })
            .then(data => {
                renderData(type, data);
            })
            .catch(error => console.error('error:',error));
        }
    };

    //Consumir endpoint para obtener la totalidad de usuarios y noticias
    function fetchContador(){
        fetch('/admin/contador')
        .then(response => {
            if(!response.ok){
                throw new Error('Error en la conexión con el endpoint' + response.statusText)
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('usuario_contador').textContent='Usuarios' + data.usuario_contador;
            document.getElementById('noticia_contador').textContent='Noticias' + data.noticia_contador;
        })
        .catch(error => console.error('error:', error));
    }
    //Renderizar los datos
    function renderData(type, data){
        const adminContenido=document.getElementById('admin_contenido');
        adminContenido.innerHTML= '';

        //Renderizar en lista 'ul'
        /*if(type==='usuarios'){
            const ul = document.createElement('ul');
            data.forEach(user => {
                const li=document.createElement('li');
                li.textContent=`ID: ${user.id}, Username: ${user.username}, Email: ${user.email}, Rol: ${user.role}`;
                ul.appendChild(li);
            });
            adminContenido.appendChild(ul);
        } else if(type === 'noticias'){
            const ul = document.createElement('ul');
            data.forEach(noticia => {
                const li = document.createElement('li');
                li.textContent=`ID: ${noticia.id}, titulo: ${noticia.titulo}, autor_id: ${noticia.autor_id}, descripcion: ${noticia.descripcion}, categoria: ${noticia.categoria}, fecha_publicacion: ${noticia.fecha_publicacion}`;
                ul.appendChild(li);
            });
            adminContenido.appendChild(ul);
        }*/

        //Renderizar en tablas
        if(type === 'usuarios'){
            const table = document.createElement('table');
            const headerRow = table.insertRow();
            ['ID','Username','Email','Rol'].forEach(text => {
                const th = document.createElement('th');
                th.textContent=text;
                headerRow.appendChild(th);
            });
            data.forEach(user => {
                const row = table.insertRow();
                const celdaId = row.insertCell();
                const celdaUsername = row.insertCell();
                const celdaEmail = row.insertCell();
                const celdaRol = row.insertCell();

                celdaId.textContent=user.id;
                celdaUsername.textContent=user.username;
                celdaEmail.textContent=user.email;
                celdaRol.textContent=user.role

            });
            adminContenido.appendChild(table);
        } else if(type === 'noticias'){
            const table = document.createElement('table');
            const headerRow = table.insertRow();
            ['ID', 'Título', 'Autor ID', 'Descripción', 'Categoría', 'Fecha de Publicación'].forEach(text => {
                const th = document.createElement('th');
                th.textContent=text;
                headerRow.appendChild(th);
            });
            data.forEach(noticia => {
                const row = table.insertRow();
                const celdaId = row.insertCell();
                const celdaTitulo = row.insertCell();
                const celdaAutorId = row.insertCell();
                const celdaDescripcion = row.insertCell();
                const celdaCategoria = row.insertCell();
                const celdaFechaPublic = row.insertCell();


                celdaId.textContent = noticia.id;
                celdaTitulo.textContent = noticia.titulo;
                celdaAutorId.textContent = noticia.autor_id;
                celdaDescripcion.textContent = noticia.descripcion;
                celdaCategoria.textContent = noticia.categoria;
                celdaFechaPublic.textContent = noticia.fecha_publicacion;

            });
            adminContenido.appendChild(table);
        }
    }

    //Llamar a la función contador
    fetchContador();
});
