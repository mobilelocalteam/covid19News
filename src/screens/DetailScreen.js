import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import Header from '../components/Header';

const DetailScreen = ({route}) => {
  const navigation = useNavigation();

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={route.params.navHeaderTitle} onBackPress={onBackPress} />
      <WebView
        source={{
          uri: route.params.url,
        }}
      />
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
