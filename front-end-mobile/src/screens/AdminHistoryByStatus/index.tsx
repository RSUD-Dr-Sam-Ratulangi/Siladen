import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import Header from '../../components/molecules/Header';
import {
  IconCentang,
  IconSedangDitindak,
  IconTolak,
  IconWaktu,
} from '../../assets/icons';
import {MyColor} from '../../components/atoms/MyColor';
import {MyFont} from '../../components/atoms/MyFont';
import {ImagePlaceHolder} from '../../assets/images';
import {useSelector} from 'react-redux';

interface Laporan {
  id_laporan: string;
  nama_pasien: string;
  insiden: string;
  tanggal_laporan_dikirim: Date;
  gambar: string;
  status: string;
}

const AdminHistoryByStatus = ({navigation, route}: any) => {
  // const {dataUser, status} = route.params;
  const {status} = route.params;

  const tokenSelector = useSelector((data: any) => data.token);

  const dataUser = {
    token: tokenSelector,
  };
  const [laporanList, setLaporanList] = useState<Laporan[]>([]);

  useFocusEffect(
    useCallback(() => {
      getLaporan();
      console.log('Ini di history by status: ', dataUser, status);
      console.log('ini list laporan: ', laporanList);
    }, []),
  );

  const getLaporan = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${dataUser.token}`,
      };
      const response = await axios.get(
        `https://backend-pelaporan-final.glitch.me/api/laporan?status=${status}`,
        {headers},
      );
      setLaporanList(response.data.data);
      console.log('ini response.data.data', response.data.data);
    } catch (error) {
      console.log(error);
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

  const formatDateTime = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = getMonthName(date.getMonth());
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} - ${day} ${month} ${year}`;
  };

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header backgroundTransparent />
      <View style={[styles.status, {backgroundColor: getStatusColor(status)}]}>
        <View
          style={{flexDirection: 'row', columnGap: 20, alignItems: 'center'}}>
          {getStatusIcon(status)}
          <Text style={styles.txtStatus}>{convertStatus(status)}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.txtJumlah}>{laporanList?.length}</Text>
          <Text style={styles.txt}>Laporan</Text>
        </View>
      </View>
      {laporanList.map((item, index) => (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            columnGap: 10,
            height: 134,
            paddingHorizontal: 20,
            paddingVertical: 10,
            alignItems: 'center',
            backgroundColor: index % 2 === 0 ? '#fff' : 'transparent',
            // marginBottom: 20,
          }}
          key={index}
          onPress={() =>
            navigation.navigate('AdminHistoryDetail', {
              id_laporan: item.id_laporan,
              status: item.status,
              dataUser: dataUser,
            })
          }>
          <Image
            source={item.gambar ? {uri: item.gambar} : ImagePlaceHolder}
            style={styles.img}
          />
          <View style={{flex: 1}}>
            <Text style={styles.txt2}>{item.nama_pasien}</Text>
            <Text style={[styles.txt2, {fontFamily: 'Poppins-Bold'}]}>
              {formatDateTime(new Date(item.tanggal_laporan_dikirim))}
            </Text>
            <Text
              style={[styles.txt2, {fontSize: 11}]}
              ellipsizeMode="tail"
              numberOfLines={3}>
              {item.insiden}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default AdminHistoryByStatus;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  status: {
    paddingHorizontal: 20,
    height: 97,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    resizeMode: 'cover',
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  txt: {
    fontFamily: MyFont.Primary,
    fontSize: 14,
    color: MyColor.Light,
  },
  txt2: {
    fontFamily: MyFont.Primary,
    fontSize: 16,
    color: 'black',
  },
  txtStatus: {
    fontFamily: 'Poppins-Bold',
    color: MyColor.Light,
    fontSize: 17,
  },
  txtJumlah: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: MyColor.Light,
    height: 40,
  },
});
