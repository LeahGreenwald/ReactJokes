import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

const Signup = () => {
    const [User, SetUser] = useState({});
    const history = useHistory();

    const onTextChange = e => {
        let copy = { ...User };
        copy[e.target.name] = e.target.value;
        SetUser(copy);
    };

    const signup = async() => {
        await axios.post('/api/account/signup', User);
        history.push('/login');
    };

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <h3>Sign up for a new account</h3>
                <input type="text" name="firstName" placeholder="First Name" className="form-control" value={User.firstName} onChange={onTextChange} />
                <br />
                <input type="text" name="lastName" placeholder="Last Name" className="form-control" value={User.lastName} onChange={onTextChange} />
                <br />
                <input type="text" name="email" placeholder="Email" className="form-control" value={User.email} onChange={onTextChange} />
                <br />
                <input type="password" name="password" placeholder="Password" className="form-control" value={User.password} onChange={onTextChange} />
                <br />
                <button className="btn btn-primary" onClick={signup}>Signup</button>
            </div>
        </div>
    );
};

export default Signup;