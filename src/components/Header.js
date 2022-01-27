import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {sizes} from '../helper/FontSizes';

const Header = ({title, onBackPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress}>
        <Image
          source={require('../assets/ic_back.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
  },
  backIcon: {
    height: 30,
    width: 30,
    marginHorizontal: 5,
    tintColor: 'grey',
  },
  title: {
    fontSize: sizes.extra_large,
    color: 'blue',
    fontWeight: 'bold',
    flexShrink: 1,
  },
});
