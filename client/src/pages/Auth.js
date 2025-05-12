import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import axios from "axios";
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const login = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:5000/api/user/login", { email, password });
        return response.data;
    } catch (error) {
        console.error("Ошибка авторизации:", error.response?.data || error.message);
    }
};

const registration = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:5000/api/user/registration", { email, password });
        return response.data;
    } catch (error) {
        console.error("Ошибка регистрации:", error.response?.data || error.message);
    }
};

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            if (data) {
                user.setUser(data);
                user.setIsAuth(true);
                navigate(SHOP_ROUTE)
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center mt-3 pl-3 pr-3"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>
                        }
                        <Button variant={"outline-success"} onClick={click}>
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
