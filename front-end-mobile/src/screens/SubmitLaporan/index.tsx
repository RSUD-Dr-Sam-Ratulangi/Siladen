import {StyleSheet, Text, View, Alert, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MyFont} from '../../components/atoms/MyFont';
import {MyColor} from '../../components/atoms/MyColor';
import Button from '../../components/atoms/Button';
import {IconPanahKanan} from '../../assets/icons';
import {Checkbox} from 'react-native-paper';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {
  saveNamePasienAction,
  saveNoMRAction,
  saveRuanganAction,
  saveAgeAction,
  saveAgeNoAction,
  saveSelectedAgeTypeAction,
  saveAsuransiAction,
  saveJenisKelaminAction,
  saveWaktuMendapatPelayananAction,
  saveWaktuInsidenAction,
  saveInsidenAction,
  saveKronologiInsidenAction,
  saveInsidenTerjadiPadaPasienAction,
  savePelaporPertamaAction,
  savePasienTerkaitAction,
  saveDampakInsidenAction,
  saveLokasiInsidenAction,
  saveProbabilitasAction,
  saveUnitTerkaitAction,
  saveTindakLanjutAction,
  saveTindakLanjutOlehAction,
  saveIsPernahTerjadiAction,
  saveDeskripsiPernahTerjadiAction,
  savePernahTerjadiAction,
  saveImageCameraAction,
} from '../../../redux/action';
import socket from '../../../socket';
import {API_HOST} from '../../../config';
import {CommonActions} from '@react-navigation/native';

