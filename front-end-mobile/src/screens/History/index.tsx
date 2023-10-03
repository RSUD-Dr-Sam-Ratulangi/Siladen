import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/molecules/Header';
import {MyColor} from '../../components/atoms/MyColor';
import {
  IconCentang,
  IconLaporan,
  IconSedangDitindak,
  IconTolak,
  IconWaktu,
} from '../../assets/icons';
import {MyFont} from '../../components/atoms/MyFont';
import Gap from '../../components/atoms/Gap';
import axios from 'axios';

interface Laporan {
  status: string;
  id_laporan: string;
  tanggal_laporan_dikirim: Date;
  gambar: string;
}

const History = ({navigation, route}: any) => {
  const [laporan, setLaporan] = useState<Laporan[]>([]);
  const dataUser = route.params;

  useEffect(() => {
    getAllLaporan();
  }, []);

  const getAllLaporan = async () => {
    if (dataUser.id_user) {
      console.log('test: ', dataUser);
      try {
        const headers = {
          Authorization: `Bearer ${dataUser.token}`,
        };
        const response = await axios.get(
          `https://backend-pelaporan-final.glitch.me/api/laporan/${dataUser.id_user}`,
          {headers},
        );
        console.log('halo ', response.data);
        setLaporan(response.data.data);
      } catch (error: any) {
        console.log(error);
        console.log('Ini response.data.data: ', error.response);
      }
    }
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'dalam antrian':
        return MyColor.Primary;
      case 'investigasi':
        return '#A37F00';
      case 'laporan selesai':
        return '#008656';
      case 'laporan ditolak':
        return '#8D0000';
      default:
        return 'transparent';
    }
  };

  const convertStatus = (status: any) => {
    switch (status) {
      case 'dalam antrian':
        return 'Dalam Antrian';
      case 'investigasi':
        return 'Sedang Di Investigasi';
      case 'laporan selesai':
        return 'Laporan Selesai';
      case 'laporan ditolak':
        return 'Laporan Ditolak';
      default:
        return null;
    }
  };

  const getStatusIcon = (status: any) => {
    switch (status) {
      case 'dalam antrian':
        return <IconWaktu />;
      case 'investigasi':
        return <IconSedangDitindak />;
      case 'laporan selesai':
        return <IconCentang />;
      case 'laporan ditolak':
        return <IconTolak />;
      default:
        return '';
    }
  };

  function convertToWITDate(utcDate: any) {
    const offset = 8; // Offset waktu WIT dari UTC adalah +7 jam
    const localTime = new Date(utcDate.getTime() + offset * 60 * 60 * 1000);

    const year = localTime.getUTCFullYear().toString();
    const month = getMonthName(localTime.getUTCMonth());
    const day = localTime.getUTCDate().toString();

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

  // const riwayat = [
  //   {
  //     jenis: 'Radiologi',
  //     waktu: '19:45',
  //     tanggal: '6 September 2023',
  //     status: 'Laporan Selesai',
  //   },
  //   {
  //     jenis: 'Radiologi',
  //     waktu: '19:45',
  //     tanggal: '6 September 2023',
  //     status: 'Sedang Ditindak',
  //   },
  //   {
  //     jenis: 'Radiologi',
  //     waktu: '19:45',
  //     tanggal: '6 September 2023',
  //     status: 'Dalam Antrian',
  //   },
  //   {
  //     jenis: 'Radiologi',
  //     waktu: '19:45',
  //     tanggal: '6 September 2023',
  //     status: 'Laporan Ditolak',
  //   },
  //   {
  //     jenis: 'Radiologi',
  //     waktu: '19:45',
  //     tanggal: '6 September 2023',
  //     status: 'Laporan Ditolak',
  //   },
  // ];

  function convertToWITHour(utcDate: any) {
    const offset = 8; // Offset waktu WIT dari UTC adalah +7 jam
    const localTime = new Date(utcDate.getTime() + offset * 60 * 60 * 1000);

    const hours = localTime.getUTCHours().toString().padStart(2, '0');
    const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Gap height={20} />
      <View style={styles.container1}>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 17,
            color: MyColor.Primary,
          }}>
          Riwayat Laporan
        </Text>
        <Gap height={10} />
        {laporan.length === 0 ? (
          <View style={styles.cardTidakAdaLaporan}>
            <Text style={styles.txtLaporanTerakhir}>
              Anda belum membuat laporan apapun
            </Text>
            <TouchableOpacity
              style={styles.createReportButton}
              onPress={() => navigation.navigate('FotoPendukung')}>
              <Text style={styles.createReportButtonText}>
                Tekan disini untuk {'\n'}membuat laporan baru!
              </Text>
              <Image source={IconLaporan} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.txt}>Berikut adalah riwayat laporan anda</Text>
            <Gap height={10} />
            {laporan.map((item, index) => (
              <TouchableOpacity
                style={[
                  styles.cardContent,
                  {
                    backgroundColor: getStatusColor(item.status),
                  },
                ]}
                key={index}
                onPress={() =>
                  navigation.navigate('DetailLaporan', {
                    id_laporan: item.id_laporan,
                  })
                }>
                <View style={{flexDirection: 'row', columnGap: 20}}>
                  <Image source={{uri: item.gambar}} style={styles.cardImage} />
                  <View>
                    <Text style={styles.txtCardTime}>
                      {convertToWITHour(new Date(item.tanggal_laporan_dikirim))}
                    </Text>
                    <Text style={styles.txtCard}>
                      {convertToWITDate(new Date(item.tanggal_laporan_dikirim))}
                    </Text>
                    <Text style={styles.txtCardStatus}>
                      {convertStatus(item.status)}
                    </Text>
                  </View>
                </View>
                {getStatusIcon(item.status)}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  container1: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  card: {
    width: '100%',
  },
  cardTidakAdaLaporan: {
    flexWrap: 'wrap',
    minHeight: 119,
    borderRadius: 20,
    backgroundColor: MyColor.Primary,
    // marginBottom: 20,
  },
  cardContent: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    marginBottom: 20,
    borderRadius: 20,
  },
  cardImage: {
    resizeMode: 'cover',
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  createReportButton: {
    flexDirection: 'row',
    columnGap: 50,
    paddingHorizontal: 20,
  },
  createReportButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#fff',
  },
  txt: {
    fontFamily: MyFont.Primary,
    fontSize: 14,
    color: 'black',
  },
  txtCard: {
    fontSize: 11,
    color: 'white',
    fontFamily: MyFont.Primary,
  },
  txtCardTime: {
    fontSize: 14,
    color: 'white',
    fontFamily: MyFont.Primary,
  },
  txtCardStatus: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  txtLaporanTerakhir: {
    padding: 20,
    fontFamily: MyFont.Primary,
    fontSize: 11,
    color: '#fff',
  },
});
