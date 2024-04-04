import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { HeartIcon, ShareIcon } from 'react-native-heroicons/outline';
import { collection, onSnapshot, query, orderBy , updateDoc , doc } from 'firebase/firestore';
import { db } from '../Firebase/firebase'; // Assuming you have initialized Firebase in your project
import { Video } from 'expo-av'
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [slectedpost , setselectedpost] = useState({})
  const [likecount , setLikecount] = useState(0)
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'posts'),orderBy('time', 'desc')), (snapshot) => {
      const updatedPosts = [];
      snapshot.forEach((doc) => {
        updatedPosts.push({ id: doc.id, ...doc.data(), heartColor: 'black'   });
      });
      setPosts(updatedPosts);
      console.log(posts);
    });

    return unsubscribe;

  }, []);




  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const datestring = date.getDate().toString()
    const monthindex = date.getMonth().toString()
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const month = months[monthindex]
    return `${datestring} ${month}  ${hours}:${minutes}`;
  };

  const toggleHeartColor = async (item, index) => {

    setPosts(prevPosts => {
      const updatedPosts = [...prevPosts];
      const postId = item.id;
      const postRef = doc(db, 'posts', postId);
      let newLikeCount = item.like;
  
      // Toggle heartColor
      updatedPosts[index].heartColor = updatedPosts[index].heartColor === 'black' ? 'red' : 'black';
  
      // Update like count
      if (updatedPosts[index].heartColor === 'red') {
        // If heartColor is red, increment like count
        newLikeCount++;
      } else {
        // If heartColor is black, decrement like count
        newLikeCount--;
      }
  
      // Update like count in Firestore
      updateDoc(postRef, { like: newLikeCount ,  heartColor: 'red' });
  
      // Update like count in the local state
      updatedPosts[index].like = newLikeCount;
  
      return updatedPosts;
    });
  };
  


  const renderItem = ({ item,index   }) => {
    const isLastItem = index === posts.length - 1; // Check if the item is the last one
    const marginBottomStyle = isLastItem ? { marginBottom: 100 } : {}; // Apply margin bottom only to the last item
    return (
      <View style={[styles.feedItem,marginBottomStyle]} className=''>
        <Image 
          source={{ uri: item.img }} // Assuming each post has a field 'imageUrl' containing the image URL
          style={styles.image}   
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity key={index}   onPress={() => toggleHeartColor(item,index)}>
                <HeartIcon size={30} color={item.heartColor}  />



          </TouchableOpacity>
          <Text>{item.like}</Text>
          <ShareIcon size={30} color="black" />
        </View >
        <View className="flex flex-row  items-center">
        <Image source={{uri:item.photourl}} className="w-10 h-10 rounded-full"/>
        <Text className='w-64' style={styles.text}><Text style={styles.bold}>{item.createdby}</Text> {item.caption}</Text>
        </View>
   
        <Text style={styles.text}>{formatTime(item.time * 1000)}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  feedItem: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 10,
    padding: 5,
    margin:10,
  },
  image: {
    width: '100%', 
    height: 300, 
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  text: {
    color: 'black',
    padding:5
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default Feed;
