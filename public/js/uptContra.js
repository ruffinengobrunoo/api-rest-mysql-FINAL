// document.getElementById('formCambioContraseña').addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const contraseñaActual = document.getElementById('contraseñaActual').value;
//     const nuevaContraseña = document.getElementById('nuevaContraseña').value;
//     const confirmarContraseña = document.getElementById('confirmarContraseña').value;

//     if (nuevaContraseña !== confirmarContraseña) {
//         document.getElementById('mensaje').innerHTML = '<div class="alert alert-danger">Las contraseñas no coinciden.</div>';
//         return;
//     }

//     console.log('Contraseña actual:', contraseñaActual);
//     console.log('Nueva contraseña:', nuevaContraseña);

//     try {
//         const response = await fetch('/modificarContra', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 contraseñaActual,
//                 nuevaContraseña
//             })
//         });

//         if (!response.ok) {
//             throw new Error('Error al cambiar la contraseña.');
//         }

//         const result = await response.json();
//         console.log("Respuesta del servidor: ", result);
//         document.getElementById('mensaje').innerHTML = `<div class="alert alert-success">${result.mensaje}</div>`;
//     } catch (error) {
//         console.log("Error en la solicitud: ", error);
//         document.getElementById('mensaje').innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
//     }
// });


// cambiar contraseña
const editar = document.forms['editPassword']
console.log(editar)
editar.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // let usuario = editar.usuario.value
  let password = editar.password.value
  let oldpassword = editar.oldpassword.value

  // Objetos con los datos obtenidos en el formulario
  let newData = { password, oldpassword }
console.log(newData)
  if (!newData.oldpassword || !newData.password ) {
    document.querySelector('#mensajeLog').innerHTML = '*Complete todos los datos'
    return
  }
  document.querySelector('#mensajeLog').innerHTML = ''

  // let nuevosDatosJson = JSON.stringify(newData)
  // console.log(nuevosDatosJson)
  const nuevaContraseña = async () => { //enviar datos al back
    try {
      const enviarDatos = await fetch('/editar', {
        method: 'put',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          password
        })
      })
      console.log(enviarDatos);

      //obtengo la respuesta del back
      const respuesta = await enviarDatos.json()
      console.log(respuesta)
      let mensaje = document.querySelector('#divMensaje');
      mensaje.className += 'bg-warning';
      mensaje.innerHTML = respuesta.mensaje;

      mostrarMensaje(respuesta.mensaje)

      //refrescar la pagina
      // setTimeout(() => {
      //   location.reload();
      // }, 1000);
    
      // window.location.href='../index.html';
  }catch (error) {
        console.log(error)
      }
  }
    nuevaContraseña()
  })

