import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import PcItem from "./PcItem";
import '../styles/card.css'; 

const PcList = observer(({}) => {
    const {pc} = useContext(Context)

    return (
        <Row className="d-flex">
    {Array.isArray(pc.pcs) ? pc.pcs.map(pc => (
        <PcItem key={pc.id} pc={pc} />
    )) : <p>Загрузка...</p>}
</Row>

    );


});

export default PcList;
