import React from "react";
import { Card, Col } from "react-bootstrap";
import star from '../assets/star.png'
import { Image } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import { PC_ROUTE } from "../utils/consts";

const PcItem = ({pc}) => {
    const navigate = useNavigate()
    console.log(navigate)
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(PC_ROUTE + '/' + pc.id)}>
            <Card style={{width: 158, cursor: 'pointer'}} border={"Light"}>
                <Image width={150} height={150} src={pc.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>Игровой ПК</div>
                    <div className="d-flex align-items-center">
                        <div>{pc.rating}</div>
                        <Image width={15} height={15} src={star}/>
                    </div>
                    
                    
                </div>
                <div>{pc.name}</div>
            </Card> 
        </Col>
    )
}

export default PcItem;