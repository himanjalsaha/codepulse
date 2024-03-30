import { View, Text ,Image, TouchableOpacity , FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../Firebase/firebase'; // Assuming you have initialized Firebase in your project
import { userauth } from '../context/AuthContext';
const ChatContacts = () => {
  const [users, setUsers] = useState([]);
  const { currentuser } = userauth();
  const [selecteduser,setselecteduser] = useState(null)

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
      const navigation = useNavigation()
const handleselecteduser = (userdetails) =>{
setselecteduser(userdetails)
navigation.navigate('messages', { selecteduser: userdetails })
}

useEffect(()=>{
console.log(selecteduser);

},[selecteduser])


      const renderItem = ({ item }) => (
    <View >
        <TouchableOpacity className=" p-5 m-1 bg-neutral-800 rounded-2xl" onPress={() => handleselecteduser(item)}>
            <View className="flex flex-row items-center  gap-2">
            <Image  className="h-10 w-10 rounded-full"  source={{uri:item.photoURL}} />
            <View>
            <Text className="text-white">{item.displayname}</Text>
            <Text className="text-slate-500">hi</Text>
            </View>
            </View>
        </TouchableOpacity>
    </View>
      );
    
  return (
    <FlatList
    data={users.filter(user => user.uid !== currentuser.uid)}
    renderItem={renderItem}
    keyExtractor={item => item.id}
  />
 
  )
}

export default ChatContacts