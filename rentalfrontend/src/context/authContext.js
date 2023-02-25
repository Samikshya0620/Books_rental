import {createContext, useState,useEffect} from 'react';
import http from "../services/httpService";
import config from '../config.json'

const apiEndpoint = config.apiUrl + "signin"
export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    let [authTokens, setAuthTokens] = useState(null);
    let [user, setUser] = useState(null);
    let loginUser = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        let username= data.get('username');
        let password = data.get('password');
        let response = await http.post(apiEndpoint, {username,password})
        console.log(response.data);

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

