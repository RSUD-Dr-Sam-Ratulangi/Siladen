import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MyColor} from '../MyColor';

const Title = ({label}: any) => {
  return (
    <View>
      <Text style={styles.txt}>{label}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  txt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: MyColor.Primary,
  },
});
