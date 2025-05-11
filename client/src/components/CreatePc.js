import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import {Button, Form, Col, Row, Dropdown} from "react-bootstrap"
import { Context } from "..";



const CreatePc = ({show, onHide}) => {
    const {pc} = useContext(Context)
    const [info, setInfo] = useState([])
    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title  id="contained-modal-title-vcenter">
                    Добавить компьютер
                </Modal.Title>
            </Modal.Header>
            
            <Form.Control
                className="mt-3"
                placeholder="Введите название компьютера"
            />
            <Form.Control
                className="mt-3"
                placeholder="Введите стоимость компьютера"
                type="number"
            />
            <Form.Control
                className="mt-3"
                type="file"
            />
                <hr/>
            <Button
                variant="outline-dark"
                onClick={addInfo}
            >
                Добавить новое свойство
            </Button>
            {info.map(i =>
                <Row className="mt-4" key={i.number}>
                    <Col md={4}>
                        <Form.Control
                            placeholder="Введите название свойства"
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Control
                            placeholder="Введите описание свойства"
                        />
                    </Col>
                    <Col md={4}>
                        <Button
                            onClick={() => removeInfo(i.number)}
                            variant="outline-danger"
                        >
                            Удалить
                        </Button>
                    </Col>
                </Row>
            )
        }
            
            <Modal.Footer>
                <Button 
                    variant="outline-danger" 
                    onClick={onHide}
                >
                    Закрыть
                </Button>
                <Button 
                    variant="outline-success" 
                    onClick={onHide}
                >
                    Добавить
                </Button>
            </Modal.Footer>

        </Modal>
    )
}
export default CreatePc;