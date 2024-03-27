import { View, Text } from 'react-native'
import React from 'react'
import { userauth } from '../context/AuthContext'
import {useNavigation} from '@react-navigation/native'


const Privaterote = ({children})=>{
    const navigation = useNavigation()
    const {currentuser} = userauth()

    if(!currentuser){
         navigation.navigate('login');
    }
    return children
}


export default Privaterote