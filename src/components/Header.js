  import { NavigationContext, NavigationRouteContext,   useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
  Modal,

} from 'react-native';

import { Icon } from 'react-native-elements';

const Header = ({navigation , setModalVisible, modalVisible }) => {

  return (
    <>
      <View style={styles.container}>

        <Icon  name='bars' type='font-awesome' color='#fff'/>
        <Image style={[styles.logoImage]} source={require('../../assets/logo.png')} />
        <Image style={[styles.userImage]} source={require('../../assets/user.png')} />

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingHorizontal:20,
    //flex: 1,
    height:40,
    backgroundColor:'#222',
    paddingTop:10,
    
  },
  chatContainer: {
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    alignSelf: 'stretch',
    width: Dimensions.get('window').width - 40

  },
  logoImage:{
    height:30,
    width:100,
    resizeMode:'contain',
  },
  userImage:{
    height:25,
    width:25,
    resizeMode:'contain',
  }

});

export default Header;
