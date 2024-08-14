import { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function Balance() {
  const [, regenerateRadomData] = useState();
  const forceUpdate = useCallback(() => regenerateRadomData({}), []);

  const [data, set_data] = useState([new Date().toLocaleDateString()])
  

  return (
    <Pressable style={styles.container} onPress={forceUpdate}>
      <View style={styles.layout}>
        <View>
          <Text style={styles.title}>Date</Text>
          <Text style={styles.balance}>
            {data}
          </Text>
        </View>
        <LineChart
          data={{
            datasets: [
              {
                data,
              },
            ],
          }}
          width={Dimensions.get('window').width / 2 - 24}
          height={80}
          chartConfig={{
            backgroundGradientFrom: 'rgb(24 24 27)',
            backgroundGradientTo: 'rgb(24 24 27)',
            fillShadowGradientFrom: 'rgb(24 24 27)',
            fillShadowGradientTo: 'rgb(24 24 27)',
            color: (opacity = 1) => `rgba(0, 200, 200, ${opacity * 2})`,
            propsForBackgroundLines: {
              stroke: 'transparent',
            },
          }}
          hidePointsAtIndex={[...Array(data.length - 1).keys()]}
          withHorizontalLabels={false}
          bezier
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    height: 100,
    borderRadius: 6,
    backgroundColor: 'rgb(24 24 27)',
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: 'rgb(30 58 138)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: Platform.select({
      native: 12,
    }),
  },
  layout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginBottom: 6,
    color: "rgb(250 250 250)"
  },
  balance: {
    fontSize: 28,
    fontWeight: '600',
    color: "rgb(250 250 250)",
  },
});
