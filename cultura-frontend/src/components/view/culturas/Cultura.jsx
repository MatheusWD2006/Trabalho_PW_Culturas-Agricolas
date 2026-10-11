import { useState, useEffect } from "react";
import CulturaContext from "./CulturaContext";
import {
  getCulturasAPI,
  getCulturaPorCodigoAPI,
  deleteCulturaPorCodigoAPI,
  cadastraCulturaAPI,
} from "../../../services/CulturaServico";
import { getPlantasAPI } from "../../../services/PlantaServico"; // Importa API de Plantas
import Tabela from "./Tabela";
import Formulario from "./Formulario";
import Carregando from "../../common/Carregando";

function Cultura() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [listaPlantas, setListaPlantas] = useState([]); // Estado para o Select
  const [carregando, setCarregando] = useState(true);

  const recuperaCulturas = async () => {
    setCarregando(true);
    setListaObjetos(await getCulturasAPI());
    setCarregando(false);
  };

  const recuperaPlantas = async () => {
    setListaPlantas(await getPlantasAPI());
  };

  const remover = async (codigo) => {
    if (window.confirm("Deseja remover este objeto?")) {
      let retornoAPI = await deleteCulturaPorCodigoAPI(codigo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      recuperaCulturas();
    }
  };

  useEffect(() => {
    recuperaCulturas();
    recuperaPlantas(); // Busca as plantas ao carregar
  }, []);

  const [editar, setEditar] = useState(false);
  const [exibirForm, setExibirForm] = useState(false);

  // Objeto alinhado com a tabela/entidade de Cultura
  const [objeto, setObjeto] = useState({
    id_cultura: 0,
    planta_id: "",
    hectares: "",
    data_plantio: "",
    data_colheita: "",
  });

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto({
      id_cultura: 0,
      planta_id: "",
      hectares: "",
      data_plantio: "",
      data_colheita: "",
    });
    setExibirForm(true);
  };

  const converterDataParaInput = (dataStr) => {
    if (!dataStr) return "";
    if (dataStr.includes("-")) return dataStr;

    const partes = dataStr.split("/");
    if (partes.length === 3) {
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
    return "";
  };

  const editarObjeto = async (codigo) => {
    const dadosCultura = await getCulturaPorCodigoAPI(codigo);

    // Converte as datas para o formato do input type="date"
    if (dadosCultura.data_plantio) {
      dadosCultura.data_plantio = converterDataParaInput(
        dadosCultura.data_plantio,
      );
    }
    if (dadosCultura.data_colheita) {
      dadosCultura.data_colheita = converterDataParaInput(
        dadosCultura.data_colheita,
      );
    }

    setObjeto(dadosCultura);
    setEditar(true);
    setAlerta({ status: "", message: "" });
    setExibirForm(true);
  };

  // Função para pegar a data de hoje no formato YYYY-MM-DD
  const obterDataHoje = () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const registrarColheita = async (cultura) => {
    if (
      window.confirm(
        "Deseja registrar a colheita para esta cultura com a data de hoje?",
      )
    ) {
      const dataHoje = obterDataHoje();

      // Validação de segurança no front-end para garantir que não colhe antes ou no mesmo dia do plantio
      // Nota: Como a data de plantio que vem do banco está em formato BR (DD/MM/YYYY), precisamos convertê-la para comparar com o formato ISO
      const partesPlantio = cultura.data_plantio.split("/");
      const dataPlantioISO =
        partesPlantio.length === 3
          ? `${partesPlantio[2]}-${partesPlantio[1]}-${partesPlantio[0]}`
          : cultura.data_plantio;

      if (dataHoje <= dataPlantioISO) {
        setAlerta({
          status: "error",
          message:
            "A data de colheita deve ser estritamente posterior à data de plantio!",
        });
        return;
      }

      // Prepara o objeto atualizado mantendo os dados e injetando a data de colheita de hoje em formato ISO
      const culturaAtualizada = {
        id_cultura: cultura.id_cultura,
        planta_id: cultura.planta_id,
        hectares: cultura.hectares,
        data_plantio: dataPlantioISO,
        data_colheita: dataHoje,
      };

      try {
        let retornoAPI = await cadastraCulturaAPI(culturaAtualizada, "PUT");
        setAlerta({
          status: retornoAPI.status,
          message: "Colheita registrada com sucesso!",
        });
        recuperaCulturas();
      } catch (err) {
        setAlerta({
          status: "error",
          message: "Erro ao registrar colheita: " + err.message,
        });
      }
    }
  };
  const acaoCadastrar = async (e) => {
    e.preventDefault();

   
    if (objeto.data_colheita && objeto.data_colheita <= objeto.data_plantio) {
      setAlerta({ 
        status: "error", 
        message: "A data de colheita deve ser posterior à data de plantio (não podem ser no mesmo dia)!" 
      });
      return; 
    }

    const metodo = editar ? "PUT" : "POST";

    try {
      let retornoAPI = await cadastraCulturaAPI(objeto, metodo);
      setAlerta({
        status: retornoAPI.status,
        message: retornoAPI.message,
      });
      setObjeto(retornoAPI.objeto);

      if (!editar) {
        setEditar(true);
      }
    } catch (err) {
      console.error(err.message);
    }

    recuperaCulturas();
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setObjeto({
      ...objeto,
      [name]: value,
    });
  };

  return (
    <CulturaContext.Provider
      value={{
        listaObjetos,
        listaPlantas,
        alerta,
        remover,
        objeto,
        editarObjeto,
        acaoCadastrar,
        handleChange,
        novoObjeto,
        registrarColheita, // <--- Adicionado aqui para o Provider repassar para a Tabela
        exibirForm,
        setExibirForm,
        carregando,
      }}
    >
      <Carregando carregando={carregando}>
        <Tabela />
      </Carregando>
      <Formulario />
    </CulturaContext.Provider>
  );
}

export default Cultura;
