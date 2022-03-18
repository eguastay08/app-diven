import {StyleSheet } from 'react-native';
import { TextInput as TI } from 'react-native-paper';

function TextInput(props){
    return <TI
        mode='outlined'
        theme={{ colors: { primary: '#0b283f',underlineColor:'transparent',}}
        }
        {...props}
        style={styles.input}
    />
}

const styles = StyleSheet.create({
    input:{
        marginBottom:10,
        height:50,
        width:'100%'
    },
});

export default TextInput