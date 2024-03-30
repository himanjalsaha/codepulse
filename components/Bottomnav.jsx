import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { HomeIcon, ChatBubbleBottomCenterTextIcon, UserCircleIcon, PlusIcon } from 'react-native-heroicons/solid';
import { useNavigation, useRoute } from '@react-navigation/native';

const Bottomnav = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View className="bg-neutral-600 flex flex-row justify-between p-5 rounded-t-2xl">
      <TouchableOpacity onPress={() => navigation.navigate('Home')} disabled={route.name === 'Home'} className={`text-white flex flex-col items-center bg-cyan-600 rounded-full p-2 ${route.name === 'Home' ? 'opacity-50 bg-gray-500' : ''}`}>
        <HomeIcon size="20" color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('addpost')} disabled={route.name === 'addpost'} className={`text-white flex flex-col items-center bg-cyan-600 rounded-full p-2 ${route.name === 'addpost' ? 'opacity-50 bg-gray-500' : ''}`}>
        <PlusIcon size="20" color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('chats')} disabled={route.name === 'chats'} className={`text-white flex flex-col items-center bg-cyan-600 rounded-full p-2 ${route.name === 'chats' ? 'opacity-50 bg-gray-500' : ''}`}>
        <ChatBubbleBottomCenterTextIcon size="20" color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('profile')} disabled={route.name === 'profile'} className={`text-white flex flex-col items-center bg-cyan-600 rounded-full p-2 ${route.name === 'profile' ? 'opacity-50 bg-gray-500' : ''}`}>
        <UserCircleIcon size="20" color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Bottomnav;
