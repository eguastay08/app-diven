import {Text, View} from "react-native";
import TextInput from "../molecules/TextInput";
import {useEffect, useState} from "react";

const ShortAnswer=({label,cod_question,onChange,required})=>{
    const [value, setValue] = useState();
    const [error, setError] = useState(false);
    useEffect(() => {
       setValue('')
    }, [cod_question]);

    useEffect(() => {
        onChange(cod_question,value)
        setError(false)
        if(value==''&&required){
            setError(true)
        }
    }, [value]);


    return  <>
        <Text style={label}>
            {label}
        </Text>
        <TextInput
        mode='outlined'
        value={value}
        onChangeText={v=>setValue(v)}
        error={error}
    /></>
}

export default ShortAnswer