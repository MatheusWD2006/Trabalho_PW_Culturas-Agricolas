// Retorna apenas a parte da data no formato padrão (AAAA-MM-DD).
// O driver "pg" devolve colunas DATE como objeto Date (meia-noite LOCAL),
// por isso usamos os getters locais (toISOString poderia mudar o dia).
const formatarDataSimples = (data) => {
    if (!data) return null;

    if (data instanceof Date) {
        if (isNaN(data.getTime())) return null;
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const dia = String(data.getDate()).padStart(2, "0");
        return `${ano}-${mes}-${dia}`;
    }

    // String: pega só AAAA-MM-DD (cobre "2026-10-13T00:00:00.000Z")
    return String(data).slice(0, 10);
};

/**
 * Valida se uma string de data (YYYY-MM-DD) representa uma data real válida no calendário.
 */
const eDataValida = (dataString) => {
    if (!dataString) return false;

    const regexData = /^\d{4}-\d{2}-\d{2}$/;
    if (!regexData.test(dataString)) return false;

    const [ano, mes, dia] = dataString.split('-').map(Number);

    if (mes < 1 || mes > 12) return false;
    if (dia < 1 || dia > 31) return false;

    const data = new Date(Date.UTC(ano, mes - 1, dia));

    return (
        data.getUTCFullYear() === ano &&
        data.getUTCMonth() === mes - 1 &&
        data.getUTCDate() === dia
    );
};

/**
 * Valida se o intervalo entre plantio e colheita é coerente comparando as strings diretamente.
 */
const validarIntervaloDatas = (dataPlantio, dataColheita) => {
    if (!eDataValida(dataPlantio)) {
        throw "A data de plantio informada é inválida ou inexistente.";
    }

    if (dataColheita) {
        if (!eDataValida(dataColheita)) {
            throw "A data de colheita informada é inválida ou inexistente.";
        }

        // Compara diretamente as strings em formato AAAA-MM-DD (alfabeticamente)
        if (dataColheita <= dataPlantio) {
            throw "A data de colheita não pode ser anterior nem igual à data de plantio.";
        }
    }
};

module.exports = {
    formatarDataBR: formatarDataSimples,  // Mantém os nomes para não quebrar os use cases
    formatarDataISO: formatarDataSimples, // Mantém os nomes para não quebrar os use cases
    eDataValida,
    validarIntervaloDatas
};