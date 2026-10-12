import { useContext } from "react";
import Alerta from "../../common/Alerta";
import ManejoContext from "./ManejoContext";
import Col from "react-bootstrap/Col";
import CampoEntrada from "../../common/CampoEntrada";
import CampoEntradaTextArea from "../../common/CampoEntradaTextArea"; // Para a descrição
import CampoSelect from "../../common/CampoSelect"; // Para selecionar a cultura
import Dialogo from "../../common/Dialogo";
import { formatarDataBR } from "../../common/datas";

function Formulario() {
    const {
    objeto,
    handleChange,
    acaoCadastrar,
    alerta,
    exibirForm,
    setExibirForm,
    listaCulturas,
    dataInicioCultura,
    dataMaxima,
    culturaSelecionada,
  } = useContext(ManejoContext);

  return (
    <Dialogo
      id="modalEdicao"
      titulo="Manejo"
      idform="formulario"
      acaoCadastrar={acaoCadastrar}
      exibirForm={exibirForm}
      setExibirForm={setExibirForm}
    >
      <Alerta alerta={alerta} />

      
      <Col xs={12} md={12}>
        <CampoEntrada
          value={objeto.id_manejo || ""}
          id="txtIdManejo"
          name="id_manejo"
          label="Código do Manejo"
          tipo="number"
          onchange={handleChange}
          readonly={true}
        />
      </Col>
     
      <Col xs={12} md={12}>
        <CampoSelect
          id="txtCulturaId"
          name="cultura_id"
          label="Cultura"
          value={objeto.cultura_id || ""}
          onchange={handleChange}
          requerido={true}
          msginvalido="Selecione uma cultura"
        >
          {listaCulturas?.map((cultura) => {
            const culturaId = cultura.id_cultura || cultura.codigo;
            return (
              <option key={culturaId} value={culturaId}>
                {/* Exibe o ID da cultura e o ID da planta associada */}
                {`Cultura #${culturaId} (Planta ID: ${cultura.planta_id})`}
              </option>
            );
          })}
        </CampoSelect>
      </Col>

      <Col xs={12} md={12}>
        <CampoEntrada
          value={objeto.tipo_manejo || ""}
          id="txtTipoManejo"
          name="tipo_manejo"
          label="Tipo de Manejo"
          tipo="text"
          onchange={handleChange}
          requerido={true}
          msginvalido="Informe o tipo de manejo (ex: Adubação, Poda, Irrigação)"
          maxCaracteres={50}
        />
      </Col>

      
      <Col xs={12} md={12}>
        <CampoEntradaTextArea
          value={objeto.descricao_manejo || ""}
          id="txtDescricaoManejo"
          name="descricao_manejo"
          label="Descrição do Manejo"
          onchange={handleChange}
          requerido={false}
          maxCaracteres={255}
        />
      </Col>

            <Col xs={12} md={12}>
        <CampoEntrada
          value={objeto.data_manejo || ""}
          id="txtDataManejo"
          name="data_manejo"
          label="Data do Manejo"
          tipo="date"
          onchange={handleChange}
          requerido={true}
          msginvalido="Informe a data do manejo"
          min={dataInicioCultura || undefined}
          max={dataMaxima}
        />
        {culturaSelecionada && (
          <small className="text-muted">
            Período da cultura: {formatarDataBR(culturaSelecionada.data_plantio)}{" "}
            até{" "}
            {culturaSelecionada.data_colheita
              ? formatarDataBR(culturaSelecionada.data_colheita)
              : "em andamento"}
          </small>
        )}
      </Col>
    </Dialogo>
  );
}

export default Formulario;
