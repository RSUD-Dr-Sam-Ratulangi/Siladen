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

const socket = io('https://backend-pelaporaninsiden.glitch.me');

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    socket.on('pesan', data => {
      console.log('Pesan diterima dari server:', data);
      // Tampilkan notifikasi push
      PushNotification.localNotification({
        channelId: 'tes-channel1',
        title: 'test title server',
        message: 'test body',
      });
    });
  }, []);

  const triggerNotification = () => {
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
      const response = await axios.post(
        'https://backend-pelaporan-final.glitch.me/auth/user/login',
        {
          username,
          password,
        },
      );
      console.log('ini response: ', response.data);
      const token = response.data.data.token;
      console.log('ini token: ', token);

      await AsyncStorage.setItem('token', token);

      const value = await AsyncStorage.getItem('token');
      console.log('ini adalah value: ', value);
      if (response.data.code == '200') {
        const dataUser = response.data.data;
        if (dataUser.role !== 'admin') {
          console.log('ini di LOGIN: ', dataUser);
          console.log('ini di LOGIN id user: ', dataUser.id_user);
          navigation.navigate('Navigation', dataUser);
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
        Alert.alert(
          'Login Gagal',
          'Username tidak ditemukan atau password salah.',
        );
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
        <ActivityIndicator size="large" color={MyColor.Primary} />
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
      <TouchableOpacity
        style={{width: 100, height: 30, backgroundColor: 'pink'}}
        onPress={() => {
          triggerNotification();
        }}>
        <Text style={{color: 'black'}}>Trigger Notifikasi</Text>
      </TouchableOpacity>
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
