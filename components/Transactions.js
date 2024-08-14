import { FlatList, View, StyleSheet, Text } from 'react-native';

import TransactionItem from './TransactionItem';

export default function Transactions() {
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

const data = [
  {
    title: 'unknown',
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
