import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  Image,
} from 'react-native';
import CardFlip from 'react-native-card-flip';
import { LinearGradient } from 'expo-linear-gradient';

export default function Card() {
  return (
    <CardFlip
      flipZoom={-0.15}
      ref={(card) => (this.card = card)}
      style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'black']}
        style={styles.background}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
      </LinearGradient>
      <LinearGradient
        colors={['rgba(32,32,32,0.7)', '#333']}
        style={styles.background}>
      </LinearGradient>
    </CardFlip>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    height: 200,
    marginBottom: Platform.select({
      native: 24,
      default: 16,
    }),
  },
  background: {
    borderRadius: 8,
  },
  logo: { width: 250, height: 100, marginBottom: 24, color: 'rgb(255 255 255)'},
});
