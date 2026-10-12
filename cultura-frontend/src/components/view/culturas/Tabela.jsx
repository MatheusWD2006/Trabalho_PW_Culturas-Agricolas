import { useContext } from "react";
import CulturaContext from "./CulturaContext";
import Alerta from "../../common/Alerta";
import Carregando from "../../common/Carregando";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { formatarDataBR } from "../../common/datas";

function Tabela() {
  const {
    alerta,
    listaObjetos,
    remover,
    novoObjeto,
    editarObjeto,
    registrarColheita,
    carregando,
  } = useContext(CulturaContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Culturas</h1>
      <Alerta alerta={alerta} />

      <Button variant="primary" className="mb-3" onClick={() => novoObjeto()}>
        Novo <i className="bi bi-file-earmark-plus"></i>
      </Button>

      <Carregando carregando={carregando}>
        {listaObjetos.length === 0 ? (
          <h1>Nenhuma cultura encontrada</h1>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Ações</th>
                <th>Código</th>
                <th>Planta</th>
                <th>Hectares</th>
                <th>Data do Plantio</th>
                <th>Data da Colheita</th>
              </tr>
            </thead>
            <tbody>
              {listaObjetos.map((objeto) => (
                <tr key={objeto.id_cultura}>
                  <td align="center">
                    {/* O botão de Colher aparece apenas se a data de colheita estiver vazia */}
                    {!objeto.data_colheita && (
                      <Button
                        variant="success"
                        className="me-2"
                        title="Registrar Colheita"
                        onClick={() => registrarColheita(objeto)}
                      >
                        <i className="bi bi-check2-all"></i> Colher
                      </Button>
                    )}

                    <Button
                      variant="info"
                      className="me-2"
                      onClick={() => editarObjeto(objeto.id_cultura)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => remover(objeto.id_cultura)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                  <td>{objeto.id_cultura}</td>
                  <td>{objeto.planta_nome || objeto.planta_id}</td>
                  <td>{objeto.hectares}</td>
                  <td>{formatarDataBR(objeto.data_plantio)}</td>
                  <td>{formatarDataBR(objeto.data_colheita)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Carregando>
    </div>
  );
}

export default Tabela;
