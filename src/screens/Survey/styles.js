import {StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    content:{
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        padding:10,
        backgroundColor: "#fff",
        borderStyle:'solid',
        borderBottomColor:'#dadce0',
        borderRadius: 8,
    },
    title:{
        color: '#202124',
        fontSize: 32,
        fontWeight:'bold',

    },
    subtitle:{
        color: '#202124',
        fontSize: 14,
        textAlign: 'justify',
    },
    question:{
        borderBottomColor: '#202124'
    },
    questionText:{
        fontWeight:'bold',
    },
    footer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        padding:10,
    },
    btn:{
        marginLeft: 'auto',
    }
})

export default styles