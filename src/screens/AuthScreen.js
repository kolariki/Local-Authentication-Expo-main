import {View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
const myImage = require('../../assets/login.png');

export default function Auth({onAuthenticate}) { //nos regresa la view del login. Llamamos aqui y en el onPress la prop {onAuthenticate} 
    return(                                      //seteada en APP.js, para que nos rediriga a la proxima pagina
        <View style={styles.container}>
            <Text style={styles.upper}>Todas tus finanzas en una sola APP.</Text>
            <Image source={myImage} style={styles.image}/>
            <Text style={styles.title}>Arbit!</Text>
            <TouchableOpacity 
                onPress={onAuthenticate}
                style={styles.btn}>
                <Text style={styles.text}>Ingresar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#4b0082",
        alignItems: "center",
        flex: 1,
      },
    btn: {
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#0893FC',
        padding: 10,
        borderRadius: 5,
    },
    image: {
        marginTop: 40,
        width: 350,
        height: 300,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
    },
    title: {
        fontSize: 50,
        fontWeight: '400',
        marginVertical: 30,
        textAlign: 'center',
        color: "#fff",
    },
    description: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 50,
    },
    upper: {
        marginTop: 20,
        alignItems: "center",
        fontSize: 20,
        color: "#fff"
      },
})