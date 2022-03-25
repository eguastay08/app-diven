import {GET_PROJECTS, GET_SURVEY, GET_SURVEYS, POST_ANSWER} from "./actions";

export const getProjects=(state={}, action)=>{
    if(action.type===GET_PROJECTS){
        if(action.error===true){
            return{
                error:true,
                errors:action.errors
            }
        }else if(action.clean===true){
            return {}
        }
        return {
            error:false,
            projects:action.projects
        }
    }
    return state
}

export const getSurveys=(state={}, action)=>{
    if(action.type===GET_SURVEYS){
        if(action.error===true){
            return{
                error:true,
                errors:action.errors
            }
        }else if(action.clean===true){
            return {}
        }
        return {
            error:false,
            surveys:action.surveys
        }
    }
    return state
}

export const getSurvey=(state={}, action)=>{
    if(action.type===GET_SURVEY){
        if(action.error===true){
            return{
                error:true,
                errors:action.errors
            }
        }else if(action.clean===true){
            return {}
        }
        return {
            error:false,
            survey:action.survey
        }
    }
    return state
}

export const postAnswer=(state={}, action)=>{
    if(action.type===POST_ANSWER){
        if(action.error===true){
            return{
                error:true,
                errors:action.errors
            }
        }else if(action.clean===true){
            return {}
        }
        return {
            error:false,
            postanswer:action.postanswer
        }
    }
    return state
}