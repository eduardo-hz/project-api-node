import mongoose, {Schema} from 'mongoose';

const slideSchema = new Schema({
    imagen: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
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

const Slide = mongoose.model('slide', slideSchema);
export default Slide;