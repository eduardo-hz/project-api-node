import mongoose, {Schema} from 'mongoose';

const articuloSchema = new Schema({
    portada: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        maxlength: 50,
        required: true
    },
    intro: {
        type: String,
        maxlength: 100,
        required: true
    },
    contenido: {
        type: String,
        maxlength: 255,
        required: true
    },
    url: {
        type: String,
        required: true
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

const Articulo = mongoose.model('articulo', articuloSchema);
export default Articulo;