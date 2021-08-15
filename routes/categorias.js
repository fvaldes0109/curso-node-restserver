const {Router} = require('express');
const {check} = require('express-validator');

const {validarJWT, validarCampos, tieneRole} = require('../middlewares');

const {crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria} = require('../controllers/categorias');
const {existeCategoriaPorId} = require('../helpers/db-validators');

const router = new Router();

//Obtener categorias
router.get('/', obtenerCategorias);

//Obtener categoria por id
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoria);

//Crear categoria
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar categoria
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);

//Borrar categoria
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    validarCampos
], borrarCategoria);

module.exports = router;