fetch('/usuario')
    .then(respuesta => respuesta.json())
    .then(datos=> console.log(datos))
    .then(datos => mostrarProductos(datos))

const mostrarProductos = (datos) => {
    let perfil = ''
    const contenedor = document.querySelector('#perfil')
    datos.forEach(datos => {
        perfil += 
        `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="./fotos/pfp.jpg" class="img-fluid rounded" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">¿Bienvenido, ${datos.nombre}!</h5>
        <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium consectetur, hic maiores obcaecati facilis quia.</p>
        button type="button" class="btn btn-danger" onClick="eliminar(${datos.id})>Borrar la cuenta</button>
        <button type="button" class="btn btn-warning" onClick="Editar(${datos.id})>Cambiar la contraseña</button>
      </div>
    </div>
  </div>
</div>

        `
    })
    contenedor.innerHTML = perfil
}
