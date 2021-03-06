const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos, validarJWT, esAdminRole, tieneRole} = require('../middlewares');

const {usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch} = require('../controllers/usuarios');
const {esRoleValido, existeEmail, existeUsuarioPorId} = require('../helpers/db-validators');

const router = new Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    check('rol').custom(esRoleValido), // rol => esRolValido(rol)
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;