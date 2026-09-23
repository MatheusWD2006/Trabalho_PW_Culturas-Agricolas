const { pool } = require('../config');
const Planta = require('../entities/Plantas');

const getPlantasDB = async () => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM plantas ORDER BY nome'
        );

        return rows.map(
            (planta) => new Planta(
                planta.id_planta,
                planta.nome
            )
        );
    } catch (err) {
        throw "Erro : " + err;
    }
};

const addPlantaDB = async (body) => {
    try {
        const { nome } = body;

        const results = await pool.query(
            `INSERT INTO plantas (nome)
             VALUES ($1)
             RETURNING id_planta, nome`,
            [nome]
        );

        const planta = results.rows[0];

        return new Planta(
            planta.id_planta,
            planta.nome
        );
    } catch (err) {
        throw "Erro ao inserir a planta: " + err;
    }
};



const updatePlantaDB = async (body) => {
    try {
        const { id_planta, nome } = body;

        const results = await pool.query(
            `UPDATE plantas
             SET nome = $2
             WHERE id_planta = $1
             RETURNING id_planta, nome`,
            [id_planta, nome]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${id_planta} para ser alterado`;
        }

        const planta = results.rows[0];

        return new Planta(
            planta.id_planta,
            planta.nome
        );
    } catch (err) {
        throw "Erro ao alterar a planta: " + err;
    }
};


const deletePlantaDB = async (id_planta) => {
    try {
        const results = await pool.query(
            `DELETE FROM plantas
             WHERE id_planta = $1`,
            [id_planta]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${id_planta} para ser removido`;
        } else {
            return "Planta removida com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover a planta: " + err;
    }
};

const getPlantaPorIdDB = async (id_planta) => {
    try {
        const results = await pool.query(
            `SELECT * FROM plantas
             WHERE id_planta = $1`,
            [id_planta]
        );

        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + id_planta;
        } else {
            const planta = results.rows[0];

            return new Planta(
                planta.id_planta,
                planta.nome
            );
        }
                
    } catch (err) {
        throw "Erro ao recuperar a planta: " + err;
    }
};

module.exports = {
    getPlantasDB,
    addPlantaDB,
    updatePlantaDB,
    deletePlantaDB,
    getPlantaPorIdDB
};