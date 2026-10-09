import { useContext } from 'react';
import Alerta from '../../common/Alerta';
import CulturaContext from './CulturaContext';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../common/CampoEntrada';
import CampoSelect from '../../common/CampoSelect'; // Importado
import Dialogo from '../../common/Dialogo';

function Formulario() {

    const {
        objeto,
        handleChange,
        acaoCadastrar,
        alerta,
        exibirForm,
        setExibirForm,
        listaPlantas // Supondo que tenha a lista de plantas no contexto
    } = useContext(CulturaContext);

    return (
        <Dialogo
            id="modalEdicao"
            titulo="Cultura"
            idform="formulario"
            acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm}
            setExibirForm={setExibirForm}
        >

            <Alerta alerta={alerta} />

            {/* Apenas o código/ID é de leitura (readonly) */}
            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.codigo || ''}
                    id="txtCodigo"
                    name="codigo"
                    label="Código"
                    tipo="number"
                    onchange={handleChange}
                    readonly={true}
                />
            </Col>

            {/* Exemplo usando CampoSelect para escolher a Planta */}
            <Col xs={12} md={12}>
                <CampoSelect
                    id="txtPlantaId"
                    name="planta_id"
                    label="Planta"
                    value={objeto.planta_id || ''}
                    onchange={handleChange}
                    requerido={true}
                    msginvalido="Selecione uma planta"
                >
                    {listaPlantas?.map((planta) => (
                        <option key={planta.codigo} value={planta.codigo}>
                            {planta.nome}
                        </option>
                    ))}
                </CampoSelect>
            </Col>

            {/* Hectares sem readonly e tipo="number" */}
            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.hectares || ''}
                    id="txtHectares"
                    name="hectares"
                    label="Hectares"
                    tipo="number"
                    onchange={handleChange}
                    requerido={true}
                    msginvalido="Informe a quantidade de hectares"
                />
            </Col>

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.data_plantio || ''}
                    id="txtDataPlantio"
                    name="data_plantio"
                    label="Data do Plantio"
                    tipo="date"
                    onchange={handleChange}
                    requerido={true}
                    msginvalido="Informe a data de plantio"
                />
            </Col>

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.data_colheita || ''}
                    id="txtDataColheita"
                    name="data_colheita"
                    label="Data da Colheita"
                    tipo="date"
                    onchange={handleChange}
                    requerido={false}
                />
            </Col>

        </Dialogo>
    );
}

export default Formulario;