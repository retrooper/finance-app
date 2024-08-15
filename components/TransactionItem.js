import { View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function TransactionItem({ data }) {
  return (
    <View style={styles.container}>
      <View style={styles.layout}>
        <View style={styles.contentLayout}>
            <View style={[styles.icon, { backgroundColor: 'rgb(30 58 138)'}]} />
          <View>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.location}>{data.location}</Text>
            <Text style={styles.date}>{data.date}</Text>
          </View>
        </View>
        {
        /*
         * Had a $ sign
        */}
        <Text style={styles.amount}>{data.amount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 26,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(39 39 42)',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#ddd',
  },
  layout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentLayout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
    color: 'rgb(238 242 255)'
  },
  location: {
    color: 'rgb(238 242 255)',
    marginBottom: 6,
  },
  date: {
    color: 'rgb(238 242 255)',
    fontSize: 13,
  },
  amount: {
    fontSize: 15,
    fontWeight: '600',
    alignSelf: 'start',
    //color: 'rgb(132 204 22)'
    color: 'rgb(225 29 72)'
  },
  icon: {
    height: 36,
    width: 36,
    borderRadius: 6,
    marginRight: 12,
    alignSelf: 'start',
  },
});
