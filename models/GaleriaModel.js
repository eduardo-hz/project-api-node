import mongoose, {Schema} from 'mongoose';

const galeriaSchema = new Schema({
    foto: {
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

const Galeria = mongoose.model('galeria', galeriaSchema);
export default Galeria;