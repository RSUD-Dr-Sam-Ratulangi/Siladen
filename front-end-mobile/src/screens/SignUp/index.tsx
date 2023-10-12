import React, {useState} from 'react';
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
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {API_HOST} from '../../../config';

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

const SignUp = ({navigation}: any) => {
  const dispatch = useDispatch();
  const role = 'user';
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [konfirmasi_password, setKonfirmasi_password] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const Register = async () => {
    if (!name || !username || !password || !konfirmasi_password) {
      Alert.alert('Harap isi semua field');
    } else if (password !== konfirmasi_password) {
      Alert.alert(
        'Password Tidak Cocok',
        'Password dan konfirmasi password harus sama.',
      );
    }
    // else if( username === data.username){
    //   Alert.alert('Username sudah pernah digunakan')
    // }
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_HOST}/auth/user/register`, {
        name,
        username,
        password,
        konfirmasi_password,
        role,
      });
      console.log('ini respons registrasi: ', response.data.data);
      if (response.data.code == '201') {
        Alert.alert('Akun berhasil dibuat');
        setTimeout(() => {
          navigation.navigate('Login');
        }, 5000);
        setName('');
        setUsername('');
        setPassword('');
        setKonfirmasi_password('');
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      if (error.response.data.code === '409') {
        Alert.alert('Username sudah pernah digunakan');
      }
      console.log(error.response.data.code);
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
      <Text style={styles.txtBold}>Silahkan buat akun Anda{'\n'}</Text>
      <Gap height={30} />
      <Input
        style={styles.txtInput}
        placeholder="Masukan nama lengkap Anda"
        placeholderTextColor="#787878"
        onChangeText={setName}
        value={name}
      />
      {/* <Gap height={10} /> */}
      <Input
        style={styles.txtInput}
        placeholder="Masukan username Anda"
        placeholderTextColor="#787878"
        onChangeText={setUsername}
        value={username}
      />
      {/* <Gap height={30} /> */}
      <PasswordInput
        placeholder="Masukan password Anda"
        onChangeText={setPassword}
        value={password}
      />
      <Gap height={10} />
      <PasswordInput
        placeholder={`Masukan lagi password yang sama`}
        onChangeText={setKonfirmasi_password}
        value={konfirmasi_password}
      />
      <Gap height={30} />
      {isLoading ? (
        <View style={{height: 45}}>
          <ActivityIndicator size="large" color={MyColor.Primary} />
        </View>
      ) : (
        <Button
          label="Daftar"
          width={193}
          backgroundColor={MyColor.Primary}
          textColor="#efefef"
          onClick={Register}
          icons={<IconPanahKanan />}
        />
      )}
      <Gap height={10} />
      <Button
        label="Sudah punya akun"
        width={193}
        backgroundColor="#efefef"
        textColor={MyColor.Primary}
        onClick={() => {
          navigation.navigate('Login');
        }}
      />
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
    fontSize: 19,
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

export default SignUp;
