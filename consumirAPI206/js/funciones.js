const url = 'http://localhost:8081/api/hurto'

const listarDatos = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    //url: Es la url de la api.
    //Al deslpegarla en el servidor colocar la api del servidor
        fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data) {
        let listaHurtos = data.hurtos //Capturar el array devuelto por la api
        datos = 
        listaHurtos.map(function(hurto) {//Recorrer el array
            respuesta += `<tr>
            <td>${hurto._id}</td>
            <td>${hurto.direccion}</td>`+
            `<td>${hurto.latitud}</td>`+
            `<td>${hurto.longitud}</td>`+
            `<td>${hurto.descripcion}</td>`+
            `<td>${hurto.fecha}</td>`+
            `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(hurto)})'>Editar</a> 
            <a href='#' class="waves-effect waves-light btn modal-danger red" onclick='eliminar(${JSON.stringify(hurto)})'>Eliminar</a>
            </td></tr>`
            // `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(usuario)})'>Editar</a>
            // <a href='#'  class="waves-effect waves-light btn modal-trigger red" onclick='eliminar(${usuario.id})' type="button">Eliminar</a></td></tr>`
            body.innerHTML = respuesta
        })
    })

}

// validarNombre = () => {
//     let nombre = document.getElementById('nombre').value;
//     let texto;
//     let expresion = /[a-zA-Z]/;
  
//     if (nombre === null || nombre === '' || nombre.length === 0) {
//       texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Ingrese un nombre</span>';
//       document.getElementById('errorNombre').innerHTML = texto;
//       return false;
//     } else if (nombre.length < 3) {
//       texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">El nombre debe de ser mayor o igual a 3 letras</span>';
//       document.getElementById('errorNombre').innerHTML = texto;
//       return false;
//     } else if (!expresion.test(nombre)) {
//       texto = '<span style="color: #e6213f; padding: 3px;border-radius: 3px;">Solo se permiten letras</span>';
//       document.getElementById('errorNombre').innerHTML = texto;
//       return false;
//     } else {
//       document.getElementById('errorNombre').innerHTML = '';
//       return true;
//     }
//   };


const registrar = async () => {
    let _direccion = document.getElementById('direccion').value;
    let _latitud = parseFloat(document.getElementById('latitud').value);
    let _longitud = parseFloat(document.getElementById('longitud').value);
    let _descripcion = document.getElementById('descripcion').value;
  
    if(_direccion.length>0 && _descripcion.length>0){
    if ((_latitud >= 6.13 && _latitud <= 6.217) && (_longitud >= -75.567 && _longitud <= -75.34)) {
      let hurto = {
        direccion: _direccion,
        latitud: _latitud,
        longitud: _longitud,
        descripcion: _descripcion
      };
  
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(hurto), // Convertir el objeto "hurto" a un JSON
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
        .then((resp) => resp.json()) // Obtener la respuesta y convertirla a json
        .then(json => {
            alert(json.msg)//Mensaje que retorna la API
            location.reload()});

    }
    else {
      Swal.fire(
        'Latitud o longitud erróneas',
        '',
        'error'
      );
    }
  }};

  

if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click', registrar)
}


const editar = (hurto)=>{
    document.getElementById('_id').value = ''
    document.getElementById('direccion').value = ''
    document.getElementById('latitud').value = ''
    document.getElementById('longitud').value = ''
    document.getElementById('descripcion').value = ''

    document.getElementById('_id').value = hurto._id
    document.getElementById('direccion').value = hurto.direccion
    document.getElementById('latitud').value = hurto.latitud
    document.getElementById('longitud').value = hurto.longitud
    document.getElementById('descripcion').value = hurto.descripcion

}



const actualizar = async()=>{
    let _id = document.getElementById('_id').value
    let _direccion = document.getElementById('direccion').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value
    let _descripcion = document.getElementById('descripcion').value

    if(_direccion.length>0 && _descripcion.length>0){
    if((_latitud >= 6.13 && _latitud <= 6.217) && (_longitud >= -75.567 && _longitud <= -75.34)){
        let usuario = {
            id: _id,
            direccion:_direccion,
            latitud:_latitud,
            longitud:_longitud,
            descripcion:_descripcion
        }

        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(usuario),
            headers: { "Content-type": "application/json; charset=UTF-8" }
          })
            .then((resp) => resp.json())
            .then((json) => {
              alert(json.msg);
              location.reload();
            })
            .catch((error) => {
              console.error(error);
              alert('Se produjo un error en la solicitud');
            });
        }
            else{
                alert('Latitud o longitud erróneas')
            }
}}

if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
.addEventListener('click', actualizar)
}

const eliminar = (id) => {
    if(confirm('¿Está seguro de realizar la eliminación') == true){

        let hurto = {
            _id: id
            
        }

        fetch(url,  {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(hurto),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            alert(json.msg)//Mensaje que retorna la API
            location.reload();
        })
    }

}
    

