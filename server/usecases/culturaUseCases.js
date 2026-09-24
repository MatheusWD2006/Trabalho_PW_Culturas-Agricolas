const { query } = require("../configDB");
const Cultura = require("../entities/Culturas");
const { formatarDataBR } = require('../utils/dateUtils');

const getCulturasDB = async () => {
  try {
    const { rows } = await query("SELECT * FROM culturas ORDER BY id_cultura");

    return rows.map(
      (cultura) =>
        new Cultura(
          cultura.id_cultura,
          cultura.planta_id,
          cultura.hectares,
          formatarDataBR(cultura.data_plantio),
          formatarDataBR(cultura.data_colheita),
        ),
    );
  } catch (err) {
    throw "Erro : " + err;
  }
};

const addCulturaDB = async (body) => {
  try {
    const { planta_id, hectares, data_plantio, data_colheita } = body;

    const results = await query(
      `INSERT INTO culturas (planta_id, hectares, data_plantio, data_colheita)
             VALUES ($1, $2, $3, $4)
             RETURNING id_cultura, planta_id, hectares, data_plantio, data_colheita`,
      [planta_id, hectares, data_plantio, data_colheita],
    );

    const cultura = results.rows[0];

    return new Cultura(
      cultura.id_cultura,
      cultura.planta_id,
      cultura.hectares,
      formatarDataBR(cultura.data_plantio),
      formatarDataBR(cultura.data_colheita),
    );
  } catch (err) {
    // Se a chave estrangeira (planta_id) não existir no banco
    if (err.code === "23503") {
      throw `A planta com o código ${body.planta_id} não existe no cadastro.`;
    }
    throw "Erro ao inserir a cultura: " + err;
  }
};

const updateCulturaDB = async (body) => {
  try {
    const { id_cultura, planta_id, hectares, data_plantio, data_colheita } =
      body;

    const results = await query(
      `UPDATE culturas
             SET planta_id = $2, hectares = $3, data_plantio = $4, data_colheita = $5
             WHERE id_cultura = $1
             RETURNING id_cultura, planta_id, hectares, data_plantio, data_colheita`,
      [id_cultura, planta_id, hectares, data_plantio, data_colheita],
    );

    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${id_cultura} para ser alterado`;
    }

    const cultura = results.rows[0];

    return new Cultura(
      cultura.id_cultura,
      cultura.planta_id,
      cultura.hectares,
      formatarDataBR(cultura.data_plantio),
      formatarDataBR(cultura.data_colheita),
    );
  } catch (err) {
    throw "Erro ao alterar a cultura: " + err;
  }
};

const deleteCulturaDB = async (codigo) => {
  try {
    const results = await query(
      `DELETE FROM culturas
             WHERE id_cultura = $1`,
      [codigo],
    );

    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
    } else {
      return "Cultura removida com sucesso";
    }
  } catch (err) {
    throw "Erro ao remover a cultura: " + err;
  }
};

const getCulturaPorCodigoDB = async (codigo) => {
  try {
    const results = await query(
      `SELECT * FROM culturas
             WHERE id_cultura = $1`,
      [codigo],
    );

    if (results.rowCount == 0) {
      throw "Nenhum registro encontrado com o código: " + codigo;
    } else {
      const cultura = results.rows[0];

      return new Cultura(
        cultura.id_cultura,
        cultura.planta_id,
        cultura.hectares,
        formatarDataBR(cultura.data_plantio),
        formatarDataBR(cultura.data_colheita),
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
  getCulturaPorCodigoDB,
};
