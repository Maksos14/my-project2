import React, { useEffect, useState, useContext } from "react";
import { Button, Col, Container, Image, Card, Row, Form } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { fetchOnePc } from "../http/pcAPI";
import { addToBasket, getBasket, removeFromBasket } from '../http/basketAPI';
import { createRating, getRatingsByPc } from '../http/ratingAPI';
import { Alert } from "react-bootstrap";
import { Context } from "../index";
import "../styles/main.css";
import "../styles/pcShop.css";
import star from '../assets/star.png'

const PcPage = () => {
    const [pc, setPc] = useState({ info: [] });
    const { id } = useParams();
    const [basket, setBasket] = useState([]);
    const [isInBasket, setIsInBasket] = useState(false);
    const [basketItemId, setBasketItemId] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [newRating, setNewRating] = useState({ 
        value: '', 
        comment: '', 
        userName: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { user } = useContext(Context); 
    const userId = user?.id || localStorage.getItem('userId');

    useEffect(() => {
        fetchOnePc(id).then(data => setPc(data));
        loadBasketData();
        loadRatings();
    }, [id]);

    const loadBasketData = async () => {
        try {
            const basketData = await getBasket();
            setBasket(Array.isArray(basketData.basket_pcs) ? basketData.basket_pcs : []);
            const basketItem = basketData.basket_pcs?.find(item => item.pcId === parseInt(id));
            setIsInBasket(!!basketItem);
            setBasketItemId(basketItem?.id || null);
        } catch (e) {
            console.error("Ошибка загрузки корзины:", e);
        }
    };

    const loadRatings = async () => {
        try {
            const ratingsData = await getRatingsByPc(id);
            console.log("Полученные рейтинги:", ratingsData); 
            setRatings(Array.isArray(ratingsData) ? ratingsData : []);
        } catch (e) {
            console.error("Ошибка загрузки отзывов:", e);
            setRatings([]);
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

    const handleRatingSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
        setError("Вы должны быть авторизованы, чтобы оставить отзыв.");
        return;
    }

    const hasRatedAlready = ratings.some(r => Number(r.userId) === Number(userId) && Number(r.pcId) === Number(id));
    if (hasRatedAlready) {
        setError("Вы уже оставили отзыв для этого ПК!");
        return;
    }

    if (newRating.comment.length < 20) {
        setError("Отзыв должен содержать минимум 20 символов.");
        return;
    }

    try {
        const ratingData = {
            pcId: id,
            rate: parseInt(newRating.value),
            comment: newRating.comment,
            userName: newRating.userName,
            userId
        };

        await createRating(ratingData);
        setNewRating({ value: '', comment: '' });
        setSuccess("Ваш отзыв успешно добавлен!");
        await loadRatings();
    } catch (e) {
        console.error("Ошибка добавления отзыва:", e);
        setError(e.response?.data?.message || 'Ошибка добавления отзыва');
    }
};



    const handleInputChange = (e) => {
        const { name, value } = e.target;
            setNewRating(prev => ({
                ...prev,
                [name]: value
            }
        ));
    };

    const calculateAverageRating = () => {
    if (ratings.length === 0) return 0;
    
    const sum = ratings.reduce((total, rating) => total + Number(rating.rate), 0);
    const average = sum / ratings.length;
    

    return Math.round(average * 10) / 10;
};

    return (
        <Container className="mt-3">
           <Row>
    {/* Колонка с фото (увеличено) */}
    <Col md={5}>
      <Image 
        width={350}
        height={350} 
        src={process.env.REACT_APP_API_URL + pc.img}
        className="mb-3"
      />
    </Col>

    {/* Колонка с информацией */}
    <Col md={7}>
      <h2 className="mb-3">{pc.name}</h2>
      
      {/* Рейтинг */}
     <div className="mb-3">
  {Array.from({ length: 5 }).map((_, i) => {
    const avgRating = calculateAverageRating();
    return (
      <span 
        key={i} 
        className={i < Math.round(avgRating) ? "text-warning" : "text-muted"}
      >
        {i < Math.round(avgRating) ? '★' : '☆'}
      </span>
    );
  })}
  <span className="ml-2">{calculateAverageRating()}</span>
  <div className="text-muted">({ratings.length} отзывов)</div>
</div>

      {/* Цена и кнопка */}
      <div className="mb-4">
        <h4>От: {pc.price} BYN</h4>
        {isInBasket ? (
          <Button variant="outline-danger" onClick={handleRemoveFromBasket}>
            В корзине
          </Button>
        ) : (
          <Button variant="outline-success" onClick={handleAddToBasket}>
            Добавить в корзину
          </Button>
        )}
      </div>

      {/* Характеристики */}
      <div className="mt-4">
        <h4>Характеристики:</h4>
        {pc.info?.map(info => (
          <div key={info.id}>
            <strong>{info.title}:</strong> {info.description}
          </div>
        ))}
      </div>
    </Col>
  </Row>


            <Row className="mt-4">
                <Col>
                    <Card className="mb-4">
                        <Card.Body>
                             {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}
                            
                            <Form onSubmit={handleRatingSubmit}>
                                <Form.Group className="mb-3">
                                 <Form.Label>Ваше имя</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="userName"
                                        value={newRating.userName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Оценка (1-5) </Form.Label>
                                    <Form.Select
                                        name="value"
                                        value={newRating.value}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Выберите оценку</option>
                                        <option value="1">1 ★</option>
                                        <option value="2">2 ★★</option>
                                        <option value="3">3 ★★★</option>
                                        <option value="4">4 ★★★★</option>
                                        <option value="5">5 ★★★★★</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Комментарий (не менее 20 символов)</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="comment"
                                        value={newRating.comment}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                
                                   
                                <Button variant="primary" type="submit">
                                    Оставить отзыв
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <h4>
                        Отзывы покупателей:
                    </h4>
                    {ratings.map(rating => (
                        <Card key={rating.id} className="mb-3">
                            <Card.Body>
                                <Card.Title>
                                    {rating.userName} 
                                    <div>
                                    {'★'.repeat(rating.rate)}
                                    </div>
                                </Card.Title>
                                <Card.Text>{rating.comment}</Card.Text>
                                <Card.Text className="text-muted">
                                    {new Date(rating.createdAt).toLocaleString()}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default PcPage;
