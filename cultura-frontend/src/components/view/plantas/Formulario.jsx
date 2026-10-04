import { useContext } from 'react';

import Alerta from '../../common/Alerta';
import PlantaContext from './PlantaContext';

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
    } = useContext(PlantaContext);

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
                    value={objeto.id_planta}
                    id="txtIDplanta"
                    name="id_planta"
                    label="ID da Planta"
                    tipo="number"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5}
                />
            </Col>

           <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.nome_planta}
                    id="txtNomePlanta"
                    name="nome_planta"
                    label="Nome da Planta"
                    tipo="text"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5}
                />
            </Col>

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.nome_cientifico}
                    id="txtNomeCientifico"
                    name="nome_cientifico"
                    label="Nome Científico"
                    tipo="text"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5}
                />
            </Col>

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.tipo_planta}
                    id="txtTipoPlanta"
                    name="tipo_planta"
                    label="Tipo da Planta"
                    tipo="text"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5}
                />
            </Col>

            <Col xs={12} md={12}>
                <CampoEntrada
                    value={objeto.descricao_planta}
                    id="txtDescricaoPlanta"
                    name="descricao_planta"
                    label="Descrição da Planta"
                    tipo="text"
                    onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5}
                />
            </Col>

        </Dialogo>
    )
}

export default Formulario;
