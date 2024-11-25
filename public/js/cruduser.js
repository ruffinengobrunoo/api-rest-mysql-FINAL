const endpoint = '/usuario'

fetch(endpoint)
  .then(respuesta => respuesta.json())
  .then(datos => obtenerDatos(datos))

  
const obtenerDatos = async () => {
    try {
      const respuesta = await fetch(endpoint)
      datosRecibidos = await respuesta.json()
  
    } catch (error) {
      mostrarMensaje('error al cargar el perfil')
    }
}


const login = document.forms['login'];
login.addEventListener ('submit', async (event) => {
    event.preventDefault();
  
    const user = login.user.value;
    const password = login.password.value;
  
    if (!user || !password) {
      document.querySelector('#mensaje').innerHTML = '*Complete todos los datos';
      return;
    }

const usuario = await response.json();
console.log('Datos del usuario:', usuario);

loginUsuario(usuario);  
    if (usuario.id==1) {
        window.location.href = '/admin.html'; 
    } 
    else{
        window.location.href = '/index.html';  
    }

})
// function ingreso(usuario) {
//   localStorage.setItem('registro', JSON.stringify(usuario)); 
//   mostrarNavbar();
// }

// function logOut() {
//   localStorage.removeItem('registro'); 
//   mostrarNavbar();
// }

// function mostrarNavbar() {
//   const registro = JSON.parse(localStorage.getItem('registro'));
  
//   if (registro) {
//       document.getElementById('salir').style.display = 'block';
//       document.getElementById('ingresar').style.display = 'none';
//       document.getElementById('user').querySelector('.nav-link').innerText = `Hola, ${usuarioLogueado.nombre}`; 
//   } else {
//       document.getElementById('salir').style.display = 'none';
//       document.getElementById('ingresar').style.display = 'block';
//   }
// }

// mostrarNavbar();


// eliminar producto por atrevido gato..
// const eliminar = (id) => {
//     // console.log(id + " sos capo")
//     if (confirm('¿Realmente desea eliminar su cuenta?')) {
//       const eliminarProd = async () => {
//         try {
//           const res = await fetch(endpoint + '/' + id, { // endpoint con param
//             method: 'delete'
//           })
//           //obtengo respuesta
//           const respuesta = await res.json()
//           console.log(respuesta)
//           mostrarMensaje(respuesta.mensaje)
//         } catch (error) {
//           mostrarMensaje('error al borrar')
//         }
//         setTimeout(()=>{location.reload();}, 1000)
//       }
//       eliminarProd();
//     }
//   }
  
//   const formEditar = document.forms['formEditar']
  
//   // editar los productos
//   const editar = (id) => {
  
//     console.log(id)
  
//     let prodEditar = {}
  
//     productosRecibidos.filter(prod => { //recorro los datos del json para ubicar el prod al editar
//       if (prod.id == id) {
//         prodEditar = prod
//       }
//     })
  
//     formEditar.idEditar.value = prodEditar.id;
//     formEditar.titulo.value = prodEditar.titulo;
//     formEditar.descripcion.value = prodEditar.descripcion;
//     formEditar.precio.value = prodEditar.precio;
//   }
  
//   formEditar.addEventListener('submit', (event) => {
  
//     event.preventDefault();
  
//     const nuevosDatos = {
//       titulo: formEditar.titulo.value,
//       descripcion: formEditar.descripcion.value,
//       precio: formEditar.precio.value,
//       id: formEditar.idEditar.value
//     }
  
//     if (!nuevosDatos.titulo || !nuevosDatos.descripcion || !nuevosDatos.precio) {
//       document.querySelector('#mensajeEditar').innerHTML = '*Complete todos los datos'
//       return
//     }
//     document.querySelector('#mensaje').innerHTML = ''
  
  
//     let nuevosDatosJson = JSON.stringify(nuevosDatos)
//     // console.log(nuevosDatosJson)
//     const enviarNewDatos = async()=>{
//       try{
//         const enviarDatos = await fetch(endpoint, {
//           method: 'put',
//           headers: {
//             'content-type': 'application/json'
//           },
//           body: nuevosDatosJson
//         })
//         const respuesta= await enviarDatos.json()
//         console.log(respuesta)
//         mostrarMensaje(respuesta.mensaje)
//       }catch(error){
//         mostrarMensaje('error al verificar datos')
//       }
//       setTimeout(()=>{location.reload();}, 1000)
//     }
//     enviarNewDatos()
//   })
  