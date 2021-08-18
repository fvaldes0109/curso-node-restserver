const {Router} = require('express');
const {check} = require('express-validator');

const {cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary} = require('../controllers/uploads');
const {coleccionesPermitidas} = require('../helpers');
const {validarCampos, validarArchivo} = require('../middlewares');

const router = new Router();

router.post('/', validarArchivo, cargarArchivo);

router.put('/:coleccion/:id', [
    check('id', 'No es un id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarArchivo,
    validarCampos
], actualizarImagenCloudinary);

router.get('/:coleccion/:id', [
    check('id', 'No es un id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);

module.exports = router;