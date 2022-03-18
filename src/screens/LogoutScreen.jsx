import {View} from "react-native";
import Button from "../components/molecules/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState} from "react";
import Loading from "../components/Loading";
import LoadingScreen from "./LoadingScreen";
import {useNavigation} from "@react-navigation/native";

const LogoutScreen=({navigation})=>{
    const [session, setSession] = useState(true);

    const logout=async ()=>{
        await AsyncStorage.removeItem('@data-user')
        await AsyncStorage.removeItem('@access-token')
        setSession(false)
        navigation.replace('loading')
    }

  return <View>
      <Button
          title="Salir"
          onPress={logout}
      />
    </View>
}

export default LogoutScreen