import { useState, useEffect } from "react";
import ManejoContext from "./ManejoContext";
import {
  getManejosAPI,
  getManejoPorCodigoAPI,
  deleteManejoPorCodigoAPI,
  cadastraManejoAPI,
} from "../../../services/ManejoServico";
import { getCulturasAPI } from "../../../services/CulturaServico"; // Importa API de Culturas
import Tabela from "./Tabela";
import Formulario from "./Formulario";
import Carregando from "../../common/Carregando";

function Manejo() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [listaCulturas, setListaCulturas] = useState([]); // Estado para o Select
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
    recuperaCulturas(); // Busca as culturas ao carregar
  }, []);

  const [editar, setEditar] = useState(false);
  const [exibirForm, setExibirForm] = useState(false);

  // Objeto alinhado com a tabela/entidade de Manejo
  const [objeto, setObjeto] = useState({
    id_manejo: 0,
    cultura_id: "",
    tipo_manejo: "",
    descricao_manejo: "",
    data_manejo: "",
  });

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto({
      id_manejo: 0,
      cultura_id: "",
      tipo_manejo: "",
      descricao_manejo: "",
      data_manejo: "",
    });
    setExibirForm(true);
  };

  // Função auxiliar para converter DD/MM/YYYY para YYYY-MM-DD
  const converterDataParaInput = (dataStr) => {
    if (!dataStr) return "";
    // Se já estiver no formato YYYY-MM-DD, retorna como está
    if (dataStr.includes("-")) return dataStr;

    const partes = dataStr.split("/");
    if (partes.length === 3) {
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
    return "";
  };

  const editarObjeto = async (codigo) => {
    const dadosManejo = await getManejoPorCodigoAPI(codigo);

    // Converte a data do manejo para o formato do input type="date"
    if (dadosManejo.data_manejo) {
      dadosManejo.data_manejo = converterDataParaInput(dadosManejo.data_manejo);
    }

    setObjeto(dadosManejo);
    setEditar(true);
    setAlerta({ status: "", message: "" });
    setExibirForm(true);
  };

  const acaoCadastrar = async (e) => {
    e.preventDefault();
    const metodo = editar ? "PUT" : "POST";

    try {
      let retornoAPI = await cadastraManejoAPI(objeto, metodo);
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
        listaCulturas, // Disponibilizado no Contexto
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
