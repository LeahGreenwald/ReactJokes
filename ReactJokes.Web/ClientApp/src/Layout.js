import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from './AuthContext';


const Layout = (props) => {
    const { user } = useAuthContext();
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                    <div className="container">
                        <Link to='/' className="navbar-brand">React Jokes</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                        <Link to='/viewall' className="nav-link text-light">
                                            View all
                                        </Link>
                                    </li>
                                {!user && <>
                                    <li className="nav-item">
                                        <Link to='/signup' className="nav-link text-light">
                                            Sign up
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/login' className="nav-link text-light">
                                            Log in
                                        </Link>
                                    </li>
                                </>
                                }
                                {user &&
                                    <li className="nav-item">
                                        <Link to='/logout' className="nav-link text-light">
                                            Log out
                                        </Link>
                                    </li>}

                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container" style={{ marginTop: 80 }}>
                {props.children}
            </div>

        </>
    )
}

export default Layout;