// Formata data do banco para o padrão brasileiro (DD/MM/AAAA)
const formatarDataBR = (data) => {
    if (!data) return null;
    return new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
};

// Formata data para o padrão ISO simples (AAAA-MM-DD)
const formatarDataISO = (data) => {
    if (!data) return null;
    return new Date(data).toISOString().split('T')[0];
};

/**
 * Valida se uma string de data (YYYY-MM-DD ou YYYY/MM/DD) representa uma data real válida no calendário.
 */
const eDataValida = (dataString) => {
    if (!dataString) return false;
    
    // Verifica o formato básico AAAA-MM-DD
    const regexData = /^\d{4}-\d{2}-\d{2}$/;
    if (!regexData.test(dataString)) return false;

    const [ano, mes, dia] = dataString.split('-').map(Number);
    
    // O construtor do Date no JS aceita mês de 0 a 11
    const data = new Date(Date.UTC(ano, mes - 1, dia));
    
    // Garante que o Date não fez "overflow" (ex: transformar 31/02 em 03/03)
    return (
        data.getUTCFullYear() === ano &&
        data.getUTCMonth() === mes - 1 &&
        data.getUTCDate() === dia
    );
};

/**
 * Valida se o intervalo entre plantio e colheita é coerente.
 */
const validarIntervaloDatas = (dataPlantio, dataColheita) => {
    if (!eDataValida(dataPlantio)) {
        throw "A data de plantio informada é inválida ou inexistente.";
    }

    if (dataColheita) {
        if (!eDataValida(dataColheita)) {
            throw "A data de colheita informada é inválida ou inexistente.";
        }

        const plantio = new Date(dataPlantio);
        const colheita = new Date(dataColheita);

        if (colheita <= plantio) {
            throw "A data de colheita não pode ser anterior nem igual à data de plantio.";
        }
    }
};

module.exports = {
    formatarDataBR,
    formatarDataISO,
    eDataValida,
    validarIntervaloDatas
};