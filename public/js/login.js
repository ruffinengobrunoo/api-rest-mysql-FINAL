const endpoint = '/usuario'

mostrarMensaje = (mensaje) => {
  console.log(mensaje)
  console.log(document.querySelector('#divMensaje'))
  document.querySelector('#divMensaje').className += " bg-warning";
  document.querySelector('#divMensaje').innerHTML = mensaje
}

// obtiene los datos de la base de datos
const obtenerDatos = async () => {
  try {
    const respuesta = await fetch(endpoint)
    datosRecibidos = await respuesta.json()

  } catch (error) {
    mostrarMensaje('error al cargar el perfil')
  }
}

// verifica que los datos dados en el formulario sean iguales a los que estan en la base de datos
const login = document.forms['login'];
console.log(login)
login.addEventListener('submit', (event) => {
  event.preventDefault();

  const user = login.user.value;
  const password = login.password.value;

  if (!user || !password) { // verifica que no falten datos
    document.querySelector('#mensajeLog').innerHTML = '*Complete todos los datos';
    return;
  }

  const datosLogin = { user, password };

  const ingreso = async () => {
    try {
      const response = await fetch('/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(datosLogin),
      });


      if (!response.ok) { //alerta al usuario que hubo un error suyo
        document.querySelector('#mensajeLog').innerHTML = 'Usuario o contraseña incorrectas';
        console.log('error al verificar usuario')
      }

      const data = await response.json();
      console.log('Datos del usuario:', data);

      userData(data);
      if (data.id !== 1) {
        window.location.href = '../index.html';
      }
      else {
        window.location.href = '../admin.html';

      }
    } catch (error) { //avisa al usuario que hay un error de servidor
      console.error('Error de login');
      document.querySelector('#mensajeLog').innerHTML = 'Error al intentar iniciar sesión';
    }
  };

  ingreso();
});

// 
function userData(user) {
  localStorage.setItem('userLog', JSON.stringify(user));
  mostrarNavbar();
}

function logOut() {
  localStorage.removeItem('userLog');
  mostrarNavbar();
}

function mostrarNavbar() {
  const userLog = JSON.parse(localStorage.getItem('userLog'));
  console.log(userLog)

  if (userLog) {
    console.log(userLog.user)
    document.getElementById('user').style.display = 'block';
    document.getElementById('ingresar').style.display = 'none';
    document.getElementById('user').querySelector('.nav-link').innerText = `Hola, ${userLog.nombre}`;
  } else {
    document.getElementById('salir').style.display = 'none';
    document.getElementById('ingresar').style.display = 'block';
  }
}

// borrar cuenta

const eliminar = (id) => {
  // console.log(id + " sos capo")
  if (confirm('posta queres eliminar?')) {
    const eliminarProd = async () => {
      try {
        const res = await fetch(endpoint + '/' + id, { // endpoint con param
          method: 'delete'
        })
        //obtengo respuesta
        const respuesta = await res.json()
        console.log(respuesta)
        mostrarMensaje(respuesta.mensaje)
      } catch (error) {
        mostrarMensaje('error al borrar')
      }
      setTimeout(()=>{location.reload();}, 1000)
    }
    eliminarProd();
  }
}

//  cambiar contraseña
const formEditar = document.forms['editar']



console.log(formEditar)
formEditar.addEventListener('submit', (event) => {
  event.preventDefault();

  const user = formEditar.user.value;
  const password = formEditar.password.value;

  if (!user || !password) { // verifica que no falten datos
    document.querySelector('#mensajeLog').innerHTML = '*Complete todos los datos';
    return;
  }
  
  const datosEdit = {user, newPassword}

  const editar = async () =>{
    try{
      const respone = await fetch('/usuario', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosEdit)
        })
        if(!response.ok){
          document.querySelector('#mensajeLog').innerHTML = 'Usuario no encontrado';
        console.log('error al verificar usuario')
        }
        const data = await response.json();
      console.log('Datos del usuario:', data);

      }catch(err){
    }

    }
  

})



formEditar.addEventListener('submit', (event) => {

  event.preventDefault();

  const nuevosDatos = {
    titulo: formEditar.titulo.value,
    descripcion: formEditar.descripcion.value,
    precio: formEditar.precio.value,
    id: formEditar.idEditar.value
  }

  if (!nuevosDatos.titulo || !nuevosDatos.descripcion || !nuevosDatos.precio) {
    document.querySelector('#mensajeEditar').innerHTML = '*Complete todos los datos'
    return
  }
  document.querySelector('#mensaje').innerHTML = ''


  let nuevosDatosJson = JSON.stringify(nuevosDatos)
  // console.log(nuevosDatosJson)
  const enviarNewDatos = async()=>{
    try{
      const enviarDatos = await fetch(endpoint, {
        method: 'put',
        headers: {
          'content-type': 'application/json'
        },
        body: nuevosDatosJson
      })
      const respuesta= await enviarDatos.json()
      console.log(respuesta)
      mostrarMensaje(respuesta.mensaje)
    }catch(error){
      mostrarMensaje('error al verificar datos')
    }
    setTimeout(()=>{location.reload();}, 1000)
  }
  enviarNewDatos()
})
