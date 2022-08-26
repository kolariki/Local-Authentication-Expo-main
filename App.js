import { useState, useEffect } from 'react';//lo usamos para loguear y deslogear
import { StyleSheet, Text, View } from 'react-native';
import Auth from './src/screens/AuthScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import * as LocalAuthentication from 'expo-local-authentication'; // lo usamos para loguear y desloguear
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {


  const [isBiometricSupported, setIsBiometricSupported] = useState(false);  // para saber si soporta datos biometricos o el face check
  const [isAuthenticated, setIsAuthenticated] = useState(false); // para saber si el usuario esa autenticado
   
    // Check si el hardware soporta biometrics con el hasHardwareAsync, que nos indica si es compatible o no y lo ponemos en setIsBiometricSupported(seteado en el useState)
    useEffect(() => {
      (async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        setIsBiometricSupported(compatible);
      })();
    });

    function onAuthenticate () {  //con esta funcion pedimos al usuario que se identifique con el face id o el password dependiendo del metodo que posea su dispositivo.
      const auth = LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate',
        fallbackLabel: 'Enter Password',
      });
      auth.then(result => { //luego que de eso guardamos el resultado en nuestra variable setIsAuthenticated
        setIsAuthenticated(result.success);
          console.log(result);
      }
      );
    }

  return (
  
    <View style={styles.container}>
      { isAuthenticated //si esta autenticado, procede a la pagina siguiente
        ? <PaymentScreen setIsAuthenticated={setIsAuthenticated} /> //pasamos la prop SetIsAuthenticated
        : <Auth onAuthenticate={onAuthenticate} /> //pasamos la prop onAuthenticate
      }  
    </View>
    
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
