import {RadioButton as RB} from "react-native-paper";
import {StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";

const RadioButton=({options,question,onChange,cod_question})=>{
    const [value, setValue] = useState('');

    useEffect(() => {
        onChange(cod_question,value)
    }, [value]);

    return <View>
        <Text style={styles.title}>
            {question}
        </Text>
            <RB.Group onValueChange={newValue => setValue(newValue)} value={value}>
                {options.map((e,i)=>{
                    return <View key={i} style={styles.radio}>
                        <RB
                            theme={{colors: {primary: '#0b283f', accent: '#0b283f',}}}
                            value={e.cod_option}/>
                        <Text>{e.option}</Text>
                    </View>
                })
                }
            </RB.Group>
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

export default RadioButton