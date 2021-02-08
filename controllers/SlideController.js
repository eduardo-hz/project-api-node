import Slide from '../models';
import fs from 'fs';

export default {
    registrar: async(req, res) => {
        try {
            if (!req.files) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "La Imagen es obligatoria."
                });
            }
            if (!req.body.titulo) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Título es un dato obligatorio"
                });
            }

            let imagen = req.files.imagen;

            /* VALIDAR QUE SÓLO ADMITA IMÁGENES EN FORMATO JPG */
            if(imagen.mimetype != 'image/jpeg') {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El formato de la imagen debe ser en formato JPG"
                });
            }
            
            /* VALIDAR QUE EL TAMAÑO DEL ARCHIVO NO EXCEDA 3MB */
            if(imagen.size > 3000000) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El tamaño de la imagen debe ser en formato menor a 3MB"
                });
            }

            /* ASIGNAR UN NOMBRE ALEATORIO AL ARCHIVO */
            let nombre = Math.floor(Math.random() * 100000);

            // mover archivo a la carperta
            imagen.mv(`./public/images/slides/${nombre}.jpg`, err => {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al guardar la imagen",
                    error: err
                });
            });

            let slide = new Slide({
                titulo: body.titulo,
                imagen: `${nombre}.jpg`,
                descripcion: body.descripcion
            });

            /* GUARDAR EL SLIDE EN LA COLECCION DE MONGODB */
            slide.save((err, data) => {
                if(err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: "Error al guardar el registro",
                        error: err
                    });
                }
                return res.status(200).json({
                    ok: true,
                    mensaje: "La solicitud ha sido procesada correctamente",
                    slide: {
                        _id: data._id,
                        titulo: data.titulo,
                        imagen: data.imagen,
                        descripcion: data.descripcion
                    }
                });    
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
            const slide = await Slide.find({_id: req.query._id});
            
            if(!slide) {
                return res.status(404).json({
                    ok: false,
                    mensaje: "El Slide con el Id ingresado no existe"
                });
            }

            return res.status(200).json({
                ok: true,
                mensaje: "La solicitud ha sido procesada correctamente",
                slide: {
                    _id: slide._id,
                    titulo: slide.titulo,
                    imagen: slide.imagen,
                    descripcion: slide.descripcion
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
            
            const registros = await Slide.find({
                $or: [
                    {'titulo': new RegExp(busqueda, 'i')},
                    {'descripcion': new RegExp(busqueda, 'i')}
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
            if (!req.files) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "La Imagen es obligatoria."
                });
            }
            if (!req.body._id) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El campo Id del slide es obligatorio"
                });
            }
            if (!req.body.titulo) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El Título es un dato obligatorio"
                });
            }

            let body = req.body;
            
            Slide.findById(body._id, (err, data) => {
                if(err){
                    return res.status(500).json({
                        ok: false,
                        mensaje: "Ocurrió un error al realizar la petición",
                        error: err
                    });
                }

                /* VALIDAR QUE EL SLIDE EXISTA */
                if(!data) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: "El Slide no existe en la base de datos"
                    });
                }

                let rutaImagen = data.imagen;

                /* VALIDAR SI EXISTE CAMBIO DE ARCHIVO DE IMAGEN */
                let validarCambioArchivo = (req, rutaImagen) => {
                    return new Promise((resolve, reject) => {

                        if(req.files) {
                            let imagen = req.files.imagen;

                            /* VALIDAR QUE SÓLO ADMITA IMÁGENES EN FORMATO JPG */
                            if(imagen.mimetype != 'image/jpeg') {
                                let respuesta = {
                                    res: res,
                                    status: 400,
                                    mensaje: "El formato de la imagen debe ser en formato JPG"
                                }
                                reject(respuesta);
                            }
                            
                            /* VALIDAR QUE EL TAMAÑO DEL ARCHIVO NO EXCEDA 3MB */
                            if(imagen.size > 3000000) {
                                let respuesta = {
                                    res: res,
                                    status: 400,
                                    mensaje: "El tamaño de la imagen debe ser en formato menor a 3MB"
                                }
                                reject(respuesta);
                            }

                            /* ASIGNAR UN NOMBRE ALEATORIO AL ARCHIVO */
                            let nombre = Math.floor(Math.random() * 100000);

                            // mover archivo a la carperta
                            imagen.mv(`./public/images/slides/${nombre}.jpg`, err => {
                                let respuesta = {
                                    res: res,
                                    status: 500,
                                    mensaje: `Error al guardar la imagen: ${err}`
                                }
                                reject(respuesta);
                            });
                            
                            /* BORRAR IMAGEN ANTERIOR */
                            if(fs.existsSync(`./public/images/slides/${rutaImagen}`)){
                                fs.unlinkSync(`./public/images/slides/${rutaImagen}`);
                            }

                            rutaImagen = `${nombre}.jpg`;
                            resolve(rutaImagen);
                        } else {
                            resolve(rutaImagen);
                        }
                    });
                }
    
                let guardarSlideBD = (body, rutaImagen) => {
                    return new Promise((resolve, reject) => {
                        
                        let newSlide = {
                            imagen: rutaImagen,
                            titulo: body.titulo,
                            descripcion: body.descripcion
                        };
        
                        Slide.findByIdAndUpdate(body._id, newSlide, {new: true, runValidators: true}, (err, data) => {
                            if(err){
                                let respuesta = {
                                    res: res,
                                    mensaje: `Ocurrió un error al realizar la petición: ${err}`
                                }
                                reject(respuesta);
                            }
                            
                            let respuesta = {
                                res: res,
                                mensaje: "La solicitud ha sido procesada correctamente",
                                slide: {
                                    _id: data._id,
                                    titulo: data.titulo,
                                    imagen: data.imagen,
                                    descripcion: data.descripcion
                                }
                            }
                            resolve(respuesta);
                        });
                    });
                }

                /* SINCRONIZAR TAREAS PARA VERIFICAR CAMBIOS Y GUARDAR LA INFO EN BD */
                validarCambioArchivo(req, rutaImagen).then(rutaImagen => {
                    guardarSlideBD(body, rutaImagen).then(respuesta => {
                        return respuesta["res"].status(200).json({
                            ok: true,
                            mensaje: respuesta["mensaje"],
                            slide: respuesta["slide"]
                        });
                    }).catch(respuesta => {
                        return respuesta["res"].status(400).json({
                            ok: false,
                            mensaje: respuesta["mensaje"]
                        });
                    });
                }).catch(respuesta => {
                    return respuesta["res"].status(respuesta["status"]).json({
                        ok: false,
                        mensaje: respuesta["mensaje"]
                    });
                });
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

            Slide.findByIdAndDelete(req.body._id, (err, data) => {
                if(err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: `Error al eliminar el slide: ${err}`
                    });
                }
                if(!res){
                    return res.status(404).json({
                        ok: false,
                        mensaje: "El slide no existe en la base de datos"
                    });
                }

                /* ELIMINAR LA IMAGEN */
                if(fs.existsSync(`./public/images/slides/${data.imagen}`)){
                    fs.unlinkSync(`./public/images/slides/${data.imagen}`);
                }

                return res.status(200).json({
                    ok: true,
                    mensaje: "La solicitud ha sido procesada correctamente",
                    slide: {
                        _id: data._id,
                        titulo: data.titulo,
                        imagen: data.imagen,
                        descripcion: data.descripcion
                    }
                });
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
            const slide = await Slide.findByIdAndUpdate({_id: req.body._id}, {estado: 1});
            return res.status(200).json({
                ok: true,
                mensaje: "La solicitud ha sido procesada correctamente",
                slide: {
                    _id: slide._id,
                    titulo: slide.titulo,
                    imagen: slide.imagen,
                    descripcion: slide.descripcion
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
            const slide = await Slide.findByIdAndUpdate({_id: req.body._id}, {estado: 0});
            return res.status(200).json({
                ok: true,
                mensaje: "La solicitud ha sido procesada correctamente",
                slide: {
                    _id: slide._id,
                    titulo: slide.titulo,
                    imagen: slide.imagen,
                    descripcion: slide.descripcion
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