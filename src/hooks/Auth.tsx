import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
interface AuthProps {
    children: ReactNode;
}
interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface AutorizationResponse{
    params:{
        access_token: string;
    },
    type: string;
}

interface IAthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
    signOut(): Promise<void>;
    userStorageLoading: boolean;
}

const AuthContext = createContext({} as IAthContextData);

function AuthProvider({ children }: AuthProps) {
    const [user, setUser] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState(true);

    const userStorgeKey = '@gofinances:user';

    async function signInWithGoogle() {
        try {
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const {type, params} = await AuthSession
            .startAsync({ authUrl }) as AutorizationResponse;

            if(type === 'success'){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)

                const userInfo = await response.json();
                const userLogged = {
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.name,
                    photo: userInfo.picture
                }

                setUser(userLogged)
                await AsyncStorage.setItem(userStorgeKey, JSON.stringify(userLogged));
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async function signInWithApple() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes:[
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });

            if(credential){
                const userLogged = {
                    id: String(credential.user),
                    email: credential.email!,
                    name: credential.fullName?.givenName!,
                    photo: `https://ui-avatars.com/api/?name=${credential.fullName?.givenName!}&length=1`
                }
                setUser(userLogged);
                await AsyncStorage.setItem(userStorgeKey, JSON.stringify(userLogged));
            }
            
        } catch (error) {
            throw new Error(error);
        }
    }

    async function loadUserStorageDate() {
        const userStorage = await AsyncStorage.getItem(userStorgeKey)
        if(userStorage){
            const userLogged = JSON.parse(userStorage) as User;
            setUser(userLogged);
        }
        setUserStorageLoading(false);
    }

    async function signOut() {
        setUser({} as User)
        await AsyncStorage.removeItem(userStorgeKey)
    }

    useEffect(()=>{
        loadUserStorageDate()
    },[])

return (
    <AuthContext.Provider value={{ 
        user, 
        signInWithGoogle, 
        signInWithApple, 
        signOut, 
        userStorageLoading, 
    }}>
        {children}
    </AuthContext.Provider>
)
}

function useAuth() {
    const context = useContext(AuthContext)
    return context;
}

export { AuthProvider, useAuth }