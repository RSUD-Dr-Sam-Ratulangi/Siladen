import {StyleSheet, Text, View} from 'react-native';
import {useEffect} from 'react';
import React from 'react';

const RedirectPage = ({navigation, route}: any) => {
  const dataUser = route.params;

  useEffect(() => {
    const navigateToDashboard = setTimeout(() => {
      navigation.replace('BuatLaporan', dataUser);
    }, 0);

    return () => clearTimeout(navigateToDashboard);
  }, [navigation]);
  return <View></View>;
};

export default RedirectPage;

const styles = StyleSheet.create({});
