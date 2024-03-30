import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { HeartIcon, ShareIcon } from 'react-native-heroicons/outline';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../Firebase/firebase'; // Assuming you have initialized Firebase in your project
import { Video } from 'expo-av'
const Feed = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'posts'),orderBy('time', 'desc')), (snapshot) => {
      const updatedPosts = [];
      snapshot.forEach((doc) => {
        updatedPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(updatedPosts);
      console.log(posts);
    });

    return unsubscribe;
  }, []);


  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };


  const [heartColor, setHeartColor] = useState('black');

  const toggleHeartColor = () => {
    setHeartColor(heartColor === 'black' ? 'red' : 'black');
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.feedItem}>
        <Image 
          source={{ uri: item.img }} // Assuming each post has a field 'imageUrl' containing the image URL
          style={styles.image}      
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={toggleHeartColor}>
            <HeartIcon size={30} color={heartColor} />
          </TouchableOpacity>
          <ShareIcon size={30} color="black" />
        </View >
        <View className="flex flex-row  items-center">
        <Image source={{uri:item.photourl}} className="w-10 h-10 rounded-full"/>
        <Text style={styles.text}><Text style={styles.bold}>{item.createdby}</Text> {item.caption}</Text>
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
    marginBottom: 10,
    padding: 10,
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
