import {useEffect, useState} from "react";
import LoadingScreen from "../screens/LoadingScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Loading({math,navigation}){
    const [session, setSession] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(async ()=>{
        const token = await AsyncStorage.getItem('@access-token')
        if(token){
            setSession(true)
            setLoading(false)
            navigation.replace('private')
        }else{
            setLoading(false)
            navigation.replace('public')
        }
    },[])
    return (
       <LoadingScreen/>
    );
}