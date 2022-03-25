import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker'
import {useEffect, useState} from "react";

const Dropdown=({question,options,cod_question,onChange})=>{

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems([])
        options.map((e,i)=>{
            setItems(oldArray => [...oldArray, {label: e.option, value: e.cod_option,disabled: false}])
        })
    }, [options]);

    useEffect(() => {
        onChange(cod_question,value)
    }, [value]);

    return<SafeAreaView style={styles.dropdown}>
        <Text style={styles.title}>
            {question}
        </Text>
        <View style={{flexDirection: 'row',zIndex:1000}}>

            <DropDownPicker
                placeholder="Seleccionar..."
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                listMode="MODAL"
                searchable={true}
                scrollViewProps={{
                    nestedScrollEnabled: true,}}
            />

        </View>
    </SafeAreaView>
}
/*
*
*
* */
const styles = StyleSheet.create({
    dropdown:{
        marginBottom:10,
    },
    title:{
        fontWeight:'bold',
        fontSize:15,
    }
})

export default Dropdown