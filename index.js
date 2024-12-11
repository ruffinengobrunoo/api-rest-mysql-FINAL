//modulos
const express = require('express');
const db = require('./db/conexion')
const fs = require('fs') //Permite trabajar con archivos (file system) incluida con node, no se instala
const cors = require('cors')
const dotenv = require('dotenv/config')
const app = express();
// const port = 3000;
// const session = require('express-session')
// const response = require('express')
const port = process.env.MYSQL_ADDON_PORT || 3000;


//Middleware
app.use(express.json())
app.use(express.static('./public')) //Ejecuta directamente el front al correr el servidor
app.use(cors())
// app.use(session({
//     secret: '5',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }));

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
    const sql = "UPDATE productos SET titulo=?, descripcion=?, precio=?, imagen=? WHERE id=?"
    db.query(sql, valores, (err, result) => {
        if (err) {
            console.error('error al modificar prod')
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
            res.json({ mensaje: "usuario no encontradp" })
            return;
        }
        console.log(result)
        res.json({ mensaje: "nuevo usuario registrado" })
    })
})

// ingreso
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)

    if (!email || !password) {
        return res.status(400).send('Faltan datos');
    }
    const sql = 'SELECT id FROM usuario WHERE email = ? and password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(500).send('Error al realizar la consulta');
        }
        if (results.length === 0) {
            return res.status(400).send('Usuario no encontrado');
        }
        if (results.length > 0) {
            const user = results[0]
            // req.session.id = user.id;
            // req.session.save((err) => {
            //     if (err) {
            //         return res.status(500).json({ mensaje: 'Error al guardar la sesión' });
            //     }
            // });
            return res.json({
                message: 'Inicio de sesión exitoso.',
                redirectTo: user.id === 1 ? '/admin.html' : '/index.html',
                // id: user.id,
                // nombre: user.nombre
            });

        }
    });
});

// cambiar contraseña  
app.post('/editar', (req, res) => {
    const { email, password, oldpassword } = req.body;
    // console.log(email)
    // console.log(oldpassword)
    // console.log(password)
    const sql = 'select password from usuario where email and password = ?'
    db.query(sql, [email, oldpassword], (err, result) => {
        if (err) {
            console.error('error al buscar el usuario')
            res.json({ mensaje: "email o contraseña incorrectos" })
        }
        if (result.length === 0) {
            console.error('usuario no encontrado')
            res.json({ mensaje: "usuario no encontrado" })
        }
        console.log(result)
        console.log('usuario encontrado con éxito')
        const newQuery = 'update usuario set password=? where email=?'
        db.query(newQuery, [password, email], (err, result) => {
            if (err) {
                console.error('error al cambiar contraseña')
                res.json({ mensaje: "error al cambiar la contraseña" })
            }
            console.log(result)
            console.log('contraseña actualizada con exito')
        })
    })
})

app.post('/eliminar', (req, res) => {
    const { email, password } = req.body
    console.log(email)
    console.log(password)
    const sql = 'DELETE FROM usuario WHERE email= ? and password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('error al buscar el usuario')
        }
        if (results.affectedRows === 0) {
            console.error('usuario no encontrado')
        }
        console.log('cuenta borrada con éxito')
        res.send('cuenta eliminada')
    })
})

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});

