import React, { useCallback, useState, useContext, useEffect } from 'react'
import { createContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../services/api'

interface User {
    id: string;
    avatar_url: string;
    email: string;
    name: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    updateUser(user: User): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {

    const [loading, setLoading] = useState(true)

    const [data, setData] = useState<AuthState>({} as AuthState)

    useEffect(() => {
        async function loadStorageData(): Promise<void> {
            const [ token, user ] = await AsyncStorage.multiGet(['@GoBarber:token', '@GoBarber:user'])

            if(token[1] && user[1]) {
                setData({ token: token[1], user: JSON.parse(user[1]) })    
            }
        }
        loadStorageData()
    },[])

    const signIn = useCallback(async ({ email, password }) => {

        const response = await api.post('sessions', {
            email,
            password
        })

        const { token, user } = response.data;


        await AsyncStorage.multiSet([
            ['@GoBarber:token', token],
            ['@GoBarber:user', JSON.stringify(user)]
        ])

        api.defaults.headers.authorization = `Bearer ${token}`

        setData({ token, user })

    }, [])

    const updateUser = useCallback(async (user: User) => {

        await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user))
        
        setData({
            token: data.token,
            user: {
                ...data.user,
                ...user
            }
        })
    },[data.token, data.user])

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user'])

        setData({} as AuthState)
    }, [])

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }} >
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }
