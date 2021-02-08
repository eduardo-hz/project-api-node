import Articulo from '../models';

export default {
    registrar: async(req, res) => {
        try {
            if (!req.body.portada) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "La Portada es un dato obligatorio"
                });
            }
            if (!req.body.titulo) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Título es un dato obligatorio"
                });
            }
            if (!req.body.intro) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Intro es un dato obligatorio"
                });
            }
            if (!req.body.contenido) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Contenido es un dato obligatorio"
                });
            }
            if (!req.body.url) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "La URL es un dato obligatorio"
                });
            }

            const articulo = await Articulo.create(req.body);
            return res.status(200).json({
                ok: true,
                mensaje: "La solicitud ha sido procesada correctamente",
                articulo: {
                    _id: articulo._id,
                    portada: articulo.portada,
                    titulo: articulo.titulo,
                    intro: articulo.intro,
                    contenido: articulo.contenido,
                    url: articulo.url
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
                    mensaje: "El campo Id es totalmente requerido"
                });
            }
            const articulo = await Articulo.find({_id: req.query._id});
            
            if(!articulo) {
                return res.status(404).json({
                    ok: false,
                    mensaje: 'El Artículo con el Id ingresado no existe'
                });
            }

            return res.status(200).json({
                ok: true,
                mensaje: "La solicitud ha sido procesada correctamente",
                articulo: {
                    _id: articulo._id,
                    portada: articulo.portada,
                    titulo: articulo.titulo,
                    intro: articulo.intro,
                    contenido: articulo.contenido,
                    url: articulo.url
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
            
            const registros = await Articulo.find({
                $or: [
                    {'titulo': new RegExp(busqueda, 'i')},
                    {'intro': new RegExp(busqueda, 'i')},
                    {'contenido': new RegExp(busqueda, 'i')},
                    {'url': new RegExp(busqueda, 'i')}
                ]
            }, 
            {
                estado: 0,
                fechaCreacion: 0,
                idUsuarioCreacion: 0,
                fechaModificacion: 0,
                idUsuarioModificacion: 0
            });

            return res.status(200).json({
                ok: true,
                mensaje: "La solicitud ha sido procesada correctamente",
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
            if (!req.body._id) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El campo Id del artículo es obligatorio"
                });
            }
            if (!req.body.portada) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "La Portada es un dato obligatorio"
                });
            }
            if (!req.body.titulo) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Título es un dato obligatorio"
                });
            }
            if (!req.body.intro) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Intro es un dato obligatorio"
                });
            }
            if (!req.body.contenido) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Contenido es un dato obligatorio"
                });
            }
            if (!req.body.url) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "La URL es un dato obligatorio"
                });
            }
            const articulo = await Articulo.findByIdAndUpdate({_id: req.body._id}, {portada: req.body.portada, titulo: req.body.titulo, intro: req.body.intro, contenido: req.body.contenido, url: req.body.url, fechaModificacion: Date.now});

            return res.status(200).json({
                ok: true,
                mensaje: "La solicitud ha sido procesada correctamente",
                articulo: {
                    _id: articulo._id,
                    portada: articulo.portada,
                    titulo: articulo.titulo,
                    intro: articulo.intro,
                    contenido: articulo.contenido,
                    url: articulo.url
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
            if(!req.body._id) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El campo Id es necesario para esta operación"
                });
            }
            const articulo = await Articulo.findByIdAndDelete({_id: req.body._id});

            return res.status(200).json({
                ok: true,
                mensaje: "La solicitud ha sido procesada correctamente",
                articulo: {
                    _id: articulo._id,
                    portada: articulo.portada,
                    titulo: articulo.titulo,
                    intro: articulo.intro,
                    contenido: articulo.contenido,
                    url: articulo.url
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
            const articulo = await Articulo.findByIdAndUpdate({_id: req.body._id}, {estado: 1});
            return res.status(200).json({
                ok: true,
                mensaje: "La solicitud ha sido procesada correctamente",
                articulo: {
                    _id: articulo._id,
                    portada: articulo.portada,
                    titulo: articulo.titulo,
                    intro: articulo.intro,
                    contenido: articulo.contenido,
                    url: articulo.url
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
            const articulo = await Articulo.findByIdAndUpdate({_id: req.body._id}, {estado: 0});
            return res.status(200).json({
                ok: true,
                mensaje: "La solicitud ha sido procesada correctamente",
                articulo: {
                    _id: articulo._id,
                    portada: articulo.portada,
                    titulo: articulo.titulo,
                    intro: articulo.intro,
                    contenido: articulo.contenido,
                    url: articulo.url
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