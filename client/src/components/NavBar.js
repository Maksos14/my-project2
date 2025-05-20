import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Badge} from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { getBasket } from '../http/basketAPI';
import "../styles/navbar.css";
import "../styles/main.css";
import { FaShoppingCart, FaSignOutAlt, FaSignInAlt, FaPlusCircle, FaUserCheck} from "react-icons/fa";



const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [basketCount, setBasketCount] = useState(0);

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
        localStorage.removeItem('userRole');
        navigate(LOGIN_ROUTE);
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
                                    onClick={() => navigate('/admin')}
                                >
                                    <FaPlusCircle/>
                                </Button>
                                </div>
                            }
                            <div className='nav-buttons mr-2'>
                             <Button 
                                variant="outline-light" 
                                onClick={() => navigate('/about')}
                            >
                                <FaUserCheck/>
                            </Button>
                            </div>
                            <div className="nav-buttons">
                            <Button 
                                className="me-1"
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
                            <div className="nav-buttons mr-2 ml-2">
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
        </>
    );
});

export default NavBar;