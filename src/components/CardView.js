import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import {sizes} from '../helper/FontSizes';
import moment from 'moment';
import {useNavigation} from '@react-navigation/core';

const shareIcon = require('../assets/icons/share.png');

const CardView = ({item}) => {
  const navigation = useNavigation();
  const date = moment(item.NewsDate).fromNow();


  const onPress = () => {
    navigation.navigate('DetailScreen', {navHeaderTitle: item.Title, url: item.URL});
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.shareWrapper}>
      <Image
          source={require('../assets/ic_share.png')}
          style={styles.shareIcon}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text
          numberOfLines={4}
          style={{lineHeight: 25, fontSize: sizes.medium}}>
          {item.Title}
        </Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
     
    </TouchableOpacity>
  );
};

export default CardView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingVertical: 15,
  },
  shareWrapper: {
    marginHorizontal: 5,
    alignItems: 'center',
    flex: 1,
    alignSelf: 'flex-start',
  },
  textWrapper: {
    flex: 7,
    justifyContent: 'space-between',
  },
  shareIcon: {
    width: 20,
    height: 20,
    tintColor: '#a2a2a2',
    marginTop: 10,
  },
  dateText: {
    color: 'grey',
    marginTop: 10,
    fontSize: sizes.small,
  },
});
