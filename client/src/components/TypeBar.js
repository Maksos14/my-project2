import React, { useContext } from "react";
import { observer} from "mobx-react-lite";
import context from "react-bootstrap/esm/AccordionContext";
import { ListGroup } from "react-bootstrap";

const TypeBar = observer( () => {
    const {pc} = useContext(context)
    return (
        <ListGroup>
           <ListGroup.Item>еще не придумал</ListGroup.Item>
           <ListGroup.Item>еще не придумал</ListGroup.Item>
           <ListGroup.Item>еще не придумал</ListGroup.Item>
           <ListGroup.Item>еще не придумал</ListGroup.Item>
       </ListGroup>
    )
})

export default TypeBar