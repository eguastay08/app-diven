import {applyMiddleware, combineReducers, createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import {
    getProjects as ProjectsState,
    getSurveys as SurveysState,
    getSurvey as SurveyState,
    postAnswer as PostAnswerState,
}from './reducers'

export default createStore(
    combineReducers({
        ProjectsState,
        SurveysState,
        SurveyState,
        PostAnswerState,
    }),
    composeWithDevTools(applyMiddleware(thunk))
)