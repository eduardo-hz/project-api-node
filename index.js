import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import router from './routes';

/* CONEXIÓN A MONGO DB */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dbsistema', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
.then(mongoose => console.log("Conexión exitosa a la base de datos"))
.catch(err => console.log(err));

/* VARIABLE PARA APLICACION EXPRESS */
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

/* MIDDLEWARE PARA MORGAN */
app.use(morgan('dev'));

/* MIDDLEWARE PARA CORS */
app.use(cors());

/* MIDDLEWARE PARA BODY PARSER */
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(bodyParser.json({limit: '5mb', extended: true}));

/* MIDDLEWARE PARA FILEUPLOAD */
app.use(fileUpload());

/* MIDDLEWARE PARA RUTAS */
app.use('/api', router);

/* CONFIGURACION DEL SERVIDOR EXPRESS */
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), ()=>{
    console.log("Ejecutando Servidor en el puerto " + app.get('port'));
});