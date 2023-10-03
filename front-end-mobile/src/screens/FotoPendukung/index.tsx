import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import Header from '../../components/molecules/Header';
import {MyFont} from '../../components/atoms/MyFont';
import Title from '../../components/atoms/Title';
import Line from '../../components/atoms/Line';
import Gap from '../../components/atoms/Gap';
import Button from '../../components/atoms/Button';
import {MyColor} from '../../components/atoms/MyColor';
import {IconCamera, IconGaleri, IconPanahKanan} from '../../assets/icons';

interface ImageData {
  uri: string;
  fileSize: number;
}

const FotoPendukung = ({navigation, route}: any) => {
  const dataUser = route.params;
  const [imageCamera, setImageCamera] = useState<ImageData | null>(null);
  // const dataUser = route.params;
  // console.log('ini di laporan foto: ', dataUser);
  // console.log('ini di laporan foto 2: ', dataUser.dataUser.id_user);

  useEffect(() => {
    console.log('masuk di foto: ', dataUser);
  }, []);

  const openCamera = () => {
    const options: any = {
      mediaType: 'photo',
      quality: 1,
      saveToPhotos: true,
    };

    launchCamera(options, (res: ImagePickerResponse) => {
      if (res.didCancel) {
        console.log('Cancel ambil gambar');
      } else if (res.errorCode) {
        console.log(res.errorMessage);
      } else {
        const data = res.assets?.[0] as ImageData;
        setImageCamera(data);
        console.log(data);
      }
    });
  };

  const openGallery = () => {
    const options: any = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (res: ImagePickerResponse) => {
      if (res.didCancel) {
        console.log('Cancel memilih gambar dari galeri');
      } else if (res.errorCode) {
        console.log(res.errorMessage);
      } else {
        const data = res.assets?.[0] as ImageData;
        setImageCamera(data);
        console.log(data);
      }
    });
  };
  const submitFoto = () => {
    if (imageCamera === null) {
      navigation.navigate('SubmitLaporan');
    } else {
      const fileSizeInMB = imageCamera.fileSize / (1024 * 1024);
      if (fileSizeInMB > 2) {
        Alert.alert('Ukuran foto melebihi batas maksimal (2MB)');
      } else {
        console.log(fileSizeInMB);
        // navigation.navigate('BuatLaporan', { dataUser, imageCamera, setImageCamera });
        navigation.navigate('SubmitLaporan', {...dataUser, imageCamera});
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Text style={styles.txtTitle}>
          Foto Pendukung{' '}
          <Text style={{fontFamily: MyFont.Primary}}>(Opsional)</Text>
        </Text>
        <Text style={styles.txt}>
          Silahkan memasukkan foto yang bisa mendukung & berhubungan dengan
          pelaporan Anda
        </Text>
        <Gap height={40} />
        {imageCamera != null && (
          <View>
            <Image source={{uri: imageCamera.uri}} style={styles.image} />
            <Text style={styles.txtBtnImage}>
              Ukuran gambar: {(imageCamera.fileSize / (1024 * 1024)).toFixed(2)}{' '}
              MB
            </Text>
            <TouchableOpacity
              style={styles.deleteImage}
              onPress={() => setImageCamera(null)}>
              <Text style={styles.txtDeleteImage}>Hapus</Text>
            </TouchableOpacity>
            <Gap height={10} />
          </View>
        )}
        <TouchableOpacity style={styles.btnImage} onPress={openGallery}>
          <IconGaleri />
          <Text style={styles.txtBtnImage}>Ambil dari Galeri</Text>
        </TouchableOpacity>
        <Gap height={20} />
        <TouchableOpacity style={styles.btnImage} onPress={openCamera}>
          <IconCamera />
          <Text style={styles.txtBtnImage}>
            Ambil gambar{'\n'}dengan kamera
          </Text>
        </TouchableOpacity>
        <Gap height={20} />
        <Text style={{fontFamily: MyFont.Primary, color: 'gray'}}>
          Anda hanya bisa mengirimkan maksimal 1 foto dengan ukuran maksimal 2
          MB. Untuk saat ini Anda belum bisa memasukkan video dalam pelaporan.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          label="Kembali"
          width={126}
          backgroundColor={MyColor.Light}
          textColor={MyColor.Primary}
          onClick={() =>
            navigation.navigate(
              'RincianKejadian',
              // , {
              //   id_user: dataUser.dataUser.id_user,
              //   username: dataUser.dataUser.username,
              //   accessToken: dataUser.dataUser.accessToken,
              // }
            )
          }
        />
        <Button
          label="Lanjut"
          width={173}
          backgroundColor={MyColor.Primary}
          textColor="#efefef"
          // onClick={() => navigation.navigate('SubmitLaporan')}
          onClick={submitFoto}
          icons={<IconPanahKanan />}
        />
      </View>
    </ScrollView>
  );
};

export default FotoPendukung;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  txt: {
    fontFamily: MyFont.Primary,
    color: '#212121',
    fontSize: 18,
  },
  txtTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: MyColor.Primary,
  },
  txtBtnImage: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'black',
  },
  txtDeleteImage: {
    fontFamily: MyFont.Primary,
    color: MyColor.Primary,
  },
  btnImage: {
    height: 73,
    paddingHorizontal: 30,
    flexDirection: 'row',
    columnGap: 20,
    backgroundColor: MyColor.Light,
    borderRadius: 20,
    alignItems: 'center',
  },
  image: {
    height: 300,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  deleteImage: {
    alignSelf: 'center',
  },
  footer: {
    backgroundColor: MyColor.Light,
    flexDirection: 'row',
    columnGap: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
