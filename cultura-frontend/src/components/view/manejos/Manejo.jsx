import { useState, useEffect } from "react";
import ManejoContext from "./ManejoContext";
import {
  getManejosAPI,
  getManejoPorCodigoAPI,
  deleteManejoPorCodigoAPI,
  cadastraManejoAPI,
} from "../../../services/CulturaServico";
import Tabela from "./Tabela";
import Formulario from "./Formulario";
import Carregando from "../../common/Carregando";

function Manejo() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const recuperaManejos = async () => {
    setCarregando(true);

    setListaObjetos(await getManejosAPI());

    setCarregando(false);
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
  }, []);

  // Novos estados e métodos
  const [editar, setEditar] = useState(false);
  const [exibirForm, setExibirForm] = useState(false);

  const [objeto, setObjeto] = useState({
    codigo: "",
    nome: "",
    descricao: "",
    sigla: "",
  });

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto({
      codigo: 0,
      nome: "",
    });
    setExibirForm(true);
  };

  const editarObjeto = async (codigo) => {
    setObjeto(await getManejoPorCodigoAPI(codigo));
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
        alerta,
        remover,
        objeto,
        editarObjeto,
        acaoCadastrar,
        handleChange,
        novoObjeto,
        exibirForm,
        setExibirForm,
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
