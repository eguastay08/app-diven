import {Alert, Image, ScrollView, Text, ToastAndroid, View} from "react-native";
import styles from "./styles";
import {StatusBar} from "expo-status-bar";
import logo from '../../../assets/logo.png'
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "./Card";
import {useNavigation} from "@react-navigation/native";
import {postAnswer} from "../../redux/actionCreators";
import {connect} from "react-redux";
import config from "../../../config";
import Axios from "axios";
const API_URL=config.API_URL


const HomeScreen=({postanswer,postAnswer})=>{
    const [name, setName] = useState()
    const [syn, setSyn] = useState(0);
    const navigation=useNavigation()
    const [synTxt, setSynTxt] = useState(false);
    const [totanswers, setTotAnswers] = useState(0);
    const [token, setToken] = useState();

    useEffect(async () => {
        const token= await AsyncStorage.getItem('@access-token')
        setToken(JSON.parse(token).token)
        const data=await AsyncStorage.getItem('@data-user')
        const user =JSON.parse(data)
        setName(`${user.name} ${user.lastname}`)
        const resp = await AsyncStorage.getItem('@responses')
        const tot = JSON.parse(resp)
        if(Array.isArray(tot))
            setTotAnswers(tot.length)
    }, []);

    useEffect(() => {
        navigation.addListener('focus', async () => {
            const resp = await AsyncStorage.getItem('@responses')
            const tot = JSON.parse(resp)
            if(Array.isArray(tot)) {
                setTotAnswers(tot.length)
                setSyn(0)
            }else {
                setTotAnswers(0)
                setSyn(0)
            }
        });
    }, [navigation]);

    const logout=async ()=>{
        await AsyncStorage.clear()
        navigation.navigate('loading')
    }

    const logoutModal=()=>{
        Alert.alert('Salir', '¿Está seguro de cerrar sesión?', [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            { text: 'OK', onPress: () =>logout()},
        ]);
    }

    useEffect(() => {
        if(postanswer?.error){
            postAnswer(null,null)
        }else if(postanswer?.postanswer?.code===201){

            postAnswer(null,null)
        }
    }, [postanswer]);

    
    const syncup= async ()=>{
        setSynTxt(true)
        const resp = await AsyncStorage.getItem('@responses')
        if(resp!==null){
            const answ=JSON.parse(resp)

         const promises=answ.map( async (e)=>{
               return await Axios.post(`${API_URL}/api/v1/surveys/${e.cod_survey}/answers`,e, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((resp) => {
                       return {
                           error:false,
                           status:resp.status,
                       }
                    })
                    .catch(err => {
                        return {
                            error:true,
                            status:err.response.status,
                            data:e
                        }
                    });
            })
            const  results= await Promise.all(promises)
            const anw =Array()
            results.map(e=>{
                if(!e.error||e.error.e===406){
                    setSyn((syn)=>{return syn+1})
                }else{
                    anw.push(e.data)
                }
            })
            if(anw.length===0){
                await AsyncStorage.removeItem('@responses')
            }else{
                await AsyncStorage.setItem('@responses',JSON.stringify(anw))
            }
            setSynTxt(false)
        }else{
            setSynTxt(false)
            ToastAndroid.show('Nada que Sincronizar', ToastAndroid.SHORT)
        }
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.logo}>
                <Image
                    style={styles.img}
                    source={logo}
                />
            </View>
            <View style={styles.welcome}>
                <Text style={styles.tw}>Bienvenido</Text>
                <Text style={styles.tn}>{name}</Text>
            </View>
            <View style={styles.btns}>
                <Card
                    title="Proyectos"
                    onPress={()=>{navigation.navigate('projects')}}
                    icon='folder'
                />
                <Card
                    title="Encuestas Descargadas"
                    onPress={()=>{navigation.navigate('download')}}
                    icon='download'
                />
                <Card
                    title={synTxt?"Sincronizando"+` ${syn} de ${totanswers}`:"Sincronizar"+` ${syn} de ${totanswers}`}
                    icon='refresh'
                    onPress={syncup}
                    disabled={synTxt}
                />
                <Card
                    title="Salir"
                    onPress={logoutModal}
                    icon='power-off'
                />
            </View>
            <StatusBar style='auto' translucent={false}  />
        </ScrollView>
    )
}

const mapStateToProps = (state) => ({
    postanswer:state.PostAnswerState
})

const mapDispatchProps={
    postAnswer
}

export default connect(mapStateToProps, mapDispatchProps)(HomeScreen)