import mongoose, {Schema} from 'mongoose';

const usuarioSchema = new Schema({
    rol: {
        type: String,
        required: true,
        maxlength: 30
    },
    alias: {
        type: String,
        maxlength: 15
    },
    nombre:{
        type: String,
        maxlength: 50,
        required: true
    },
    appaterno:{
        type: String,
        maxlength: 50,
        required: true
    },
    apmaterno:{
        type: String,
        maxlength: 50,
        required: true
    },
    curp:{
        type: String,
        maxlength: 18,
        unique: true,
        required: true
    },
    genero:{
        type: String,
        default: 'Sin especificar',
        enum: ['Masculino', 'Femenino', 'Sin especificar']
    },
    telefono:{
        type: String,
        maxlength: 12,
        unique: true,
        required: true
    },
    correo:{
        type: String,
        maxlength: 50,
        unique: true,
        required: true
    },
    contrasenia:{
        type: String,
        maxlength: 64,
        required: true
    },
    imagen: {
        type: String
    },
    estado:{
        type: Number,
        default: 1
    },
    fechaCreacion:{
        type: Date,
        default: Date.now
    },
    idUsuarioCreacion: {
        type: String,
        default: "Eduardo :D"
    },
    fechaModificacion: {
        type: Date,
        default: Date.now
    },
    idUsuarioModificacion: {
        type: String,
        default: "Eduardo :D"
    }
});

const Usuario = mongoose.model('usuario', usuarioSchema);
export default Usuario;