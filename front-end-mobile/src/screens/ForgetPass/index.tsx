import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput as Input,
  ScrollView,
} from 'react-native';
import Gap from '../../components/atoms/Gap';
import {Logo} from '../../assets/images';
import {MyFont} from '../../components/atoms/MyFont';
import {MyColor} from '../../components/atoms/MyColor';
import {IconPanahKanan} from '../../assets/icons';
import Button from '../../components/atoms/Button';

const ForgetPass = ({navigation}: any) => {
  const [username, setUsername] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Gap height={110} />
      <View style={styles.logoContainer}>
        <Image source={Logo} resizeMode="contain" style={styles.logo} />
        <Text style={styles.txtLogo}>RSUD Dr.Sam Ratulangi{'\n'}Tondano</Text>
      </View>
      <Gap height={110} />
      <View style={styles.content}>
        <Text style={styles.txt}>
          Jika Anda lupa password akun, silahkan menghubungi bagian admin IT di
          nomor yang ada dibawah ini
        </Text>
        <Gap height={30} />
        <Text style={styles.txtPhoneNumber}>0812-3456-7890</Text>
        <View style={{flexDirection: 'row', columnGap: 30, marginTop: 10}}>
          <Button
            label="Telepon"
            width={110}
            backgroundColor="transparent"
            textColor={MyColor.Primary}
          />
          <Button
            label="Whatsapp"
            width={110}
            backgroundColor="transparent"
            textColor={MyColor.Primary}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
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
    textAlign: 'center',
    fontFamily: MyFont.Primary,
    fontSize: 17,
    color: 'black',
  },

  txtPhoneNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    textAlign: 'center',
    color: MyColor.Primary,
  },
});

export default ForgetPass;
