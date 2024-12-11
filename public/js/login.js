const endpoint = '/usuario'

mostrarMensaje = (mensaje) => {
  document.querySelector('#mensaje').className += " bg-warning";
  document.querySelector('#mensaje').innerHTML = mensaje;
}

document.getElementById('login').addEventListener('submit', async (event)=> {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email,
          password 
        }),
    });

    const data = await response.json();
    

    if (response.ok) {
        if(data.id==1){
          window.location.href = '/admin.html';
        } else {
            window.location.href = '/index.html';
        }
        
    } else {
        alert(data.message); // Muestra el mensaje de error
    }
} catch (error) {
    // console.error('Error al realizar la solicitud:', error);
    mostrarMensaje('Error al ingresar')
    setTimeout(() => {
      location.reload();
    }, 1000);
}
});