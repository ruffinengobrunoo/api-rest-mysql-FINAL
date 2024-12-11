mostrarMensaje = (mensaje) => {
  document.querySelector('#mensaje').className += " bg-warning";
  document.querySelector('#mensaje').innerHTML = mensaje;
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

        const respuesta= await enviarDatos.text()
        if(respuesta === 'cuenta eliminada'){
        mostrarMensaje('Cuenta eliminada con éxito')
        window.location.href = './index.html';
        console.log(enviarDatos);
        }

      }catch (error) {
          console.log(error)
          mostrarMensaje('Error al eliminar perfil')
          setTimeout(() => {
            location.reload();
          }, 1500);
        }
  });