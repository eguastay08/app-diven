import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import ProjectsScreen from "../screens/ProjectsScreen";
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import {createStackNavigator} from "@react-navigation/stack";
import SurveysScreen from "../screens/SurveysScreen";
import LogoutScreen from "../screens/LogoutScreen";
import {StatusBar} from "expo-status-bar";

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
        </ProjectStackNavigator.Navigator>
    )
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
                    headerShown:false,
                    tabBarBadge:50
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
                name="exit"
                component={LogoutScreen}
                options={{
                    tabBarLabel:'Salir',
                    tabBarIcon:({color,size})=>(
                        <Ionicons name="exit" size={size} color={color} />
                    )
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