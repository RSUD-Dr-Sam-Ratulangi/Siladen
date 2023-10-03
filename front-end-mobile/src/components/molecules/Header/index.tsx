import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Logo} from '../../../assets/images';
import {MyFont} from '../../atoms/MyFont';
import {MyColor} from '../../atoms/MyColor';

const Header = ({backgroundTransparent}: {backgroundTransparent?: boolean}) => {
  return (
    <View
      style={[
        styles.heading,
        {
          backgroundColor: backgroundTransparent
            ? 'transparent'
            : MyColor.Light,
        },
      ]}>
      <Image source={Logo} style={styles.logo} />
      <View>
        <Text style={styles.txtRSUD}>
          RSUD Dr. Sam Ratulangi Tondano{'\n'}Aplikasi Pelaporan Insiden{'\n'}
          <Text style={styles.txt}>Siladen</Text>
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  heading: {
    alignItems: 'center',
    height: 76,
    columnGap: 20,
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  logo: {
    height: 50,
    width: 38,
    resizeMode: 'contain',
  },
  txtRSUD: {
    fontFamily: MyFont.Primary,
    fontSize: 11,
    marginBottom: 0,
    color: 'grey',
  },
  txt: {
    marginTop: 0,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
});
