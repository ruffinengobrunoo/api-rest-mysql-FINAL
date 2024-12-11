import{navbar} from './navbar.js';
import{footer} from './footer.js';

// version anterior
document.querySelector('#divNav').innerHTML = navbar;

// const ingresar = document.querySelector('#ingresar');

// const usuario= document.querySelector('#user');

// usuario.style.display = 'none';

// ingresar.addEventListener('click', ()=>{
    
//     window.location.href= '../signin.html'
//     ingresar.style.display = "none";
//     // usuario.style.display = "block";

// });

document.querySelector('#divFooter').innerHTML = footer;

// var salir = document.querySelector('#salir');

// salir.addEventListener('click', ()=>{

//     ingresar.style.display = "block";
//     usuario.style.display = "none";

// });

// version actual
// document.addEventListener('DOMContentLoaded', function() {
//     document.querySelector('#divNav').innerHTML = navbar;
//     document.querySelector('#divFooter').innerHTML = footer;

//     const ingresar = document.querySelector('#ingresar');
//     const user = document.querySelector('#user');
//     let salir = document.querySelector('#salir');

//     ingresar.addEventListener('click', function() {
//         ingresar.style.display = "none";
//         user.style.display = "block";
//         window.location.href = './login.html';
//     });

//     salir.addEventListener('click', () => {
//         ingresar.style.display = "block";
//         user.style.display = "none";
//         localStorage.removeItem('userLog');
//         actualizarNavbar();
//     });


//     function actualizarNavbar() {
//         const userLog = JSON.parse(localStorage.getItem('userLog'));
//         console.log(userLog)

//         if (userLog) {
//             document.querySelector('#user .nav-link').innerText = `Bienvenido  ${userLog.email}`;
//             ingresar.style.display = "none";
//             user.style.display = "block";
            
//         } else {
//             ingresar.style.display = "block";
//             user.style.display = "none";
//         }
//     }

//     actualizarNavbar();
// });

// prueba 

let ingresar = document.querySelector('#ingresar')
ingresar.addEventListener('click', () => {
    let user = document.querySelector('#user')
    ingresar.style.display = 'none';
    user.style.display = "block";
})
document.getElementById('ingresar').addEventListener('click', function () {
    window.location.href = './login.html';
    ingresar.style.display= 'none';
});
let salir = document.querySelector('#salir')
salir.addEventListener('click', () => {
    let user = document.querySelector('#user')
    ingresar.style.display = 'block';
    user.style.display = "none";
    // window.location.href= './index.html'
})
if(user.style.display='block'){
    ingresar.style.display= 'none';
    salir.style.display='block'
}
const urlActual = window.location.href;

 if (urlActual.includes('signin.html') || urlActual.includes('login.html')) { 
    user.style.display='none'
    }