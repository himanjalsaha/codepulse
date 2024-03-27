import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../Firebase/firebase'; // Assuming you have initialized Firebase in your project

const Navbar = () => {
  const [users, setUsers] = useState([]);

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
    <View className="bg-neutral-800">
      <Text className="text-white text-center font-semibold text-lg">Discover</Text>
      <FlatList
        className="bg-neutral-800 p-2"
        horizontal
        showsHorizontalScrollIndicator={false}
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: item.photoURL }} 
              style={styles.image}
            />
            <Text style={styles.name}>{item.displayname}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  name: {
    color: 'white',
    marginTop: 5,
  },
});

export default Navbar;
