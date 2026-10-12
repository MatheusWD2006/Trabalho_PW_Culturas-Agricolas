import { useState, useEffect } from "react";
import ManejoContext from "./ManejoContext";
import {
  getManejosAPI,
  getManejoPorCodigoAPI,
  deleteManejoPorCodigoAPI,
  cadastraManejoAPI,
} from "../../../services/ManejoServico";
import { getCulturasAPI } from "../../../services/CulturaServico";
import {
  converterDataParaInput,
  formatarDataBR,
  obterDataHoje,
} from "../../common/datas";
import Tabela from "./Tabela";
import Formulario from "./Formulario";
import Carregando from "../../common/Carregando";

function Manejo() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [listaCulturas, setListaCulturas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const recuperaManejos = async () => {
    setCarregando(true);
    setListaObjetos(await getManejosAPI());
    setCarregando(false);
  };

  const recuperaCulturas = async () => {
    setListaCulturas(await getCulturasAPI());
  };

  const remover = async (codigo) => {
    if (window.confirm("Deseja remover este objeto?")) {
      let retornoAPI = await deleteManejoPorCodigoAPI(codigo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      recuperaManejos();
    }
  };

  useEffect(() => {
    recuperaManejos();
    recuperaCulturas();
  }, []);

  const [editar, setEditar] = useState(false);
  const [exibirForm, setExibirForm] = useState(false);

 
  const objetoVazio = {
    id_manejo: 0,
    cultura_id: "",
    tipo_manejo: "",
    descricao_manejo: "",
    data_manejo: "",
  };

  const [objeto, setObjeto] = useState(objetoVazio);

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto(objetoVazio);
    setExibirForm(true);
  };

  const editarObjeto = async (codigo) => {
    const dadosManejo = await getManejoPorCodigoAPI(codigo);


    const objetoParaForm = {
      ...dadosManejo,
      data_manejo: converterDataParaInput(dadosManejo.data_manejo),
    };

    setObjeto(objetoParaForm);
    setEditar(true);
    setAlerta({ status: "", message: "" });
    setExibirForm(true);
  };
  // Obtém a cultura selecionada com base no ID da cultura do manejo
  const culturaSelecionada = listaCulturas.find(
    (c) => String(c.id_cultura ?? c.codigo) === String(objeto.cultura_id),
  );
  // Obtém as datas de plantio e colheita da cultura selecionada, se houver
  const dataInicioCultura = culturaSelecionada
    ? converterDataParaInput(culturaSelecionada.data_plantio)
    : "";
  const dataFimCultura = culturaSelecionada
    ? converterDataParaInput(culturaSelecionada.data_colheita)
    : "";

  const hoje = obterDataHoje();
  // Define a data máxima para o manejo com base na data de colheita da cultura ou na data atual
  const dataMaxima =
    dataFimCultura && dataFimCultura < hoje ? dataFimCultura : hoje;

  const acaoCadastrar = async (e) => {
    e.preventDefault();

    if (objeto.data_manejo) {
      let mensagemErro = "";
      // Validações de data do manejo em relação ao plantio e colheita da cultura
      if (objeto.data_manejo > hoje) {
        mensagemErro = "A data do manejo não pode ser uma data futura.";
      } else if (dataInicioCultura && objeto.data_manejo < dataInicioCultura) {
        mensagemErro = `A data do manejo não pode ser anterior ao plantio da cultura (${formatarDataBR(dataInicioCultura)}).`;
      } else if (dataFimCultura && objeto.data_manejo >= dataFimCultura) {
        mensagemErro = `A data do manejo não pode ser posterior ou igual à colheita da cultura (${formatarDataBR(dataFimCultura)}).`;
      }

      if (mensagemErro) {
        setAlerta({ status: "error", message: mensagemErro });
        return;
      }
    }

    const metodo = editar ? "PUT" : "POST";

    try {
      let retornoAPI = await cadastraManejoAPI(objeto, metodo);
      setAlerta({
        status: retornoAPI.status,
        message: retornoAPI.message,
      });

      // Só atualiza o formulário se a API devolveu o objeto (em erro pode vir vazio)
      if (retornoAPI.objeto) {
        setObjeto({
          ...retornoAPI.objeto,
          data_manejo: converterDataParaInput(retornoAPI.objeto.data_manejo),
        });
        if (!editar) {
          setEditar(true);
        }
      }
    } catch (err) {
      console.error(err.message);
    }

    recuperaManejos();
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
    <ManejoContext.Provider
      value={{
        listaObjetos,
        listaCulturas,
        dataInicioCultura,
        dataMaxima,
        culturaSelecionada,
        alerta,
        remover,
        objeto,
        editarObjeto,
        acaoCadastrar,
        handleChange,
        novoObjeto,
        exibirForm,
        setExibirForm,
        carregando,
      }}
    >
      <Carregando carregando={carregando}>
        <Tabela />
      </Carregando>
      <Formulario />
    </ManejoContext.Provider>
  );
}

export default Manejo;
