import LoginScreen from "../screens/Login/LoginScreen";
import {createStackNavigator} from "@react-navigation/stack";

const Stack=createStackNavigator();

export default function NavigationPublic(){
    return(
                <Stack.Screen
                    name="login"
                    component={LoginScreen}
                    options={{
                        headerShown:false
                    }}
                />
    )
}
