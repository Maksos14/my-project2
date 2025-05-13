import React, { useContext } from "react";
import { observer} from "mobx-react-lite";
import context from "react-bootstrap/esm/AccordionContext";
import { ListGroup } from "react-bootstrap";


const TypeBar = observer( () => {
    const {pc} = useContext(context)
    return (
        <ListGroup >
           <ListGroup.Item className="dark-column h4" ></ListGroup.Item>
           <ListGroup.Item className="dark-column h4" ></ListGroup.Item>
           <ListGroup.Item className="dark-column h4" ></ListGroup.Item>
           <ListGroup.Item className="dark-column h4" ></ListGroup.Item>
       </ListGroup>
    )
})

export default TypeBar