const {Router} = require('express');
const {check} = require('express-validator');

const {validarJWT, validarCampos, tieneRole} = require('../middlewares');

const { crearProducto, 
        obtenerProductos,
        obtenerProducto,
        actualizarProducto,
        borrarProducto} = require('../controllers/productos');
const {existeCategoriaPorId, existeProductoPorId} = require('../helpers/db-validators');

const router = new Router();

//Obtener productos
router.get('/', obtenerProductos);

//Obtener producto por id
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

//Crear producto
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

//Actualizar producto
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], actualizarProducto);

//Borrar producto
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    validarCampos
], borrarProducto);

module.exports = router;