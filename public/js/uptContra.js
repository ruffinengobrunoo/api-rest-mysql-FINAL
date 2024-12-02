mostrarMensaje = (mensaje) => {
  document.querySelector('#mensajeLog').innerHTML = mensaje;
}

// cambiar contraseña
document.getElementById('editPassword').addEventListener('submit', async (event)=> {
  event.preventDefault();
  const editar = document.getElementById('editar');
  editar.classList.toggle('nuevo');

  const email = document.getElementById('email').value;
  const oldpassword = document.getElementById('oldpassword').value;
  const password = document.getElementById('password').value;

  if(!email || !oldpassword || !password){
    console.log('faltan datos')
    document.querySelector('#mensajeLog').innerHTML = '*Complete todos los datos'
    return
  }

    try {
      const enviarDatos = await fetch('/editar', {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          email,
          oldpassword,
          password
        })
      })
      // setTimeout(() => {
      //   location.reload();
      // }, 1000);
      console.log(enviarDatos);
    }catch (error) {
        console.log(error)
      }
});