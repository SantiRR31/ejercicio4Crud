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

const ProductoClase=require("../clases/ProductoClase");
const ProductosBD=require("../bd/ProductosBD");

ruta.get("/productos", async(req, res)=>{
    const productosbd = new ProductosBD();
    const productosMySql = await productosbd.mostrarProductos();
    var productosCorrectos=[];
    productosMySql.forEach(producto => {
        var producto1=new ProductoClase(producto);
        if(producto1.nombre!=undefined && producto1.descripcion!=undefined && producto1.precio!=undefined){
            productosCorrectos.push(producto);
        }
    });
    //console.log(usuariosCorrectos);
    res.render("mostrarProductos", {productosCorrectos});
});


ruta.post("/agregarProducto", (req, res)=>{
    var producto1=new ProductoClase(req.body);
    if(producto1.nombre!=undefined && producto1.descripcion!=undefined && producto1.precio!=undefined){
        const productosbd=new ProductosBD();
        productosbd.nuevoProducto(producto1.mostrarDatos);
        //console.log(usuario1.mostrarDatos);
        res.render("inicioProductos", producto1.mostrarDatos);
    }
    else {
        res.render("error")
    }
    
});

ruta.get("/agregarProducto", (req, res)=>{
    res.render("formularioProductos");
});

ruta.get("/editarProducto/:idproducto", async (req, res)=>{
    try {
        const productosbd= new ProductosBD();
        const producto=await productosbd.productoId(req.params.idproducto);
        // console.log(usuario);
        res.render("editarProducto", producto);
    } catch (error) {
        
    }
        res.end();   
});

ruta.post("/editarProducto", async(req, res)=>{
    try {
        const productosbd=new ProductosBD();
        await productosbd.editarProducto(req.body);
        console.log("Producto editado correctamente");
        res.redirect("/productos");
    } catch (error) {
        console.log("Error al editar el producto");
    }
});

ruta.get("/borrarProducto/:id", async(req,res)=>{
    try {
        const productosbd=new ProductosBD();
        await productosbd.borrarProducto(req.params.id);
        res.redirect("/productos");
    } catch (error) {
        console.log(error);
    }
});

module.exports=ruta;