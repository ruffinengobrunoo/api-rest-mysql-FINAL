//modulos
const express = require('express');
const db = require('./db/conexion')
const fs = require('fs') //Permite trabajar con archivos (file system) incluida con node, no se instala
const cors = require('cors')
const dotenv = require('dotenv/config')
const session = require('express-session')

const app = express();
const port = 3000;
// const port = process.env.MYSQL_ADDON_PORT || 3000;


//Middleware
app.use(express.json())
app.use(express.static('./public')) //Ejecuta directamente el front al correr el servidor
app.use(cors())
app.use(session({
    secret: '4', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


// productos
app.get('/productos', (req, res) => {
    // res.send('Listado de productos')
    const sql = "SELECT * FROM productos";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('error de lectura')
            return;
        }
        console.log(result)
        res.json(result)
    })
})

app.post('/productos', (req, res) => {
    // console.log(req.body)
    // console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const sql = "INSERT INTO productos (titulo, descripcion, precio, imagen) VALUES (?, ?, ?, ?)";
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('error al agregar producto')
            return;
        }
        console.log(result)
        res.json({ mensaje: "nuevo producto agregado" })

    })
})

app.put('/productos', (req, res) => {
    // res.send('Actualizar producto')
    const valores = Object.values(req.body);
    console.log(valores)
    const sql = "UPDATE productos SET titulo=?, descripcion=?, precio=? WHERE id=?"
    db.query(sql, valores, (err, result) => {
        if (err) {
            console.error('error al modificar producto')
            return;
        }
        res.json({ mensaje: "producto actualizado", data: result})
        console.log(result)
    })
})

app.delete('/productos/:id', (req, res) => {
    // res.send('Eliminando Producto')
    const id = req.params.id;

    const sql = "DELETE FROM productos WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('error al borrar')
            return;
        }
        console.log(result)
        res.json({ mensaje: "producto borrado" })
    })
})


// usuario

app.post('/registro', (req, res) => {
    // console.log(req.body)
    // console.log(Object.values(req.body));
    const values = Object.values(req.body);
const sql = "INSERT INTO usuario (nombre, user, email, password) VALUES (?, ?, ?, ?)";
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('error al crear usuario')
            return;
        }
        console.log(result)
        res.json({ mensaje: "nuevo usuario registrado" })

    })
})

// ingreso
app.post('/usuario', (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).send('Faltan datos');
    }

    const sql = 'SELECT * FROM usuario WHERE user = ?';
    db.query(sql, [user], (err, results) => {
        if (err) {
            return res.status(500).send('Error al realizar la consulta');
        }

        if (results.length === 0) {
            return res.status(400).send('Usuario no encontrado');
        }

        const user = results[0];

        if (password === user.password) {
            req.session.id = user.id;  

            return res.status(200).json({
                mensaje: 'Login exitoso',
                id: user.id,
                nombre: user.nombre,
                user: user.user,
                password: user.password
            });
        } else {
            return res.status(400).send('Contraseña incorrecta');
        }
    });
});

