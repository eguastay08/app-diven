import {StyleSheet, Text} from 'react-native';
import { TextInput as TI } from 'react-native-paper';

function TextInput(props){
    return <>
        <Text style={styles.label}>
            {props.label}
        </Text>
        <TI
            {...props}
        mode='outlined'
        theme={{ colors: { primary: '#0b283f',underlineColor:'transparent',}}
        }
        label="Respuesta"
        style={styles.input}
    /></>
}

const styles = StyleSheet.create({
    input:{
        marginBottom:10,
        height:50,
        width:'100%'
    },
    label:{
        fontWeight:'bold',
        fontSize:15
    }
});

export default TextInput