/*
    Rutas de usuarios /Events
    host + /api/events
*/

const express = require('express');
const { check } = require('express-validator');

const isDate = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = express.Router();

//todas tienen que ser validadas por JWT
router.use(validarJWT); // se usa middleware aqui para que sea aplicado a todas las rutas siguientes

//Obtener eventos
router.get('/', obtenerEventos);

//Crear un nuevo evento
router.post('/',
        [
            check('title', 'El titulo es obligatorio').not().isEmpty(),
            check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
            check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
            validarCampos
        ], 
        crearEvento);

//Actualizar evento
router.put('/:id',
        [
            check('title', 'El titulo es obligatorio').not().isEmpty(),
            check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
            check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
            validarCampos
        ],  actualizarEvento);

//borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;