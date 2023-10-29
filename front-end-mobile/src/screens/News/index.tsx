import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MyColor} from '../../components/atoms/MyColor';
import Header from '../../components/molecules/Header';

const News = () => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Header backgroundTransparent />
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
              fontSize: 20,
              color: MyColor.Primary,
              textAlign: 'center',
            }}>
            Belum ada berita saat ini
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default News;

const styles = StyleSheet.create({});
