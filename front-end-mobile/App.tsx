import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';

import KategoriBidang from './src/screens/KategoriBidang';
import Login from './src/screens/Login';

import BuatLaporanTeks from './src/screens/BuatLaporanTeks';
import WelcomePage from './src/screens/WelcomePage';
import SignUp from './src/screens/SignUp';
import ForgetPass from './src/screens/ForgetPass';
import Navigation from './src/Navigation';
import DetailLaporan from './src/screens/DetailLaporan';
import AdminLogin from './src/screens/AdminLogin';
import NavigationAdmin from './src/NavigationAdmin';
import BuatLaporan from './src/screens/BuatLaporan';
import AdminHomepage from './src/screens/AdminHomepage';
import AdminHistoryByStatus from './src/screens/AdminHistoryByStatus';
import AdminHistoryItems from './src/screens/AdminHistoryItems';
import AdminHistoryDetail from './src/screens/AdminHistoryDetail';
import {Provider, useDispatch, useSelector} from 'react-redux';
import storeState from './redux/store';
import Settings from './src/screens/Settings';
import {Permission, PERMISSIONS_TYPE} from './src/Permission';
// import {printAction} from '../../../redux/action';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    Permission.checkPermission(PERMISSIONS_TYPE.notifications);
  }, []);
  // const dataAwal = useSelector((data: any) => data.value);
  // useEffect(() => {
  //   console.log('ini data awal: ', dataAwal);
  // }, []);

  return (
    <Provider store={storeState}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="WelcomePage"
            component={WelcomePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="KategoriBidang"
            component={KategoriBidang}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AdminLogin"
            component={AdminLogin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Navigation"
            component={Navigation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NavigationAdmin"
            component={NavigationAdmin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgetPass"
            component={ForgetPass}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BuatLaporan"
            component={BuatLaporan}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BuatLaporanTeks"
            component={BuatLaporanTeks}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailLaporan"
            component={DetailLaporan}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AdminHomepage"
            component={AdminHomepage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AdminHistoryByStatus"
            component={AdminHistoryByStatus}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AdminHistoryItems"
            component={AdminHistoryItems}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AdminHistoryDetail"
            component={AdminHistoryDetail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
