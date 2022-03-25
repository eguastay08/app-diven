import {Text, View} from "react-native";
import styles from "./styles";

const Section=(props)=>{
    const {name,detail}=props
    return <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{detail}</Text>
    </View>
}

export default Section