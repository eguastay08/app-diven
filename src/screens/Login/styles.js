import {StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection:'column',
        position:'relative',
        paddingTop:20
    },
    cform:{
        height:'90%',
        padding:25,
    },
    title:{
        textAlign:'center',
        fontWeight:"700",
        fontSize:25,
        marginBottom:'20%'
    },
    error:{
        color: 'red',
        textAlign: 'center',
        fontStyle:'italic',
        paddingBottom:10
    },
    footer:{
        display:'flex',
        alignContent: 'center',
        alignItems: 'center',
        color:'#000',
        opacity:0.65
    }
})

export default styles;