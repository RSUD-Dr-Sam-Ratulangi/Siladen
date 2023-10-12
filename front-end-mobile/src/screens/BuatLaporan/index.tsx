import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import Header from '../../components/molecules/Header';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DataKarakteristikPasien from '../DataKarakteristikPasien';
import {MyColor} from '../../components/atoms/MyColor';
import {MyFont} from '../../components/atoms/MyFont';
import Gap from '../../components/atoms/Gap';
import {
  useFocusEffect,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import RincianKejadian from '../RincianKejadian';
import FotoPendukung from '../FotoPendukung';
import SubmitLaporan from '../SubmitLaporan';
import {useSelector, useDispatch} from 'react-redux';

const Stack = createNativeStackNavigator();

const BuatLaporan = ({navigation, route}: any) => {
  const id_user = useSelector((data: any) => data.id_user);
  const [activeStep, setActiveStep]: any = useState(1);
  const stepDone = {
    1: activeStep > 1 ? [styles.doneStep, styles.txtActiveStep] : {},
    2: activeStep > 2 ? [styles.doneStep, styles.txtActiveStep] : {},
    3:
      activeStep !== 1 && activeStep !== 2 && activeStep !== 3
        ? [styles.doneStep, styles.txtActiveStep]
        : {},
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <Header />
      <Gap height={20} />
      <Text
        style={{
          fontFamily: MyFont.Primary,
          fontSize: 18,
          color: 'black',
          paddingHorizontal: 30,
        }}>
        Buat Laporan
      </Text>
      <Gap height={10} />
      <View
        style={{
          flexDirection: 'row',
          height: 58,
          backgroundColor: MyColor.Light,
          alignItems: 'center',
        }}>
        <View
          style={[
            styles.step,
            activeStep === 1 && styles.activeStep,
            stepDone[1],
          ]}>
          <Text
            style={[
              styles.txtStep,
              activeStep === 1 && styles.txtActiveStep,
              stepDone[1],
            ]}>
            Langkah 1
          </Text>
          <Text
            style={[
              styles.txt,
              activeStep === 1 && styles.txtActiveStep,
              stepDone[1],
            ]}>
            Data karakteristik pasien
          </Text>
        </View>
        <View
          style={[
            styles.step,
            activeStep === 2 && styles.activeStep,
            stepDone[2],
          ]}>
          <Text
            style={[
              styles.txtStep,
              activeStep === 2 && styles.txtActiveStep,
              stepDone[2],
            ]}>
            Langkah 2
          </Text>
          <Text
            style={[
              styles.txt,
              activeStep === 2 && styles.txtActiveStep,
              stepDone[2],
            ]}>
            Rincian kejadian
          </Text>
        </View>
        <View
          style={[
            styles.step,
            activeStep === 3 && styles.activeStep,
            stepDone[3],
          ]}>
          <Text
            style={[
              styles.txtStep,
              activeStep === 3 && styles.txtActiveStep,
              stepDone[3],
            ]}>
            Langkah 3
          </Text>
          <Text
            style={[
              styles.txt,
              activeStep === 3 && styles.txtActiveStep,
              stepDone[3],
            ]}>
            Foto pendukung
          </Text>
        </View>
      </View>
      <Stack.Navigator
        initialRouteName="DataKarakteristikPasien"
        screenOptions={() => ({
          headerShown: false,
        })}>
        <Stack.Screen
          name="DataKarakteristikPasien"
          component={DataKarakteristikPasien}
          // initialParams={dataUser}
          listeners={({route}) => ({
            focus: () => {
              setActiveStep(1);
            },
          })}
        />
        <Stack.Screen
          name="RincianKejadian"
          component={RincianKejadian}
          listeners={({route}) => ({
            focus: () => {
              setActiveStep(2);
            },
          })}
        />
        <Stack.Screen
          name="FotoPendukung"
          component={FotoPendukung}
          listeners={({route}) => ({
            focus: () => {
              setActiveStep(3);
            },
          })}
        />
        <Stack.Screen
          name="SubmitLaporan"
          component={SubmitLaporan}
          listeners={({route}) => ({
            focus: () => {
              setActiveStep(4);
            },
          })}
        />
      </Stack.Navigator>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  step: {
    flex: 1,
    padding: 10,
  },
  activeStep: {
    backgroundColor: MyColor.Primary, // Warna biru saat aktif
  },
  doneStep: {
    backgroundColor: 'green',
  },
  txtStep: {
    color: MyColor.Primary, // Warna teks putih
    fontSize: 18,
  },
  txtActiveStep: {
    color: MyColor.Light,
  },
  txt: {
    color: MyColor.Primary, // Warna teks putih
    fontSize: 8,
  },
});

export default BuatLaporan;
