import Galeria from '../models';

export default {
    registrar: async(req, res) => {
        try {
            if (!req.body.foto) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "La Foto es obligatoria."
                });
            }

            const galeria = await Galeria.create(req.body);
            return res.status(200).json({
                ok: true,
                mensaje: "La solicitud ha sido procesada correctamente",
                galeria: {
                    _id: galeria._id,
                    foto: galeria.foto
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
            const galeria = await Galeria.find({_id: req.query._id});
            
            if(!galeria) {
                return res.status(404).json({
                    ok: false,
                    mensaje: "La Galeria con el Id ingresado no existe"
                });
            }

            return res.status(200).json({
                ok: true,
                mensaje: "La solicitud ha sido procesada correctamente",
                galeria: {
                    _id: galeria._id,
                    foto: galeria.foto
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
            
            const registros = await Galeria.find({}, 
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
                    mensaje: "El campo Id de la galería es obligatorio"
                });
            }
            if (!req.body.foto) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "La Foto es obligatoria"
                });
            }
            
            const galeria = await Galeria.findByIdAndUpdate({_id: req.body._id}, {foto: req.body.foto, fechaModificacion: Date.now});

            return res.status(200).json({
                ok: true,
                mensaje: "La solicitud ha sido procesada correctamente",
                galeria: {
                    _id: galeria._id,
                    foto: galeria.foto
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
            const galeria = await Galeria.findByIdAndDelete({_id: req.body._id});

            return res.status(200).json({
                ok: true,
                mensaje: "La solicitud ha sido procesada correctamente",
                galeria: {
                    _id: galeria._id,
                    foto: galeria.foto
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
            const galeria = await Galeria.findByIdAndUpdate({_id: req.body._id}, {estado: 1});
            return res.status(200).json({
                ok: true,
                mensaje: "La solicitud ha sido procesada correctamente",
                galeria: {
                    _id: galeria._id,
                    foto: galeria.foto
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
            const galeria = await Galeria.findByIdAndUpdate({_id: req.body._id}, {estado: 0});
            return res.status(200).json({
                ok: true,
                mensaje: "La solicitud ha sido procesada correctamente",
                galeria: {
                    _id: galeria._id,
                    foto: galeria.foto
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