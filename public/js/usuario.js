const endpoint = '/usuario'

mostrarMensaje = (mensaje) => {
  document.querySelector('#divMensaje').innerHTML = mensaje;
}

// Event listener para el botón "Añadir Producto"
document.getElementById('registro').addEventListener('click', function () {
  const formulario = document.getElementById('registro');
  formulario.classList.toggle('new');
});

fetch(endpoint)
  .then(respuesta => respuesta.json())
  .then(datos => obtenerDatos(datos))

// mostrar los datos enviados al back desde el front
let usuario = ''
const contenedor = document.querySelector('#perfil')

const obtenerDatos = async () => {
  try {
    const respuesta = await fetch(endpoint)
    datosRecibidos = await respuesta.json()

  } catch (error) {
    mostrarMensaje('error al cargar el perfil')
  }
}

// agregar registro
const formulario = document.forms['registro']
console.log(formulario)
formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  let nombre = formulario.nombre.value
  let user = formulario.user.value
  let email = formulario.email.value
  let password = formulario.password.value + ".jpeg";
  // console.log(titulo,descripcion,precio);

  // Objetos con los datos obtenidos en el formulario
  let newDatos = { nombre: nombre, user: user, email: email, password: password }


  if (!newDatos.nombre || !newDatos.user || !newDatos.email || !newDatos.password) {
    document.querySelector('#mensaje').innerHTML = '*Complete todos los datos'
    return
  }
  document.querySelector('#mensaje').innerHTML = ''

  let nuevosDatosJson = JSON.stringify(newDatos)
  console.log(nuevosDatosJson)
  const enviarNewProducto = async () => { //enviar datos al back
    try {
      const enviarDatos = await fetch(endpoint, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: nuevosDatosJson
      })

      //obtengo la respuesta del back
      const respuesta = await enviarDatos.json()
      console.log(respuesta)
      let mensaje = document.querySelector('#divMensaje');
      mensaje.className += 'bg-warning';
      mensaje.innerHTML = respuesta.mensaje;

      //limpiar formulario y ocultarlo
      // document.querySelector('#formAñadir').reset();
    //   document.querySelector('#formAñadir').style.display = 'none';

      mostrarMensaje(respuesta.mensaje)

      //refrescar la pagina
      setTimeout(() => {
        location.reload();
      }, 1000);

    }
    catch (error) {
      console.log(error)
    }
  }
  enviarNewProducto()
  if (user.id=== 1){
        window.location.href= '../admin.html'
    }

})
