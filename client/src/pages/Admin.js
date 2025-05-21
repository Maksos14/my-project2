import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreatePc from "../components/CreatePc"
import "../styles/pcShop.css";

const Admin = () => {
    
    const [pcVisible, setPcVisible] = useState(false)

    return (
        <Container className="nav-buttons">
            <Button 
                style={{ width: "65%" }}
                onClick={() => setPcVisible(true)}
            >
                Добавить компьютер
            </Button>
        <CreatePc show={pcVisible} onHide={() => setPcVisible(false)}/>
        </Container>
    )
    
}

export default Admin;