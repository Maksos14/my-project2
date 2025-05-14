import React from "react";
import { Card, Col } from "react-bootstrap";
import star from '../assets/star.png'
import { Image } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import { PC_ROUTE } from "../utils/consts";
import '../styles/epic-card.css'; 

const PcItem = ({pc}) => {
    const navigate = useNavigate()

    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(PC_ROUTE + '/' + pc.id)}>
            <Card className="epic-pc-card">
                <div className="epic-pc-image-container">
                    <Image className="epic-pc-image" src={process.env.REACT_APP_API_URL + pc.img}/>
                </div>
                <div className="epic-pc-content">
                    <div className="epic-pc-category">Игровой ПК </div>
                    <div className="epic-pc-rating">
                        <span>{pc.rating}</span>
                        <Image className="epic-star" src={star}/>
                    </div>
                    <h3 className="epic-pc-name">{pc.name}</h3>
                    <h4 className="epic-pc-name">от {pc.price} BYN</h4>
                    <div className="epic-pc-rassrochka">или от {(Number(pc.price)/36).toFixed(2)} BYN/мес</div>
                </div>
            </Card> 
        </Col>
    )
}

export default PcItem;