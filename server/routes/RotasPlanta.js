const { Router } = require('express');

const {
    getPlantas,
    addPlanta,
    updatePlanta,
    deletePlanta,
    getPlantaPorCodigo
} = require('../controllers/plantaController');

const rotasPlanta = new Router();

rotasPlanta.route('/planta')
    .get(getPlantas)
    .post(addPlanta)
    .put(updatePlanta);

rotasPlanta.route('/planta/:codigo')
    .get(getPlantaPorCodigo)
    .delete(deletePlanta);

module.exports = rotasPlanta;