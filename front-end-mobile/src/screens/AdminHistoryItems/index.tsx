import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/molecules/Header';
import {MyColor} from '../../components/atoms/MyColor';
import {
  IconCentang,
  IconSedangDitindak,
  IconTolak,
  IconWaktu,
} from '../../assets/icons';
import axios from 'axios';
import {MyFont} from '../../components/atoms/MyFont';
import Gap from '../../components/atoms/Gap';
import Line from '../../components/atoms/Line';

interface JumlahLaporan {
  jumlah_keseluruhan: number;
  jumlah_laporan_dalam_antrian: number;
  jumlah_laporan_ditolak: number;
  jumlah_laporan_investigasi: number;
  jumlah_laporan_selesai: number;
}

const AdminHistoryItems = ({navigation, route}: any) => {
  const dataUser = route.params;
  const [jumlahLaporan, setJumlahLaporan] = useState<JumlahLaporan | null>(
    null,
  );
  const today = new Date();

  useEffect(() => {
    getJumlahLaporan();
  }, []);

  const getJumlahLaporan = async () => {
    if (dataUser.id_user) {
      try {
        const headers = {
          Authorization: `Bearer ${dataUser.token}`, // Tambahkan token ke header dengan format Bearer
        };

        const response = await axios.get(
          `https://backend-pelaporan-final.glitch.me/api/laporan/amount`,
          {headers},
        );
        setJumlahLaporan(response.data.data);
        console.log('jumlah laporan: ', response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  function formatDate(date: any) {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${day}/${month}/${year}`;
  }

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={[styles.card, {backgroundColor: MyColor.Primary}]}>
          <View>
            <Text style={styles.txtStatus}>Dalam Antrian</Text>
            <IconWaktu />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.txtJumlah}>
              {jumlahLaporan?.jumlah_laporan_dalam_antrian}
            </Text>
            <Text style={styles.txt}>Laporan</Text>
          </View>
        </View>
        <View style={[styles.card, {backgroundColor: '#A37F00'}]}>
          <View>
            <Text style={styles.txtStatus}>Sedang Di Investigasi</Text>
            <IconSedangDitindak />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.txtJumlah}>
              {jumlahLaporan?.jumlah_laporan_investigasi}
            </Text>
            <Text style={styles.txt}>Laporan</Text>
          </View>
        </View>
        <View style={[styles.card, {backgroundColor: '#008656'}]}>
          <View>
            <Text style={styles.txtStatus}>Laporan Selesai</Text>
            <IconCentang />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.txtJumlah}>
              {jumlahLaporan?.jumlah_laporan_selesai}
            </Text>
            <Text style={styles.txt}>Laporan</Text>
          </View>
        </View>
        <View style={[styles.card, {backgroundColor: '#8D0000'}]}>
          <View>
            <Text style={styles.txtStatus}>Laporan Ditolak</Text>
            <IconTolak />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.txtJumlah}>
              {jumlahLaporan ? jumlahLaporan.jumlah_laporan_ditolak : 0}
            </Text>
            <Text style={styles.txt}>Laporan</Text>
          </View>
        </View>
        <View style={{padding: 20}}>
          <Line height={3} />
        </View>
        <View
          style={[
            styles.card,
            {backgroundColor: MyColor.Light, flexDirection: 'column'},
          ]}>
          <Text style={styles.txt2}>
            Total semua laporan ke RSUD Dr. Sam Ratulangi Tondano sampai tanggal{' '}
            <Text style={{fontFamily: 'Poppins-Bold'}}>
              {formatDate(today)}
            </Text>
          </Text>
          <Text style={[styles.txtJumlah, {color: 'black'}]}>
            {jumlahLaporan?.jumlah_keseluruhan}
          </Text>
          <Text style={[styles.txt, {color: 'black'}]}>Laporan</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminHistoryItems;

const styles = StyleSheet.create({
  container: {},
  content: {
    padding: 20,
  },
  card: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt: {
    fontFamily: MyFont.Primary,
    fontSize: 14,
    color: MyColor.Light,
  },
  txt2: {
    textAlign: 'center',
    fontFamily: MyFont.Primary,
    fontSize: 17,
    color: 'black',
  },
  txtStatus: {
    fontFamily: 'Poppins-Bold',
    color: MyColor.Light,
    fontSize: 14,
  },
  txtJumlah: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: MyColor.Light,
    height: 40,
  },
});
