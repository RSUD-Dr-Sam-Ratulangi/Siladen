import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '../../components/atoms/Button';
import {MyColor} from '../../components/atoms/MyColor';
import Header from '../../components/molecules/Header';

const Settings = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container1}>
        <Button
          label="Log out"
          width={150}
          onClick={() => {
            navigation.navigate('Login');
          }}
          textColor={MyColor.Light}
          backgroundColor={MyColor.Primary}
        />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
