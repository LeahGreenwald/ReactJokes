import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../AuthContext';
import useInterval from '../UseInterval';

const Home = () => {

    const [joke, setJoke] = useState({});
    const { user } = useAuthContext();
    const [refresh, setRefresh] = useState(true);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isRecent, setIsRecent] = useState(false);


    useInterval(() => updateCounts(), 2000)

    const setCounts = data => {
        const l = data.liked.filter(l => l.liked === true);
        const d = data.liked.filter(l => l.liked === false);
        setLikes(l.length);
        setDislikes(d.length);
    }

    const recent = async liked => {
        const time = liked.time;
        const { data } = await axios.get(`/api/jokes/isrecent?time=${time}`);
        setIsRecent(data);
    };

    const liked = data => {
        var likedList = data.liked;
        var l = likedList.filter(l => l.jokeId === data.id && l.userId === user.id);
        if (l.length === 0) {
            setIsLiked(false);
        }
        else {
            setIsLiked(l[0]);
            recent(l[0]);
        }
    };

    useEffect(() => {
        const getJoke = async () => {
            const { data } = await axios.get('/api/jokes/getJoke');
            setJoke(data);
            setCounts(data);
            !!user && liked(data);
        };
        getJoke();
    }, [refresh]);

    const refreshPage = () => {
        setRefresh(!refresh);
    };

    const updateCounts = async () => {
        const { data } = await axios.get(`/api/jokes/getupdatedjoke?jokeid=${joke.id}`);
        setCounts(data);
    };

    const likeButtonClick = async bool => {
        if (!isLiked) {
            const { data } = await axios.post(`/api/jokes/addlike?userId=${user.id}&&jokeId=${joke.id}&&like=${bool}`);
            setIsRecent(true);
            setJoke(data);
            setCounts(data);
            liked(data);
        }
        else {
            const { data } = await axios.post(`/api/jokes/updateLike?userId=${user.id}&&jokeId=${joke.id}&&like=${bool}`);
            setIsRecent(true);
            setJoke(data);
            setCounts(data);
            liked(data);
        }
    };

    // const isRecentAndLiked = isRecent && isLiked.liked;
    // const isRecentAndDisliked = isRecent && !isLiked.liked;
    return (

        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <div>
                    <h4>{joke.setup}</h4>
                    <h4>{joke.punchline}</h4>
                    <div>
                        <div>
                            {!user && <Link to='/login'>Login to your account to like/dislike this joke</Link>}

                            {user && <>
                                {(!!isLiked && !isRecent) && <>
                                    <button className='btn btn-info' disabled onClick={() => likeButtonClick(true)}>Like</button>
                                    <button className='btn btn-warning' disabled onClick={() => likeButtonClick(false)}>Dislike</button>
                                </>}
                                {(isRecent && isLiked.liked) && <>
                                    <button className='btn btn-info' disabled onClick={() => likeButtonClick(true)}>Like</button>
                                    <button className='btn btn-warning' onClick={() => likeButtonClick(false)}>Dislike</button>
                                </>}
                                {(isRecent && !isLiked.liked) && <>
                                    <button className='btn btn-info' onClick={() => likeButtonClick(true)}>Like</button>
                                    <button className='btn btn-warning' disabled onClick={() => likeButtonClick(false)}>Dislike</button>
                                </>}
                                {!isLiked && <>
                                    <button className='btn btn-info' onClick={() => likeButtonClick(true)}>Like</button>
                                    <button className='btn btn-warning' onClick={() => likeButtonClick(false)}>Dislike</button>
                                </>}
                            </>}
                        </div>
                        <br />
                        <h4>Likes: {likes}</h4>
                        <h4>Dislikes: {dislikes}</h4>
                        <h4><button className="btn btn-link" onClick={refreshPage}>Refresh</button></h4>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;