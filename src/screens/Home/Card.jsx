import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

const Card=(props)=>{
    const {icon,title,onPress,disabled}= props

    return <TouchableOpacity disabled={disabled} onPress={onPress} >
        <View style={styles.card}>
            <FontAwesome style={styles.icon} name={icon} size={35} color="#0b283f" />
            <View style={styles.ctxt}>
                <Text style={styles.txt}>{title}</Text>
            </View>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    card:{
        height:50,
        marginLeft:10,
        marginRight:10,
        borderRadius:5,
        display:'flex',
        flexDirection:'row',

        alignItems:'center',
        borderColor:'#5f6368',
        borderStyle:'solid',
        borderWidth:1,
        marginBottom:5,
        marginTop:5
    },
    txt:{
        fontWeight:'bold',
        fontSize:18,
        marginLeft: 10,
        color:'#0b283f'
    },
    icon:{
        marginLeft:10
    }
})

export default Card