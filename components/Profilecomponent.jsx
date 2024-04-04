import { View, Text, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { userauth } from '../context/AuthContext';
import { collection, onSnapshot, query, orderBy,deleteDoc,doc } from 'firebase/firestore';
import { db } from '../Firebase/firebase'; // Assuming you have initialized Firebase in your project
import {TrashIcon} from 'react-native-heroicons/outline'
import {deleteObject,ref,getStorage} from 'firebase/storage'
const Profilecomponent = () => {
  const { currentuser } = userauth();
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('time', 'desc')), (snapshot) => {
      const updatedPosts = [];
      snapshot.forEach((doc) => {
        updatedPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(updatedPosts);
    });

    return unsubscribe;
  }, []);

  // Function to calculate the dimensions for each image
  const getImageDimensions = () => {
    const columns = 3; // Number of columns in the grid
    const imageSize = (screenWidth - 6) / columns; // Subtracting margin
    return { width: imageSize, height: imageSize };
  };

  // Function to handle image click and set the selected image
  const handleImageClick =  (image) => {
    setSelectedImage(image);
    
    
  };



  const deletepost = async () => {
    try {
      const storage = getStorage()
      const storageRef = ref(storage, 'posts/' + selectedImage?.imgname); // Assuming the image is stored under 'images' folder in Firebase Storage
      await deleteObject(storageRef);
  

      const docRef = doc(db, "posts", selectedImage?.id);
      await deleteDoc(docRef);
      setSelectedImage(null); // Close the modal after deletion
    } catch (error) {
      console.log('Error deleting post:', error);
    }
  }
  

  // Function to render each post item
  const renderItem = ({ item }) => {
    if (item.creatoruid === currentuser.uid) {
      return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleImageClick(item)}>
          <Image
            source={{ uri: item.img }}
            style={[styles.postImage, getImageDimensions()]}
          />
        </TouchableOpacity>
      );
    } else {
      return null; // Skip rendering if the condition doesn't match
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: currentuser.photoURL }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{currentuser.displayName}</Text>
        <Text style={styles.profileUsername}>{currentuser.email}</Text>
      </View>

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3} // Number of columns in the grid
        contentContainerStyle={styles.flatListContainer}
      />

      {/* Modal for Image Preview */}
      <Modal
        visible={selectedImage !== null}
        transparent={true}
        onRequestClose={() => setSelectedImage(null)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={() => setSelectedImage(null)}>
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deletepost} className="  left-24 w-40 hover:bg-slate-500 flex flex-row items-center bg-slate-400 p-2 rounded-md"  >
      <TrashIcon size={20} color={"red"} /><Text className="text-white font-bold">delete post</Text>
    </TouchableOpacity>
        
          
          <View style={styles.imageContainer} >
         
       
         
  


            <Image source={{ uri: selectedImage?.img }} className="h-full w-full " resizeMode='contain'  />
            <View style={styles.textView} >
    <View className="flex flex-row justify-around items-end">
    <Text><Text className="font-bold m-2">{selectedImage?.createdby}</Text>{selectedImage?.caption}</Text>


  </View>
</View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    color: 'white',
  },
  
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileUsername: {
    color: '#666',
    fontSize: 18,
  },
  flatListContainer: {
    marginTop: 20,
  },
  itemContainer: {
    flex: 1,
    margin: 2,
  },
  postImage: {
    resizeMode: 'cover',
    borderRadius: 1, // Adjust this value for rounded corners
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 999,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
  },
  imageContainer: {
    width: '99%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
    borderRadius:10,
    padding:5
  },
  modalImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  textView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  width:'100%',
    display:'flex',
    flexDirection:'row',
    padding: 10,
  },
});

export default Profilecomponent;
