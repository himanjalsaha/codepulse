import React, { useState , useEffect } from 'react';
import { View, StyleSheet, Button, TextInput, TouchableOpacity, Text, Image, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword ,updateProfile} from 'firebase/auth'
import { auth  } from '../Firebase/firebase';
import { err } from 'react-native-svg';
import { userauth } from '../context/AuthContext';
import { db } from '../Firebase/firebase';
import {setDoc,doc} from 'firebase/firestore'
import * as ImagePicker from 'expo-image-picker';
import { ref,getStorage, uploadBytesResumable,uploadBytes, getDownloadURL } from "firebase/storage";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [showimg , setshowimg] = useState(true);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const {currentuser} = userauth()
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    console.log(image);
  }




  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setshowimg(false);
    
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setshowimg(true);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const  handleLogin  = async () => {
    console.log('Username:', username);
    console.log('email:', email);
    console.log('Password:', password);
    try{
   const {user} = await  createUserWithEmailAndPassword(auth ,email,password)
   if (image) {
    // Convert image URI to Blob
    const response = await fetch(image);
    const blob = await response.blob();

    // Generate unique filename
    const filename = `image_${Date.now()}`;
    const storage = getStorage();

    // Create a reference to the storage location
    const storageRef = ref(storage, filename);

    // Upload image to Firebase Storage
    await uploadBytes(storageRef, blob);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);
    await updateProfile(user , {displayName:username , photoURL:downloadURL})

   }
   console.log(user);
   await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayname: user.displayName,
    email,
    photoURL : user.photoURL
    
    

  });
    if(currentuser){
      navigation.push('Home')
    }
      
    }
    catch(error){
      console.log(error);
    }
  };

 

  return (
    <View className="flex-1 justify-center bg-neutral-800 p-4 items-center">
      <Text className="text-3xl text-white font-bold">Signup</Text>
      <TouchableOpacity className="flex justify-center items-center  " onPress={pickImage} >
      {image ?( <Image source={{ uri: image || defaultImageUri }} className="w-40 h-40 rounded-full" />):
      (
        <Button title="Pick an image from camera roll " className="m-5 "  onPress={pickImage} />


      )}





      </TouchableOpacity>
      
 
      <View className="w-full p-4 rounded-lg">
        <TextInput
          className="border border-gray-400 rounded-2xl px-4 py-2 mb-4 outline outline-white text-white w-full"
          placeholder="Username"
          placeholderTextColor="white"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          className="border border-gray-400 rounded-2xl px-4 py-2 mb-4 outline outline-white text-white w-full"
          placeholder="email"
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
      
        <TouchableOpacity
          className="bg-blue-500 mb-5 rounded px-4 py-2 flex justify-center items-center"
          onPress={handleLogin}
        >
          <Text className="text-white">Signup</Text>
        </TouchableOpacity>
     
        <View className="flex flex-row">
          <Text className="text-blue-500">
            Already Signed up? {" "}
          </Text>
          <TouchableOpacity onPress={()=> navigation.push('login')}>
            <Text className="text-blue-500">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;
