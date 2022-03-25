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
        width:'100%'
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
    },
    header:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginRight:15,
        marginLeft:15
    },
    btn:{
        marginLeft: 'auto',

    }


})

export default styles;