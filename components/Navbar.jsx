import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../Firebase/firebase'; // Assuming you have initialized Firebase in your project
import { userauth } from '../context/AuthContext';

const Navbar = () => {
  const [users, setUsers] = useState([]);
  const { currentuser } = userauth();

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'users')), (snapshot) => {
      const updatedUsers = [];
      snapshot.forEach((doc) => {
        updatedUsers.push({ id: doc.id, ...doc.data() });
      });
      setUsers(updatedUsers);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View className='flex flex-row items-center gap-1'>
      <Text className="text-white font-bold text-lg">ClarityConnect</Text>
       <Image source={require('../assets/cconnectlogo.png')} className='w-8 h-8 rounded-full' />
      </View>

      <FlatList
        contentContainerStyle={styles.userList}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={users.filter(user => user.uid !== currentuser.uid)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className='h-24 w-24' style={styles.itemContainer}>
            <Image
            
              source={{ uri: item.photoURL }} 
              style={styles.image}
              className='absolute rounded-full'
            />
            <Text style={styles.name} className='relative top-16  text-white p-1 '>{item.displayname}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userList: {
    alignItems: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
  },
  name: {
  
    marginTop: 5,
  },
});

export default Navbar;
