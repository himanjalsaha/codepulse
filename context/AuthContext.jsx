import { View, Text } from 'react-native'
import React,{useContext,useState,createContext, useEffect} from 'react'
import { signInWithEmailAndPassword , onAuthStateChanged} from 'firebase/auth'
import { auth } from '../Firebase/firebase';

const AuthContext = createContext();

//provide the context

export const AuthProvider = ({children}) =>{
    const [currentuser , setCurrentuser] = useState(null);

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
            setCurrentuser(user)

        })
        console.log(currentuser);
        return unsub;
    })

    const value = {
        currentuser , 

    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}


export const userauth = () =>{
    return useContext(AuthContext)
}