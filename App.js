import React from "react";
import { View,Text,StyleSheet } from "react-native";
import Home from "./src/Home";
import Modal from "./src/Modals";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Modals from "./src/Modals";
export default function App (){
  const stack = createStackNavigator()
  return(
  <NavigationContainer>
<stack.Navigator>
  <stack.Screen component={Home} name="Home" options={{headerShown:false}} />
  <stack.Screen component={Modals} name="Modal" options={{headerShown:false}} />
</stack.Navigator>
  </NavigationContainer>
    
  )
}