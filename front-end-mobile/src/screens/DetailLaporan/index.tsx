import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  IconCentang,
  IconSedangDitindak,
  IconTolak,
  IconWaktu,
} from '../../assets/icons';
import {MyColor} from '../../components/atoms/MyColor';
import Header from '../../components/molecules/Header';
import {MyFont} from '../../components/atoms/MyFont';
import Gap from '../../components/atoms/Gap';
import {Ilustrasi} from '../../assets/images';
import axios from 'axios';
import Title from '../../components/atoms/Title';

const DetailLaporan = ({navigation, route}: any) => {
  const windowWidth = Dimensions.get('window').width;

  const [laporanDetail, setLaporanDetail] = useState<any | null>(null);
  const {id_laporan} = route.params;
  console.log('ini page detail laporan: ', id_laporan);

  useEffect(() => {
    getLaporan();
  }, []);

  const getLaporan = async () => {
    try {
      const response = await axios.get(
        `https://backend-pelaporaninsiden.glitch.me/api/laporan/${id_laporan}`,
      );
      setLaporanDetail(response.data.data);
      console.log('ini response.data.data', response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'antrian':
        return MyColor.Primary;
      case 'tindak':
        return '#A37F00';
      case 'selesai':
        return '#008656';
      case 'tolak':
        return '#8D0000';
    }
  };

  const getGradingColor = (grade: string) => {
    switch (grade) {
      case 'biru':
        return MyColor.Primary;
      case 'kuning':
        return '#A37F00';
      case 'hijau':
        return '#008656';
      case 'merah':
        return '#8D0000';
    }
  };

  const convertStatus = (status: any) => {
    switch (status) {
      case 'antrian':
        return 'Dalam Antrian';
      case 'tindak':
        return 'Sedang Ditindak';
      case 'selesai':
        return 'Laporan Selesai';
      case 'tolak':
        return 'Laporan Ditolak';
      default:
        return null;
    }
  };

  const getStatusIcon = (status: any) => {
    switch (status) {
      case 'antrian':
        return <IconWaktu />;
      case 'tindak':
        return <IconSedangDitindak />;
      case 'selesai':
        return <IconCentang />;
      case 'tolak':
        return <IconTolak />;
      default:
        return null;
    }
  };

  function formatHour(date: Date) {
    const localTime = new Date(date.getTime());

    const hours = localTime.getHours().toString().padStart(2, '0');
    const minutes = localTime.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  function formatDate(date: Date) {
    const localTime = new Date(date.getTime());

    const year = localTime.getFullYear().toString();
    const month = getMonthName(localTime.getMonth());
    const day = localTime.getDate().toString();

    return `${day} ${month} ${year}`;
  }

  function getMonthName(monthIndex: number) {
    const monthNames = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    return monthNames[monthIndex];
  }

  const dataDummy = {
    jenis_insiden: 'Kejadian Tidak Diharapkan / KTD (Adverse Event)',
    grading_risiko_kejadian: 'kuning',
    tanggal_laporan_diterima: '2023-09-18T05:08:52.000Z',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      {laporanDetail && (
        <View
          key={laporanDetail.id_laporan}
          style={[
            styles.statusLaporan,
            {backgroundColor: getStatusColor(laporanDetail.status_laporan)},
          ]}>
          <Text style={styles.txtCardStatus}>
            {convertStatus(laporanDetail.status_laporan)}
          </Text>
          <View>{getStatusIcon(laporanDetail.status_laporan)}</View>
        </View>
      )}
      {laporanDetail && (
        <View style={styles.detailLaporan}>
          <Text style={styles.txtCard}>Jenis Insiden</Text>
          {/* dari api */}
          <Text style={[styles.txtCard, {fontFamily: 'Poppins-Bold'}]}>
            {dataDummy && dataDummy.jenis_insiden}
          </Text>
          <Gap height={10} />
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              columnGap: 20,
            }}>
            <Text style={styles.txtCard}>Grading Laporan</Text>
            <View
              style={{
                flex: 1,
                backgroundColor: getGradingColor(
                  dataDummy.grading_risiko_kejadian,
                ),
                height: 30,
                width: 'auto',
                paddingHorizontal: 10,
              }}>
              <Text style={styles.txtGrading}>
                {dataDummy.grading_risiko_kejadian}
              </Text>
            </View>
          </View>
        </View>
      )}
      <View style={styles.container1}>
        <Gap height={40} />
        <Title label="Data Karakteristik Pasien" />
        <Gap height={20} />
        <Text style={styles.txtTime}>
          {laporanDetail && formatDate(new Date(laporanDetail.waktu_submit))}/
          {laporanDetail && formatHour(new Date(laporanDetail.waktu_submit))}
        </Text>
        <Gap height={20} />

        <View style={styles.box}>
          <Text style={styles.txtBox}>Foto Pendukung</Text>
          {laporanDetail && (
            <Image
              source={{uri: laporanDetail.url_gambar}}
              style={styles.img}
            />
          )}
        </View>
        <Gap height={40} />
        <View style={styles.box}>
          <Text style={styles.txtBox}>Kategori Bidang</Text>
          {laporanDetail && (
            <Text style={[styles.txt, {fontSize: 22}]}>
              {laporanDetail.kategori_bidang}
            </Text>
          )}
        </View>
        <Gap height={40} />
        <View style={styles.box}>
          <Text style={styles.txtBox}>Isi Laporan</Text>
          {laporanDetail && (
            <Text style={styles.txtIsiLaporan}>{laporanDetail.deskripsi}</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailLaporan;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  container1: {
    padding: 20,
  },
  statusLaporan: {
    height: 91,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
  },
  detailLaporan: {
    padding: 20,
    backgroundColor: MyColor.Light,
  },
  txt: {
    fontFamily: MyFont.Primary,
    fontSize: 14,
    color: 'black',
  },
  txtSection: {},
  txtTime: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: 'black',
  },
  txtGrading: {fontFamily: 'Poppins-Bold', fontSize: 17, color: MyColor.Light},
  txtCardStatus: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    color: MyColor.Light,
  },
  txtCard: {
    fontFamily: MyFont.Primary,
    fontSize: 17,
    color: 'black',
  },
  txtIsiLaporan: {
    fontFamily: MyFont.Primary,
    fontSize: 14,
    color: 'black',
  },
  txtBox: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'black',
  },
  box: {
    backgroundColor: MyColor.Light,
    padding: 18,
    width: '90%',
    borderRadius: 20,
    gap: 10,
  },
  img: {
    width: '100%',
    aspectRatio: 1,
    // borderRadius: 20,
    resizeMode: 'contain',
    backgroundColor: 'black',
  },
});
