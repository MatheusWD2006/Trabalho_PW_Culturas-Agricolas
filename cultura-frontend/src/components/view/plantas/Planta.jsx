import { useState, useEffect } from "react";
import PlantaContext from "./PlantaContext";
import {
  getPlantasAPI,
  getPlantaPorCodigoAPI,
  deletePlantaPorCodigoAPI,
  cadastraPlantaAPI,
} from "../../../services/PlantaServico";
import Tabela from "./Tabela";
import Formulario from "./Formulario";
import Carregando from "../../common/Carregando";

function Planta() {
  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const recuperaPlantas = async () => {
    setCarregando(true);
    setListaObjetos(await getPlantasAPI());
    setCarregando(false);
  };

  const remover = async (codigo) => {
    if (window.confirm("Deseja remover este objeto?")) {
      let retornoAPI = await deletePlantaPorCodigoAPI(codigo);
      setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
      recuperaPlantas();
    }
  };

  useEffect(() => {
    recuperaPlantas();
  }, []);

  const [editar, setEditar] = useState(false);
  const [exibirForm, setExibirForm] = useState(false);

  
  const [objeto, setObjeto] = useState({
    id_planta: 0,
    nome_planta: "",
    nome_cientifico: "",
    tipo_planta: "",
    descricao_planta: "",
  });

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto({
      id_planta: 0,
      nome_planta: "",
      nome_cientifico: "",
      tipo_planta: "",
      descricao_planta: "",
    });
    setExibirForm(true);
  };

  const editarObjeto = async (codigo) => {
    setObjeto(await getPlantaPorCodigoAPI(codigo));
    setEditar(true);
    setAlerta({ status: "", message: "" });
    setExibirForm(true);
  };

  const acaoCadastrar = async (e) => {
    e.preventDefault();
    const metodo = editar ? "PUT" : "POST";

    try {
      let retornoAPI = await cadastraPlantaAPI(objeto, metodo);
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

    recuperaPlantas();
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
    <PlantaContext.Provider
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
        carregando,
      }}
    >
      <Carregando carregando={carregando}>
        <Tabela />
      </Carregando>
      <Formulario />
    </PlantaContext.Provider>
  );
}

export default Planta;