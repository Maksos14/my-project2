import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/about.css';
import logo from'../assets/logo.png'

const About = () => {
    return (
        <div className="about-page">
            <Container>

                <Row className="mb-5">
                    <Col>
                        <h1 className="about-title">О компании CustomPC</h1>
                        <div className="title-divider"></div>
                    </Col>
                </Row>


                <Row className="about-section mb-5">
                    <Col md={6}>
                        <h2 className="section-title">Более 5 лет на рынке</h2>
                        <p className="section-text">
                            CustomPC - это ведущий производитель игровых компьютеров в Беларуси. 
                            С 2018 года мы собираем мощные и надежные системы для геймеров, 
                            профессионалов и энтузиастов.
                        </p>
                    </Col>
                    <Col md={6}>
                        <img className='about-image' src={logo} />
                    </Col>
                </Row>


                <Row className="about-section mb-5">
                    <Col md={6} className="order-md-2">
                        <h2 className="section-title">Почему выбирают нас</h2>
                        <ul className="advantages-list">
                            <li>Только качественные комплектующие от проверенных производителей</li>
                            <li>Индивидуальный подход к каждому клиенту</li>
                            <li>Гарантия на все сборки до 3 лет</li>
                            <li>Бесплатная диагностика и техническая поддержка</li>
                        </ul>
                    </Col>
                    <Col md={6} className="order-md-1">
                        <img 
                            src="https://i0.wp.com/hyperpc.ru/images/company/tour/watercooling_assembly/update/hyperpc_assembly_custom_block_05.jpg?ssl=1" 
                            className="about-image"
                        />
                    </Col>
                </Row>


                 <Row className="about-section ">
                    <Col md={6} className="order-md-2">
                        <img 
                            src="https://pcstonks.ru/upload/cache/w-3000/images/portfolio/15/image3.jpg" 
                            className="about-image"
                        />
                    </Col>
                    <Col md={6} className="order-md-1">
                        <h2 className="section-title">Вопросы о покупке</h2>
                       <Col className="section-text">
                       <div>
                        Телефон
                       </div>
                       <strong >
                        +375(25)754-20-46
                       </strong>
                        <div>
                        Вопросы о покупке
                       </div>
                       <a href="mailto:custompcbrest@gmail.com?cc=&subject=%D0%92%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D1%8B%20%D0%BE%20%D0%BF%D0%BE%D0%BA%D1%83%D0%BF%D0%BA%D0%B5&body=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%83%20%D0%BC%D0%B5%D0%BD%D1%8F%20%D0%B2%D0%BE%D0%B7%D0%BD%D0%B8%D0%BA%20%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81">custompcbrest@gmail.com</a>											
                         <div>
                        Сайт
                       </div>
                       <a href ="http://localhost:3000/">
                        http://localhost:3000/
                       </a>
                       
                       
                       </Col>
                    </Col>
                    
                </Row>


                <Row className="about-section">
                    <Col md={6} className="order-md-2">
                        <h2 className="section-title">Наш магазин</h2>
                        <p className="section-text">
                            Приглашаем вас в наш магазин по адресу:<br />
                            <strong>г. Брест, ул. Московская, 267</strong>
                        </p>
                        <p className="section-text">
                            Часы работы:<br />
                            Пн-Пт: 10:00 - 20:00<br />
                            Сб-Вс: 11:00 - 18:00
                        </p>
                    </Col>
                    <Col md={6} className="order-md-1">
                        <img 
                            src="https://sun9-72.userapi.com/impg/vAv_34KvTSnBvSmEDpcclcMTSWtXtQAYh8d3ng/sYesmkaMzRw.jpg?size=807x605&quality=95&sign=9be3768acd1704c3c7e8256309ce635b&type=album" 
                            className="about-image"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default About;