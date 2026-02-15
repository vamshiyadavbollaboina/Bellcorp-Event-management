import React, { createContext, useState } from 'react'
import Cookie from 'js-cookie'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    const loginUser = (userData, token) => {
        Cookie.set('jwt_token', token, { expires: 7 })
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
    };

    const logoutUser = () => {
        Cookie.remove('jwt_token')
        localStorage.removeItem('user')
        setUser(null)
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};