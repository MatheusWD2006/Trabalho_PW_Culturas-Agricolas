import { useContext } from 'react';

import Alerta from '../../common/Alerta';
import CulturaContext from './CulturaContext';

import Col from 'react-bootstrap/Col';

import CampoEntrada from '../../common/CampoEntrada';
import Dialogo from '../../common/Dialogo';

function Formulario() {

    const {
        objeto,
        handleChange,
        acaoCadastrar,
        alerta,
        exibirForm,
        setExibirForm
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

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.id_cultura}
                    id="txtIDcultura"
                    name="id_cultura"
                    label="ID da Cultura"
                    tipo="number"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5}
                />
            </Col>

           <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.planta_id}
                    id="txtPlantaId"
                    name="planta_id"
                    label="ID da Planta"
                    tipo="number"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5}
                />
            </Col>

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.hectares}
                    id="txtHectares"
                    name="hectares"
                    label="Hectares"
                    tipo="float"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5}
                />
            </Col>

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.data_plantio}
                    id="txtDataPlantio"
                    name="data_plantio"
                    label="Data do Plantio"
                    tipo="date"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5}
                />
            </Col>

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.data_colheita}
                    id="txtDataColheita"
                    name="data_colheita"
                    label="Data da Colheita"
                    tipo="date"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5}
                />
            </Col>

        </Dialogo>
    )
}

export default Formulario;
