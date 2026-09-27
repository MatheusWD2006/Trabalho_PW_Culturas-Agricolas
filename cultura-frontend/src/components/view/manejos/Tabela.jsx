import { useContext } from "react";
import ManejoContext from "./ManejoContext";
import Alerta from "../../common/Alerta";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

function Tabela() {
  const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } =
    useContext(ManejoContext);

  console.log(listaObjetos);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manejos</h1>
      <Alerta alerta={alerta} />
      <Button variant="primary" onClick={() => novoObjeto()}>
        Novo <i className="bi bi-file-earmark-plus"></i>
      </Button>
      {listaObjetos.length === 0 && <h1>Nenhum manejo encontrado</h1>}
      {listaObjetos.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "center",
                }}
              >
                Ações
              </th>
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
                    onClick={() => editarObjeto(objeto.codigo)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      remover(objeto.codigo);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
                <td>{objeto.id_manejo}</td>
                <td>{objeto.cultura_id}</td>
                <td>{objeto.tipo_manejo}</td>
                <td>{objeto.descricao_manejo}</td>
                <td>{objeto.data_manejo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Tabela;