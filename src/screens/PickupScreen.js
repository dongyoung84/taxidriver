import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContext, NavigationRouteContext,   useFocusEffect,   useIsFocused } from '@react-navigation/native';

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
import Header from '../components/Header'
// import { useImmer } from "use-immer";
// import SystemSetting from 'react-native-system-setting'
// import { showMessage, hideMessage } from "react-native-flash-message";

// import Voice from '@react-native-community/voice';


const randNum = () => {
  let rand = Math.random()
  return rand
}

// useFocusEffect(()=>{
//   React.useCallback(()=>{

//   });
// });

const PickupScreen = ({navigation}) => {
//   const [text, setText] = useImmer({ value: '초기화' });
//   const [volume, setVolume] = useState('')
//   const [pitch, setPitch] = useState('');
//   const [error, setError] = useState('');
//   const [end, setEnd] = useState('');
//   const [started, setStarted] = useState(false);
//   const [results, setResults] = useState([]);
//   const [partialResults, setPartialResults] = useState([]);
//   console.log(text)

//   SystemSetting.setVolume(0, { type: 'system' });
//   SystemSetting.setVolume(0, { type: 'alarm' });

//   SystemSetting.getVolume('system').then((volume) => {
//     setVolume(volume)
//     //console.log('Current volume is ' + volume);
//   });
  

//   useEffect(() => {
//     //Setting callbacks for the process status
//     Voice.onSpeechStart = onSpeechStart;
//     Voice.onSpeechEnd = onSpeechEnd;
//     Voice.onSpeechError = onSpeechError;
//     Voice.onSpeechResults = onSpeechResults;
//     Voice.onSpeechPartialResults = onSpeechPartialResults;
//     Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
//     startRecognizing()

//     return () => {
//       //destroy the process after switching the screen
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   const onSpeechStart = (e) => {
//     //Invoked when .start() is called without error
//     console.log('onSpeechStart: ', e);
//     setStarted(true);
//   };

//   const onSpeechEnd = (e) => {
//     //Invoked when SpeechRecognizer stops recognition
//     console.log('onSpeechEnd: ', e);

//   };

//   const onSpeechError = (e) => {
//     //Invoked when an error occurs.
//     console.log('onSpeechError: ', e);
//     // showMessage({
//     //     message: JSON.stringify(e.error),
//     //     type: "default",
//     //     backgroundColor: "#ddd", // background color
//     //     color: "#333", // text color
//     // });
//     console.log(JSON.stringify(e.error))
//     if (e.error.message.toLowerCase().indexOf('match') != -1)
// {    setStarted(false);

//     setTimeout(()=>{
//       startRecognizing();
//     },200)
//     setError(JSON.stringify(e.error));
//   }else{
//     Voice.stop();
//   }
//   };

//   const onSpeechResults = (e) => {
//     //Invoked when SpeechRecognizer is finished recognizing
//     console.log('onSpeechResults: ', e);

//     showMessage({
//       message: e.value[0],
//       type: "default",
//       backgroundColor: "#97B5D1", // background color
//       color: "#333", // text color
//       position:'top',
//       floating:true,
//       elevation: 5,
//     });

//     setText(draft => {
//       draft.value = e.value[0];
//     })
//     startRecognizing();
//   };

//   const onSpeechPartialResults = (e) => {
//     //Invoked when any results are computed
//     console.log('onSpeechPartialResults: ', e);
//     setPartialResults(e.value);
//   };

//   const onSpeechVolumeChanged = (e) => {
//     //Invoked when pitch that is recognized changed
//     // console.log('onSpeechVolumeChanged: ', e);
//     // setPitch(e.value);
//   };

//   const startRecognizing = async () => {
//     //Starts listening for speech for a specific locale
//     try {
//       // let speechToTextData = await SpeechToText.startSpeech('Try saying something', 'ko-KR');
//       // console.log('speechToTextData: ', speechToTextData)

//       // setText(draft => {
//       //   draft.value = '';
//       // })
//       await Voice.start('ko-KR');
//     } catch (e) {
//       //eslint-disable-next-line
//       console.error(e);
//     }
//   };

//   const stopRecognizing = async (e) => {
//     //Stops listening for speech
//     try {
//       await Voice.stop();
//       // await Voice.stop();
//       setStarted(false);
//       setText(draft => {
//         draft.value = '';
//       })
//     } catch (e) {
//       //eslint-disable-next-line
//       console.error(e);
//     }
//   };
//   const cancelRecognizing = async () => {
//     //Cancels the speech recognition
//     try {
//       await Voice.cancel();
//     } catch (e) {
//       //eslint-disable-next-line
//       console.error(e);
//     }
//   };

//   const destroyRecognizer = async () => {
//     //Destroys the current SpeechRecognizer instance
//     try {
//       await Voice.destroy();
//       setPitch('');
//       setError('');
//       setStarted('');
//       setResults([]);
//       setPartialResults([]);
//       setEnd('');
//     } catch (e) {
//       //eslint-disable-next-line
//       console.error(e);
//     }
//   };

//   useEffect(()=>{
//     console.log('aaaaaaaaa')
//     if (text.value.indexOf('안녕하세요') != -1 || text.value.indexOf('어서 오세요') != -1 || text.value.indexOf('어디로') != -1) {
//       console.log('bbbbbbbbb',text.value)
//       navigation.navigate('Voice',{navigation:navigation})
//     }
//   },[text.value])

//   //떠나면 끄기
//   let isFocused = useIsFocused()

//   useEffect(()=>{
//     if(!isFocused){console.log('aaaaaaaaaaaaaaaaaa');destroyRecognizer()}
//   },[isFocused])
  return (
    <>

      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
      <Header/>
      <View style={styles.top}>
      <Text style={{ fontWeight: 'bold', color: '#FFD600', fontSize: 30 }}>경북대학교 정문</Text>
      <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20 }}>에 손님이 있습니다.</Text>

      </View>
        <View style={styles.bottom}>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.distanceOderButton} onPress={()=> navigation.navigate('Navi',{destination:'경북대',navigation:navigation, refferrer:'Pickup'})}>
              <Image style={styles.icon} source={require('../../assets/location.png')} />
              <Text style={styles.buttonText}>길 안내</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callOderButton}>
              <Image style={styles.icon} source={require('../../assets/call.png')} />
              <Text style={styles.buttonText}>전화걸기</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.callStopButton} onPress={(e) => navigation.navigate('Voice',{navigation:navigation})}>
            <Image style={styles.icon} source={require('../../assets/check.png')} />
            <Text style={styles.buttonText}>탑승완료</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
  },

  bottom: {
    backgroundColor: '#222',
    flex: 1,
    padding: 10,
    alignItems:'center',
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
    backgroundColor: '#6F97C6',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    borderRadius: 25,
    alignSelf:'stretch'
  },
  distanceOderButton: {
    backgroundColor: '#407BBF',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
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
    marginRight: 20,
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


});

export default PickupScreen;
