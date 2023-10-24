import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MyColor} from '../../components/atoms/MyColor';

const News = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}>
      <View
        style={{
          borderRadius: 20,
          borderWidth: 2,
          borderColor: MyColor.Primary,
          backgroundColor: MyColor.Light,
          padding: 20,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 30,
            color: MyColor.Primary,
            textAlign: 'center',
          }}>
          Fitur ini masih dalam tahap pengembangan 🔧
        </Text>
      </View>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({});
