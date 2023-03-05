import {useEffect, useState} from "react";
import styles from './styles'
import {TextInput as TI} from "react-native-paper";
import TextInput from "../../components/molecules/TextInput";
import Button from "../../components/molecules/Button";
import config from '../../../config'
import Axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, ToastAndroid, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen=({navigation})=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const API_URL=  config.API_URL

    const handlePress=()=>{
        if(showPassword)
            setShowPassword(false)
        else
            setShowPassword(true)
    }

    const handleOnPressLogin=()=>{
        setError(false)
        setDisabled(true)
        const data = {
            "email":email,
            "password":password
        }

        Axios.post(`${API_URL}/api/v1/auth/login`, data)
            .then(async  r => {
                    const user = JSON.stringify(r.data.data.user)
                    const token=JSON.stringify(r.data.data.access_token)
                    await AsyncStorage.setItem('@data-user', user)
                    await AsyncStorage.setItem('@access-token', token)
                    navigation.replace('loading')
            })
            .catch(er => {
                setDisabled(false)
                setError(true)
            })
    }

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId:config.EXPO_CLIENT_ID,
        iosClientId: config.IOS_CLIENT_ID,
        androidClientId: config.ANDROID_CLIENT_ID,
    });

    useEffect(() => {
        if(response)
            if(response.type==='success'){
                Axios.get(`${API_URL}/auth/google/callback?accessToken=${response.authentication.accessToken}`, {
                    headers: {
                        Accept: "application/json"
                    },
                })
                    .then(async (r) => {
                        const user = JSON.stringify(r.data.data.user)
                        const token=JSON.stringify(r.data.data.access_token)
                        await AsyncStorage.setItem('@data-user', user)
                        await AsyncStorage.setItem('@access-token', token)
                        navigation.replace('loading')
                    })
                    .catch((err) => {
                        setDisabled(false)
                        ToastAndroid.show('Error al Iniciar Sesión', ToastAndroid.SHORT);
                    });

            }else{
                setDisabled(false)
                ToastAndroid.show('Error al Iniciar Sesión', ToastAndroid.SHORT);
            }
    }, [response]);


    return (
        <View style={styles.container}>
            <View style={styles.cform}>
                <Text style={styles.title}>Iniciar Sesión</Text>
                <TextInput
                    label="Correo Electronico"
                    value={email}
                    onChangeText={email => setEmail(email)}
                    mode='outlined'
                    error={error}
                    disabled={disabled}
                />
                <TextInput
                    label="Contraseña"
                    value={password}
                    onChangeText={password => setPassword(password)}
                    secureTextEntry={!showPassword}
                    right={showPassword?<TI.Icon onPress={handlePress} name="eye-off" />:<TI.Icon onPress={handlePress} name="eye" />}
                    mode='outlined'
                    error={error}
                    disabled={disabled}
                />
                { error?<Text style={styles.error}>Usuario o Contraseña Incorrectos</Text>:<></>}
                <Button
                    title={disabled?"Ingresando":"Ingresar"}
                    loading={disabled}
                    onPress={handleOnPressLogin}
                    disabled={disabled}
                />
                <Button
                    title="Correo Institucional"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                    disabled={disabled}
                    icon="google"
                    onPress={()=>{setDisabled(true); promptAsync()}}
                />
            </View>
            <View style={styles.footer}>
                <Text>Copyright © 2022</Text>
                <Text>Vicerrectorado de Investigación y Vinculación| UEB</Text>
            </View>
            <StatusBar style='auto' />
        </View>
    );
}
export default LoginScreen