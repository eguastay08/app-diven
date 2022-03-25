import {RefreshControl, ScrollView, Text, View} from "react-native";
import {connect} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {getProjects, getSurveys} from "../../redux/actionCreators";
import store from "../../redux/store";
import Card from "./Card";

const ProjectsScreen=(props)=>{
    const {projects}=props
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        store.dispatch(getProjects())
    }, []);

    useEffect(() => {
        store.dispatch(getProjects())
    }, []);

    useEffect(() => {
        return () => store.dispatch(getProjects(null))
    }, []);

    useEffect(() => {
        setRefreshing(false)
    }, [projects]);

    return(
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {
                Array.isArray(projects.projects)?projects.projects.map((e, i) => {
                    return<Card key={i} {...e}/>
                }):null
            }
        </ScrollView>
    )
}

const mapStateToProps = (state) => ({
    projects:state.ProjectsState
})

export default connect(mapStateToProps, {})(ProjectsScreen)