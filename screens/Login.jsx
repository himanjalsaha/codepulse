// Login.js
import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Keyboard,Animated} from 'react-native';
import { img } from '../assets/login.png';
import {useNavigation} from '@react-navigation/native'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { err } from 'react-native-svg';
import { auth } from '../Firebase/firebase';
import { userauth } from '../context/AuthContext';
const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [err,seterr] = useState("")
  const [showImg, setShowImg] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const signUpAnimation = useRef(new Animated.Value(300)).current; 
  const {currentuser} = userauth()// Initial position outside the screen
const navigation = useNavigation()
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setShowImg(false);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setShowImg(true);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    console.log('email:', email);
    console.log('Password:', password);
    try{
      const {user}=await signInWithEmailAndPassword(auth,email , password )
    
        navigation.push('Home')
      
      console.log(user);


    }
    catch(error){
      console.log(error);
      seterr(error)
    }
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    Animated.timing(signUpAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className="flex-1 justify-center bg-neutral-800 p-4 items-center">
      <Text className="text-3xl text-white font-bold">Login</Text>

      {showImg && <Image  source={require('../assets/login.png')} />}

      <View className="w-full p-4 rounded-lg">
        <TextInput
          className="border border-gray-400 rounded-2xl px-4 py-2 mb-4 outline outline-white text-white w-full"
          placeholder="Email"
          placeholderTextColor="white"
          value={email}
          onChangeText={setemail}
        />

        <TextInput
          className="border border-gray-400 rounded-2xl text-white px-4 py-2 mb-4 w-full"
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          placeholderTextColor="white"
          onChangeText={setPassword}
        />

        <TouchableOpacity className="bg-blue-500 rounded px-4 py-2 flex justify-center items-center mb-4" onPress={handleLogin}>
          <Text className="text-white">Login</Text>
        </TouchableOpacity>

        <View className="flex flex-row">
        <Text className="text-blue-500">
          Not signed up? {" "}
        </Text>
        <TouchableOpacity  onPress={()=> navigation.push('signup')}>
            <Text className="text-blue-500">Signup</Text>
          </TouchableOpacity>
        </View>
        {err && <Text className="text-white">no  users found with email id : {email} </Text>}

      </View>
    </View>
  );
};

export default Login;
