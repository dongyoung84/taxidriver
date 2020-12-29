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
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import Modal from 'react-native-modal'
import NotificationSounds, { playSampleSound } from  'react-native-notification-sounds';


const InfoModal = ({ modalVisible, setModalVisible, navigation }) => {


  return (
    <>
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.8}
        isVisible={modalVisible}
        useNativeDriver={true}
      >
        <View style={styles.container}>

          <View style={styles.callBox}>
            <Text style={{ fontWeight: 'bold', color: '#333', fontSize: 30 }}>가능한 목적지</Text>
            <Text style={{ fontWeight: 'bold', color: '#333', fontSize: 15 }}>경북대, 반월당, 광장코아, 들안길, 수성못</Text>
            <Text style={{ fontWeight: 'bold', color: '#333', fontSize: 15 }}>서울역, 올림픽공원, 잠실역, 남산타워</Text>


          </View>
          <View style={styles.buttonBox}>
            {/* <TouchableOpacity style={styles.rejectButton} onPress={(e) => { setModalVisible(!modalVisible) }}>
              <Image style={styles.icon} source={require('../../assets/error.png')} />

              <Text style={styles.buttonText}>거절</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.acceptButton} onPress={(e) => { setModalVisible(!modalVisible) }}>
              <Image style={styles.icon} source={require('../../assets/check.png')} />

              <Text style={styles.buttonText}>닫기</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {

  },
  container: {
    justifyContent: 'center',


  },
  callBox: {
    justifyContent: 'center',
    height: 270,
    backgroundColor: '#ddd',
    alignItems: 'center'

  },
  topTextContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  acceptButton: {
    backgroundColor: '#999',
    height: 50,
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    borderRadius: 25,
  },
  rejectButton: {
    backgroundColor: '#6F97C6',
    height: 100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginVertical: 10,
    flexDirection: 'row',
    borderRadius: 25,
  },
  buttonBox: {
    flexDirection: 'row',

  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

});

export default InfoModal;
