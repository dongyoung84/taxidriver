import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContext, NavigationRouteContext,   useIsFocused } from '@react-navigation/native';

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
import CallingModal from '../components/CallingModal'
import InfoModal from '../components/InfoModal'
import ChatBox from '../components/ChatBox'
import Header from '../components/Header'
import { BoxShadow } from 'react-native-shadow'

import Tts from 'react-native-tts';

Tts.setDefaultLanguage('ko-KR');
Tts.setDefaultPitch(1.0);

const randNum = () => {
  let rand = Math.random()
  return rand
}
// const barWidth = [randNum(), randNum(), randNum()]

const WaitingScreen = ({ navigation }) => {

  //////////////////////////////////////setting variable
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisible2, setModalVisible2] = useState(false)
  const [callStart, setCallStart] = useState(true)
  const [mentionStart, setMentionStart] = useState(true)
  const animationBounce = new Animated.Value(1)
  const animationWidth0 = new Animated.Value(0)
  const animationWidth1 = new Animated.Value(0)
  const animationWidth2 = new Animated.Value(0)

  const animationStylesBounce = {
    transform: [
      { scale: animationBounce }
    ]
  };

  //////////////////////////////////////animation
  const bounceLoop = () => {
    Animated.sequence([
      Animated.timing(
        animationBounce,
        {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }
      ),
      Animated.timing(
        animationBounce,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }
      ),
    ]).start(() => {
      if (callStart) bounceLoop()
      else { return }
    })
  }

  // useEffect(() => {
  // }, [])
  bounceLoop()

  // Animated.spring(
  //   animationWidth0,
  //   {
  //     toValue: barWidth[0],
  //     duration: 1000,
  //     friction: 3,
  //     tension: 3,
  //     useNativeDriver: false,

  //   }
  // ).start()
  // Animated.spring(
  //   animationWidth1,
  //   {
  //     toValue: barWidth[1],
  //     duration: 1000,
  //     friction: 3,
  //     tension: 3,
  //     useNativeDriver: false,

  //   }
  // ).start()
  // Animated.spring(
  //   animationWidth2,
  //   {
  //     toValue: barWidth[2],
  //     duration: 1000,
  //     friction: 3,
  //     tension: 2,
  //     useNativeDriver: false,
  //   }
  // ).start()

  const shadowOpt1 = {
    width: 50,
    height: 50,
    color: "#346CAE",
    border: 4,
    radius: 25,
    opacity: 0.4,
    x: 0,
    y: 0,

  }
  const shadowOpt2 = {
    width: 50,
    height: 50,
    color: "#FFD600",
    border: 4,
    radius: 25,
    opacity: 0.4,
    x: 0,
    y: 0,

  }
  // let isFocused = useIsFocused()
  // useEffect(()=>{
  //   if(isFocused){ 
  //     console.log('focused!!!!!!')
  //     setMentionStart(false)
  //     setMentionStart(true)

  //   }

  // })


  return (
    <>

      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <CallingModal modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} />

        <InfoModal modalVisible={modalVisible2} setModalVisible={setModalVisible2} navigation={navigation} />

        <View style={styles.top}>
          <Animated.Image style={[styles.callImage, animationStylesBounce]} source={require('../../assets/call_radio.png')} />
          {callStart ? <Text style={styles.callText}>콜수신 중</Text> : <Text style={styles.callText}>콜 대기</Text>}
        </View>


        <View style={styles.middle}>
          {callStart ? (
            <TouchableOpacity style={styles.callStopButton} onPress={(e) => { setCallStart(!callStart) }}>
              <Image style={styles.icon} source={require('../../assets/stopping.png')} />
              <Text style={styles.buttonText}>콜 멈추기</Text>
            </TouchableOpacity>
          ) :
            (
              <TouchableOpacity style={styles.callStopButton2} onPress={(e) => { setCallStart(!callStart) }}>
                <Image style={styles.icon} source={require('../../assets/wifi.png')} />
                <Text style={styles.buttonText}>콜 받기</Text>
              </TouchableOpacity>

            )}

          {/* <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.distanceOderButton}>
              <Image style={styles.icon} source={require('../../assets/distance.png')} />
              <Text style={styles.buttonText}>거리 순</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callOderButton}>
              <Image style={styles.icon} source={require('../../assets/headphone.png')} />
              <Text style={styles.buttonText}>콜 순</Text>
            </TouchableOpacity>
          </View> */}

        </View>



        {/* <View style={styles.bottom}>
          <Text style={styles.buttonText}>현재 콜수</Text>
          <View style={styles.bottomList}>
            <View style={styles.bottomRow}>
              <View style={styles.bottomRowLeft}><Text style={styles.buttonText}>반월당</Text><Text style={styles.buttonTextSmall}>500m</Text></View>
              <Animated.View style={[styles.bar, { flex: animationWidth0 }]}></Animated.View>
            </View>
            <View style={styles.bottomRow}>
              <View style={styles.bottomRowLeft}><Text style={styles.buttonText}>교대앞</Text><Text style={styles.buttonTextSmall}>1.2km</Text></View>
              <Animated.View style={[styles.bar, { flex: animationWidth1 }]}></Animated.View>
            </View>
            <View style={styles.bottomRow}>
              <View style={styles.bottomRowLeft}><Text style={styles.buttonText}>광장코아</Text><Text style={styles.buttonTextSmall}>3km</Text></View>
              <Animated.View style={[styles.bar, { flex: animationWidth2 }]}></Animated.View>
            </View>
            <View style={styles.bottomRow}>
              <View style={styles.bottomRowLeft}><Text style={styles.buttonText}>광장코아</Text><Text style={styles.buttonTextSmall}>3km</Text></View>
              <Animated.View style={[styles.bar, { flex: animationWidth2 }]}></Animated.View>
            </View>
          </View>
        </View>         */}
        <View style={styles.bottom}>
          <ChatBox navigation={navigation} setModalVisible={setModalVisible} modalVisible={modalVisible} setModalVisible2={setModalVisible2} modalVisible2={modalVisible2}mentionStart={mentionStart} setMentionStart={setMentionStart} />

          {mentionStart ? (

            <TouchableOpacity style={[styles.noticeButtonContainer]} onPress={() => setMentionStart(!mentionStart)}>
              <BoxShadow style={[styles.noticeButton]} setting={shadowOpt1}>
                <View style={styles.noticeButton}>
                  <Text style={{ color: '#fff', fontSize: 11, fontWeight: 'bold' }}>알림끄기</Text>
                </View>
              </BoxShadow>
            </TouchableOpacity>

          ) : (

              <TouchableOpacity style={[styles.noticeButtonContainer]} onPress={() => setMentionStart(!mentionStart)}>
                <BoxShadow style={[styles.noticeButton2]} setting={shadowOpt2}>
                  <View style={styles.noticeButton2}>
                    <Text style={{ color: '#222', fontSize: 11, fontWeight: 'bold' }}>알림켜기</Text>
                  </View>
                </BoxShadow>
              </TouchableOpacity>
            )}
        </View>
      </SafeAreaView>

    </>
  );
};

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#222',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  middle: {
    backgroundColor: '#222',
    flex: 0.8,
    justifyContent: 'flex-end',
  },
  bottom: {
    backgroundColor: '#222',
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  callImage: {
    width: 100,
    height: 100,
  },
  callText: {
    color: '#FFD600',
    fontSize: 30,
  },
  callStopButton: {
    backgroundColor: '#407BBF',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    borderRadius: 25,
  },
  callStopButton2: {
    backgroundColor: '#999',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    borderRadius: 25,
  },
  distanceOderButton: {
    backgroundColor: '#407BBF',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 5,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 25,
  },
  callOderButton: {
    backgroundColor: '#407BBF',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 10,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 25,
  },
  bottomList: {
    justifyContent: 'space-between',
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomRowLeft: {
    flexDirection: 'row',
    alignItems: 'flex-end'

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonTextSmall: {
    color: '#ddd',
    fontSize: 12,
    marginLeft: 5,
  },
  bar: {
    backgroundColor: '#6F97C6',
    height: 10,
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  noticeButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  noticeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: '#6F97C6',
  },
  noticeButton2: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: '#FFD600',

  }

});

export default WaitingScreen;
