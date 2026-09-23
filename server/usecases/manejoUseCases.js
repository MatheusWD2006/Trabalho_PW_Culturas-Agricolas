const { pool } = require('../config');
const Manejo = require('../entities/Manejos');

const getManejosDB = async () => {
    try {
        const { rows } = await pool.query(
            'SELECT * FROM manejos ORDER BY nome'
        );

        return rows.map(
            (manejo) => new Manejo(
                manejo.codigo,
                manejo.nome
            )
        );
    } catch (err) {
        throw "Erro : " + err;
    }
};

const addManejoDB = async (body) => {
    try {
        const { nome } = body;

        const results = await pool.query(
            `INSERT INTO manejos (nome)
             VALUES ($1)
             RETURNING codigo, nome`,
            [nome]
        );

        const manejo = results.rows[0];

        return new Manejo(
            manejo.codigo,
            manejo.nome
        );
    } catch (err) {
        throw "Erro ao inserir o manejo: " + err;
    }
};

const updateManejoDB = async (body) => {
    try {
        const { codigo, nome } = body;

        const results = await pool.query(
            `UPDATE manejos
             SET nome = $2
             WHERE codigo = $1
             RETURNING codigo, nome`,
            [codigo, nome]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }

        const manejo = results.rows[0];

        return new Manejo(
            manejo.codigo,
            manejo.nome
        );
    } catch (err) {
        throw "Erro ao alterar o manejo: " + err;
    }
};


const deleteManejoDB = async (codigo) => {
    try {
        const results = await pool.query(
            `DELETE FROM manejos
             WHERE codigo = $1`,
            [codigo]
        );

        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Manejo removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o manejo: " + err;
    }
};

const getManejoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(
            `SELECT * FROM manejos
             WHERE codigo = $1`,
            [codigo]
        );

        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const manejo = results.rows[0];

            return new Manejo(
                manejo.codigo,
                manejo.nome
            );
        }
    } catch (err) {
        throw "Erro ao recuperar o manejo: " + err;
    }
};

module.exports = {
    getManejosDB,
    addManejoDB,
    updateManejoDB,
    deleteManejoDB,
    getManejoPorCodigoDB
};