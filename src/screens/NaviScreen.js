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
import { WebView } from 'react-native-webview'

const randNum = () => {
  let rand = Math.random()
  return rand
}
import {Linking, Platform} from 'react-native';
import SendIntentAndroid from 'react-native-send-intent'

const NaviScreen = ({route, navigation}) => {
  //var SendIntentAndroid = require("react-native-send-intent");
  console.log(route.params)
  let uri={}
  uri = {uri:'https://pro.neoali.com:9111/06_kakao_navi/navi.php?query='+route.params.destination}


  const onShouldStartLoadWithRequest = (event) => {
    if (
        event.url.startsWith('http://') ||
        event.url.startsWith('https://') ||
        event.url.startsWith('about:blank')
      ) {
        return true;
      }
    //에러뜬후 screen 이동
    else{
      if(route.params.refferrer=='Pickup'){
        navigation.navigate('Pickup', navigation)
        console.log('11111111111111')
      }
      else{
        navigation.navigate('Waiting', navigation)
      }
       
    }
      if (Platform.OS === 'android') {
        setTimeout(()=>{

          SendIntentAndroid.openAppWithUri(event.url)
          .then(isOpened => {
            if (!isOpened) {
              alert('앱 실행에 실패했습니다');
            }
          })
          .catch(err => {
            console.log(err);
          });
        },0)
        return false
//return false
          
      } else {
        Linking.openURL(event.url).catch(err => {
          alert(
            '앱 실행에 실패했습니다. 설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.',
          );
        });
        return false;
      }
  };
  return (
    <>

      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
      {/* <WebView source={{ uri: 'https://pro.neoali.com:9111/06_kakao_navi/test.html' }} /> */}
      <WebView
      
    bounces={false}
    originWhitelist={['*']}
    allowFileAccess={true}
    domStorageEnabled={true}
    javaScriptEnabled={true}
    geolocationEnabled={true}
    saveFormDataDisabled={true}
    allowFileAccessFromFileURLS={true}
    allowUniversalAccessFromFileURLs={true}
    onShouldStartLoadWithRequest={event => {
      return onShouldStartLoadWithRequest(event);
    }}
    source={uri}
  />
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
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottom: {
    backgroundColor: '#222',
    flex: 1,
    padding: 10,
    alignItems:'center',
    justifyContent: 'center',
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
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    borderRadius: 30,
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
    borderRadius: 30,
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
    borderRadius: 30,
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

export default NaviScreen;
