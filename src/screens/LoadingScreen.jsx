import {Text, View, StyleSheet, ImageBackground} from "react-native";
import { StatusBar } from 'expo-status-bar';
import splash from "../../assets/splash.png"

const LoadingScreen=()=>{
    return(
        <View  style={styles.container} >
            <ImageBackground source={splash} resizeMode="cover" style={styles.image}>
                <Text style={styles.text}>Estamos Cargando tus datos...</Text>
            </ImageBackground>
            <StatusBar style='auto' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    text: {
        color: 'black',
        lineHeight: 84,
        textAlign:'center',
        fontWeight:'bold',
        fontStyle:'italic'
    },
});


export default LoadingScreen