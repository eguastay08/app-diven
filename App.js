import { StatusBar } from 'expo-status-bar';
import Loading from "./src/components/Loading";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import NavigationPrivate from "./src/navigation/NavigationPrivate";
import LoginScreen from "./src/screens/Login/LoginScreen";
import {Provider} from "react-redux";
import store from "./src/redux/store";

export default function App() {
    const Stack=createStackNavigator();
  return (
      <>
          <Provider store={store}>
              <NavigationContainer>
                  <Stack.Navigator initialRouteName="loading">
                      <Stack.Screen
                          name="loading"
                          component={Loading}
                          options={{headerShown: false}}
                      />
                      <Stack.Screen
                          name="public"
                          component={LoginScreen}
                          options={{headerShown: false}}
                      />
                      <Stack.Screen
                          name="private"
                          component={NavigationPrivate}
                          options={{headerShown: false}}
                      />
                  </Stack.Navigator>
              </NavigationContainer>
          </Provider>
        <StatusBar style='auto' />
    </>
  );
}


