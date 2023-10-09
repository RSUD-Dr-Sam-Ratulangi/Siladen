import {StyleSheet, Text, View, Alert, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import Button from '../../components/atoms/Button';
import {MyColor} from '../../components/atoms/MyColor';
import Header from '../../components/molecules/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  saveIdUserAction,
  saveNameAction,
  saveRoleAction,
  saveTokenAction,
  saveUsernameAction,
} from '../../../redux/action';
import axios from 'axios';
import {CommonActions} from '@react-navigation/native';

const Settings = ({navigation}: any) => {
  const dispatch = useDispatch();
  const token = useSelector((data: any) => data.token);
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(
        `https://backend-pelaporan-final.glitch.me/auth/user/logout`,
        {headers},
      );

      await AsyncStorage.setItem('id_user', '');
      await AsyncStorage.setItem('name', '');
      await AsyncStorage.setItem('token', '');
      await AsyncStorage.setItem('role', '');
      dispatch(saveIdUserAction(''));
      dispatch(saveNameAction(''));
      dispatch(saveTokenAction(''));
      dispatch(saveRoleAction(''));

      if (response.data.code === '200') {
        // navigation.navigate('WelcomePage');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'SplashScreen'}],
          }),
        );
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert(
        'Terjadi kesalahan',
        'Mohon coba lagi, jika kesalahan terus berlanjut silahkan hubungi Costumer Service',
      );
      console.log('ini error login: ', error);
    }
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.container1}>
        {isLoading ? (
          <ActivityIndicator size="large" color={MyColor.Primary} />
        ) : (
          <Button
            label="Log out"
            width={150}
            onClick={logout}
            textColor={MyColor.Light}
            backgroundColor={MyColor.Primary}
          />
        )}
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
