// Funções auxiliares para manipulação de datas.

// Converte AAAA-MM-DD para DD/MM/AAAA, apenas para exibição.
export const formatarDataBR = (iso) => {
  if (!iso) return "";
  const [ano, mes, dia] = String(iso).slice(0, 10).split("-");
  if (!ano || !mes || !dia) return "";
  return `${dia}/${mes}/${ano}`;
};

// Converte para o formato aceito pelo <input type="date"> (AAAA-MM-DD).
export const converterDataParaInput = (dataStr) => {
  if (!dataStr) return "";
  if (dataStr.includes("-")) return dataStr.slice(0, 10);

  const partes = dataStr.split("/");
  return partes.length === 3 ? `${partes[2]}-${partes[1]}-${partes[0]}` : "";
};

// Data de hoje (local) no formato AAAA-MM-DD.
export const obterDataHoje = () => {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
};