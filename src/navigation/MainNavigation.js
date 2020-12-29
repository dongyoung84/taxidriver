import React, { useEffect, memo, useState } from 'react';

import { PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from "react-native-flash-message";

import WaitingScreen from '../screens/WaitingScreen';
import PickupScreen from '../screens/PickupScreen';
import NaviScreen from '../screens/NaviScreen';
import VoiceScreen from '../screens/VoiceScreen';



/* 
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import setAuthToken from '../util/setAuthToken.js';
import { LOAD_MY_INFO_REQUEST } from '../actions/types'; */

const Stack = createStackNavigator();

const MainNavigation = () => {
/* 
    const { isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();



    useEffect(() => {

        (async () => {

            let token = await AsyncStorage.getItem('token')
            console.log(token)
            if (token) {
                setAuthToken(token);
                dispatch({
                    type: LOAD_MY_INFO_REQUEST
                });


            }
        })();
    }, [isAuthenticated]); */


    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Waiting"
                headerMode="screen"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Waiting" component={WaitingScreen} />
                <Stack.Screen name="Pickup" component={PickupScreen} />
                <Stack.Screen name="Navi" component={NaviScreen} />
                <Stack.Screen name="Voice" component={VoiceScreen} />

            </Stack.Navigator>
            <FlashMessage position="center" />
        </NavigationContainer>

    );
}



MainNavigation.propTypes = {

};

export default MainNavigation;
