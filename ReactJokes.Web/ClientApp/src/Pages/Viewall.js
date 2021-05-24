import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Viewall = () => {

    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        const getJokes = async () => {
            const { data } = await axios.get('/api/jokes/getalljokes');
            setJokes(data);
        };
        getJokes();
    }, []);

    const getLikedCount = j => {
        return j.liked.filter(l => l.liked === true).length;
    }
    const getDislikedCount = j => {
        return j.liked.filter(l => l.liked === false).length;
    }

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                {jokes && jokes.map(j => {
                    return <div className="card card-body bg-light mb-3">
                        <h5>{j.setup}</h5>
                        <h5>{j.punchline}</h5>
                        <span>Likes: {getLikedCount(j)}</span>
                        <br />
                        <span>Dislikes: {getDislikedCount(j)}</span>
                    </div>
                })}

            </div>
        </div>
    );
};

export default Viewall;