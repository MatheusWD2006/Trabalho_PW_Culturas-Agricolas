export const formatoDataBR = (data) => {
    let dataFormatada = new Date(data);
    return dataFormatada.toLocaleDateString('pt-BR');
}

export const formatoDataUS = (data) => {
    let dataFormatada = new Date(data);
    return dataFormatada.toLocaleDateString('en-US');
}