const SubmitLaporan = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  // const dataUser = route.params;
  // const dataUser = useSelector((data: any) => data);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const idUserSelector = useSelector((data: any) => data.id_user);
  const tokenSelector = useSelector((data: any) => data.token);
  const namePasienSelector = useSelector((data: any) => data.namePasien);
  const noMRSelector = useSelector((data: any) => data.noMR);
  const ruanganSelector = useSelector((data: any) => data.ruangan);
  const ageSelector = useSelector((data: any) => data.age);
  const asuransiSelector = useSelector((data: any) => data.asuransi);
  const jenisKelaminSelector = useSelector((data: any) => data.jenisKelamin);
  const waktuMendapatPelayananSelector = useSelector(
    (data: any) => data.waktuMendapatPelayanan,
  );
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
  const pernahTerjadiSelector = useSelector((data: any) => data.pernahTerjadi);
  const imageCameraSelector = useSelector((data: any) => data.imageCamera);

  const dataUser = {
    id_user: idUserSelector,
    token: tokenSelector,
    namePasien: namePasienSelector,
    noMR: noMRSelector,
    ruangan: ruanganSelector,
    age: ageSelector,
    asuransi: asuransiSelector,
    jenisKelamin: jenisKelaminSelector,
    waktuMendapatPelayanan: waktuMendapatPelayananSelector,
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
    imageCamera: imageCameraSelector,
  };

  const formData = new FormData();
  formData.append('nama_pasien', dataUser.namePasien);
  formData.append('no_rekam_medis', dataUser.noMR);
  formData.append('ruangan', dataUser.ruangan);
  formData.append('umur', dataUser.age);
  formData.append('asuransi', dataUser.asuransi);
  formData.append('jenis_kelamin_pasien', dataUser.jenisKelamin);
  formData.append(
    'waktu_mendapatkan_pelayanan',
    dataUser.waktuMendapatPelayanan.toString(),
  );
  formData.append('waktu_kejadian_insiden', dataUser.waktuInsiden.toString());
  formData.append('insiden', dataUser.insiden);
  formData.append('kronologis_insiden', dataUser.kronologiInsiden);
  formData.append(
    'insiden_terjadi_pada_pasien',
    dataUser.insidenTerjadiPadaPasien,
  );
  formData.append('dampak_insiden_terhadap_pasien', dataUser.dampakInsiden);
  formData.append('probabilitas', dataUser.probabilitas);
  formData.append('orang_pertama_melaporkan_insiden', dataUser.pelaporPertama);
  formData.append('id_jenis_pasien', dataUser.pasienTerkait);
  formData.append('tempat_insiden', dataUser.lokasiInsiden);
  formData.append('departement_penyebab_insiden', dataUser.unitTerkait);
  formData.append(
    'tindak_lanjut_setelah_kejadian_dan_hasil',
    dataUser.tindakLanjut,
  );
  formData.append(
    'yang_melakukan_tindak_lanjut_setelah_insiden',
    dataUser.tindakLanjutOleh,
  );
  formData.append(
    'kejadian_sama_pernah_terjadi_di_unit_lain',
    dataUser.pernahTerjadi,
  );
  formData.append(
    'gambar',
    dataUser.imageCamera
      ? {
          uri: dataUser.imageCamera.uri,
          type: dataUser.imageCamera.type,
          name: dataUser.imageCamera.fileName,
        }
      : null,
  );

  const handleCheckboxToggle = () => {
    setChecked(!checked);
    console.log(checked);
  };

  useEffect(() => {
    console.log('Ini di langkah 4', dataUser);
  }, []);

  const handleSubmit = async () => {
    if (!checked) {
      Alert.alert(
        'Peringatan',
        'Anda harus menyetujui pernyataan sebelum mengirim laporan.',
      );
    } else {
      console.log('tes satu-satuu: ', dataUser.asuransi);
      console.log('ini headers: ', dataUser.token);
      console.log('ini id user: ', dataUser.id_user);
      console.log('Ini form data: ', formData);
      setIsLoading(true);
      try {
        const headers = {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${dataUser.token}`, // Tambahkan token ke header dengan format Beare
        };

        const headersAnonim = {
          'Content-Type': 'multipart/form-data',
        };

        let response;

        if (dataUser.id_user) {
          console.log('ada id user yang dijalankan');
          response = await axios.post(
            `${API_HOST}/api/laporan/user/${dataUser.id_user}`,
            formData,

            {
              headers,
            },
          );
        } else {
          console.log('anonim yang dijalankan');
          response = await axios.post(
            `${API_HOST}/api/laporan/anonim`,
            formData,
            {
              headers: headersAnonim,
            },
          );
        }
        console.log('ini respon post: ', response.data);
        console.log('ini response: ', response.data.data);
        const token = response.data.data.token;
        console.log('ini token: ', token);

        if (response.data.code == '201') {
          dispatch(saveNamePasienAction(''));
          dispatch(saveNoMRAction(''));
          dispatch(saveRuanganAction(''));
          dispatch(saveAgeAction(''));
          dispatch(saveAgeNoAction(''));
          dispatch(saveSelectedAgeTypeAction(''));
          dispatch(saveAsuransiAction(''));
          dispatch(saveJenisKelaminAction(''));
          dispatch(saveWaktuMendapatPelayananAction(new Date()));

          dispatch(saveWaktuInsidenAction(new Date()));
          dispatch(saveInsidenAction(''));
          dispatch(saveKronologiInsidenAction(''));
          dispatch(saveInsidenTerjadiPadaPasienAction(''));
          dispatch(savePelaporPertamaAction(''));
          dispatch(savePasienTerkaitAction(0));
          dispatch(saveDampakInsidenAction(''));
          dispatch(saveLokasiInsidenAction(''));
          dispatch(saveProbabilitasAction(''));
          dispatch(saveUnitTerkaitAction(''));
          dispatch(saveTindakLanjutAction(''));
          dispatch(saveTindakLanjutOlehAction(''));
          dispatch(saveIsPernahTerjadiAction(false));
          dispatch(saveDeskripsiPernahTerjadiAction(''));
          dispatch(savePernahTerjadiAction(''));

          dispatch(saveImageCameraAction(null));
          socket.emit('message admin', 'helo admin, saya sudah submit laporan');
          Alert.alert(
            'Laporan Terkirim',
            'Laporan anda akan segera ditangani, terima kasih sudah mau membantu kami dalam meningkatkan kualitas pelayanan Rumah Sakit',
            [
              {
                text: 'OK',
                onPress: () => {
                  if (!dataUser.id_user) {
                    socket.off('message received');
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{name: 'WelcomePage'}],
                      }),
                    );
                  } else {
                    socket.off('message received');
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [{name: 'Navigation'}],
                      }),
                    );
                  }
                },
              },
            ],
          );
          // navigation.navigate(
          //   'Navigation',
          //   // {
          //   //   id_user: dataUser.dataUser.id_user,
          //   //   name: dataUser.dataUser.name,
          //   //   token: dataUser.dataUser.token,
          //   //   username: dataUser.dataUser.username,
          //   // }
          // );
          console.log('Laporan Terkirim');
        }
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        if (error.response) {
          console.log('ini dari post', error);
          if (error.response.data.code == '400') {
            Alert.alert(
              'Gagal mengirim laporan',
              'Mohon periksa lagi inputan anda lalu coba lagi',
            );
          } else {
            Alert.alert(
              'Gagal mengirim laporan',
              'Mohon coba lagi, jika kesalahan terus terjadi silahkan hubungi Costumer Service',
            );
          }
        } else if (error.request) {
          console.log('INI ERROR: ', error);
          Alert.alert(
            'Kesalahan Jaringan',
            'Pastikan anda telah terhubung ke internet',
          );
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={handleCheckboxToggle}
          // uncheckedColor={MyColor.Primary}
          color={MyColor.Primary}
        />
        <Text style={styles.txt}>
          Saya telah mengisi formulir sesuai dengan apa yang sebenarnya terjadi
          di lapangan. Saya bertanggung jawab jika informasi yang saya berikan
          tidak sama seperti yang terjadi di lapangan.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          label="Kembali"
          backgroundColor={MyColor.Light}
          textColor={MyColor.Primary}
          width={126}
          onClick={() => {
            navigation.navigate('FotoPendukung');
          }}
        />
        {isLoading ? (
          <View
            style={{
              width: 173,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color={MyColor.Primary} />
          </View>
        ) : (
          <Button
            label="Kirim Laporan"
            backgroundColor={MyColor.Primary}
            textColor={MyColor.Light}
            width={173}
            icons={<IconPanahKanan />}
            onClick={handleSubmit}
          />
        )}
      </View>
    </View>
  );
};

export default SubmitLaporan;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
  },
  txt: {
    flex: 1,
    fontFamily: 'Poppins-Bold',
    color: MyColor.Primary,
    fontSize: 18,
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
