import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import ProjectsScreen from "../screens/Projects/ProjectsScreen";
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import {createStackNavigator} from "@react-navigation/stack";
import SurveysScreen from "../screens/Surveys/SurveysScreen";
import SurveyScreen from "../screens/Survey/SurveyScreen";
import SurveyDownload from "../screens/Surveys/SurveyDownload";

const Tab=createBottomTabNavigator()
const ProjectStackNavigator=createStackNavigator();

const ProjectStack=()=>{
    return(
        <ProjectStackNavigator.Navigator
            initialRouteName="ProjectsScreen"
        >
            <ProjectStackNavigator.Screen
                name="ProjectsScreen"
                component={ProjectsScreen}
                options={{
                    headerTitle:'Proyectos'
                }}
            />
            <ProjectStackNavigator.Screen
                name="surveys"
                component={SurveysScreen}
                options={{
                    headerTitle:'Encuestas'
                }}
            />
            <ProjectStackNavigator.Screen
                name="survey"
                component={SurveyScreen}
                options={{
                    headerTitle:'Encuesta'
                }}
            />
        </ProjectStackNavigator.Navigator>
    )
}

const SurveysDownloadStack=()=>{
    return (<ProjectStackNavigator.Navigator
        initialRouteName="ProjectsScreen"
    >
        <ProjectStackNavigator.Screen
            name="downloadedsurveys"
            component={SurveyDownload}
            options={{
                headerTitle:'Encuestas Descargadas'
            }}
        />
        <ProjectStackNavigator.Screen
            name="survey"
            component={SurveyScreen}
            options={{
                headerTitle:'Encuesta'
            }}
        />

    </ProjectStackNavigator.Navigator>)
}

const Tabs=()=>{
    return(
        <Tab.Navigator
            initialRouteName="home"
            screenOptions={{
                tabBarActiveTintColor: '#0b283f'
            }}
        >
            <Tab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    tabBarLabel:'Inicio',
                    tabBarIcon:({color,size})=>(
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                    headerShown:false
                }}

            />
            <Tab.Screen
                name="projects"
                component={ProjectStack}
                options={{
                    tabBarLabel:'Proyectos',
                    tabBarIcon:({color,size})=>(
                        <FontAwesome name="folder" size={size} color={color} />
                    ),
                    headerShown:false
                }}
            />
            <Tab.Screen
                name="download"
                component={SurveysDownloadStack}
                options={{
                    tabBarLabel:'Descargas',
                    tabBarIcon:({color,size})=>(
                        <FontAwesome name="download" size={size} color={color} />
                    ),
                    headerShown:false
                }}
            />
        </Tab.Navigator>
    )
}

export default function NavigationPrivate(){
    return(
            <Tabs/>
    )
}