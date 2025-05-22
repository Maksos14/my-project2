/*import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { ListGroup, Form, Button } from "react-bootstrap";
import { Context } from "../index";

const FilterBar = observer(() => {
    const { pc } = useContext(Context);
    const [searchQuery, setSearchQuery] = useState(pc.searchQuery || "");
    const [minPrice, setMinPrice] = useState(pc.minPrice || "");
    const [maxPrice, setMaxPrice] = useState(pc.maxPrice || "");

    const handleSearch = () => {
        pc.setSearchQuery(searchQuery);
        pc.setMinPrice(minPrice);
        pc.setMaxPrice(maxPrice);
        pc.setPage(1); 
        pc.fetchPcs(); 
    };

    return (
        <ListGroup className="filter-bar">
            <ListGroup.Item>
                <Form.Control
                    type="text"
                    placeholder="Поиск по названию"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </ListGroup.Item>
            <ListGroup.Item>
                <Form.Control
                    type="number"
                    placeholder="Мин. цена"
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                />
            </ListGroup.Item>
            <ListGroup.Item>
                <Form.Control
                    type="number"
                    placeholder="Макс. цена"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                />
            </ListGroup.Item>
            <ListGroup.Item>
                <Button variant="success" onClick={handleSearch}>
                    Применить фильтры
                </Button>
            </ListGroup.Item>
        </ListGroup>
    );
});

export default FilterBar;*/