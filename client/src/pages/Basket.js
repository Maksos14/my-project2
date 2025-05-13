import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Context } from '../index';
import { getBasket, removeFromBasket } from '../http/basketAPI';
import { observer } from 'mobx-react-lite';

const Basket = observer(() => {
    const { user } = useContext(Context);
    const [basketItems, setBasketItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (user.isAuth) {
            getBasket().then(data => {
                setBasketItems(data.basket_pcs || []);
                calculateTotal(data.basket_pcs || []);
            });
        }
    }, [user.isAuth]);

    const calculateTotal = (items) => {
        const sum = items.reduce((acc, item) => acc + (item.pc?.price || 0), 0);
        setTotal(sum);
    };

    const handleRemove = async (id) => {
        await removeFromBasket(id);
        const updatedBasket = await getBasket();
        setBasketItems(updatedBasket.basket_pcs || []);
        calculateTotal(updatedBasket.basket_pcs || []);
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Ваша корзина</h2>
            {basketItems.length > 0 ? (
                <>
                    <ListGroup>
                        {basketItems.map(item => (
                            <ListGroup.Item key={item.id}>
                                <Row className="align-items-center">
                                    <Col md={4}>
                                        <Card.Img 
                                            variant="top" 
                                            src={process.env.REACT_APP_API_URL + item.pc.img}
                                            style={{ width: '100px' }}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <h5>{item.pc.name}</h5>
                                        <p>{item.pc.price} руб.</p>
                                    </Col>
                                    <Col md={4}>
                                        <Button 
                                            variant="outline-danger"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Удалить
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <div className="mt-3">
                        <h4>Итого: {total} руб.</h4>
                        <Button variant="success" size="lg" className="mt-2">
                            Оформить заказ
                        </Button>
                    </div>
                </>
            ) : (
                <Card>
                    <Card.Body>
                        <Card.Title>Корзина пуста</Card.Title>
                        <Card.Text>
                            Добавьте товары из каталога
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
});

export default Basket;