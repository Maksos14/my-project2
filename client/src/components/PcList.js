import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Row } from "react-bootstrap";
import PcItem from "../components/PcItem";

const PcList = observer( () => {
    const {pc} = useContext(Context)

    return (
        <Row className="d-flex">
            {pc.pcs.map(pc =>
                <PcItem key={pc.id} pc={pc}/>
            )}
        </Row>
    )
})

export default PcList;