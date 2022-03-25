import {StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card:{
        marginLeft: 20,
        marginRight:20,
        marginBottom:10,
        borderColor:'#5f6368',
        borderStyle:'solid',
        borderWidth:1,
        display:'flex',
        flexDirection:'column',
        borderRadius:5,
        padding:5,
    },
    title:{
      textAlign:'center',
      fontWeight:'bold',
    },
    subtitle:{
        fontWeight:'bold',
    },
    csubtitle:{
        display:'flex',
    },
    body:{
        display: 'flex',
        flexDirection:'column',
        marginLeft:10
    }


})

export default styles;