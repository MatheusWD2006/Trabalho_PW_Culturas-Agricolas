import { useContext } from 'react';

import Alerta from '../../common/Alerta';
import ManejoContext from './ManejoContext';

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
                    value={objeto.id_manejo}
                    id="txtIDmanejo"
                    name="id_manejo"
                    label="ID do Manejo"
                    tipo="number"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5}
                />
            </Col>

           <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.cultura_id}
                    id="txtCulturaId"
                    name="cultura_id"
                    label="ID da Cultura"
                    tipo="number"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5}
                />
            </Col>

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.tipo_manejo}
                    id="txtTipoManejo"
                    name="tipo_manejo"
                    label="Tipo de Manejo"
                    tipo="text"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5}
                />
            </Col>

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.descricao_manejo}
                    id="txtDescricaoManejo"
                    name="descricao_manejo"
                    label="Descrição do Manejo"
                    tipo="text"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5}
                />
            </Col>

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.data_manejo}
                    id="txtDataManejo"
                    name="data_manejo"
                    label="Data do Manejo"
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
