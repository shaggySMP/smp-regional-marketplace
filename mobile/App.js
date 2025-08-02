import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import screens
import SplashScreen from './screens/SplashScreen';
import CountrySelectScreen from './screens/CountrySelectScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ItemDetailScreen from './screens/ItemDetailScreen';
import CreateItemScreen from './screens/CreateItemScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen';
import ChatsListScreen from './screens/ChatsListScreen';
import SearchScreen from './screens/SearchScreen';

// Import navigation components
import CustomDrawerContent from './components/CustomDrawerContent';
import TabBarIcon from './components/TabBarIcon';

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Main tab navigator
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon route={route} focused={focused} color={color} size={size} />
        ),
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="CreateItem" component={CreateItemScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Main stack navigator
function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="CountrySelect" 
        component={CountrySelectScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="HomeTabs" 
        component={HomeTabs} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ItemDetail" 
        component={ItemDetailScreen} 
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen} 
      />
      <Stack.Screen 
        name="ChatsList" 
        component={ChatsListScreen} 
      />
      <Stack.Screen 
        name="Search" 
        component={SearchScreen} 
      />
    </Stack.Navigator>
  );
}

// Main app component
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Main" component={MainStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
