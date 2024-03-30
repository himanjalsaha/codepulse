import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { userauth } from '../context/AuthContext';
import { getDoc, setDoc, doc, serverTimestamp, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import { SafeAreaView } from 'react-native-safe-area-context';

const Messages = ({ route }) => {
  const { selecteduser } = route.params;
  const { currentuser } = userauth();
  const [sentMessage, setSentMessage] = useState('');
  const [showmessage, setShowmessage] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'messages'), orderBy('time', 'desc')), (snapshot) => {
      const updatedMessages = [];
      snapshot.forEach((doc) => {
        updatedMessages.push({ id: doc.id, ...doc.data() });
      });
      setShowmessage(updatedMessages.reverse()); // Reverse the order to display oldest messages first
      console.log(updatedMessages);
    });

    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (!sentMessage.trim()) {
      setError('Message cannot be empty');
      return;
    }

    try {
      // Save message to database
      const messageRef = doc(db, "messages", currentuser.uid + selecteduser.uid);
      const messageDoc = await getDoc(messageRef);
      let existingMessages = [];
      
      if (messageDoc.exists()) {
        existingMessages = messageDoc.data().text;
      }
      
      const updatedMessages = [...existingMessages, sentMessage]; // Add the new message to existing messages array
  
      await setDoc(messageRef, {
        senderName: currentuser.displayName,
        receiverName: selecteduser.displayname,
        text: updatedMessages, // Set the text field as updated messages array
        senderId: currentuser.uid,
        receiverId: selecteduser.uid,
        time: serverTimestamp(),
      });
  
      // Clear input field after sending message
      setSentMessage('');
      setError('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 1 }}>
        <View className=" border-b-2 border-white flex flex-row items-center p-2 gap-2">
          <Image className="w-16 h-16 rounded-full" source={{ uri: selecteduser.photoURL }} />
          <Text className='text-lg text-white p-1'>{selecteduser.displayname}</Text>
          <Text className="text-white">{selecteduser.email}</Text>
        </View>
        <ScrollView style={{ flex: 1, paddingHorizontal: 20, marginTop: 8 }}>
          {showmessage
            .filter(message => 
              (message.senderId === currentuser.uid && message.receiverId === selecteduser.uid) ||
              (message.senderId === selecteduser.uid && message.receiverId === currentuser.uid)
            )
            .map((message, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                {message.text.map((text, idx) => (
                  <View className='m-1' key={idx}>
                    <View
                      style={{
                        alignSelf: message.senderId === currentuser.uid ? 'flex-end' : 'flex-start',
                        backgroundColor: message.senderId === currentuser.uid ? '#2196F3' : '#E0E0E0',
                        borderRadius: 10,
                        maxWidth: '75%',
                        padding: 10,
                        marginBottom: 5,
                      }}>
                      <Text style={{ color: message.senderId === currentuser.uid ? 'white' : 'black' }}>{text}</Text>
                    </View>
                  </View>
                ))}
              </View>
          ))}
        </ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 }}>
          <TextInput 
            placeholder="Type your message..."
            placeholderTextColor="#9E9E9E"
            style={{ flex: 1, backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10 }}
            value={sentMessage}
            onChangeText={setSentMessage}
          />
          <TouchableOpacity onPress={sendMessage} style={{ backgroundColor: '#2196F3', borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10, marginLeft: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
          </TouchableOpacity>
        </View>
        {error ? <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text> : null}
      </View>
    </SafeAreaView>
  );
};

export default Messages;
