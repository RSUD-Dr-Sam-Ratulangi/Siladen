import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput as Input,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Gap from '../../components/atoms/Gap';
import {Logo} from '../../assets/images';
import {MyFont} from '../../components/atoms/MyFont';
import {MyColor} from '../../components/atoms/MyColor';
import {
  IconMataTerbuka,
  IconMataTertutup,
  IconPanahKanan,
} from '../../assets/icons';
import Button from '../../components/atoms/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import {io} from 'socket.io-client';
import {API_HOST} from '../../../config';
import {useDispatch} from 'react-redux';
import {
  saveIdUserAction,
  saveNameAction,
  saveRoleAction,
  saveTokenAction,
  saveUsernameAction,
} from '../../../redux/action';
import {CommonActions} from '@react-navigation/native';

// const socket = io(API_HOST);

const PasswordInput = ({placeholder, onChangeText, value}: any) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.passwordInputContainer}>
      <Input
        style={styles.txtInputPassword}
        placeholder={placeholder}
        placeholderTextColor="#787878"
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
      />
      <TouchableOpacity onPress={toggleSecureTextEntry}>
        {secureTextEntry ? <IconMataTertutup /> : <IconMataTerbuka />}
      </TouchableOpacity>
    </View>
  );
};

const Login = ({navigation}: any) => {
  const dispatch = useDispatch();
  // let dataAwal = useSelector((data: any) => data.value);
  // const [valueRedux, setValueRedux] = useState(dataAwal);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // socket.on('pesan', data => {
    //   console.log('Pesan diterima dari server:', data);
    //   // Tampilkan notifikasi push
    //   PushNotification.localNotification({
    //     channelId: 'tes-channel1',
    //     title: 'test title server',
    //     message: 'test body',
    //   });
    // });
    console.log('ini api host: ', API_HOST);

    // console.log('ini nilai awal: ', valueRedux);
  }, []);

  // useEffect(() => {
  //   setValueRedux(dataAwal);
  //   console.log('setelah ubah usestae: ', valueRedux);
  // }, [dataAwal]);

  const triggerNotification = () => {
    // const dataAwal = useSelector((data: any) => data.value);
    // setValueRedux(dataAwal);
    // dispatch(printAction('jerico'));
    PushNotification.localNotification({
      channelId: 'tes-channel1',
      title: 'Notifikasi Test',
      message: 'Ini adalah notifikasi test.',
    });
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Harap isi username dan password.');
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_HOST}/auth/user/login`, {
        username,
        password,
      });
      console.log('ini response: ', response.data);
      const token = response.data.data.token;
      console.log('ini token: ', token);

      const id_user = response.data.data.id_user;
      const name = response.data.data.name;
      const role = response.data.data.role;

      await AsyncStorage.setItem('id_user', id_user);
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('role', role);

      const tokenAsync = await AsyncStorage.getItem('token');
      const nameAsync = await AsyncStorage.getItem('name');
      const idUserAsync = await AsyncStorage.getItem('id_user');
      const roleAsync = await AsyncStorage.getItem('role');

      console.log('ini adalah token: ', tokenAsync);
      console.log('ini name dari asyn storage: ', nameAsync);
      console.log('ini id user dari asyn: ', idUserAsync);
      console.log('ini role dari asyn: ', roleAsync);

      if (response.data.code == '200') {
        const dataUser = response.data.data;
        if (dataUser.role !== 'admin') {
          dispatch(saveIdUserAction(dataUser.id_user));
          dispatch(saveNameAction(dataUser.name));
          dispatch(saveRoleAction(dataUser.role));
          dispatch(saveTokenAction(dataUser.token));
          dispatch(saveUsernameAction(dataUser.username));

          console.log('ini di LOGIN: ', dataUser);
          console.log('ini di LOGIN id user: ', dataUser.id_user);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Navigation'}],
            }),
          );

          setUsername('');
          setPassword('');
        } else {
          Alert.alert('Peringatan', 'Gunakan akun lainnya!');
        }
      }

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      if (error.response) {
        if (error.response.data.code === '403') {
          Alert.alert('Login Gagal', 'Akun sedang login di perangkat lain');
        } else {
          Alert.alert(
            'Login Gagal',
            'Username tidak ditemukan atau password salah.',
          );
        }
      } else if (error.request) {
        Alert.alert(
          'Kesalahan Jaringan',
          'Pastikan anda telah terhubung ke internet',
        );
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Gap height={90} />
      {/* <Text>{valueRedux}</Text> */}
      <View style={styles.logoContainer}>
        <Image source={Logo} resizeMode="contain" style={styles.logo} />
        <Text style={styles.txtLogo}>RSUD Dr.Sam Ratulangi{'\n'}Tondano</Text>
      </View>
      <Gap height={40} />
      <Text style={styles.txt}>Buat Laporan dengan Akun{'\n'}</Text>
      <Text style={styles.txtBold}>Silahkan masuk dengan akun Anda{'\n'}</Text>
      <Gap height={40} />
      <Input
        style={styles.txtInput}
        placeholder="Masukan username Anda"
        placeholderTextColor="#787878"
        onChangeText={setUsername}
        value={username}
      />
      <Gap height={30} />
      <PasswordInput
        placeholder="Masukan password Anda"
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity onPress={() => navigation.navigate('ForgetPass')}>
        <Text style={styles.txtLupaPass}>Lupa password</Text>
      </TouchableOpacity>
      <Gap height={40} />
      {isLoading ? (
        <View style={{height: 45}}>
          <ActivityIndicator size="large" color={MyColor.Primary} />
        </View>
      ) : (
        <Button
          label="Masuk"
          width={193}
          backgroundColor={MyColor.Primary}
          textColor="#efefef"
          onClick={handleLogin}
          icons={<IconPanahKanan />}
        />
      )}
      <Gap height={10} />
      <Button
        label="Belum punya akun"
        width={193}
        backgroundColor="#efefef"
        textColor={MyColor.Primary}
        onClick={() => {
          navigation.navigate('SignUp');
        }}
      />
      {/* <TouchableOpacity
        style={{width: 100, height: 30, backgroundColor: 'pink'}}
        onPress={() => {
          triggerNotification();
        }}>
        <Text style={{color: 'black'}}>Trigger Notifikasi</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 33,
    height: 43,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtLogo: {
    fontFamily: MyFont.Primary,
    fontSize: 11,
    color: 'black',
  },
  txt: {
    fontFamily: MyFont.Primary,
    fontSize: 15,
    color: 'black',
  },
  txtBold: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: MyColor.Primary,
  },
  txtInput: {
    fontSize: 14,
    fontFamily: MyFont.Primary,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingStart: 10,
    width: '100%',
    marginBottom: 20,
    color: 'black',
  },
  txtInputPassword: {
    fontSize: 14,
    fontFamily: MyFont.Primary,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingStart: 10,
    width: '85%',
    color: 'black',
  },
  txtLupaPass: {
    fontFamily: MyFont.Primary,
    color: 'grey',
    textDecorationLine: 'underline',
    marginVertical: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    backgroundColor: 'white',
    width: '100%',
  },
});

export default Login;
