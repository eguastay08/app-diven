import {ScrollView, Text, ToastAndroid, View} from "react-native";
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import store from "../../redux/store";
import {getSurvey, postAnswer} from "../../redux/actionCreators";
import Section from "./Section";
import Question from "./Question";
import styles from "./styles";
import Button from "../../components/molecules/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import {ProgressBar} from "react-native-paper";

const SurveyScreen=(props)=>{
    const {survey}=props
    const [section, setSection] = useState(0);
    const [id] = useState(props.route.params.id);
    const [offline] = useState(props.route.params.offline);
    const [submit, setSubmit] = useState(false);
    const [submitTxt, setSubmitTxt] = useState('');
    const [answers, setAnswers] = useState([]);
    const [surveyData, setSurveyData] = useState(survey);
    const [coords, setCoords] = useState(null);
    const [progress, setProgress] = useState(0);

    const{postanswer}=props

    useEffect(() => {
        return () => store.dispatch(getSurvey())
    }, []);

    useEffect(() => {
        setSurveyData(survey)
    }, [survey]);


    useEffect(async () => {
        if (!offline){
            store.dispatch(getSurvey(id))
            setAnswers([])
        }else{
            const surveys = await AsyncStorage.getItem('@surveys')
            const data=JSON.parse(surveys)
            if(Array.isArray(data)){
                data.map((e)=>{
                    if(e.survey?.cod_survey===id){
                        setSurveyData(e)
                    }
                })
            }
        }
    }, [id]);

    useEffect(() => {
        try{
            if(section+1===surveyData.survey.sections.length){
                setSubmitTxt("Guardar")
            }else{
                setSubmitTxt("Siguiente")
            }
            if(surveyData?.survey){
                const tot=surveyData.survey.sections.length
                const prog=(section+1)/tot;
                setProgress(prog)
            }
        }catch (e){

        }
    }, [section,surveyData]);


    const handleOnPress= async ()=>{
        let error=false;
        answers.map((e)=>{
            if(e.required&&(e.answer===''||Array.isArray(e.answer)&&e.answer.length===0)){
                error=true
                console.log(JSON.stringify(e))
                ToastAndroid.show('Cuestionario Incompleto', ToastAndroid.SHORT)
            }
        })

        if(!error){
            if(surveyData.survey.sections.length-1!==section){
                setSection(section+1)
            }else{
                    setSubmit(true)
                    try {
                        await Location.requestForegroundPermissionsAsync();
                        let location = await Location.getCurrentPositionAsync({});
                        setCoords(location.coords)
                    }catch (e) {
                        ToastAndroid.show('No se puede obtener ubicación', ToastAndroid.SHORT)
                        setSubmit(false)
                        setSubmitTxt('Guardar')
                    }
            }
        }
    }


    useEffect(() => {
       if(coords!==null){
           const data={
               "cod_survey":id,
               "location":{
                   "latitude":coords.latitude,
                   "longitude":coords.longitude
               },
               "answers":answers
           }
           if(!offline){
               props.postAnswer(id,data)
           }else{
               try{
                   (async () => {
                       const resp = await AsyncStorage.getItem('@responses')
                       if(resp===null){
                           const d=Array();
                           d.push(data)
                           await AsyncStorage.setItem('@responses', JSON.stringify(d))
                       }else{
                           const d=JSON.parse(resp)
                           d.push(data)
                           await AsyncStorage.setItem('@responses', JSON.stringify(d))
                       }
                       ToastAndroid.show('Listo para sincronizar', ToastAndroid.SHORT)
                       props.navigation.goBack();
                   })();
               }catch (e) {
                   ToastAndroid.show('Error al Guardar', ToastAndroid.SHORT)
                   setSubmitTxt("Guardar")
                   setSubmit(false)
               }
               setCoords(null)
           }
       }
    }, [coords]);


    useEffect(() => {
        if(postanswer?.error){
            ToastAndroid.show('Error al Guardar', ToastAndroid.SHORT)
            setSubmit(false)
            props.postAnswer(null,null)
            setSubmitTxt("Guardar")
        }else if(postanswer?.postanswer?.code===201){
            ToastAndroid.show('Se guardó con éxito', ToastAndroid.SHORT)
            props.postAnswer(null,null)
            props.navigation.replace('surveys',{id:props.route.params.cod_project})
        }
    }, [postanswer]);


    return(<><ProgressBar progress={progress} color='#0b283f' />
        <ScrollView nestedScrollEnabled={true} style={{height:'auto',display:'flex'}}>
            <View>
                {surveyData.survey?
                    <>
                        <Section
                            name={surveyData.survey.sections[section].name}
                            detail={surveyData.survey.sections[section].detail}
                        />
                        <View style={styles.content}>
                            {surveyData.survey.sections[section].questions.map((e,i)=>{
                              return <Question  value='' answers={answers} setAnswers={setAnswers} id={i+1} key={i} {...e}/>
                            })}
                        </View>
                        <View style={styles.footer}>
                            <Text>{`${section+1} de ${surveyData.survey.sections.length}`}</Text>
                            <Button
                                style={styles.btn}
                                title={submitTxt}
                                loading={submit}
                                onPress={handleOnPress}
                            />
                        </View>
                    </>
                    :null
                }
            </View>
        </ScrollView></>
    )
}

const mapStateToProps = (state) => ({
    survey:state.SurveyState,
    postanswer:state.PostAnswerState
})

const mapDispatchProps={
    postAnswer
}

export default connect(mapStateToProps, mapDispatchProps)(SurveyScreen)