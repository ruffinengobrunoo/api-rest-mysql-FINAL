mostrarMensaje = (mensaje) => {
    document.querySelector('#mensajeLog').innerHTML = mensaje;
  }
  
  // cambiar contraseña
  document.getElementById('eliminar').addEventListener('submit', async (event)=> {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    // const oldpassword = document.getElementById('oldpassword').value;
    const password = document.getElementById('password').value;
  
    if(!email || !password){
      console.log('faltan datos')
      document.querySelector('#mensajeLog').innerHTML = '*Complete todos los datos'
      return
    }
  
      try {
        const enviarDatos = await fetch('/eliminar', {
          method: 'post',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            email,
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