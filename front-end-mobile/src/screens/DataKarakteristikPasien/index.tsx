import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput as Input,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Title from '../../components/atoms/Title';
import Button from '../../components/atoms/Button';
import {MyColor} from '../../components/atoms/MyColor';
import {MyFont} from '../../components/atoms/MyFont';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Gap from '../../components/atoms/Gap';

const DataKarakteristikPasien = ({navigation, route}: any) => {
  const dataUser = route.params;
  const [name, setName] = useState('');
  const [nomorMR, setNomorMR] = useState('');
  const [ruangan, setRuangan] = useState('');
  const [age, setAge] = useState('');
  const [ageNo, setAgeNo] = useState('');
  const [selectedAgeType, setSelectedAgeType] = useState('');
  const [insurance, setInsurance] = useState('');
  const [gender, setGender] = useState('');
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [waktuMendapatPelayanan, setWaktuMendapatPelayanan] = useState(
    new Date(),
  );

  const isBulanDisabled = Number(ageNo) > 11;
  const isHariDisabled = Number(ageNo) > 30;
  useEffect(() => {
    if (isBulanDisabled || isHariDisabled) {
      setSelectedAgeType('');
    }
  }, [isBulanDisabled, isHariDisabled]);

  useEffect(() => {
    setAge(`${ageNo} ${selectedAgeType}`);
  }, [ageNo, selectedAgeType]);

  const btnUmur = () => {
    const handleAge = (option: string) => {
      setSelectedAgeType(option);

      console.log(age);
    };

    return (
      <View style={{flexDirection: 'row', columnGap: 5}}>
        <TouchableOpacity
          style={[
            styles.button,
            {width: 79},
            selectedAgeType === 'hari' && styles.selectedButton,
            isHariDisabled && styles.disabledButton,
          ]}
          onPress={() => handleAge('hari')}
          disabled={isHariDisabled} // Menonaktifkan tombol "hari" jika umur > 30
        >
          <Text
            style={[
              styles.txtButton,
              selectedAgeType === 'hari' && styles.txtBtnActive,
            ]}>
            Hari
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {width: 79},
            selectedAgeType === 'bulan' && styles.selectedButton,
            isBulanDisabled && styles.disabledButton,
          ]}
          onPress={() => handleAge('bulan')}
          disabled={isBulanDisabled} // Menonaktifkan tombol "bulan" jika umur > 11
        >
          <Text
            style={[
              styles.txtButton,
              selectedAgeType === 'bulan' && styles.txtBtnActive,
            ]}>
            Bulan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {width: 79},
            selectedAgeType === 'tahun' && styles.selectedButton,
          ]}
          onPress={() => handleAge('tahun')}>
          <Text
            style={[
              styles.txtButton,
              selectedAgeType === 'tahun' && styles.txtBtnActive,
            ]}>
            Tahun
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const btnInsurance = () => {
    const handleInsurance = (option: string) => {
      setInsurance(option);
    };
    return (
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          flexWrap: 'wrap',
        }}>
        <TouchableOpacity
          style={[
            styles.button2,
            insurance === 'BPJS' && styles.selectedButton,
          ]}
          onPress={() => handleInsurance('BPJS')}>
          <Text
            style={[
              styles.txtButton,
              insurance === 'BPJS' && styles.txtBtnActive,
            ]}>
            BPJS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button2,
            insurance === 'Jamkesda' && styles.selectedButton,
          ]}
          onPress={() => handleInsurance('Jamkesda')}>
          <Text
            style={[
              styles.txtButton,
              insurance === 'Jamkesda' && styles.txtBtnActive,
            ]}>
            Jamkesda
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button2,
            insurance === 'Umum/Pribadi' && styles.selectedButton,
          ]}
          onPress={() => handleInsurance('Umum/Pribadi')}>
          <Text
            style={[
              styles.txtButton,
              insurance === 'Umum/Pribadi' && styles.txtBtnActive,
            ]}>
            Umum/Pribadi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button2,
            insurance === 'Asuransi Swasta' && styles.selectedButton,
          ]}
          onPress={() => handleInsurance('Asuransi Swasta')}>
          <Text
            style={[
              styles.txtButton,
              insurance === 'Asuransi Swasta' && styles.txtBtnActive,
            ]}>
            Asuransi Swasta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button2,
            insurance === 'Pemerintah' && styles.selectedButton,
          ]}
          onPress={() => handleInsurance('Pemerintah')}>
          <Text
            style={[
              styles.txtButton,
              insurance === 'Pemerintah' && styles.txtBtnActive,
            ]}>
            Pemerintah
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button2,
            insurance === 'Perusahaan' && styles.selectedButton,
          ]}
          onPress={() => handleInsurance('Perusahaan')}>
          <Text
            style={[
              styles.txtButton,
              insurance === 'Perusahaan' && styles.txtBtnActive,
            ]}>
            Perusahaan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button2,
            insurance === 'Lain-lain' && styles.selectedButton,
          ]}
          onPress={() => handleInsurance('Lain-lain')}>
          <Text
            style={[
              styles.txtButton,
              insurance === 'Lain-lain' && styles.txtBtnActive,
            ]}>
            Lain-lain
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const btnGender = () => {
    const handleGender = (option: string) => {
      setGender(option);
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          columnGap: 20,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={[
            styles.button,
            {flex: 1},
            gender === 'Laki-laki' && styles.selectedButton,
          ]}
          onPress={() => handleGender('Laki-laki')}>
          <Text
            style={[
              styles.txtButton,
              gender === 'Laki-laki' && styles.txtBtnActive,
            ]}>
            Laki-laki
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {flex: 1},
            gender === 'Perempuan' && styles.selectedButton,
          ]}
          onPress={() => handleGender('Perempuan')}>
          <Text
            style={[
              styles.txtButton,
              gender === 'Perempuan' && styles.txtBtnActive,
            ]}>
            Perempuan
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const datePick = () => {
    const showDateTimePicker = () => {
      setDateTimePickerVisible(true);
    };

    const hideDateTimePicker = () => {
      setDateTimePickerVisible(false);
    };

    const handleDateConfirm = (date: Date) => {
      setWaktuMendapatPelayanan(date);
      hideDateTimePicker();
      console.log(date);
    };

    const formatDateTime = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} - ${hours}:${minutes}`;
    };

    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={showDateTimePicker}>
          <Text style={styles.txtButton}>
            {formatDateTime(waktuMendapatPelayanan)}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDateTimePickerVisible}
          mode="datetime"
          timeZoneName="Asia/Makassar"
          onConfirm={handleDateConfirm}
          onCancel={hideDateTimePicker}
        />
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Title label="Data Karakteristik Pasien" />
        <Text style={styles.txtSection}>Nama</Text>
        <Input
          style={styles.inputBox}
          placeholder="Nama anda"
          placeholderTextColor="#787878"
          onChangeText={setName}
          value={name}
        />
        <Text style={styles.txtSection}>Nomor MR</Text>
        <Input
          keyboardType="numeric"
          style={styles.inputBox}
          placeholder="Nomor MR anda"
          placeholderTextColor="#787878"
          onChangeText={setNomorMR}
          value={nomorMR}
        />
        <Text style={styles.txtSection}>Ruangan</Text>
        <Input
          style={styles.inputBox}
          placeholder=""
          placeholderTextColor="#787878"
          onChangeText={setRuangan}
          value={ruangan}
        />
        <Text style={styles.txtSection}>Umur</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Input
            keyboardType="numeric"
            style={[styles.inputBox, {width: 63, textAlign: 'center'}]}
            placeholder="00"
            placeholderTextColor="#787878"
            onChangeText={value => {
              if (value.length <= 3) {
                setAgeNo(value);
              }
            }}
            maxLength={3}
            value={ageNo}
          />
          {btnUmur()}
        </View>
        <Text style={styles.txtSection}>Penanggung Biaya Pasien</Text>
        {btnInsurance()}
        <Text style={styles.txtSection}>Jenis Kelamin</Text>
        {btnGender()}
        <Text style={styles.txtSection}>Waktu Mendapatkan Pelayanan</Text>
        {datePick()}
        <Gap height={30} />
      </View>
      <View style={styles.footer}>
        <Button
          label="Menu Utama"
          backgroundColor={MyColor.Light}
          textColor={MyColor.Primary}
          width={126}
          onClick={() => {
            navigation.navigate('DataKarakteristikPasien');
          }}
        />
        <Button
          label="Selanjutnya"
          backgroundColor={MyColor.Primary}
          textColor={MyColor.Light}
          width={173}
          onClick={() => {
            navigation.navigate(
              'RincianKejadian',
              {
                dataUser,
                name,
                nomorMR,
                ruangan,
                age,
                insurance,
                gender,
                waktuMendapatPelayanan: waktuMendapatPelayanan.toISOString(),
              },
              console.log(
                'ini data karakteristik pasien: ',
                dataUser,
                name,
                nomorMR,
                ruangan,
                age,
                insurance,
                gender,
                waktuMendapatPelayanan,
              ),
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default DataKarakteristikPasien;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  txtSection: {
    fontFamily: MyFont.Primary,
    color: 'black',
    fontSize: 18,
    marginTop: 20,
  },
  txtButton: {
    fontFamily: MyFont.Primary,
    fontSize: 14,
    color: 'black',
  },
  txtBtnActive: {
    color: MyColor.Light,
  },
  inputBox: {
    paddingVertical: 0,
    height: 40,
    fontFamily: MyFont.Primary,
    fontSize: 16,
    color: 'black',
    backgroundColor: MyColor.Light,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: MyColor.Light,
  },
  button2: {
    marginRight: 'auto',
    height: 52,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: MyColor.Light,
  },
  selectedButton: {
    backgroundColor: MyColor.Primary,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  footer: {
    flex: 1,
    backgroundColor: MyColor.Light,
    flexDirection: 'row',
    columnGap: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
  },
});
