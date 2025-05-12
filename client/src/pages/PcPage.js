import React, { useEffect, useState } from "react";
import {Button, Col, Container, Image, Card, Row} from "react-bootstrap";
import bigstar from '../assets/bigstar.png'
import { data, useParams } from "react-router-dom";
import { fetchOnePc } from "../http/pcAPI";


const PcPage = () => {
    const [pc, setPc] = useState({info: []})
    const {id} = useParams()
    console.log(id)
    useEffect(() => {
        fetchOnePc(id).then(data => setPc(data))
        
    }, [])

       return (
        <Container className="mt-3">
            <Row>
            <Col md={4}>
                <Image width={300} height={300} src={process.env.REACT_APP_API_URL + pc.img}/>
            </Col>
            <Col md={4}>
                <Row className="d-flex flex-column align-items-center">
                    <h2>{pc.name}</h2>
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{background: `url(${bigstar}) no-repeat center`, width: 240, height: 240, backgroundSize: 'cover', fontSize:64}}
                    >
                        {pc.rating}
                    </div>
                </Row>
            </Col>
            <Col md={4}>
                <Card
                    className = "d-flex flex-column align-items-center justify-content-around"
                    style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                >
                    <h3>От: {pc.price} руб.</h3>
                    <Button variant={"outline-dark"}>Добавить в корзину</Button>
                </Card>
            </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики:</h1>
                {pc.info && pc.info.map(info =>
                    <Row key={info.id}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        
        </Container>
        )
    
}

export default PcPage;