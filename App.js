import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import Signup from './screens/Signup';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Chats from './screens/Chats';
import Profile from './screens/Profile';
import { AuthProvider, userauth } from './context/AuthContext';
import Privaterote from './routes/ProtectedRoute';
import Addpost from './screens/Addpost';
export default function App() {
  const Stack = createStackNavigator();

  return (
    
    <AuthProvider>
    <NavigationContainer>
    <Stack.Navigator initialRouteName='login' screenOptions={{headerShown:false}}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name='chats' component={Chats}/>
    <Stack.Screen name='addpost' component={Addpost}/>
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="signup" component={Signup} />
       <Stack.Screen name='profile' component={Profile}/>
  </Stack.Navigator>
  </NavigationContainer>
  </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
