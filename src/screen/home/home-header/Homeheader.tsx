import {Text, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './HomeheaderStyle';
export default function HomeHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer} />
      <View style={styles.containerContent}>
        <Text style={styles.txtTitle}>Hey Raju</Text>
        <Text numberOfLines={1} style={styles.txtSubTitle}>
          Welcome to the Home Screen
        </Text>
      </View>
      <View>
        <MaterialIcon name="menu-open" size={30} color="black" />
      </View>
    </View>
  );
}
