import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { userauth } from '../context/AuthContext';

const Profilecomponent = () => {
  const {currentuser} = userauth()
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{uri:currentuser.photoURL}}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{currentuser.displayName}</Text>
        <Text style={styles.profileUsername}>{currentuser.email}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Basic Information</Text>
        <Text className="text-white">Name: John Doe</Text>
        <Text className="text-white">Age: 30</Text>
        <Text className="text-white" >Email: johndoe@example.com</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Address</Text>
        <Text className="text-white">City: New York</Text>
        <Text className="text-white">Country: USA</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Bio</Text>
        <Text className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget orci pretium, gravida odio sit amet, vestibulum dolor. Integer ultrices, elit vitae varius iaculis.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    color:"white"
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
    color:"white"
  },
  profileUsername: {
    color: '#666',
    fontSize: 18,
  },
  section: {
    marginBottom: 20,
    color:"white"
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"white"
  },
});

export default Profilecomponent;
