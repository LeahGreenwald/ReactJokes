import React, { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../AuthContext';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Login = () => {
    const [loginUser, SetLoginUser] = useState({ email: '', password: '' });
    const [IsValidLogin, SetIsValidLogin] = useState(true);
    const history = useHistory();
    const { setUser } = useAuthContext();

    const onTextChange = e => {
        let copy = { ...loginUser };
        copy[e.target.name] = e.target.value;
        SetLoginUser(copy);
    };

    const submitLogin = async () => {
        const { data } = await axios.post('/api/account/login', loginUser);
        setUser(data);
        SetIsValidLogin(!!data);
        history.push('/');
    };

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <h3>Log in to your account</h3>
                {!IsValidLogin && <span className="text-danger">Invalid username/password. Please try again.</span>}
                <input type="text" name="email" placeholder="Email" className="form-control" onChange={onTextChange} />
                <br />
                <input type="password" name="password" placeholder="Password" className="form-control" onChange={onTextChange} />
                <br />
                <button className="btn btn-primary" onClick={submitLogin}>Login</button>

                <Link to='/signup'>Sign up for a new account</Link>
            </div>
        </div>
    )
};

export default Login;