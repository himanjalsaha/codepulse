import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import Bottomnav from '../components/Bottomnav';
const HomeScreen = () => {

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-neutral-800 flex-1">
        <Navbar />
        <View className="border-2 border-white" />
        <Feed />
      </View>
      <View className="absolute bottom-0 left-0 right-0">
        <Bottomnav />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
