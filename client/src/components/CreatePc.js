import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import {Button, Form, Col, Row, Dropdown} from "react-bootstrap"
import { Context } from "..";
import { createPc, fetchPcs } from "../http/pcAPI";
import { observer } from "mobx-react-lite";



const CreatePc = observer(({show, onHide}) => {
    const {pc} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }



    const addPc = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('info', JSON.stringify(info))
        createPc(formData).then(() => onHide())
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
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-3"
                placeholder="Введите название компьютера"
            />
            <Form.Control
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="mt-3"
                placeholder="Введите стоимость компьютера"
                type="number"
            />
            <Form.Control
                className="mt-3"
                type="file"
                onChange={selectFile}
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
                            value={i.title}
                            onChange={(e) => changeInfo('title', e.target.value, i.number)}
                            placeholder="Введите название свойства"
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Control
                            value={i.description}
                            onChange={(e) => changeInfo('description', e.target.value, i.number)}
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
                    onClick={addPc}
                >
                    Добавить
                </Button>
            </Modal.Footer>

        </Modal>
    )
})

export default CreatePc;