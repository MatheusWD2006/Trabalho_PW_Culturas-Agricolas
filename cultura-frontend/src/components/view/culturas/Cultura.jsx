import { useState, useEffect } from "react";
import CulturaContext from "./CulturaContext";
import {
  getCulturasAPI,
  getCulturaPorCodigoAPI,
  deleteCulturaPorCodigoAPI,
  cadastraCulturaAPI,
} from "../../../services/CulturaServico";
import Tabela from "./Tabela";
import Formulario from "./Formulario";
import Carregando from "../../common/Carregando";

function Cultura() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const recuperaCulturas = async () => {
    setCarregando(true);

    setListaObjetos(await getCulturasAPI());

    setCarregando(false);
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
    setObjeto(await getCulturaPorCodigoAPI(codigo));
    setEditar(true);
    setAlerta({ status: "", message: "" });
    setExibirForm(true);
  };

  const acaoCadastrar = async (e) => {
    e.preventDefault();
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
    </CulturaContext.Provider>
  );
}

export default Cultura;
