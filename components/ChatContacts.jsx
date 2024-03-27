import { View, Text ,Image, TouchableOpacity , FlatList} from 'react-native'
import React from 'react'

const ChatContacts = () => {
    const data = [
        { id: '1', title: 'Item 1' },
        { id: '2', title: 'Item 2' },
        { id: '3', title: 'Item 3' },
        // Add more items as needed
      ];

      const renderItem = ({ item }) => (
    <View >
        <TouchableOpacity className=" p-5 m-1 bg-neutral-800 rounded-2xl">
            <View className="flex flex-row items-center  gap-2">
            <Image  className="h-10 w-10 rounded-full"  source={require("../assets/post.jpg")} />
            <View>
            <Text className="text-white">{item.title}</Text>
            <Text className="text-slate-500">hi</Text>
            </View>
            </View>
        </TouchableOpacity>
    </View>
      );
    
  return (
    <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={item => item.id}
  />
 
  )
}

export default ChatContacts