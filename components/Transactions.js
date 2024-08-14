import { FlatList, View, StyleSheet, Text } from 'react-native';

import TransactionItem from './TransactionItem';

export default function Transactions() {
  //let weatherData = getWeatherData();

  let cityNamePromise = getCityName();
  cityNamePromise.then(function(result) {
    // here you can use the result of promiseB
    console.log("output: " + result)
  });
  setTimeout(() => {
    console.log('city name: ' + cityNamePromise);
  }, 1000);
  const data = [
    {
      title: cityNamePromise,
      location: 'Kihei, HI',
      date: 'Today, 13:21',
      amount: (Math.random() * 10).toFixed(2),
      icon: '#FB8E41',
    },
    {
      title: 'Shops at Wailea',
      location: 'Wailea, HI',
      date: 'Yesterday, 20:07',
      amount: (Math.random() * 25).toFixed(2),
      icon: '#0091FF',
    },
    {
      title: 'Ono Hawaiian BBQ',
      location: 'Paia, HI',
      date: 'Thursday',
      amount: (Math.random() * 100).toFixed(2),
      icon: '#34D058',
    },
    {
      title: 'Fond',
      location: 'Lahaina, HI',
      date: 'Wensday',
      amount: (Math.random() * 10).toFixed(2),
      icon: '#34D058',
    },
    {
      title: 'Ula’Ula Cafe',
      location: 'Waihee-Waiehu, HI',
      date: 'Tuesday',
      amount: (Math.random() * 15).toFixed(2),
      icon: '#FB8E41',
    },
    {
      title: "Tante's Fishmarket",
      location: 'Wailuku, HI',
      date: 'Monday',
      amount: (Math.random() * 10).toFixed(2),
      icon: '#0091FF',
    },
  ];

  return (
    <FlatList
      data={data}
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

async function getCityName() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`;

      fetch(url)
      .then((response) => response.json())
        .then((data) => {
        // Parse the city name from the API response
        const city = data.results[0].address_components.find((component) =>
          component.types.includes("locality")
        ).long_name;

        console.log(`Your city is ${city}.`);
    })
    .catch((error) => console.log(error));
    });
  } else {
    console.log('geo off?!');
  }
}

async function getWeatherData() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/forecast?lat=' +
          latitude +
          '&lon=' +
          longitude +
          '&appid=d881ba1571fd259dcb9b7676c74e6655'
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = response.json();
      console.log(json);
    });
  }
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(39 39 42)',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    color: '#666',
  },
});
