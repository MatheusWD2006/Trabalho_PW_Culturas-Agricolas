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

module.exports = {
    formatarDataBR,
    formatarDataISO
};