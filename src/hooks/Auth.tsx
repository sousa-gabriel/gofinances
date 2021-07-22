import React, { ReactNode, createContext, useContext } from 'react';
import * as AuthSession from 'expo-auth-session';


interface AuthProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAthContextData {
    user: User;
    singInWithGoogle(): Promise<void>;
}

const AuthContext = createContext({} as IAthContextData);

function AuthProvider({ children }: AuthProps) {
    const user = {
        id: 'testando Id',
        name: 'Gabriel Rocha',
        email: 'sousa-gabriel@hotmail.com',
        photo: 'Testando Foto',
    }
    return (
        <AuthContext.Provider value={{ user, singInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}

async function singInWithGoogle() {
    try {
        const CLIENT_ID = '284390925727-ommam4l1j87bcipv532mek4j923tenbb.apps.googleusercontent.com';
        const REDIRECT_URI = 'https://auth.expo.io/@rocha-gabriel/gofinance';
        const RESPONSE_TYPE = 'token';
        const SCOPE = encodeURI('profile email');

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

        const response = await AuthSession.startAsync({ authUrl })
        console.log(response)

    } catch (error) {
        throw new Error(error);
    }
}

function useAuth() {
    const context = useContext(AuthContext)
    return context;
}

export { AuthProvider, useAuth }