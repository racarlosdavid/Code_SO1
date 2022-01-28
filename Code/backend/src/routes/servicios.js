const { Router } = require('express');
const router = Router();

const { registrarEstudiante, editarEstudiante, eliminarEstudiante, getEstudiante, getEstudiantes } = require('../controllers/servicios.controller');

router.route('/registrarEstudiante')
    .post(registrarEstudiante);

router.route('/editarEstudiante')
    .post(editarEstudiante);

router.route('/eliminarEstudiante')
    .post(eliminarEstudiante);

router.route('/getEstudiante')
    .post(getEstudiante);

router.route('/getEstudiantes')
    .get(getEstudiantes);

module.exports = router;