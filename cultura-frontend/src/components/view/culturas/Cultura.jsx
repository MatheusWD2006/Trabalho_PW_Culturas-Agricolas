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
        listaPlantas, // Disponibilizado no Contexto
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
    </CulturaContext.Provider>
  );
}

export default Cultura;