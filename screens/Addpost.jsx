import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform ,Text , TextInput ,TouchableOpacity,ActivityIndicator ,ToastAndroid} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Bottomnav from '../components/Bottomnav';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ref,getStorage, uploadBytesResumable,uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from '../Firebase/firebase';
import {setDoc,doc,serverTimestamp} from 'firebase/firestore'
import { userauth } from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native'
export default function Addpost() {
  const [image, setImage] = useState(null);
  const [caption , setCaption]  = useState()
  const [loading ,  setloading] = useState(false)
const {currentuser} = userauth()
const navigation = useNavigation();
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
    console.log(image.mimeType);
  };

  function showToast() {
    ToastAndroid.show('post added successfully successfully!', ToastAndroid.SHORT);
  }

  const handlePost = async () => {
    try {
      setloading(true)
      if (image) {
        // Convert image URI to Blob
        const response = await fetch(image);
        const blob = await response.blob();

        // Generate unique filename
        const filename = `image_${Date.now()}`;
        const storage = getStorage();

        // Create a reference to the storage location
        const storageRef = ref(storage, `posts/${filename}`);

        // Upload image to Firebase Storage
        await uploadBytes(storageRef, blob);

        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(storageRef);
     
           await setDoc(doc(db, "posts", currentuser.uid+Date.now().toString()), {
            createdby: currentuser.displayName,
            creatoruid:currentuser.uid,
            img: downloadURL,
            photourl:currentuser.photoURL,
            imgname : filename,
            time: serverTimestamp(),
            caption: caption,
          });
          console.log("post added");

        
      

        // Now you can use the downloadURL to store it in your database or display it
        console.log('Image uploaded. Download URL:', downloadURL);
        setloading(false)
        showToast()
        navigation.push('Home')
      }
      
      
      else {
        console.log('No image selected.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setloading(false)
    }
  };


  return (
 
    <SafeAreaView className="bg-neutral-800" style={{ flex: 1,  }}>
        <Text className="text-white p-5 text-2xl font-bold">Add a post</Text>
      <TextInput
          className="border border-gray-400  px-4 py-2  mb-4 outline outline-white text-white w-full my-5"
          placeholder="caption"
          multiline={true}
          placeholderTextColor="white"
          value={caption}
          onChangeText={setCaption}
        />
      <TouchableOpacity className="flex justify-center items-center flex-[0.8] bg-slate-500 border-2 border-white border-dashed" onPress={pickImage} >
      {image ?( <Image source={{ uri: image || defaultImageUri }} style={{ width: '95%', height: '100%' ,   resizeMode: 'contain', }} />):
      (
        <Button title="Pick an image from camera roll " className="m-5 "  onPress={pickImage} />


      )}

{loading &&  <ActivityIndicator size="large" className="relative justify-center " color="#0000ff" />} 




      </TouchableOpacity>
      <Button title='post' onPress={handlePost}/>
      
      <View className="absolute bottom-0 left-0 right-0">
        <Bottomnav />
      </View>
    </SafeAreaView>
  );
}
