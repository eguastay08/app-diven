import Axios from "axios";
import {GET_PROJECTS, GET_SURVEY, GET_SURVEYS, POST_ANSWER} from "./actions";
import config from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";


const API_URL=config.API_URL

export const verifyToken = async  () => {
    const token= await AsyncStorage.getItem('@access-token')
    if (!token) {
        await AsyncStorage.removeItem('@data-user')
        await AsyncStorage.removeItem('@access-token')
    } else {
        return JSON.parse(token).token;
    }
};

export const getProjects = () => async (dispatch) => {
    const token = await verifyToken()
    Axios.get(`${API_URL}/api/v1/projects`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((resp) => {
            return dispatch({
                type: GET_PROJECTS,
                projects: resp.data.data
            });
        })
        .catch((err) => {
            return dispatch({
                type: GET_PROJECTS,
                error:true,
                errors:{
                    status:err.response.status,
                    err
                }
            })
        });
};

export const getSurveys = (id=null) => async (dispatch) => {

    if(id===null){
        return dispatch({
            type: GET_SURVEYS,
            clean: true,
        });
    }else {
        const token = await verifyToken()
        Axios.get(`${API_URL}/api/v1/projects/${id}/surveys`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((resp) => {

                return dispatch({
                    type: GET_SURVEYS,
                    surveys: resp.data.data,
                });
            })
            .catch((err) => {
                return dispatch({
                    type: GET_SURVEYS,
                    error:true,
                    errors:{
                        status:err.response.status,
                        err
                    }
                })
            });
    }
};

export const getSurvey = (id=null) =>async (dispatch) => {
    if(id===null){
        return dispatch({
            type: GET_SURVEY,
            clean: true,
        });
    }else {
        const token = await verifyToken()
        Axios.get(`${API_URL}/api/v1/surveys/${id}`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((resp) => {
                return dispatch({
                    type: GET_SURVEY,
                    survey: resp.data.data,
                });
            })
            .catch((err) => {
                return dispatch({
                    type: GET_SURVEY,
                    error:true,
                    errors:{
                        status:err.response.status,
                        err
                    }
                })
            });
    }
};

export const postAnswer = (id,dat = null) => async (dispatch) => {
    if (dat === null) {
        return dispatch({
            type: POST_ANSWER,
            clean: true,
        });
    } else {
        const token = await verifyToken()
        Axios.post(`${API_URL}/api/v1/surveys/${id}/answers`,dat, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((resp) => {
                return dispatch({
                    type: POST_ANSWER,
                    postanswer: resp.data,
                });
            })
            .catch((err) => {
                return dispatch({
                    type: POST_ANSWER,
                    error:true,
                    errors:{
                        status:err.response.status,
                        error:err.response.data
                    }
                });
            });
    }
};