import {createContext, useState,useEffect} from 'react';
import http from "../services/httpService";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    let [authTokens, setAuthTokens] = useState(null);
    let [user, setUser] = useState(null);
    let loginUser =  (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let username= data.get('username');
        let password = data.get('password');
/*         let response = await fetch("http://127.0.0.1:8000/api/token",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({'username':username, 'password':password})
        })
        let data = await response.json()
        console.log('data:, data) 
        */
    }
    let contextData = {
        loginUser: loginUser
    }
    return(
        <AuthContext.Provider value= {contextData}>
            {children}
        </AuthContext.Provider>
    )
} 

