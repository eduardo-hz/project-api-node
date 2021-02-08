import Usuario from '../models';
import bcrypt from 'bcrypt';

export default {
    registrar: async(req, res) => {
        try {
            if (!req.body.rol) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Rol es un dato obligatorio"
                });
            }
            if (!req.body.nombre) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Nombre es un dato obligatorio"
                });
            }
            if (!req.body.appaterno) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Apellido Paterno es un dato obligatorio"
                });
            }
            if (!req.body.apmaterno) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Apellido Materno es un dato obligatorio"
                });
            }
            if (!req.body.curp) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "La CURP es un dato obligatorio"
                });
            }
            if (!req.body.telefono) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Número Telefónico es un dato obligatorio"
                });
            }
            if (!req.body.correo) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El correo es un dato obligatorio"
                });
            }
            if (!req.body.contrasenia) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "La Contraseña es obligatoria"
                });
            }
            
            req.body.contrasenia = await bcrypt.hash(req.body.contrasenia, 10);
            const usuario = await Usuario.create(req.body);
            
            return res.status(200).json({
                ok: true,
                mensaje: "El usuario fue registrado correctamente",
                usuario: {
                    _id: usuario._id,
                    nombre: usuario.nombre,
                    appaterno: usuario.appaterno,
                    apmaterno: usuario.apmaterno,
                    curp: usuario.curp,
                    genero: usuario.genero,
                    telefono: usuario.telefono,
                    correo: usuario.correo
                }
            });
        } catch (e) {
            return res.status(500).json({
                ok: false,
                mensaje: e
            });
        }
    },
    mostrar: async(req, res) => {
        try {
            if(!req.query._id) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Id es obligatorio para esta solicitud."
                });
            }
            const usuario = await Usuario.find({_id: req.query._id});
            if(!usuario) {
                return res.status(404).json({
                    ok: false,
                    mensaje: "El Usuario no existe."
                });
            }
            return res.status(200).json({
                ok: true,
                mensaje: "Solicitud procesada correctamente",
                usuario: {
                    _id: usuario._id,
                    alias: usuario.alias,
                    nombre: usuario.nombre,
                    appaterno: usuario.appaterno,
                    apmaterno: usuario.apmaterno,
                    curp: usuario.curp,
                    genero: usuario.genero,
                    telefono: usuario.telefono,
                    correo: usuario.correo,
                    rol: usuario.rol,
                    imagen: usuario.imagen
                }
            });
        } catch (e) {
            return res.status(500).json({
                ok: false,
                mensaje: e
            });
        }
    },
    listar: async(req, res) => {
        try {
            let busqueda = req.query.busqueda;
            const registros = await Usuario.find({
                $or: [
                    {'alias': new RegExp(busqueda, 'i')}, 
                    {'nombre': new RegExp(busqueda, 'i')}, 
                    {'appaterno': new RegExp(busqueda, 'i')},
                    {'apmaterno': new RegExp(busqueda, 'i')}, 
                    {'curp': new RegExp(busqueda, 'i')},  
                    {'correo': new RegExp(busqueda, 'i')}, 
                    {'telefono': new RegExp(busqueda, 'i')}
                ]}, 
                {
                    contrasenia: 0,
                    estado: 0,
                    fechaCreacion: 0,
                    idUsuarioCreacion: 0,
                    fechaModificacion: 0,
                    idUsuarioModificacion: 0
                }).sort({'appaterno': 1});
                return res.status(200).json({
                    ok: true,
                    mensaje: "Solicitud procesada correctamente",
                    items: registros
                });
        } catch (e) {
            return res.status(500).json({
                ok: false,
                mensaje: e
            });
        }
    },
    modificar: async(req, res) => {
        try {
            if (!req.body.rol) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Rol es un dato obligatorio"
                });
            }
            if (!req.body.nombre) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Nombre es un dato obligatorio"
                });
            }
            if (!req.body.appaterno) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Apellido Paterno es un dato obligatorio"
                });
            }
            if (!req.body.apmaterno) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Apellido Materno es un dato obligatorio"
                });
            }
            if (!req.body.curp) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "La CURP es un dato obligatorio"
                });
            }
            if (!req.body.telefono) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Número Telefónico es un dato obligatorio"
                });
            }
            if (!req.body.correo) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El correo es un dato obligatorio"
                });
            }
            if (!req.body.contrasenia) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "La Contraseña es obligatoria"
                });
            }
            const oldUsr = await Usuario.findOne({_id: req.body._id});

            if (req.body.contrasenia != oldUsr.contrasenia) {
                req.body.contrasenia = bcrypt.hash(req.body.contrasenia, 10);
            }

            const usuario = await Usuario.findByIdAndUpdate(
                {_id: req.body._id}, 
                {
                    rol: req.body.rol,
                    alias: req.body.alias,
                    nombre: req.body.nombre,
                    appaterno: req.body.appaterno,
                    apmaterno: req.body.apmaterno,
                    curp: req.body.curp,
                    genero: req.body.genero,
                    telefono: req.body.telefono,
                    correo: req.body.correo,
                    contrasenia: req.body.contrasenia,
                    imagen: req.body.imagen,
                    fechaModificacion: Date.now,
                    idUsuarioModificacion: "Id de usuario"
                });
            
            return res.status(200).json({
                ok: true,
                mensaje: "Solicitud procesada correctamente",
                usuario: {
                    _id: usuario._id,
                    alias: usuario.alias,
                    nombre: usuario.nombre,
                    appaterno: usuario.appaterno,
                    apmaterno: usuario.apmaterno,
                    curp: usuario.curp,
                    genero: usuario.genero,
                    telefono: usuario.telefono,
                    correo: usuario.correo,
                    rol: usuario.rol,
                    imagen: usuario.imagen
                }
            });
            
        } catch (e) {
            return res.status(500).json({
                ok: false,
                mensaje: e
            });
        }
    },
    eliminar: async(req, res) => {
        try {
            const usuario = await models.Usuario.findByIdAndDelete({_id: req.body._id});
            return res.status(200).json({
                ok: true,
                mensaje: "Solicitud procesada correctamente",
                usuario: {
                    _id: usuario._id,
                    alias: usuario.alias,
                    nombre: usuario.nombre,
                    appaterno: usuario.appaterno,
                    apmaterno: usuario.apmaterno,
                    curp: usuario.curp,
                    genero: usuario.genero,
                    telefono: usuario.telefono,
                    correo: usuario.correo,
                    rol: usuario.rol,
                    imagen: usuario.imagen
                }
            });
        } catch (e) {
            return res.status(500).json({
                ok: false,
                mensaje: e
            });
        }
    },
    activar: async(req, res) => {
        try {
            const usuario = await Usuario.findByIdAndUpdate({_id: req.body._id}, {estado: 1});
            return res.status(200).json({
                ok: true,
                mensaje: "Solicitud procesada correctamente",
                usuario: {
                    _id: usuario._id,
                    alias: usuario.alias,
                    nombre: usuario.nombre,
                    appaterno: usuario.appaterno,
                    apmaterno: usuario.apmaterno,
                    curp: usuario.curp,
                    genero: usuario.genero,
                    telefono: usuario.telefono,
                    correo: usuario.correo,
                    rol: usuario.rol,
                    imagen: usuario.imagen
                }
            });
        } catch (e) {
            return res.status(500).json({
                ok: false,
                mensaje: e
            });
        }
    },
    desactivar: async(req, res) => {
        try {
            const usuario = await Usuario.findByIdAndUpdate({_id: req.body._id}, {estado: 0});
            return res.status(200).json({
                ok: true,
                mensaje: "Solicitud procesada correctamente",
                usuario: {
                    _id: usuario._id,
                    alias: usuario.alias,
                    nombre: usuario.nombre,
                    appaterno: usuario.appaterno,
                    apmaterno: usuario.apmaterno,
                    curp: usuario.curp,
                    genero: usuario.genero,
                    telefono: usuario.telefono,
                    correo: usuario.correo,
                    rol: usuario.rol,
                    imagen: usuario.imagen
                }
            });
        } catch (e) {
            return res.status(500).json({
                ok: false,
                mensaje: e
            });
        }
    }
}