import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import PcList from "../components/PcList";
import { Context } from "..";
import { fetchPcs } from "../http/pcAPI";
import { toJS } from "mobx";
import Pages from "../components/Pages.js"
import { observer } from "mobx-react-lite";
import '../styles/index.css'; 


const Shop = observer( () => {
    const { pc } = useContext(Context);

    useEffect(() => {
        fetchPcs(1, 2).then(data => {
            pc.setPcs(data.rows);
            pc.setTotalCount(data.count);
        });
    }, []);
    
    useEffect(() => {
        fetchPcs(pc.page, 8).then(data => {
            pc.setPcs(data.rows);
            pc.setTotalCount(data.count);
        });
    }, [pc.page]);

    return (
        <Container className="fade-in">
            <Row className="mt-3">
                <Col md={3} className="dark-column">
                    <TypeBar />
                </Col>
                <Col md={9}>

                        <PcList pcs={toJS(pc.pcs)} />
                        <Pages/>

                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
