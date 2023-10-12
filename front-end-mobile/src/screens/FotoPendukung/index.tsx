import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
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
import {
  IconCamera,
  IconGaleri,
  IconPanahKanan,
  IconX,
} from '../../assets/icons';
import {useSelector, useDispatch} from 'react-redux';
import {saveImageCameraAction} from '../../../redux/action';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
interface ImageData {
  height: number;
  width: number;
  uri: string;
  fileSize: number;
}

const FotoPendukung = ({navigation, route}: any) => {
  // const dataUser = useSelector((data: any) => data);
  const dispatch = useDispatch();
  // const dataUser = route.params;
  // const [imageCamera, setImageCamera] = useState<ImageData | null>(null);

  const imageCameraSelector = useSelector((data: any) => data.imageCamera);
  const dataUser = {imageCamera: imageCameraSelector};

  const [imageCamera, setImageCamera] = useState(dataUser.imageCamera);
  // const dataUser = route.params;
  // console.log('ini di laporan foto: ', dataUser);
  // console.log('ini di laporan foto 2: ', dataUser.dataUser.id_user);

  const waktuInsidenSelector = useSelector((data: any) => data.waktuInsiden);
  const insidenSelector = useSelector((data: any) => data.insiden);
  const kronologiInsidenSelector = useSelector(
    (data: any) => data.kronologiInsiden,
  );
  const insidenTerjadiPadaPasienSelector = useSelector(
    (data: any) => data.insidenTerjadiPadaPasien,
  );
  const pelaporPertamaSelector = useSelector(
    (data: any) => data.pelaporPertama,
  );
  const pasienTerkaitSelector = useSelector((data: any) => data.pasienTerkait);
  const dampakInsidenSelector = useSelector((data: any) => data.dampakInsiden);
  const lokasiInsidenSelector = useSelector((data: any) => data.lokasiInsiden);
  const probabilitasSelector = useSelector((data: any) => data.probabilitas);
  const unitTerkaitSelector = useSelector((data: any) => data.unitTerkait);
  const tindakLanjutSelector = useSelector((data: any) => data.tindakLanjut);
  const tindakLanjutOlehSelector = useSelector(
    (data: any) => data.tindakLanjutOleh,
  );
  const isPernahTerjadiSelector = useSelector(
    (data: any) => data.isPernahTerjadi,
  );
  const deskripsiPernahTerjadiSelector = useSelector(
    (data: any) => data.deskripsiPernahTerjadi,
  );
  const pernahTerjadiSelector = useSelector(
    (data: any) => data.pernahTerjadiSelector,
  );

  const dataUserCoba = {
    // token: tokenSelector,
    waktuInsiden: waktuInsidenSelector,
    insiden: insidenSelector,
    kronologiInsiden: kronologiInsidenSelector,
    insidenTerjadiPadaPasien: insidenTerjadiPadaPasienSelector,
    pelaporPertama: pelaporPertamaSelector,
    pasienTerkait: pasienTerkaitSelector,
    dampakInsiden: dampakInsidenSelector,
    lokasiInsiden: lokasiInsidenSelector,
    probabilitas: probabilitasSelector,
    unitTerkait: unitTerkaitSelector,
    tindakLanjut: tindakLanjutSelector,
    tindakLanjutOleh: tindakLanjutOlehSelector,
    isPernahTerjadi: isPernahTerjadiSelector,
    deskripsiPernahTerjadi: deskripsiPernahTerjadiSelector,
    pernahTerjadi: pernahTerjadiSelector,
  };

  useEffect(() => {
    console.log('masuk di foto: ', dataUser);
    console.log('masuk di foto di rincian kejadian : ', dataUserCoba);
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //akses diterima
        } else {
          console.log('Izin kamera ditolak');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

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
        console.log('ini isi imgae camera: ', data);
      }
    });
  };
  requestCameraPermission();
  const submitFoto = () => {
    dispatch(saveImageCameraAction(imageCamera));
    if (imageCamera === null) {
      navigation.navigate(
        'SubmitLaporan',
        // {
        //   ...dataUser,
        //   imageCamera
        // }
      );
    } else {
      const fileSizeInMB = imageCamera.fileSize / (1024 * 1024);
      if (fileSizeInMB > 2) {
        Alert.alert('Ukuran foto melebihi batas maksimal (2MB)');
      } else {
        console.log(fileSizeInMB);
        // navigation.navigate('BuatLaporan', { dataUser, imageCamera, setImageCamera });
        navigation.navigate(
          'SubmitLaporan',
          // {
          //   ...dataUser,
          //   imageCamera
          // }
        );
      }
    }
  };

  // const [compressedImageURI, setCompressedImageURI] = useState<string | null>(
  //   null,
  // );

  // const compressImage = async (imageURI: string, quality: number = 0.5) => {
  //   const image = new Image();
  //   image.src = imageURI;

  //   image.onload = () => {
  //     const canvas = document.createElement('canvas');
  //     const ctx = canvas.getContext('2d')!;

  //     // Menetapkan ukuran canvas sesuai dengan gambar asli
  //     canvas.width = image.width;
  //     canvas.height = image.height;

  //     // Menggambar gambar asli ke canvas
  //     ctx.drawImage(image, 0, 0);

  //     // Mengkompress gambar di canvas
  //     const compressedImageURI = canvas.toDataURL('image/jpeg', quality);

  //     // Menetapkan hasil kompresi ke state
  //     setCompressedImageURI(compressedImageURI);
  //   };
  // };

  // useEffect(() => {
  //   if (imageCamera && imageCamera.uri) {
  //     // Memanggil fungsi kompresi gambar ketika gambar terpilih
  //     compressImage(imageCamera.uri, 0.5); // Ganti 0.5 dengan tingkat kompresi yang Anda inginkan
  //   }
  // }, [imageCamera]);

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
        {imageCamera && Object.keys(imageCamera).length !== 0 && (
          <View
            style={{
              backgroundColor: MyColor.Light,
              borderRadius: 20,
              overflow: 'hidden',
            }}>
            <View
              style={{
                // overflow: 'hidden',
                backgroundColor: 'black',
              }}>
              <TouchableOpacity
                style={styles.deleteImage}
                onPress={() => setImageCamera(null)}>
                <IconX />
              </TouchableOpacity>
              <Image source={{uri: imageCamera.uri}} style={styles.image} />
            </View>
            <Text style={[styles.txtBtnImage, {padding: 10}]}>
              Ukuran gambar: {(imageCamera.fileSize / (1024 * 1024)).toFixed(2)}{' '}
              MB
            </Text>
          </View>
        )}
        <Gap height={10} />
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
          onClick={() => {
            dispatch(saveImageCameraAction(imageCamera));
            navigation.navigate(
              'RincianKejadian',
              // , {
              //   id_user: dataUser.dataUser.id_user,
              //   username: dataUser.dataUser.username,
              //   accessToken: dataUser.dataUser.accessToken,
              // }
            );
          }}
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
    height: 40,
    width: 40,
    position: 'absolute',
    alignSelf: 'flex-end',
    zIndex: 50,
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
