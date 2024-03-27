import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import Bottomnav from '../components/Bottomnav';
import Profilecomponent from '../components/Profilecomponent';
const Profile = () => {

  return (
    <SafeAreaView className="flex-1 bg-neutral-900 h-full">
        <Text className="text-white text-2xl m-5">Profile</Text>

<Profilecomponent/>
   
      
      <View className="absolute bottom-0 left-0 right-0">
        <Bottomnav />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
