import { useState, useEffect } from "react";
import CulturaContext from "./CulturaContext";
import {
  getCulturasAPI,
  getCulturaPorCodigoAPI,
  deleteCulturaPorCodigoAPI,
  cadastraCulturaAPI,
} from "../../../services/CulturaServico";
import { getPlantasAPI } from "../../../services/PlantaServico";
import {
  converterDataParaInput,
  obterDataHoje,
} from "../../common/datas";
import Tabela from "./Tabela";
import Formulario from "./Formulario";
import Carregando from "../../common/Carregando";

function Cultura() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [listaPlantas, setListaPlantas] = useState([]);
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
    recuperaPlantas();
  }, []);

  const [editar, setEditar] = useState(false);
  const [exibirForm, setExibirForm] = useState(false);

  const objetoVazio = {
    id_cultura: 0,
    planta_id: "",
    hectares: "",
    data_plantio: "",
    data_colheita: "",
  };

  const [objeto, setObjeto] = useState(objetoVazio);

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto(objetoVazio);
    setExibirForm(true);
  };

  const editarObjeto = async (codigo) => {
    const dadosCultura = await getCulturaPorCodigoAPI(codigo);

    // Garante o formato AAAA-MM-DD exigido pelo input type="date"
    const objetoParaFormulario = {
      ...dadosCultura,
      data_plantio: converterDataParaInput(dadosCultura.data_plantio),
      data_colheita: converterDataParaInput(dadosCultura.data_colheita),
    };

    setObjeto(objetoParaFormulario);
    setEditar(true);
    setAlerta({ status: "", message: "" });
    setExibirForm(true);
  };

  const registrarColheita = async (cultura) => {
    if (
      window.confirm(
        "Deseja registrar a colheita para esta cultura com a data de hoje?",
      )
    ) {
      const dataHoje = obterDataHoje();
      const dataPlantio = converterDataParaInput(cultura.data_plantio);

      // Ambas em AAAA-MM-DD: a comparação de strings é direta
      if (dataHoje <= dataPlantio) {
        setAlerta({
          status: "error",
          message:
            "A data de colheita deve ser estritamente posterior à data de plantio!",
        });
        return;
      }

      const culturaAtualizada = {
        id_cultura: cultura.id_cultura,
        planta_id: cultura.planta_id,
        hectares: cultura.hectares,
        data_plantio: dataPlantio,
        data_colheita: dataHoje,
      };

      try {
        let retornoAPI = await cadastraCulturaAPI(culturaAtualizada, "PUT");
        setAlerta({
          status: retornoAPI.status,
          message:
            retornoAPI.status === "success"
              ? "Colheita registrada com sucesso!"
              : retornoAPI.message,
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
        message:
          "A data de colheita deve ser posterior à data de plantio (não podem ser no mesmo dia)!",
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

      // Só atualiza o formulário se a API devolveu o objeto (em erro pode vir vazio)
      if (retornoAPI.objeto) {
        setObjeto({
          ...retornoAPI.objeto,
          data_plantio: converterDataParaInput(retornoAPI.objeto.data_plantio),
          data_colheita: converterDataParaInput(
            retornoAPI.objeto.data_colheita,
          ),
        });
        if (!editar) {
          setEditar(true);
        }
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
        registrarColheita,
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