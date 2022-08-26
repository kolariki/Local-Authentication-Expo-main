import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";

const CoinItem = ({ coin }) => {
  //aqui extraemos los valores de coin visibles en nuestra app, en este caso (image, name, symbol, current_price, coin.price_change_percentage_24h,etc ).
  return (
    <View style={styles.containerItem}>
      <Text style={styles.textSymbol}> {coin.symbol} </Text>
      <View style={styles.coinName}>
        <Image style={styles.image} source={{ uri: coin.image }} />
        <View style={styles.containername}>
          <Text style={styles.text}>{coin.name}</Text>
          <Text style={styles.textExtra}>Change 24hs</Text>
          <Text style={styles.textExtra}>High 24hs </Text>
          <Text style={styles.textExtra}>Low 24hs </Text>
        </View>
      </View>
      <View>
        <Text style={styles.textPrice}>${coin.current_price} </Text>
        <Text
          style={[
            styles.pricePercentage,
            coin.price_change_percentage_24h > 0
              ? styles.priceUp
              : styles.priceDown,
          ]}
        >
          % {coin.price_change_percentage_24h}
        </Text>
        <Text style={styles.priceHigh}> ${coin.high_24h} </Text>
        <Text style={styles.priceLow}>${coin.low_24h} </Text>
      </View>
    </View>
  );
};

const App = () => {
  const [coins, setCoins] = useState([]);

  const [search, setSearch] = useState(""); //sirve solo para guardar el termino que se esta buscando que inicialmente es un texto en blanco

  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => { //aqui se carga la api con la propiedad fetch para obtener recursos de forma asíncrona por la red, 
    const res = await fetch(     //en este caso los datos de las coins.
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );


    const data = await res.json();  //creamos la const data que almacena la respuesta(res) de la API tomada por el fetch en linea 52-54 
    setCoins(data);                 //y las carga al useState de coins de linea 46.
  };


  useEffect(() => { //llamamos la funcion loadData de linea 52 y cuadno cargue la APP trae todos los objetos de la APi
    loadData();
  }, []);


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />

      <View style={styles.header}>
        <TextInput
          style={styles.searchImput} //es el input que se usa para buscar alguna coin especifica
          placeholder="Search a Coin"
          placeholderTextColor="grey"
          onChangeText={(text) => setSearch(text)} // establece como valor el texto que se este tipenado
        />
      </View>

      <FlatList
        style={styles.list} //FlatList recibe un arreglo y te permite recorrerlo de forma mas facil
        data={coins.filter(
          //recibe como dato el arreglo "coins"
          (coin) =>
            coin.name.toLowerCase().includes(search) || 
            coin.symbol.toLowerCase().includes(search)
        )}
        renderItem={({ item }) => {
          //devuelve uno a uno cada elemento del arreglo "coins", es decir porciones de codigo para cada uno de los objetos que se esten recorriendo.
          return <CoinItem coin={item} />; //devolvemos el coinItem, el cual fue creado en otro archivo para darle estilos, luego llamamos a CoinItem
        }}                                 //definido en linea 12 el cual contiene todos los datos que se muestran en pantalla, tales como name, symbol, etc.-
        showsVerticalScrollIndicator={false}
        refreshing={refreshing} //arranca inicialmente en false, el cual esta definido en el useState de linea 50
        onRefresh={async () => {
          setRefreshing(true); //Refresca los precios de las coins, como es asincrono se usa async.
          await loadData(); //traemos los datos de nuevo con loadData
          setRefreshing(false);//una vez traido los datos se establece en false nuevamente
        }}
      />
    </View>
  );
};

//ESTILOS VIEW Y FLAT LIST
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    alignItems: "center",
    flex: 1,
  },
  title: {
    color: "#fff",
    marginTop: 10,
    fontSize: 20,
  },
  list: {
    width: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
  searchImput: {
    color: "#fff",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    width: "100%",
    textAlign: "left",
    marginTop: 25,
    fontSize: 15,
  },
  containerItem: {
    backgroundColor: "#121212",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between", //PARA DAR ESPACIO ENTRE TEXTO E IMAGEN
  },
  coinName: {
    flexDirection: "row", //PARA COLOCAR UN ELEMENTO AL LADO DE OTRO
  },
  text: {
    color: "#fff",
    textAlign: "left",
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 20,
    alignItems: "stretch",
  },
  textSymbol: {
    color: "#778899",
    textTransform: "uppercase",
  },
  pricePercentage: {
    textAlign: "right",
  },
  priceUp: {
    color: "green",
  },
  priceDown: {
    color: "red",
  },

  textPrice: {
    color: "#fff",
    textAlign: "right",
  },
  textExtra: {
    color: "#fff",
    textAlign: "left",
  },
  priceHigh: {
    color: "#ff4500",
    textAlign: "right",
  },
  priceLow: {
    color: "yellow",
    textAlign: "right",
  },
});

export default App;
