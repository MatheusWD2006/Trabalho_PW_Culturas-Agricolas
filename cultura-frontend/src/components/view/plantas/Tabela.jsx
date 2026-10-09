import { useContext } from "react";
import PlantaContext from "./PlantaContext";
import Alerta from "../../common/Alerta";
import Carregando from "../../common/Carregando";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";

function Tabela() {
  const { alerta, listaObjetos, remover, novoObjeto, editarObjeto, carregando } =
    useContext(PlantaContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Plantas</h1>
      <Alerta alerta={alerta} />

      <Button variant="primary" className="mb-3" onClick={() => novoObjeto()}>
        Novo <i className="bi bi-file-earmark-plus"></i>
      </Button>

      <Carregando carregando={carregando}>
        {listaObjetos.length === 0 ? (
          <h1>Nenhuma planta encontrada</h1>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Ações</th>
                <th>Código</th>
                <th>Nome</th>
                <th>Nome Científico</th>
                <th>Tipo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {listaObjetos.map((objeto) => {
                const id = objeto.id_planta || objeto.codigo;
                return (
                  <tr key={id}>
                    <td align="center">
                      <Button
                        variant="info"
                        className="me-2"
                        onClick={() => editarObjeto(id)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => remover(id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                    <td>{id}</td>
                    <td>{objeto.nome_planta}</td>
                    <td>{objeto.nome_cientifico}</td>
                    <td>{objeto.tipo_planta}</td>
                    <td>{objeto.descricao_planta}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Carregando>
    </div>
  );
}

export default Tabela;