import {StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        position: 'relative',
    },
    logo:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    img:{
        width:200,
        height:150,
        margin:5
    },
    welcome:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:25,
    },
    tw:{
       fontSize:35,
       fontWeight:'bold'
    },
    tn:{
        fontSize: 25,
        textAlign:'center'
    },
    btns:{
        marginTop:25,
        width: 'auto',
    }
})

export default styles