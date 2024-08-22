import { FlatList, View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import TransactionItem from "./TransactionItem";
import * as Location from "expo-location";
import Balance from "./Balance";

export default function Transactions() {
  //let weatherData = getWeatherData();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [location, setLocation] = useState(null);
  const [render_data, set_render_data] = useState(false);

  let loadingDataPlaceholder = {
    title: "Loading...",
    location: "Loading...",
    date: "Loading..",
    amount: undefined,
    icon: "#FB8E41",
  };

  //TODO Add API KEY
  const apiKey = "";

  const [data, set_data] = useState([
    Object.assign({}, loadingDataPlaceholder),
    Object.assign({}, loadingDataPlaceholder),
    Object.assign({}, loadingDataPlaceholder),
    Object.assign({}, loadingDataPlaceholder),
    Object.assign({}, loadingDataPlaceholder),
    Object.assign({}, loadingDataPlaceholder),
  ]);

  useEffect(() => {
    async function processWeatherData() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const latitude = location["coords"]["latitude"];
      const longitude = location["coords"]["longitude"];

      //Get weather data
      let response = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&appid=" +
          apiKey +
          "&units=metric"
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      //Get city name data
      const response2 = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=` +
          latitude +
          `&lon=` +
          longitude +
          `&limit=100&appid=` +
          apiKey
      );

      if (!response2.ok) {
        throw new Error(`Response status: ${response2.status}`);
      }
      const cityNameDataJson = await response2.json();

      dataCopy = [...data];
      const locationName = cityNameDataJson[0]["name"];

      let date = new Date();
      for (let i = 0; i < dataCopy.length; i++) {
        let d = dataCopy[i];
        d.title = locationName;
        if (i == 0) {
          d.location = "Today";
        } else if (i == 1) {
          d.location = "Tomorrow";
        } else {
          d.location =
            date.toLocaleDateString("en-GB") +
            " - " +
            daysOfWeek[date.getDay()];
        }

        d.amount = undefined;

        //console.log('list: ' + JSON.stringify(json['list']));
        json["list"].forEach((element) => {
          let theDate = new Date(element["dt"] * 1000);
          if (
            theDate.toLocaleDateString("en-GB") ==
            date.toLocaleDateString("en-GB")
          ) {
            //console.log("element: " + element['dt'] + ", date: " + theDate.toLocaleDateString('en-GB'));
            d.date =
              "Temperature: " + Math.round(element["main"]["temp"]) + "°C";
          }
        });
        date.setDate(date.getDate() + 1);
      }
      set_data(dataCopy);

      set_render_data(true);
    }

    processWeatherData();
  }, []);

  return (
    <FlatList
      data={render_data ? data : []}
      style={{ flex: 1 }}
      renderItem={({ item }) => <TransactionItem data={item} />}
      keyExtractor={(item) => item.date}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Weather Reports</Text>
        </View>
      )}
      stickyHeaderIndices={[0]}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 35,
    paddingHorizontal: 20,
    backgroundColor: "rgb(39 39 42)",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    color: "#666",
  },
});
