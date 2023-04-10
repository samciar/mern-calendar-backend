/*
    Rutas de usuarios /Auth
    host + /api/auth
*/

const express = require('express'); // ó const { Router } = require('express'); const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = express.Router();

router.post(
        '/new', 
        [ //middlewares
            check('name', 'El nombre es obligatorio').not().isEmpty(),
            check('name', 'El nombre debe ser mayor a 4 caracteres').isLength({ min: 5 }),
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe ser mayor a 5 caracteres').isLength({ min: 6 }),
            validarCampos
        ],
         crearUsuario );

router.post(
        '/', 
        [ //middlewares
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password es obligatorio').not().isEmpty(),
            validarCampos
        ], 
        loginUsuario);

router.get(
        '/renew',
        [ //middlewares
            validarJWT
        ],
         revalidarToken);

module.exports = router;