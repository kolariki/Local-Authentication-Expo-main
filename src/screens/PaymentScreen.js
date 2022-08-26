import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Image, View, Button, Text, TouchableOpacity } from 'react-native';
import CardSVG from '../components/ApiCripto';

export default function PaymentScreen({setIsAuthenticated}) { //retorna el view una vez que logeamos.Llamamos aqui y en el onPress la prop {SetIsAuthenticate} seteada en APP.js, para que nos rediriga al login.
    return (
        
        <View style={styles.container}>
            <CardSVG />
            
            <TouchableOpacity 
                onPress={() => setIsAuthenticated(false)}
                style={styles.btn}>
                <Text style={styles.text}>Log out</Text>
            </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    textInput: {
        width: '90%',
        height: 50,
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#00000010',
        marginBottom: 20,
    },
    image: {

        width: 100,
        height: 100,
        borderRadius: 100,
    },
    btn: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0893FC',
        padding: 10,
        margin: 10,
        borderRadius: 15,
        marginTop: 50,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingLeft: 15,
        paddingBottom: 20,
    },
    top: {
        marginTop: 30,
        color: "#fff",
        fontSize: 20,
    }
})