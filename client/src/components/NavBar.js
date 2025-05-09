import React, { useContext } from "react"; 
import { Context } from "../index";
import { Navbar, Nav, Button, Container } from "react-bootstrap"; 
import { NavLink } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import {observer} from "mobx-react-lite"

const NavBar = observer(() => {
    const { user } = useContext(Context);

    console.log(user);
    return (
        <Navbar bg="dark" data-bs-theme="dark"> 
        <Container>
            <NavLink to={SHOP_ROUTE}>CustomPC</NavLink>
            {user.isAuth ?
              <Nav className="ml-auto" style={{color: 'white'}}>
                <Button variant={"outline-light"}>Админ панель</Button>
                <Button variant={"outline-light"} className="ml-2">Войти</Button>
              </Nav>
            :
            <Nav className="ml-auto" style={{color: 'white'}}>
                <Button variant={"outline-light"} onClick={() => user.setIsAuth(true)}>Авторизация</Button>
            </Nav>
            }
        </Container>
        </Navbar>
    );
});

export default NavBar;
