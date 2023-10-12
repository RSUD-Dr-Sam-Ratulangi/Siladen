import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import React, {useEffect} from 'react';
import {BackgroundRS, Logo} from '../../assets/images';
import Gap from '../../components/atoms/Gap';
import {MyColor} from '../../components/atoms/MyColor';
import {MyFont} from '../../components/atoms/MyFont';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {
  saveChannelIdAction,
  saveIdUserAction,
  saveNameAction,
  saveRoleAction,
  saveTokenAction,
} from '../../../redux/action';
import {API_HOST} from '../../../config';
import axios from 'axios';
import PushNotification from 'react-native-push-notification';

const SplashScreen = ({navigation, route}: any) => {
  const timestamp = Date.now();
  const dispatch = useDispatch();
  useEffect(() => {
    cekAuth();
  }, [navigation]);

  PushNotification.getChannels(function (channel_ids) {
    console.log(channel_ids);
    console.log('ini timestamp', timestamp);

    if (channel_ids.length < 1) {
      PushNotification.createChannel(
        {
          // channelId: `tes-channel1`,
          channelId: `${timestamp}`,
          // channelId: pake user pe id
          channelName: 'myChannel',
        },
        created => {},
      );
      (async () => {
        console.log('ini e timestamp: ', timestamp.toString());
        const timestampString = timestamp.toString();
        await AsyncStorage.setItem('channel_id', timestampString);
      })();
    }
    (async () => {
      console.log('masuk dalam');
      const item = await AsyncStorage.getItem('channel_id');
      dispatch(saveChannelIdAction(item));
      console.log('ini channel id: ', item);
    })();

    console.log('ini channel id notif: ', channel_ids);
  });

  const cekAuth = async () => {
    try {
      const nameAsync: any = await AsyncStorage.getItem('name');
      const idUserAsync: any = await AsyncStorage.getItem('id_user');
      const roleAsync: any = await AsyncStorage.getItem('role');
      const tokenAsync: any = await AsyncStorage.getItem('token');

      if (nameAsync && idUserAsync && roleAsync && tokenAsync) {
        dispatch(saveNameAction(nameAsync));
        dispatch(saveIdUserAction(idUserAsync));
        dispatch(saveRoleAction(roleAsync));
        dispatch(saveTokenAction(tokenAsync));
        const headers = {
          Authorization: `Bearer ${tokenAsync}`,
        };

        if (roleAsync === 'user') {
          try {
            const response = await axios.get(
              `${API_HOST}/api/laporan/user/latest/${idUserAsync}`,
              {headers},
            );

            if (response.data.data) {
              navigation.replace('Navigation');
            }
          } catch (error) {
            navigation.replace('WelcomePage');
          }
        } else if (roleAsync === 'admin') {
          try {
            const response = await axios.get(
              `${API_HOST}/api/laporan/user/latest/${idUserAsync}`,
              {headers},
            );

            if (response.data.data) {
              navigation.replace('AdminHomepage');
            }
          } catch (error) {
            navigation.replace('WelcomePage');
          }
        }
      } else {
        const navigateToDashboard = setTimeout(() => {
          navigation.replace('WelcomePage');
        }, 3000);
        return () => clearTimeout(navigateToDashboard);
      }
    } catch (error) {
      console.log('ini error splash screen: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundRS}
        resizeMode="cover"
        style={styles.bgRS}>
        <View style={styles.overlay}></View>
        <Gap height={100} />
        <Image source={Logo} resizeMode="contain" style={styles.logo} />
        <Gap height={100} />
        <Text style={styles.txtTitle}>Siladen</Text>
        <Text style={styles.txtSub}>Aplikasi Pelaporan Insiden</Text>
        <Gap height={100} />
        <Text style={styles.txt}>RSUD Dr.Sam Ratulangi{'\n'}Tondano</Text>
        <Gap height={80} />
        <Text style={styles.txtVersion}>v. 1.0.0</Text>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: 70,
  },
  bgRS: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    alignItems: 'center',
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  txt: {
    fontFamily: MyFont.Primary,
    textAlign: 'center',
    fontSize: 17,
    color: '#212121',
  },
  txtTitle: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    fontSize: 38,
    color: MyColor.Primary,
    lineHeight: 60,
  },
  txtSub: {
    fontFamily: MyFont.Primary,
    fontSize: 15,
    color: MyColor.Primary,
  },
  txtVersion: {
    color: '#787878',
  },
});
