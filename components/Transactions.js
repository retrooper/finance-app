import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useState, useEffect } from 'react';
import TransactionItem from './TransactionItem';
import * as Location from 'expo-location';
import Balance from './Balance';


export default function Transactions() {
  //let weatherData = getWeatherData();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [location, setLocation] = useState(null);
  const [render_data, set_render_data] = useState(false);
  const [data, set_data] = useState([
    {
      title: 'Loading...',
      location: 'Loading...',
      date: 'Today, 13:21',
      amount: (Math.random() * 10).toFixed(2),
      icon: '#FB8E41',
    },
    {
      title: 'Loading...',
      location: 'Loading...',
      date: 'Tmr, 13:21',
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
  ]);

  useEffect(() => {
    async function processWeatherData() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const latitude = location['coords']['latitude'];
      const longitude = location['coords']['longitude'];
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/forecast?lat=' +
          latitude +
          '&lon=' +
          longitude +
          '&appid=d881ba1571fd259dcb9b7676c74e6655&units=metric'
      );
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      dataCopy = [...data];
      let date = new Date();
      for (i = 0; i < dataCopy.length; i++) {
        let d  = dataCopy[i]
        if (i == 0) {
          d.location = 'Today';
        } 
        else if(i == 1){
          d.location = "Tomorrow"
        }
        else {
          d.location = date.toLocaleDateString('en-GB') + " - " + daysOfWeek[date.getDay()];
        }

        d.amount = undefined;

        //console.log('list: ' + JSON.stringify(json['list']));
        json['list'].forEach((element) => {
          let theDate = new Date(element['dt'] * 1000);
          if (
            theDate.toLocaleDateString('en-GB') ==
            date.toLocaleDateString('en-GB')
          ) {
            //console.log("element: " + element['dt'] + ", date: " + theDate.toLocaleDateString('en-GB'));
            d.date =
              'Temperature: ' + Math.round(element['main']['temp']) + '°C';
          }
        });
        date.setDate(date.getDate() + 1);
      }
      set_data(dataCopy);

      set_render_data(true);
    }

    async function processCityName() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const latitude = location['coords']['latitude'];
      const longitude = location['coords']['longitude'];

      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
      

      return await fetch(url)
        .then((response) => response.json())
        .then((json) => {
          dataCopy = [...data];
          dataCopy.forEach((d) => {
            d.title = json['city'];
          });
          set_data(dataCopy);
        });
    }

    processCityName();
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
    backgroundColor: 'rgb(39 39 42)',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    color: '#666',
  },
});
