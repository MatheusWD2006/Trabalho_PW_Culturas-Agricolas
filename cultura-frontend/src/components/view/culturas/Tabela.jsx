import { useContext } from "react";
import CulturaContext from "./CulturaContext";
import Alerta from "../../common/Alerta";
import Carregando from "../../common/Carregando"; // Importado
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { formatoDataBR } from "../../common/Uteis"; // Importado

function Tabela() {
  const { alerta, listaObjetos, remover, novoObjeto, editarObjeto, carregando } =
    useContext(CulturaContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Culturas</h1>
      <Alerta alerta={alerta} />
      
      <Button variant="primary" className="mb-3" onClick={() => novoObjeto()}>
        Novo <i className="bi bi-file-earmark-plus"></i>
      </Button>

      {/* Envolvendo a tabela com o componente Carregando */}
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
                <tr key={objeto.codigo}>
                  <td align="center">
                    <Button
                      variant="info"
                      className="me-2"
                      onClick={() => editarObjeto(objeto.codigo)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => remover(objeto.codigo)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                  <td>{objeto.codigo}</td>
                  <td>{objeto.planta_nome || objeto.planta_id}</td>
                  <td>{objeto.hectares}</td>
                  <td>{formatoDataBR(objeto.data_plantio)}</td>
                  <td>{objeto.data_colheita ? formatoDataBR(objeto.data_colheita) : ''}</td>
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