import {Text, TouchableOpacity, View} from "react-native";
import styles from './styles'
import {useNavigation} from "@react-navigation/native";

const Card=(props)=>{
    const navigation=useNavigation()

    const {name, resolution,cod_project,detail,dpa} =props
    return<TouchableOpacity style={styles.card} onPress={()=>navigation.navigate("surveys",{id:cod_project})}>
        <Text style={styles.title}>
            {name}
        </Text>
        <View style={styles.body}>
            <View style={styles.csubtitle}><Text style={styles.subtitle}>Resolución:</Text><Text>{resolution}</Text></View>
            <View style={styles.csubtitle}><Text style={styles.subtitle}>Detalle:</Text><Text>{detail}</Text></View>
            <View style={styles.csubtitle}><Text style={styles.subtitle}>Ubicación:</Text><Text>{dpa}</Text></View>
        </View>
    </TouchableOpacity>
}

export default Card