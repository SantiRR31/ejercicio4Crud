require('dotenv').config();
class ConectarBD{
    constructor(){
        this.conexion=null;
        this.mysql=require("mysql2/promise");
    }

    async conectarMySql(){
        try {
            this.conexion=await this.mysql.createConnection({
                host:process.env.HOSTMYSQL || "bhwjgf7w2bp03fve28ss-mysql.services.clever-cloud.com",
                user:process.env.USERMYSQL || "u0bwwgactxqri8i6",
                password:process.env.PASSWORDMYSQL || "2NPHty3E8Kd6o4851rie",
                database:process.env.DATABASEMYSQL || "bhwjgf7w2bp03fve28ss",
                port:process.env.PORTMYSQL || 3306
            });
            console.log("Conectado a MySql");
        } catch (error) {
            console.error("Error al conectar con MySql "+error);
        }
    }

    async cerrarConexion(){
        try {
            await this.conexion.end();
            console.log("Conexion de MySQL cerrada");
        } catch (error) {
            console.error("Error al desconectar de MySQL "+error);
        }
    }
}

module.exports=ConectarBD;

