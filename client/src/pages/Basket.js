import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Context } from '../index';
import { getBasket, removeFromBasket } from '../http/basketAPI';
import { observer } from 'mobx-react-lite';
import '../styles/epic-cart.css'; 
import { SHOP_ROUTE } from '../utils/consts';
import { Link } from 'react-router-dom';

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
        <Container className="epic-cart-container">
            <h1 className="epic-cart-title">ВАША КОРЗИНА</h1>
            
            {basketItems.length > 0 ? (
                <>
                    {basketItems.map(item => (
                        <div key={item.id} className="epic-cart-item">
                            <Row className="align-items-center">
                                <Col md={4}>
                                    <img
                                        src={process.env.REACT_APP_API_URL + item.pc.img}
                                        className="epic-cart-image"
                                        alt={item.pc.name}
                                    />
                                </Col>
                                <Col md={4}>
                                    <h5 className="epic-cart-product-name">{item.pc.name}</h5>
                                    <p className="epic-cart-price">{item.pc.price} руб.</p>
                                </Col>
                                <Col md={4}>
                                    <button 
                                        className="epic-cart-delete-btn"
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        Удалить
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    ))}
                    
                    <hr className="epic-cart-divider" />
                    
                    <div className="epic-cart-total">
                        <span>Итого:</span>
                        <span className="epic-cart-total-price">{total} руб.</span>
                    </div>
                    
                    <button className="epic-cart-checkout-btn">
                        Оформить заказ
                    </button>
                </>
            ) : (
                <Card className="epic-empty-cart">
        <Card.Body>
            <Card.Title className="epic-empty-title">КОРЗИНА ПУСТА</Card.Title>
            <Card.Text className="epic-empty-text">
                Добавьте товары из каталога
            </Card.Text>
            <Link to={SHOP_ROUTE} className="epic-empty-btn">
                Перейти в каталог
            </Link>
        </Card.Body>
    </Card>
            )}
        </Container>
    );
});

export default Basket;