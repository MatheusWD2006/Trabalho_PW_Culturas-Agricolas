import { useState, useEffect } from "react";
import ManejoContext from "./ManejoContext";
import {
  getManejosAPI,
  getManejoPorCodigoAPI,
  deleteManejoPorCodigoAPI,
  cadastraManejoAPI,
} from "../../../services/ManejoServico";
import { getCulturasAPI } from "../../../services/CulturaServico";
import { converterDataParaInput } from "../../../common/datas";
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

    // Cópia com a data no formato do input type="date" (AAAA-MM-DD)
    const objetoParaForm = {
      ...dadosManejo,
      data_manejo: converterDataParaInput(dadosManejo.data_manejo),
    };

    setObjeto(objetoParaForm);
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