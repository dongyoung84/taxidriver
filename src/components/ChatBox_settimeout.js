import { NavigationContext, NavigationRouteContext, useIsFocused } from '@react-navigation/native';
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
import { CAPABILITY_PLAY_FROM_ID } from 'react-native-track-player';
import Tts from 'react-native-tts';
import SocketIOClient from 'socket.io-client'

let interval;
const ChatBox = ({ navigation, setModalVisible, modalVisible }) => {

  useEffect(() => {
    //console.log('enter')

    const socket = SocketIOClient('http://155.230.24.126:9999');
    socket && socket.emit('aaaa', 'ding')
    socket && socket.on('receive', (data) => {
      console.log('connection ok')
      console.log(data)
    })

  }, [])


  const mentions = [
    '8시에 경북대 행사가 마감해요.',
    '지금 반월당에 콜 수가 많네요.',
    '수성아트피아에서 지금 막 공연을 마쳤어요.',
    '동대구역에 콜 수가 많아요.',
    '김광석거리에 가보세요. 사람이 많아요.',
    '광장코아에 콜수가 많아요.',
    '범어역근처 콜수가 많아요.',
    '곧 인터불고호텔에서 행사가 마쳐요',
    '수성호텔앞에 손님이 많아요',
    '신세계백화점 건너편으로 가보세요'
  ]
  const [mention, setMention] = useState('')
  const [randNum, setRandNum] = useState(0)
  const [mentionStart, setMentionStart] = useState(true)

  const animationMove = new Animated.Value(Dimensions.get('window').width)
  const animationStylesMove = {
    transform: [
      { translateX: animationMove }
    ]
  };
  useEffect(() => {
    if (mention) {
      Animated.timing(
        animationMove,
        {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }
      ).start()
    }
  }, [mention])

  const getRandNum = () => {
    let rand = Math.floor(Math.random() * 10)
    return rand
  }

  // useEffect(() => {
  //    interval = setInterval(() => {
  //     var temp = getRandNum()
  //     setMention(mentions[temp])
  //   }, 8000)
  // }, [mentionStart])
  //   useEffect(() => {
  //     interval = setTimeout(() => {
  //      var temp = getRandNum()
  //      setMention(mentions[temp])
  //    }, 4000)
  //  }, [mentionStart])

  //  const makeMention=()=>{
  //     var temp = getRandNum()
  //     setMention(mentions[temp])
  //  }
  const makeMention = () => {
      setTimeout(() => {
        var temp = getRandNum()
        setMention(mentions[temp])
        console.log('mentionStart',mentionStart)
        if(mentionStart){
          console.log('1111111111')
          makeMention();
        }
        
      }, 4000)
  }

  useEffect(()=>{
     console.log('mentionStart',mentionStart)

    makeMention(mentionStart)
    
  },[])

    //if (!mentionStart) { clearInterval(interval) }
    // console.log(NavigationRouteContext._currentValue.name)
    // if(NavigationRouteContext._currentValue.name !='Waiting'){ clearInterval(interval)}
    //스크린떠나면 끄기
    let isFocused = useIsFocused()
    if (!isFocused) { clearInterval(interval) }

    useEffect(() => {
      Tts.speak(mention, {
        androidParams: {
          KEY_PARAM_PAN: 0.6,
          KEY_PARAM_VOLUME: 0.9,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      })
    }, [mention])
    // useEffect(()=>{
    //   setMention(mentions[getRandNum()])
    //   console.log('aaa')
    // },[])


    //}, []);

    //setMention(mentions[randNum])
    // console.log(mention)

    // Tts.speak(temp, {
    //   androidParams: {
    //     KEY_PARAM_PAN: 0.6,
    //     KEY_PARAM_VOLUME: 0.9,
    //     KEY_PARAM_STREAM: 'STREAM_MUSIC',
    //   },
    // })
    //   useEffect(() => {


    //},[])
    return (
      <>
        <View style={styles.container}>
          <Animated.View style={[styles.chatContainer, animationStylesMove]}>
            <Text style={styles.chatText}>{mention}</Text>
          </Animated.View>

          <View style={{ flexDirection: 'row' }}>

            <View style={{ borderWidth: 1, borderColor: '#222', height: 150, flex: 1 }} onTouchStart={() => { console.log(modalVisible); setModalVisible(!modalVisible) }}>
              <Text></Text>
            </View>
            {mentionStart ? (
              <TouchableOpacity style={[styles.noticeButton]} onPress={() => setMentionStart(!mentionStart)}>
                <Text style={{ color: '#fff', fontSize: 11 }}>알림끄기</Text>
              </TouchableOpacity>
            ) : (
                <TouchableOpacity style={[styles.noticeButton2]} onPress={() => setMentionStart(!mentionStart)}>
                  <Text style={{ color: '#222', fontSize: 11 }}>알림켜기</Text>
                </TouchableOpacity>
              )}
          </View>
        </View>
      </>
    );
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      flex: 1,
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
    chatText: {
      fontSize: 20,


    },
    noticeButton: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      width: 50,
      height: 50,
      backgroundColor: '#6F97C6',
      elevation: 3,
      position: 'absolute',
      bottom: 5,
      right: 5,

    },
    noticeButton2: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      width: 50,
      height: 50,
      backgroundColor: '#FFD600',
      elevation: 3,
      position: 'absolute',
      bottom: 5,
      right: 5,
    }

  });

  export default ChatBox;
