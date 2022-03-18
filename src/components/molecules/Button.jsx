import { Button as Btn } from 'react-native-paper';
import {StyleSheet} from "react-native";

const Button=(props)=>{
    return <Btn style={styles.btn} {...props}
        mode='contained'
        color="#0b283f"
    >{props.title}</Btn>
}

const styles = StyleSheet.create({
    btn:{
        marginBottom:10,
        width:'100%',
        marginTop:5
    },
});

export default Button