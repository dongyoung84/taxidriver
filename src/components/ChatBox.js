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
let socket
let mentions
const ChatBox = ({ navigation, setModalVisible, modalVisible, setModalVisible2, modalVisible2, mentionStart, setMentionStart }) => {
  useEffect(() => {
    //console.log('enter')
    socket = SocketIOClient('http://155.230.24.126:9999');

    socket && socket.on('receive', (data) => {
      console.log('connection ok')
      console.log(data)
    })

  }, [])

  let url = 'https://pro.neoali.com:9111/06_kakao_navi/mention.php'
  let options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
    // body: JSON.stringify({
    //     property_one: value_one,
    //     property_two: value_two
    // })
  };
  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        mentions = responseData
        //setMentionStart(true)
      })

  }, [mentionStart])


  // const mentions = [
  //   '8시에 경북대 행사가 마감해요.',
  //   '지금 반월당에 콜 수가 많네요.',
  //   '수성아트피아에서 지금 막 공연을 마쳤어요.',
  //   '동대구역에 콜 수가 많아요.',
  //   '김광석거리에 가보세요. 사람이 많아요.',
  //   '광장코아에 콜수가 많아요.',
  //   '범어역근처 콜수가 많아요.',
  //   '곧 인터불고호텔에서 행사가 마쳐요',
  //   '수성호텔앞에 손님이 많아요',
  //   '신세계백화점 건너편으로 가보세요'
  // ]
  const [mention, setMention] = useState('')
  const [randNum, setRandNum] = useState(0)
  const [toggle, setToggle] = useState(false)
  //const [mentionStart, setMentionStart] = useState(true)

  const animationMove = new Animated.Value(Dimensions.get('window').width)
  const animationStylesMove = {
    transform: [
      { translateX: animationMove }
    ]
  };
  useEffect(() => {
    if (mention && mentionStart) {
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
  //   console.log('aaaaaaaaaaaaaaaa')
  //   startInterval()
  // }, [mentionStart])

  const startInterval = () => {
    interval = setInterval(() => {
      var temp = getRandNum()
      mentionStart && setMention(mentions[temp])
    }, 8000)
  }

  //알림끄기
  if (!mentionStart) { clearInterval(interval) }
  let isFocused = useIsFocused()

  //focused 되었을때 실행함.
  useEffect(() => {
    //스크린떠나면 끄기
    if (!isFocused) { clearInterval(interval) }
    else {
      startInterval()
    }

  }, [mentionStart, isFocused])

  // useEffect(()=>{
  // },[isFocused])


  useEffect(() => {
    isFocused && Tts.speak(mention, {
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

          <View style={{ borderWidth: 1, borderColor: '#222', height: 150, flex: 1 }} onTouchStart={() => { setModalVisible(!modalVisible); }}>
            <Text></Text>
          </View>
          <View style={{ borderWidth: 1, borderColor: '#222', height: 150, flex: 1 }} onTouchStart={() => { setModalVisible2(!modalVisible2); }}>
            <Text></Text>
          </View>


          {/* {mentionStart?(
          <TouchableOpacity style={[styles.noticeButton]} onPress={() => setMentionStart(!mentionStart)}>
            <Text style={{color:'#fff', fontSize:11}}>알림끄기</Text>
          </TouchableOpacity>
          ):(
            <TouchableOpacity style={[styles.noticeButton2]} onPress={() => setMentionStart(!mentionStart)}>
            <Text style={{color:'#222', fontSize:11}}>알림켜기</Text>
          </TouchableOpacity>
          )} */}
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


});

export default ChatBox;
