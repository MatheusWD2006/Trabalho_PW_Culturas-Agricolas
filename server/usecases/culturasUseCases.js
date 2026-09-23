const { pool } = require('../config');
const Cultura = require('../entities/Culturas');

const getCulturasDB = async () => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM culturas ORDER BY nome'
        );

        return rows.map(
            (cultura) => new Cultura(
                cultura.id_cultura,
                cultura.planta_id,
                cultura.hectares,
                cultura.data_plantio,
                cultura.data_colheita
            )
        );
    } catch (err) {
        throw "Erro : " + err;
    }
};

const addCulturaDB = async (body) => {
    try {
        const { planta_id, hectares, data_plantio, data_colheita } = body;

        const results = await pool.query(
            `INSERT INTO culturas (planta_id, hectares, data_plantio, data_colheita)
             VALUES ($1, $2, $3, $4)
             RETURNING id_cultura, planta_id, hectares, data_plantio, data_colheita`,
            [planta_id, hectares, data_plantio, data_colheita]
        );

        const cultura = results.rows[0];

        return new Cultura(
            cultura.id_cultura,
            cultura.planta_id,
            cultura.hectares,
            cultura.data_plantio,
            cultura.data_colheita
        );
    } catch (err) {
        throw "Erro ao inserir a cultura: " + err;
    }
};



const updateCulturaDB = async (body) => {
    try {
        const { id_cultura, planta_id, hectares, data_plantio, data_colheita } = body;

        const results = await pool.query(
            `UPDATE culturas
             SET planta_id = $2, hectares = $3, data_plantio = $4, data_colheita = $5
             WHERE id_cultura = $1
             RETURNING id_cultura, planta_id, hectares, data_plantio, data_colheita`,
            [id_cultura, planta_id, hectares, data_plantio, data_colheita]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${id_cultura} para ser alterado`;
        }

        const cultura = results.rows[0];

        return new Cultura(
            cultura.id_cultura,
            cultura.planta_id,
            cultura.hectares,
            cultura.data_plantio,
            cultura.data_colheita
        );
    } catch (err) {
        throw "Erro ao alterar a cultura: " + err;
    }
};


const deleteCulturaDB = async (id_cultura) => {
    try {
        const results = await pool.query(
            `DELETE FROM culturas
             WHERE id_cultura = $1`,
            [id_cultura]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${id_cultura} para ser removido`;
        } else {
            return "Cultura removida com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover a cultura: " + err;
    }
};

const getCulturaPorIdDB = async (id_cultura) => {
    try {
        const results = await pool.query(
            `SELECT * FROM culturas
             WHERE id_cultura = $1`,
            [id_cultura]
        );

        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + id_cultura;
        } else {
            const cultura = results.rows[0];

            return new Cultura(
                cultura.id_cultura,
                cultura.planta_id,
                cultura.hectares,
                cultura.data_plantio,
                cultura.data_colheita
            );
        }
    } catch (err) {
        throw "Erro ao recuperar a cultura: " + err;
    }
};

module.exports = {
    getCulturasDB,
    addCulturaDB,
    updateCulturaDB,
    deleteCulturaDB,
    getCulturaPorIdDB
};