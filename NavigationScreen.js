import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ActivityScreen from './Screens/ActivityScreen';
import ThreadsScreen from './Screens/ThreadsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab=createBottomTabNavigator();
 function BottomTabNavigation(){
  return (
    <Tab.Navigator>
     <Tab.Screen    name='Home' component={HomeScreen} options={{
      tabBarLabel:'Home',tabBarLabelStyle:{
        color:'black'
      },headerShown:false,
      tabBarIcon:({focused})=>focused?(
        <Entypo name="home" size={24} color="black" />
      ):(
        <AntDesign name="home" size={24} color="black" />
      )
     }}/>
       <Tab.Screen    name='Thread' component={ThreadsScreen} options={{
      tabBarLabel:'Create',tabBarLabelStyle:{
        color:'black'
      },headerShown:false,
      tabBarIcon:({focused})=>focused?(
        <Ionicons name="create" size={24} color="black" />
      ):(
        <Ionicons name="create-outline" size={24} color="black" />
      )
     }}/>
       <Tab.Screen    name='Activity' component={ActivityScreen} options={{
      tabBarLabel:'Thread',tabBarLabelStyle:{
        color:'black'
      },headerShown:false,
      tabBarIcon:({focused})=>focused?(
        <AntDesign name="heart" size={24} color="black" />
      ):(
        <AntDesign name="hearto" size={24} color="black" />
      )
     }}/>
      <Tab.Screen    name='Profile' component={ProfileScreen} options={{
      tabBarLabel:'Thread',tabBarLabelStyle:{
        color:'black'
      },headerShown:false,
      tabBarIcon:({focused})=>focused?(
        <Ionicons name="person" size={24} color="black" />
      ):(
        <Ionicons name="person-outline" size={24} color="black" />
      )
     }}/>
   
   
    </Tab.Navigator>
  )
}
export default function NavigationScreen () {
  
    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
          <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false}} />
          <Stack.Screen name='Main' component={BottomTabNavigation} options={{headerShown:false}} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  
}

const styles = StyleSheet.create({})
