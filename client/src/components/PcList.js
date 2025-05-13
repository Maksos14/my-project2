import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import PcItem from "./PcItem";

const PcList = observer(({}) => {
    const {pc} = useContext(Context)

    return (
        <Row className = "d-flex">
            {pc.pcs.map(pc =>
                <PcItem key={pc.id} pc={pc} />
            )}
        </Row>
    );
});

export default PcList;
