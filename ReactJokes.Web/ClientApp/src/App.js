import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './Layout';
import { AuthContextComponent } from './AuthContext';
import Home from './Pages/Home';
import Signup from './Pages/Signup.js';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Viewall from './Pages/Viewall';

export default class App extends Component {
    render() {
        return (
            <AuthContextComponent>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/logout' component={Logout} />
                    <Route exact path='/viewall' component={Viewall} />
                </Layout>
            </AuthContextComponent>
        )
    }
}
