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
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const loadData = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await res.json();
    setCoins(data);
  };
  useEffect(() => {
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
          onChangeText={(text) => setSearch(text)}
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
          return <CoinItem coin={item} />; //devolvemos el coinItem, el cual fue creado en otro archivo para darle estilos, luego llamamos a coin y al valor de esta coin(item)
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={async () => {
          //Refresca los precios de las coins, como es asincrono se usa async.
          setRefreshing(true);
          await loadData();
          setRefreshing(false);
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
    width: "29%",
    textAlign: "left",
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
