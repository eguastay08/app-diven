import {StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import CheckBox from "./CheckBox";

const CheckboxGroup=({options,question,cod_question,onChange})=>{
    const [values, setValues] = useState([]);

    useEffect(() => {
        onChange(cod_question,values)
    }, [values]);

    return <View>
        <Text style={styles.title}>
            {question}
        </Text>
                {options.map((e,i)=>{
                    return <View key={i} style={styles.radio}>
                        <CheckBox cod_question={e.cod_question} values={values} setValues={setValues} value={e.cod_option}/>
                        <Text>{e.option}</Text>
                    </View>
                })
                }
        </View>
}

const styles = StyleSheet.create({
    radio:{
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
        marginBottom:10,
    },
    title:{
        fontWeight:'bold',
        fontSize:15
    }
})

export default CheckboxGroup