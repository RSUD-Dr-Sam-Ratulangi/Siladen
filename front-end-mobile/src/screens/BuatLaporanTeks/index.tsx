import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput as Input,
  Alert,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/molecules/Header';

import {MyFont} from '../../components/atoms/MyFont';
import Title from '../../components/atoms/Title';
import Line from '../../components/atoms/Line';
import Gap from '../../components/atoms/Gap';
import Button from '../../components/atoms/Button';
import {IconPanahKanan} from '../../assets/icons';
import {MyColor} from '../../components/atoms/MyColor';

const BuatLaporanTeks = ({navigation, route}: any) => {
  const data = route.params;
  console.log('laporan teks: ', data);
  // console.log('laporan teks untuk data user: ', data.dataUser.dataUser.id_user);
  const [kategori_bidang, set_kategori_bidang] = useState(
    data.dataUser.kategori_bidang,
  );
  const [deskripsi, setDeskripsi] = useState('');
  const [gambar, setGambar] = useState(data.imageCamera);

  const klik = () => {
    if (deskripsi === '') {
      Alert.alert('Harap masukan deskripsi');
    } else {
      console.log('kategori bidang: ', kategori_bidang);
      console.log('deskripsi: ', deskripsi);
      console.log('gambar: ', gambar);

      navigation.navigate('SubmitLaporan', {
        data,
        deskripsi,
        setImageCamera: data.setImageCamera,
        setDeskripsi,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Header />
      <View style={styles.container}>
        <Text style={[styles.txt, {marginVertical: 20}]}>Buat Laporan</Text>
        <Title label="Isi Laporan" />
        <Line height={2} />
        <Gap height={10} />
        <Text style={styles.txt}>Silahkan ketikan isi laporan anda</Text>
        <Gap height={20} />
        <Input
          inputMode="text"
          style={styles.txtInput}
          placeholder="Ketik disini..."
          value={deskripsi}
          onChangeText={text => setDeskripsi(text)}
          placeholderTextColor="#A9A9A9"
          textAlignVertical="top"
          multiline={true}
        />
      </View>
      <View style={styles.footer}>
        <Button
          label="Kembali"
          width={150}
          backgroundColor="#efefef"
          textColor={MyColor.Primary}
          onClick={() =>
            navigation.navigate('FotoPendukung', {
              dataUser: {
                id_user: data.dataUser.dataUser.id_user,
                username: data.dataUser.dataUser.username,
                accessToken: data.dataUser.dataUser.accessToken,
              },
              kategori_bidang,
            })
          }
        />
        <Button
          label="Selanjutnya"
          width={150}
          backgroundColor={MyColor.Primary}
          textColor="#efefef"
          onClick={klik}
          icons={<IconPanahKanan />}
        />
      </View>
    </ScrollView>
  );
};

export default BuatLaporanTeks;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 20,
  },
  txt: {
    fontFamily: MyFont.Primary,
    color: '#212121',
    fontSize: 18,
  },
  txtInput: {
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: MyFont.Primary,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingStart: 10,
    width: '100%',
    minHeight: 200,
    maxHeight: 300,
    // paddingVertical: 20,
    color: 'black',
  },
  footer: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 10,
    marginVertical: 20,
  },
});
