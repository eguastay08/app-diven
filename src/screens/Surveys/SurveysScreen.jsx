import {RefreshControl, ScrollView} from "react-native";
import {useCallback, useEffect, useState} from "react";
import {connect} from "react-redux";
import store from "../../redux/store";
import {getSurveys} from "../../redux/actionCreators";
import Card from "./Card";

const SurveysScreen=(props)=>{
    const [id] = useState(props.route.params.id);
    const {surveys}=props

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        store.dispatch(getSurveys(id))
    }, []);

    useEffect(() => {
        store.dispatch(getSurveys(id))
    }, [id]);

    useEffect(() => {
        return () => store.dispatch(getSurveys())
    }, []);

    useEffect(()=>{
        setRefreshing(false)
    },[surveys])

    return(
        <ScrollView
             refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {Array.isArray(surveys.surveys)?surveys.surveys.map((e,i)=>{
                return <Card cod_project={id} offline={false} key={i} {...e}/>
            }):null}
        </ScrollView>
    )
}

const mapStateToProps = (state) => ({
    surveys:state.SurveysState
})

export default connect(mapStateToProps, {})(SurveysScreen)