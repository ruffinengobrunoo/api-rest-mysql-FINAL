const endpoint = '/usuario'

mostrarMensaje = (mensaje) => {
  console.log(mensaje)
  document.querySelector('#divMensaje').innerHTML = mensaje
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
        // Redirige a la URL proporcionada por el servidor
        window.location.href = data.redirectTo;
    } else {
        alert(data.message); // Muestra el mensaje de error
    }
} catch (error) {
    console.error('Error al realizar la solicitud:', error);
}
});

function loginUsuario(email) {
  localStorage.setItem('usuarioLogueado', JSON.stringify(email));
  mostrarNavbar();
}

function logOut() {
  localStorage.removeItem('usuarioLogueado');
  mostrarNavbar();
}

function mostrarNavbar() {
  const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

  if (usuarioLogueado) {
      document.getElementById('salir').style.display = 'block';
      document.getElementById('ingresar').style.display = 'none';
      document.getElementById('user').querySelector('.nav-link').innerText = `Bienvenido`;
  } else {
      document.getElementById('salir').style.display = 'none';
      document.getElementById('ingresar').style.display = 'block';
  }
}