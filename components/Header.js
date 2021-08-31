import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Colors from '../constants/colors';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'open-sans-bold',
  },
  image: {
    width: 20,
    height: 20,
  }
});

export default Header;