app.post('/modificarContra', (req, res) => {
    
    const { contraseñaActual, nuevaContraseña } = req.body;

    console.log("Datos recibidos: ", req.body);  

    if (!contraseñaActual || !nuevaContraseña || !req.session.id) {
        console.log("Faltan datos: ", { contraseñaActual, nuevaContraseña, id: req.session.id});
        return res.status(400).json({ mensaje: 'Faltan datos: contraseña actual, nueva contraseña o id en sesión.' });
    }

    const usuarioId = req.session.id; 

    const query = 'SELECT password FROM usuario WHERE id = ?';
    db.query(query, [usuarioId], (err, results) => {
        if (err) {
            console.log("Error en la base de datos: ", err);
            return res.status(500).json({ mensaje: 'Error al consultar la base de datos.' });
        }

        if (results.length === 0) {
            console.log("Usuario no encontrado.");
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        if (contraseñaActual !== results[0].password) {
            console.log("Contraseña actual incorrecta.");
            return res.status(400).json({ mensaje: 'La contraseña actual es incorrecta.' });
        }

        const updateQuery = 'UPDATE usuario SET password = ? WHERE id = ?';
        db.query(updateQuery, [nuevaContraseña, usuarioId], (err, result) => {
            if (err) {
                console.log("Error al actualizar la contraseña: ", err);
                return res.status(500).json({ mensaje: 'Error al actualizar la contraseña.' });
            }

            console.log("Contraseña actualizada correctamente.");
            return res.status(200).json({ mensaje: 'Contraseña cambiada correctamente.' });
        });
    });
});

// app.post('/uptContra', (req, res) => {
    // const { password, newPassword } = req.body;

//     console.log("Datos recibidos: ", req.body);  

//     if (!password || !newPassword ) {
//         console.log("Complete los datos: ", { password, newPassword});
//         return res.status(400).json({ mensaje: 'Faltan datos' });
//     }

//     const usuarioId = req.session.user; 

//     const query = 'SELECT password FROM usuario WHERE user = ?';
//     db.query(query, [usuarioId], (err, results) => {
//         if (err) {
//             console.log("Error en la base de datos: ", err);
//             return res.status(500).json({ mensaje: 'Error al consultar la base de datos.' });
//         }

//         if (results.length === 0) {
//             console.log("Usuario no encontrado.");
//             return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
//         }

//         if (password !== results[0].password) {
//             console.log("Contraseña actual incorrecta.");
//             return res.status(400).json({ mensaje: 'La contraseña actual es incorrecta.' });
//         }

//         const updateQuery = 'UPDATE usuario SET password = ? WHERE user = ?';
//         db.query(updateQuery, [newPassword, usuarioId], (err, result) => {
//             if (err) {
//                 console.log("Error al actualizar la contraseña: ", err);
//                 return res.status(500).json({ mensaje: 'Error al actualizar la contraseña.' });
//             }
//             console.log(result)
//             console.log("Contraseña actualizada correctamente.");
//             return res.status(200).json({ mensaje: 'Contraseña cambiada correctamente.' });
//         });
//     });
// });

app.post('/eliminarCuenta', (req, res) => {
    const { contraseñaActual } = req.body;

    if (!contraseñaActual || !req.session.id_usuario) {
        console.log("Faltan datos: ", { contraseñaActual, id_usuario: req.session.id_usuario });
        return res.status(400).json({ mensaje: 'Faltan datos: contraseña actual o id_usuario en sesión.' });
    }

    const usuarioId = req.session.id_usuario;  
    
    const query = 'SELECT contraseña FROM usuarios WHERE id_usuario = ?';
    db.query(query, [usuarioId], (err, results) => {
        if (err) {
            console.log("Error en la base de datos: ", err);
            return res.status(500).json({ mensaje: 'Error al consultar la base de datos.' });
        }

        if (results.length === 0) {
            console.log("Usuario no encontrado.");
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        if (contraseñaActual !== results[0].contraseña) {
            console.log("Contraseña actual incorrecta.");
            return res.status(400).json({ mensaje: 'La contraseña actual es incorrecta.' });
        }

        const deleteQuery = 'DELETE FROM usuarios WHERE id_usuario = ?';
        db.query(deleteQuery, [usuarioId], (err, result) => {
            if (err) {
                console.log("Error al eliminar la cuenta: ", err);
                return res.status(500).json({ mensaje: 'Error al eliminar la cuenta.' });
            }

            req.session.destroy((err) => {
                if (err) {
                    console.log("Error al destruir la sesión: ", err);
                    return res.status(500).json({ mensaje: 'Error al destruir la sesión.' });
                }
                console.log("Cuenta eliminada correctamente.");
                return res.status(200).json({ mensaje: 'Cuenta eliminada correctamente.' });
            });
        });
    });
});


// app.put('/usuario', (req, res) => {
//     // res.send('Actualizar producto')
//     const {user}= req.body
//     // const valores = Object.values(req.body);
//     console.log(user)
//     const sql = "UPDATE usuario SET password=? WHERE user=?"
//     db.query(sql, user, (err, result) => {
//         if (err) {
//             console.error('error al modificar el perfil')
//             return;
//         }
//         if (user===user.user){
//             req.session.id= user.id
//             return res.status(200).json({
//                 mensaje: 'Login exitoso'
//             })
//         }else{
//             console.error('no se pudo')
//         }
//         res.json({ mensaje: "perfil actualizado", data: result})
//         console.log(result)
//     })
// })


// app.delete('/usuario/:user', (req, res) => {
//     // res.send('Eliminando Producto')
//     const id = req.params.id;

//     const sql = "DELETE FROM productos WHERE user = ?";
//     db.query(sql, [user], (err, result) => {
//         if (err) {
//             console.error('error al borrar')
//             return;
//         }
//         console.log(result)
//         res.json({ mensaje: "usuario eliminado" })
//     })
// })

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});