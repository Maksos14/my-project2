import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Badge, Modal, Form, Row, Col } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, ADMIN_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { getBasket } from '../http/basketAPI';
import { createPc } from '../http/pcAPI';
import "../styles/navbar.css";
import "../styles/main.css";
import { FaShoppingCart, FaSignOutAlt, FaSignInAlt, FaPlusCircle} from "react-icons/fa";



const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [basketCount, setBasketCount] = useState(0);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [specs, setSpecs] = useState([{ title: '', description: '' }]);

    useEffect(() => {
        if (user.isAuth) {
            getBasket().then(data => {
                setBasketCount(data.basket_pcs?.length || 0);
            });
        }
    }, [user.isAuth]);

    const logout = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
    };

    const addSpec = () => {
        setSpecs([...specs, { title: '', description: '' }]);
    };

    const removeSpec = (index) => {
        const newSpecs = [...specs];
        newSpecs.splice(index, 1);
        setSpecs(newSpecs);
    };

    const handleSpecChange = (index, field, value) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = value;
        setSpecs(newSpecs);
    };

    const addPc = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('img', file);
        formData.append('info', JSON.stringify(specs));
        
        createPc(formData).then(() => {
            setShowAdminModal(false);
            setName('');
            setPrice(0);
            setFile(null);
            setSpecs([{ title: '', description: '' }]);
        });
    };

    return (
        <>
            <Navbar className="styles.blackNavbar">
                <Container>
                    <div className=" ml-2">
                    <NavLink 
                        style={{color:'white'}} 
                        to={SHOP_ROUTE} 
                    >
                        CustomPC
                    </NavLink>
                    </div>

                    {user.isAuth ?
                        <Nav className="ml-auto" style={{color: 'white'}}>
                            {user.user.role === 'ADMIN' && 
                            <div className="nav-buttons mr-2">
                                <Button 
                                    variant="outline-light" 
                                    className="me-2"
                                    onClick={() => setShowAdminModal(true)}
                                >
                                    <FaPlusCircle/>
                                </Button>
                                </div>
                            }
                            <div className="nav-buttons mr-2">
                            <Button 
                                className="me-2"
                                variant="outline-light" 
                                onClick={() => navigate(BASKET_ROUTE)}
                            >
                                <FaShoppingCart />
                                {basketCount > 0 && (
                                    <Badge bg="danger" className="ms-3 ml-1">
                                        {basketCount}
                                    </Badge>
                                )}
                            </Button>
                            </div>
                            <div className="nav-buttons mr-2">
                            <Button 
                                
                                variant="outline-light" 
                                onClick={logout} 
                            >
                                <FaSignOutAlt />
                            </Button>
                            </div>
                        </Nav>
                        :
                        <Nav className="ml-auto" style={{color: 'white'}}>
                            <div className="nav-buttons mr-2">
                            <Button 
                                variant="outline-light" 
                                onClick={() => navigate(LOGIN_ROUTE)}
                            >
                                <FaSignInAlt/>
                            </Button>
                            </div>
                        </Nav>
                    }
                </Container>
            </Navbar>

            <Modal show={showAdminModal} onHide={() => setShowAdminModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Добавить новый ПК</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            placeholder="Введите название ПК"
                            className="mt-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Control
                            placeholder="Введите цену"
                            className="mt-3"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                        />
                        <Form.Control
                            className="mt-3"
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <hr className="mt-4"/>
                        <h5>Характеристики</h5>
                        {specs.map((spec, index) => (
                            <Row key={index} className="mt-3">
                                <Col md={5}>
                                    <Form.Control
                                        placeholder="Название характеристики"
                                        value={spec.title}
                                        onChange={(e) => handleSpecChange(index, 'title', e.target.value)}
                                    />
                                </Col>
                                <Col md={5}>
                                    <Form.Control
                                        placeholder="Описание"
                                        value={spec.description}
                                        onChange={(e) => handleSpecChange(index, 'description', e.target.value)}
                                    />
                                </Col>
                                <Col md={2}>
                                    <Button 
                                        variant="outline-danger"
                                        onClick={() => removeSpec(index)}
                                    >
                                        Удалить
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                        <Button 
                            variant="outline-success" 
                            className="mt-3"
                            onClick={addSpec}
                        >
                            Добавить характеристику
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={() => setShowAdminModal(false)}>
                        Закрыть
                    </Button>
                    <Button variant="outline-success" onClick={addPc}>
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default NavBar;