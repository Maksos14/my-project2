import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import PcList from "../components/PcList";
import { Context } from "..";
import { fetchPcs } from "../http/pcAPI";
import { toJS } from "mobx";

const Shop = () => {
    const { pc } = useContext(Context);

    useEffect(() => {
        fetchPcs().then(data => pc.setPcs(data.rows))
    }, []);
    
    

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>

                        <PcList pcs={toJS(pc.pcs)} />

                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
