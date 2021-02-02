import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(
        {
            token: localStorage.getItem("token"),
            user: JSON.parse(localStorage.getItem("user"))
        }
    );
    return (
        <AuthContext.Provider value={{ uso: [user, setUser] }} >
            {children}
        </AuthContext.Provider >
    )
}