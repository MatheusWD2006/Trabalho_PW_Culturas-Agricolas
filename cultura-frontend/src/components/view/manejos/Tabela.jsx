import { useContext } from "react";
import ManejoContext from "./ManejoContext";
import Alerta from "../../common/Alerta";
import Carregando from "../../common/Carregando";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { formatoDataBR } from "../../common/Uteis";

function Tabela() {
  const { alerta, listaObjetos, remover, novoObjeto, editarObjeto, carregando } =
    useContext(ManejoContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manejos</h1>
      <Alerta alerta={alerta} />
      
      <Button variant="primary" className="mb-3" onClick={() => novoObjeto()}>
        Novo <i className="bi bi-file-earmark-plus"></i>
      </Button>

      <Carregando carregando={carregando}>
        {listaObjetos.length === 0 ? (
          <h1>Nenhum manejo encontrado</h1>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Ações</th>
                <th>Código</th>
                <th>Cultura</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Data do Manejo</th>
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
                  <td>{objeto.cultura_nome || objeto.cultura_id}</td>
                  <td>{objeto.tipo_manejo}</td>
                  <td>{objeto.descricao_manejo}</td>
                  <td>{objeto.data_manejo ? formatoDataBR(objeto.data_manejo) : ''}</td>
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