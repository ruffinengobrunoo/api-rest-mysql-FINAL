//modulos
const express = require('express');
const db = require('./db/conexion')
const fs = require('fs') //Permite trabajar con archivos (file system) incluida con node, no se instala
const cors = require('cors')
const dotenv = require('dotenv/config')
const session = require('express-session');
const { error } = require('console');

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
    req.session.save;
    req.accepts
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
        if (req.query.id === 1){
            req.session.admin= true;
        }
        const user = results[0];

        if (password === user.password) {
            req.session.id = user.id;  
            req.session.save((err) => {
                if(err){
                    console.error('error')
                }
            return res.status(200).json({
                mensaje: 'Login exitoso',
                id: user.id,
                nombre: user.nombre,
                user: user.user,
                password: user.password
            });
        })
        }else {
        return res.status(400).send('Contraseña incorrecta');
        }
    
    });
});

// cambiar contraseña  
app.put('/editar', (req, res)=>{
    const sql = 'select password from usuario where id = ?'
    const {oldpassword, password} = req.body;
    
    console.log(id)
    console.log(password)
    // console.log(usuario)

    db.query(sql, [password], (err, result)=>{
        if (err){
            return console.error('error de lectura');
        }
        if(oldpassword !== req.session.password){
            console.log(password)
            return console.error('contraseña incorrecta')
        }
        console.log(result)
        
    //     // res.send('contraseña actualizada con exito')
    //     const query = 'UPDATE `usuario` SET `password` = ? WHERE `user` = ?'
    //     db.query(query, [user, password], (err, result)=>{
    //         if(err){
    //             console.error('error al cambiar la contraseña')
    //         }
    //         console.log('contraseña cambiada')
    //         console.log(result)
    //     })
    })
})

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});

