import {Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {useNavigation} from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import {connect} from "react-redux";
import store from "../../redux/store";
import {getSurvey} from "../../redux/actionCreators";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Card=(props)=>{
    const {name,cod_project,tot,date_init,date_finally,status,detail,max_answers,cod_survey,survey,offline,handleTrash} =props
    const [download, setDownload] = useState(false);
    const [showDownload, setShowDownload] = useState(true);
    const [responses, setResponses] = useState(0);
    const navigation=useNavigation()

    let dt = new Date(date_init)
    const di=dt.toLocaleString()
    dt = new Date(date_finally)
    const df=dt.toLocaleString()

    const handleDownload=()=>{
        store.dispatch(getSurvey(cod_survey))
        setDownload(true)
    }

    useEffect(async () => {
        setDownload(false)
        if(download){
            setShowDownload(false)
            let surveys = await AsyncStorage.getItem('@surveys')
            if(surveys===null){
                const data=[survey]
                await AsyncStorage.setItem('@surveys', JSON.stringify(data))
                ToastAndroid.show('Se descargo', ToastAndroid.SHORT)
            }else{
                const data=JSON.parse(surveys)
                data.push(survey)
                await AsyncStorage.setItem('@surveys', JSON.stringify(data))
                ToastAndroid.show('Se descargo', ToastAndroid.SHORT)
            }
        }
    }, [survey]);

    useEffect(async () => {
        const surveys = await AsyncStorage.getItem('@surveys')
        const data=JSON.parse(surveys)
        if(Array.isArray(data)){
            data.map((e)=>{
                if(e.survey.cod_survey===cod_survey){
                    setShowDownload(false)
                }
            })
        }
    }, []);

    useEffect(() => {
        navigation.addListener('focus', async () => {
            const answers = await AsyncStorage.getItem('@responses')
            const ans=JSON.parse(answers)
            if(Array.isArray(ans)){
                setResponses(0)
                ans.map((e)=>{
                    if(e.cod_survey===cod_survey){
                        setResponses((responses)=>{return responses+1})
                    }
                })
            }
        });
    }, [navigation]);


    return<TouchableOpacity  style={styles.card} onPress={()=>navigation.navigate("survey",{id:cod_survey,offline:offline,cod_project:cod_project})}>
        <View style={styles.header}>
            <Text style={styles.title}>
                {name}
            </Text>
            {showDownload? <FontAwesome onPress={handleDownload} style={styles.btn} name="download" size={24} color="#0b283f" />:
               offline?<FontAwesome onPress={()=>handleTrash(cod_survey)} style={styles.btn} name="trash" size={24} color="#0b283f" />:null
            }
        </View>
        <View style={styles.body}>
            <View style={styles.csubtitle}><Text style={styles.subtitle}>Fecha Inicio:</Text><Text> {di}</Text></View>
            <View style={styles.csubtitle}><Text style={styles.subtitle}>Fecha Fin:</Text><Text>{df}</Text></View>
            <View style={styles.csubtitle}><Text style={styles.subtitle}>Estado:</Text><Text>{status?'Producción':'Diseño'}</Text></View>
            <View style={styles.csubtitle}><Text style={styles.subtitle}>Respuestas:</Text><Text>{tot?`${tot} de ${max_answers}`:max_answers}</Text></View>
            {offline?<View style={styles.csubtitle}><Text style={styles.subtitle}>Pendiente por Sincronizar:</Text><Text>{responses}</Text></View>:null}
            <View style={styles.csubtitle}><Text style={styles.subtitle}>Detalle:</Text><Text>{detail}</Text></View>
        </View>
    </TouchableOpacity>
}

const mapStateToProps = (state) => ({
    survey:state.SurveyState
})

export default connect(mapStateToProps, {})(Card)
