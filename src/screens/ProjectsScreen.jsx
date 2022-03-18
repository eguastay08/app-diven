import {Text, View} from "react-native";
import Button from "../components/molecules/Button";
import {useNavigation} from "@react-navigation/native";

const ProjectsScreen=()=>{
    const navigation=useNavigation()

    return(
        <View>
            <Button
                title="Ingresar"
                onPress={()=>navigation.navigate("surveys")}
            />
        </View>
    )
}

export default ProjectsScreen