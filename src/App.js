import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import User from './pages/User/User';
import LicenceProduct from './pages/LicenceProduct/LicenceProduct';
import Login from './pages/Login/Login';

function App() {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }
    }, []);
    return (
        <Router>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/main">
                <Route path="/" component={User} />
                <Route path="/users" component={User} />
                <Route path="/products" component={LicenceProduct} />
            </PrivateRoute>
        </Router>
    );
}

const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                localStorage.getItem('token') ? (
                    children
                ) : (
                    <></>
                    // <Redirect
                    //     to={{
                    //         pathname: '/login',
                    //         state: { from: location },
                    //     }}
                    // />
                )
            }
        />
    );
};

export default App;
