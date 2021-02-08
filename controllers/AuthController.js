import token from '../services/token';
import bcrypt from 'bcrypt';
import Usuario from '../models';

export default {
    login: async(req, res) => {
        try {
            if (!req.body.correo) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El campo de correo es obligatorio"
                });
            }
            if (!req.body.contrasenia) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "El campo de contraseña es obligatorio"
                });
            }
            const usuario = await Usuario.findOne({correo: req.body.correo});
            if (usuario) {
                const match = await bcrypt.compare(req.body.contrasenia, usuario.contrasenia);
                
                if (match) {
                    const tokenUsr = await token.encode(usuario._id);
                    return res.status(200).json({
                        ok: true,
                        mensaje: "Solicitud procesada correctamente",
                        usuario: {
                            _id: usuario._id,
                            nombre: usuario.nombre,
                            appaterno: usuario.appaterno,
                            apmaterno: usuario.apmaterno,
                            curp: usuario.curp,
                            genero: usuario.genero,
                            telefono: usuario.telefono,
                            correo: usuario.correo
                        },
                        token: tokenUsr
                    });

                } else {
                    return res.status(400).json({
                        ok: false,
                        mensaje: "La contaseña ingresada es incorrecta"
                    });
                }
            } else {
                return res.status(404).json({
                    ok: false,
                    mensaje: "No existe ningún usuario registrado con el correo ingresado."
                });
            }
        } catch (e) {
            return res.status(500).json({
                ok: false,
                mensaje: e
            });
        }
    },
    logout: async(req, res) => {}
}