import {RefreshControl, ScrollView, Text, ToastAndroid, View} from "react-native";
import {useCallback, useEffect, useState} from "react";
import Card from "./Card";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SurveyDownload=()=>{
    const [refreshing, setRefreshing] = useState(false);
    const [surveys, setSurveys] = useState([]);


    useEffect(async () => {
        setSurveys([])
        const surveys = await AsyncStorage.getItem('@surveys')
        const data=JSON.parse(surveys)
        setSurveys(data)
        return () => setSurveys([]) ;
    }, []);


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        const surveys = await AsyncStorage.getItem('@surveys')
        const data=JSON.parse(surveys)
        setSurveys(data)
    }, []);

    useEffect(()=>{
        (async () => {
            setRefreshing(false)
            const surveys = await AsyncStorage.getItem('@surveys')
            const data=JSON.parse(surveys)
            setSurveys(data)
        })();
    },[surveys])


    const handleTrash= async (cod_survey)=>{
        const surveys = await AsyncStorage.getItem('@surveys')
        const data=JSON.parse(surveys)

       const newArray=[];
        if(Array.isArray(data)){
            data.map(e=>{
                if(e.survey.cod_survey!==cod_survey){
                    newArray.push(e)
                }
            })

            await AsyncStorage.setItem('@surveys',JSON.stringify(newArray))
            ToastAndroid.show('Se elimino', ToastAndroid.SHORT)
            setSurveys([])
        }
    }

    return (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {Array.isArray(surveys)?surveys.map((e,i)=>{
                return <Card handleTrash={handleTrash} offline={true} key={i} {...e.survey}/>
            }):null}
        </ScrollView>
    )
}

export default SurveyDownload