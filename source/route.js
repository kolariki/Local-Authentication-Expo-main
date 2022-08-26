import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TextInput,
    StatusBar,
    
  } from "react-native";

import Home from "./Pages/Home";
import New from "./Pages/New";
import Notification from "./Pages/Notification";
import Profile from "./Pages/Profile";
import Search from "./Pages/Search";

import {Entypo, Feather} from "@expo/vector-icons"
import ButtonNew from "./components/ButtonNew";

const Tab = createBottomTabNavigator();

export default function Routes(){
    return(
        <Tab.Navigator style = {styles.container}>
               <Tab.Screen 
        name = "Login" 
        component={Home} 
        options= {{
            tabBarIcon: ({size, color}) => (
<Feather name= "edit-2" size={size} color={color} />
            )
        }}
        />

        <Tab.Screen 
        name = "Arbitrajes Disponibles" 
        component={Search} 
        options= {{
            tabBarIcon: ({size, color}) => (
<Feather name= "trending-up" size={size} color={color} />
            )
        }}
        />

 
<Tab.Screen 
         name = "Cotizaciones en Tiempo Real" 
         component={New} 
         options= {{
            tabBarLabel: "Nuevo",
            tabBarIcon: ({size, color}) => (
<Feather name= "list" size={size} color={color} />
            )
        }}
         />

        <Tab.Screen 
        name = "Ganancia" 
        component={Notification} 
        options= {{
            tabBarIcon: ({size, color}) => (
<Feather name= "dollar-sign" size={size} color={color} />
            )
        }}
        />

        <Tab.Screen 
        name = "Perfil" 
        component={Profile} 
        options= {{
            tabBarIcon: ({size, color}) => (
<Feather name= "user" size={size} color={color} />
            )
        }}
        />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
      textAlign: "center",
    },
  });

