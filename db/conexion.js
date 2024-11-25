const mysql = require('mysql2');

// const conexion = mysql.createConnection({
//     host: process.env.MYSQL_ADDON_HOST || "localhost",
//     user: process.env.MYSQL_ADDON_USER || "root",
//     password: process.env.MYSQL_ADDON_PASSWORD || "",
//     database: process.env.MYSQL_ADDON_DB || "tienda",
//     connectionLimit: 5
// });

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tienda",
    connectionLimit: 5
});

conexion.connect((err)=>{
    if(err){
        console.error("error de conexion");
        return;
    }
    console.log("conectado correctamente");
});

module.exports = conexion;