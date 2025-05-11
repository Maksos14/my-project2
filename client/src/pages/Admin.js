import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreatePc from "../components/CreatePc"


const Admin = () => {
    const [pcVisible, setPcVisible] = useState(false)
    return (
        <Container className="d-flex flex-column">
            <Button 
                variant="outline-dark" 
                className="mt-2"
                onClick={() => setPcVisible(true)}
            >
                Добавить устройство
            </Button>
        <CreatePc show={pcVisible} onHide={() => setPcVisible(false)}/>
        </Container>
    )
    
}

export default Admin;