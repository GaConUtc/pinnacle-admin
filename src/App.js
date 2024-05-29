import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ACCESS_TOKEN } from './constants/common';
import MainMenu from './components/MainMenu/MainMenu';
import SiderItems from './components/MainSider/SiderItems';
import Login from './pages/Login/Login';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <MainMenu />
                        </ProtectedRoute>
                    }
                >
                    {SiderItems?.map((item) => (
                        <Route key={item.key} path={item?.linkTo} element={item?.element}></Route>
                    ))}
                </Route>
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default App;
