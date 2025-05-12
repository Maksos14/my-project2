import React from "react";
import {Button, Col, Container, Image} from "react-bootstrap";
import { Card, Row } from 'react-bootstrap';
import bigstar from '../assets/bigstar.png'


const PcPage = () => {
    const pc = { id: 1, name: "dsfdsf", price: 25000, rating: 5, img: "https://countryscanner.ru/forum/download/file.php?avatar=3506_1589297431.jpg" }
    const description = [
        {id:1, title: 'Процессор', description: 'AMD Ryzen 7 2700x'},
        {id:2, title: 'Видеокарта', description: 'PALIT RTX 3060 12GB'},
        {id:3, title: 'Оперативная память', description: '2x16GB DDR4 3200mHz'},
        {id:4, title: 'SSD накопитель', description: 'NVMe Apacer 512GB'},
        {id:5, title: 'Материнская плата', description: 'Gigabyte B450M H'},
        {id:6, title: 'Блок питания', description: '1stPlayer 650W'},
        {id:7, title: 'Корпус', description: 'HAFF FLASH'},
        {id:8, title: 'Охлаждение ЦП', description: 'ID-COOLING SE-214'}
    ]
       return (
        <Container className="mt-3">
            <Row>
            <Col md={4}>
                <Image width={300} height={300} src={pc.img}/>
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
                {description.map(info =>
                    <Row key={info.id}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        
        </Container>
        )
    
}

export default PcPage;