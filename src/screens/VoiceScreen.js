import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContext, NavigationRouteContext, useIsFocused } from '@react-navigation/native';

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
import Voice from '@react-native-community/voice';
import { useImmer } from "use-immer";
import { showMessage, hideMessage } from "react-native-flash-message";
import SystemSetting from 'react-native-system-setting'
import Header from '../components/Header'
import DestinationModal from '../components/DestinationModal'


const VoiceScreen = ({ navigation }) => {
  const [text, setText] = useImmer({ value: '초기화' });``
  const [volume, setVolume] = useState('')
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false)
  const [destination, setDestination] = useState('')
  console.log(text)

  SystemSetting.setVolume(0, { type: 'system' });
  SystemSetting.setVolume(0, { type: 'alarm' });

  SystemSetting.getVolume('system').then((volume) => {
    setVolume(volume)
    //console.log('Current volume is ' + volume);
  });
  //////////////////////////////////////setting variable

  const animationBounce = new Animated.Value(1)
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
          toValue: 1.05,
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
      bounceLoop()
    })
  }

  // useEffect(() => {
  // }, [])
  bounceLoop()


  useEffect(() => {
    //Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
    startRecognizing()

    return () => {
      //destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    setStarted(true);
  };

  const onSpeechEnd = (e) => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);

  };

  const onSpeechError = (e) => {
    //Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    // showMessage({
    //     message: JSON.stringify(e.error),
    //     type: "default",
    //     backgroundColor: "#ddd", // background color
    //     color: "#333", // text color
    // });
    console.log(JSON.stringify(e.error))
    if (e.error.message.toLowerCase().indexOf('match') != -1)
    setStarted(false);
    setTimeout(()=>{
      startRecognizing();
    },200)
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = (e) => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);

    showMessage({
      message: e.value[0],
      type: "default",
      backgroundColor: "#97B5D1", // background color
      color: "#333", // text color
      position:'top',
      floating:true,
      elevation: 5,
    });

    setText(draft => {
      draft.value = e.value[0];
    })
    startRecognizing();
  };

  const onSpeechPartialResults = (e) => {
    //Invoked when any results are computed
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = (e) => {
    //Invoked when pitch that is recognized changed
    // console.log('onSpeechVolumeChanged: ', e);
    // setPitch(e.value);
  };

  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    try {
      // let speechToTextData = await SpeechToText.startSpeech('Try saying something', 'ko-KR');
      // console.log('speechToTextData: ', speechToTextData)

      // setText(draft => {
      //   draft.value = '';
      // })
      await Voice.start('ko-KR');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const stopRecognizing = async (e) => {
    //Stops listening for speech
    try {
      await Voice.cancel();
      // await Voice.stop();
      setStarted(false);
      setText(draft => {
        draft.value = '';
      })
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
  const cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  useEffect(()=>{
    if (text.value.indexOf('반월당') != -1) {
      setModalVisible(true)
      setDestination('반월당')
    }
    else if (text.value.indexOf('광장코아') != -1) {
      setModalVisible(true)
      setDestination('광장코아')
    }
    else if (text.value.indexOf('들안길') != -1) {
      setModalVisible(true)
      setDestination('들안길')
    }
    else if (text.value.indexOf('수성못') != -1) {
      setModalVisible(true)
      setDestination('수성못')
    }
    else if (text.value.indexOf('서울역') != -1) {
      setModalVisible(true)
      setDestination('서울역')
    }
    else if (text.value.indexOf('올림픽공원') != -1) {
      setModalVisible(true)
      setDestination('올림픽공원')
    }
    else if (text.value.indexOf('명동역') != -1) {
      setModalVisible(true)
      setDestination('명동역')
    }
    else if (text.value.indexOf('잠실역') != -1) {
      setModalVisible(true)
      setDestination('잠실역')
    }
    else if (text.value.indexOf('남산타워') != -1) {
      setModalVisible(true)
      setDestination('남산타워')
    }
  },[text.value])

  let isFocused = useIsFocused()

  useEffect(() => {
    //스크린떠나면 끄기
    if (!isFocused) {stopRecognizing()}
    else {
    startRecognizing()    }

  }, [started, isFocused])

  
  return (
    <>

      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        
        <Header/>
        <DestinationModal modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} destination={destination}/>

        <View style={styles.top}>
        <Animated.Image style={[styles.callImage, animationStylesBounce]} source={require('../../assets/voice.png')} />

          <TouchableOpacity onPress={!started ? startRecognizing : stopRecognizing} style={styles.buttonContainer}>
            {started ? <>

              <Text style={styles.callText}>듣고 있어요.</Text>
            </>
              :
              <Text style={styles.callText}>마이크켜기.</Text>}

          </TouchableOpacity>
        </View>
        {/* <View style={{ backgroundColor: '#fff' }}>
          <Text>{volume}</Text>
          <Text>텍스트:{text.value}</Text>
          <Text>에러:{error}</Text>
        </View> */}


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
  middle: {
    backgroundColor: '#222',
    flex: 1,
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
    width: 200,
    height: 200,
  },
  callText: {
    color: '#fff',
    fontSize: 30,
    marginTop: 10,
  },
  callStopButton: {
    backgroundColor: '#407BBF',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
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


});

export default VoiceScreen;
