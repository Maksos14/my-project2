import React, { useState, useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PC_ROUTE } from "../utils/consts";
import { getRatingsByPc } from "../http/ratingAPI"; 
import '../styles/epic-card.css';

const PcItem = ({ pc }) => {
    const navigate = useNavigate();
    const [ratings, setRatings] = useState([]);
    const [avgRating, setAvgRating] = useState('0.0');

    useEffect(() => {
        const loadRatings = async () => {
            try {
                const data = await getRatingsByPc(pc.id);
                console.log(`Оценки для PC ${pc.id}:`, data);
                
                if (data && data.length > 0) {
                    setRatings(data);
                    const sum = data.reduce((total, r) => total + Number(r.rate), 0);
                    setAvgRating((sum / data.length).toFixed(1));
                }
            } catch (e) {
                console.error(`Ошибка загрузки оценок для PC ${pc.id}:`, e);
            }
        };
        
        loadRatings();
    }, [pc.id]);


    return (
        <Col md={3} className="mt-3" onClick={() => navigate(PC_ROUTE + '/' + pc.id)}>
            <Card className="epic-pc-card">
                <div className="epic-pc-image-container">
                    <Image className="epic-pc-image" src={process.env.REACT_APP_API_URL + pc.img} />
                </div>
                <div className="epic-pc-content">
                    <div className="epic-pc-category">Игровой ПК</div>
                    <h3 className="epic-pc-name">{pc.name}</h3>
                    <div className="epic-pc-rating">
                        <div className="stars-and-rating">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span 
                                    key={i} 
                                    className={i < Math.round(avgRating) ? "star-filled" : "star-empty" }
                                >
                                    {i < Math.round(avgRating) ? '★' : '☆'}
                                </span>
                            ))}
                            <span className="rating-value">{avgRating}</span>
                        </div>
                        <div className="reviews-count">
                            ({ratings.length})
                        </div>
                    </div>
                    <h4 className="epic-pc-name">от {pc.price} BYN</h4>
                    <div className="rassrochka">или от {(Number(pc.price)/36).toFixed(2)} BYN/мес</div>
                </div>
            </Card>
        </Col>
    );
};

export default PcItem;