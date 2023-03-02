import {Button, Image, StyleSheet, Text, ToastAndroid} from 'react-native';
import { TextInput as TI } from 'react-native-paper';
import React, {useEffect, useState} from "react";
import * as ImagePicker from "expo-image-picker";
import config from "../../../config";
import axios from "axios";
import {verifyToken} from "../../redux/actionCreators";

function TextInputImg(props){
    const [selectedImage, setSelectedImage] = useState(null);
    const [value, setData] = useState({ data: null, img: null });
    const {onChangeText,cod_question}=props
    const API_URL=  config.API_URL
    const openImagePickerAsync = async () => {
        const token = await verifyToken()
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.canceled === true) {
            return;
        }
        const apiUrl = `${API_URL}/api/v1/image`;
        const formData = new FormData();
        formData.append('file', {
            uri: pickerResult.assets[0].uri,
            type: 'image/jpeg',
            name: 'image.jpg',
        });

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const responseJson = await response.json();
            setSelectedImage(pickerResult.assets[0].uri);
            setData({ ...value, img: responseJson?.data?.id_file })
        }catch (e){
            ToastAndroid.show('Ocurrió un error al subir el archivo!', ToastAndroid.SHORT);
        }
    };

    useEffect(() => {
        onChangeText(cod_question,value)
    }, [value]);

    const onChange=(val)=>{
        setData({ ...value, data: val })
    }

    return <>
        <Text style={styles.label}>
            {props.label}
        </Text>
        <TI
            onChangeText={(val)=>onChange(val)}
            mode='outlined'
            theme={{ colors: { primary: '#0b283f',underlineColor:'transparent',}}
            }
            label="Respuesta"
            style={styles.input}
        />
        {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />}
        <Button title="Seleccionar Imagen" onPress={openImagePickerAsync} />
    </>
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

export default TextInputImg