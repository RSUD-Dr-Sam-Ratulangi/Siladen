import React from 'react';
import {
  View,
  Text,
  TextInput as Input,
  StyleSheet,
  useAnimatedValue,
} from 'react-native';
import {isSearchBarAvailableForCurrentPlatform} from 'react-native-screens';

const TextInput = ({label, placeHolder, onChangeText}: any) => {
  if (placeHolder == 'Phone number') {
    return (
      <View style={styles.container}>
        <Text style={styles.label}></Text>
        <Input
          style={styles.textInput}
          placeholder={placeHolder + ' *'}
          keyboardType="numeric"
          onChangeText={text => onChangeText(text)}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Input
          style={styles.textInput}
          placeholder={placeHolder + ' *'}
          onChangeText={text => onChangeText(text)}
        />
      </View>
    );
  }
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 26,
    paddingLeft: 24,
    paddingRight: 24,
    width: 325,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },
  textInput: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 37,
    paddingStart: 16,
    padding: 10,
    color: 'black',
  },
});
