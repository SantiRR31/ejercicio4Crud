const ruta=require("express").Router();
const UsuarioClase=require("../clases/UsuarioClase");
const UsuariosBD=require("../bd/UsuariosBD");

ruta.get("/", async(req, res)=>{
    const usuariosbd = new UsuariosBD();
    const usuariosMySql = await usuariosbd.mostrarUsuarios();
    var usuariosCorrectos=[];
    usuariosMySql.forEach(usuario => {
        var usuario1=new UsuarioClase(usuario);
        if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
            usuariosCorrectos.push(usuario);
        }
    });
    //console.log(usuariosCorrectos);
    res.render("mostrarUsuarios", {usuariosCorrectos});
});


ruta.post("/agregarUsuario", (req, res)=>{
    var usuario1=new UsuarioClase(req.body);
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        const usuariosbd=new UsuariosBD();
        usuariosbd.nuevoUsuario(usuario1.mostrarDatos);
        //console.log(usuario1.mostrarDatos);
        res.render("inicio", usuario1.mostrarDatos);
    }
    else {
        res.render("error")
    }
    
});

ruta.get("/agregarUsuario", (req, res)=>{
    res.render("formulario");
});

ruta.get("/editarUsuario/:idusuario", async (req, res)=>{
    try {
        const usuariosbd= new UsuariosBD();
        const usuario=await usuariosbd.usuarioId(req.params.idusuario);
        //console.log(usuario);
        res.render("editarUsuario", usuario);
    } catch (error) {
        
    }
    res.end();
    
});

ruta.post("/editarUsuario", async(req, res)=>{
    try {
        const usuariosbd=new UsuariosBD();
        //console.log(req.body);
        await usuariosbd.editarUsuario(req.body);
        console.log("Usuario editado correctamente");
        res.redirect("/");
    } catch (error) {
        console.log("Error al editar el usuario");
    }
});

ruta.get("/borrarUsuario/:id", async(req,res)=>{
    try {
        const usuariosbd=new UsuariosBD();
        await usuariosbd.borrarUsuario(req.params.id);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
})



module.exports=ruta;