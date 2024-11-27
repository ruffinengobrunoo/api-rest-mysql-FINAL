import{navbar} from './navbar.js';
import{footer} from './footer.js';

// version anterior
// document.querySelector('#divNav').innerHTML = navbar;

// const ingresar = document.querySelector('#ingresar');

// const usuario= document.querySelector('#user');

// usuario.style.display = 'none';

// ingresar.addEventListener('click', ()=>{
    
//     window.location.href= '../signin.html'
//     ingresar.style.display = "none";
//     // usuario.style.display = "block";

// });

// document.querySelector('#divFooter').innerHTML = footer;

// var salir = document.querySelector('#salir');

// salir.addEventListener('click', ()=>{

//     ingresar.style.display = "block";
//     usuario.style.display = "none";

// });

// version actual
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#divNav').innerHTML = navbar;
    document.querySelector('#divFooter').innerHTML = footer;

    const ingresar = document.querySelector('#ingresar');
    const user = document.querySelector('#user');
    let salir = document.querySelector('#salir');

    ingresar.addEventListener('click', function() {
        ingresar.style.display = "none";
        user.style.display = "block";
        window.location.href = './login.html';
    });

    salir.addEventListener('click', () => {
        ingresar.style.display = "block";
        user.style.display = "none";
        localStorage.removeItem('userLog');
        actualizarNavbar();
    });

    function actualizarNavbar() {
        const userLog = JSON.parse(localStorage.getItem('userLog'));
        console.log(userLog)

        if (userLog) {
            document.querySelector('#user .nav-link').innerText = `Bienvenido, ${userLog.nombre}`;
            ingresar.style.display = "none";
            user.style.display = "block";
            
        } else {
            ingresar.style.display = "block";
            user.style.display = "none";
        }
    }

    actualizarNavbar();
});