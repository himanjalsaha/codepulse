import { View, Text , TouchableOpacity} from 'react-native'
import React from 'react'
import {HomeIcon, ChatBubbleBottomCenterTextIcon , UserCircleIcon, PlusIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native';

const Bottomnav = () => {
    const navigation  = useNavigation()
  return (
    <View className="bg-neutral-600 flex flex-row justify-between p-5 rounded-t-2xl">
      <TouchableOpacity  onPress={()=> navigation.push('Home')} className="text-white flex flex-col items-center bg-cyan-600 rounded-full p-2">
        <HomeIcon size="20" color="white"/>
      </TouchableOpacity>
      <TouchableOpacity  onPress={()=> navigation.push('addpost')}  className="text-white  flex flex-col items-center bg-cyan-600 rounded-full p-2">
        <PlusIcon size="20" color="white"/>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigation.push('chats')} className="text-white flex flex-col items-center bg-cyan-600 rounded-full p-2">
        <ChatBubbleBottomCenterTextIcon size="20" color="white"/>
      </TouchableOpacity>
      <TouchableOpacity  onPress={()=> navigation.push('profile')}  className="text-white  flex flex-col items-center bg-cyan-600 rounded-full p-2">
        <UserCircleIcon size="20" color="white"/>
      </TouchableOpacity>
     
    </View>
  )
}

export default Bottomnav