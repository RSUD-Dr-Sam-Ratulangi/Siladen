import {View, StyleSheet} from 'react-native';
import React from 'react';
import {MyColor} from '../MyColor';

const Line = ({height, width}: any) => {
  return <View style={[styles.bg, {height: height, width: width}]} />;
};

export default Line;

const styles = StyleSheet.create({
  bg: {
    backgroundColor: MyColor.Primary,
  },
});
