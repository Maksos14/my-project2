import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Card, Row } from "react-bootstrap";
import bigstar from '../assets/bigstar.png';
import { useParams } from 'react-router-dom';
import { fetchOnePc } from "../http/pcAPI";
import { addToBasket, getBasket, removeFromBasket } from '../http/basketAPI';

const PcPage = () => {
    const [pc, setPc] = useState({ info: [] });
    const { id } = useParams();
    const [basket, setBasket] = useState([]);
    const [isInBasket, setIsInBasket] = useState(false);
    const [basketItemId, setBasketItemId] = useState(null); // ID элемента корзины

    useEffect(() => {
        fetchOnePc(id).then(data => setPc(data));
        loadBasketData();
    }, [id]);

    const loadBasketData = async () => {
        try {
            const basketData = await getBasket();
            setBasket(basketData.basket_pcs || []);
            
            // Находим текущий товар в корзине
            const basketItem = basketData.basket_pcs?.find(item => item.pcId === parseInt(id));
            setIsInBasket(!!basketItem);
            setBasketItemId(basketItem?.id || null);
        } catch (e) {
            console.error("Ошибка загрузки корзины:", e);
        }
    };

    const handleAddToBasket = async () => {
        try {
            const response = await addToBasket(pc.id);
            await loadBasketData();
            console.log("Товар добавлен в корзину:", response);
        } catch (e) {
            console.error("Ошибка добавления в корзину:", e);
            alert(e.response?.data?.message || 'Ошибка добавления в корзину');
        }
    };

    const handleRemoveFromBasket = async () => {
        if (window.confirm("Вы действительно хотите удалить этот товар из корзины?")) {
            try {
                await removeFromBasket(basketItemId);
                await loadBasketData();
                console.log("Товар удален из корзины");
            } catch (e) {
                console.error("Ошибка удаления из корзины:", e);
                alert(e.response?.data?.message || 'Ошибка удаления из корзины');
            }
        }
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + pc.img} />
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
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
                    >
                        <h3>От: {pc.price} руб.</h3>
                        {isInBasket ? (
                            <Button variant="outline-dark" onClick={handleRemoveFromBasket}>
                                В корзине 
                            </Button>
                        ) : (
                            <Button variant="outline-dark" onClick={handleAddToBasket}>
                                Добавить в корзину
                            </Button>
                        )}
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики:</h1>
                {pc.info?.map(info =>
                    <Row key={info.id}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default PcPage;