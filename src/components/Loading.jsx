import {useEffect, useState} from "react";
import LoadingScreen from "../screens/LoadingScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "axios";
import config from "../../config";
import {ToastAndroid} from "react-native";

import * as Location from "expo-location";

export default function Loading({math,navigation}){
    const [location, setLocation] = useState(false);
    const API_URL=  config.API_URL

    useEffect(async () => {
        if(location){
            let token = await AsyncStorage.getItem('@access-token')
            if(token){
                token=JSON.parse(token).token;
                Axios.get(`${API_URL}/api/v1/me`,{
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(async  r => {
                        await AsyncStorage.removeItem('@data-user')
                        await AsyncStorage.setItem('@data-user', JSON.stringify(r.data.data))
                        navigation.replace('private')
                    })
                    .catch( async er => {
                        if(er.toJSON().message === 'Network Error'){
                            ToastAndroid.show('Sin Conexión', ToastAndroid.SHORT)
                            navigation.replace('private')
                        }else{
                            await AsyncStorage.removeItem('@access-token')
                            navigation.replace('public')
                        }
                    })
            }else{
                navigation.replace('public')
            }
        }
    }, [location]);


    useEffect(  ()=>{
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                let loc = await Location.getCurrentPositionAsync({});
                if(loc.coords.latitude&&loc.coords.longitude){
                    setLocation(true)
                }
            } catch (e) {
                ToastAndroid.show('Error al obtener su ubicación', ToastAndroid.SHORT)
            }
        })();

    })

    return (
       <LoadingScreen/>
    );
}