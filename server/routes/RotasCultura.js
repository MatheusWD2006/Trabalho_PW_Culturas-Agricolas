const { Router } = require('express');

const {
    getCulturas,
    addCultura,
    updateCultura,
    deleteCultura,
    getCulturaPorCodigo
} = require('../controllers/CulturaController');

const rotasCultura = new Router();

rotasCultura.route('/Cultura')
    .get(getCulturas)
    .post(addCultura)
    .put(updateCultura);

rotasCultura.route('/Cultura/:codigo')
    .get(getCulturaPorCodigo)
    .delete(deleteCultura);

module.exports = rotasCultura;