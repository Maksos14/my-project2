import React, { useState, useEffect } from 'react';
import { createRating, getRatingsByPc } from '../http/ratingAPI';

const Rating = ({ pcId }) => {
    const [ratings, setRatings] = useState([]);
    const [rate, setRate] = useState('');
    const [userName, setUserName] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        getRatingsByPc(pcId).then(setRatings);
    }, [pcId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRating = await createRating({ rate, userName, comment, pcId, userId: 1 }); // временный userId
        setRatings([...ratings, newRating]);
        setRate('');
        setUserName('');
        setComment('');
    };

    return (
        <div>
            <h2>Рейтинги</h2>
            {ratings.map(r => (
                <div key={r.id}>
                    <p><strong>{r.userName}:</strong> {r.rate}⭐</p>
                    <p>{r.comment}</p>
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Имя" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                <input type="number" placeholder="Оценка" value={rate} onChange={(e) => setRate(e.target.value)} required />
                <textarea placeholder="Комментарий" value={comment} onChange={(e) => setComment(e.target.value)} />
                <button type="submit">Добавить</button>
            </form>
        </div>
    );
};

export default Rating;
