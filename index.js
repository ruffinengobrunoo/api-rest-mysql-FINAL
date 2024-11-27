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



app.put('/usuario', (req, res) => {
    // res.send('Actualizar producto')
    const {user}= req.body
    // const valores = Object.values(req.body);
    console.log(user)
    const sql = "UPDATE usuario SET password=? WHERE user=?"
    db.query(sql, user, (err, result) => {
        if (err) {
            console.error('error al modificar el perfil')
            return;
        }
        if (user===user.user){
            req.session.id= user.id
            return res.status(200).json({
                mensaje: 'Login exitoso'
            })
        }else{
            console.error('no se pudo')
        }
        res.json({ mensaje: "perfil actualizado", data: result})
        console.log(result)
    })
})


app.delete('/usuario/:user', (req, res) => {
    // res.send('Eliminando Producto')
    const id = req.params.id;

    const sql = "DELETE FROM productos WHERE user = ?";
    db.query(sql, [user], (err, result) => {
        if (err) {
            console.error('error al borrar')
            return;
        }
        console.log(result)
        res.json({ mensaje: "usuario eliminado" })
    })
})

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});