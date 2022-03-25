import { Checkbox } from 'react-native-paper';
import {useState} from "react";

const CheckBox=({value,values,setValues,cod_question})=>{
    const [checked, setChecked] = useState(false)

    const handlePress=()=>{
        setChecked(!checked);
        if(!checked){
            const val={
                'cod_question':cod_question,
                'value':value
            }
            setValues(oldArray => [...oldArray, val]);
        }else {
            const aux=values;
            setValues([])
            aux.map((e)=>{
                if(e.value!==value){
                    const val={
                        'cod_question':e.cod_question,
                        'value':e.value
                    }
                    setValues(oldArray => [...oldArray, val]);
                }
            })
        }
    }

    return <Checkbox
        theme={{colors: {primary: '#0b283f', accent: '#0b283f',}}}
        status={checked ? 'checked' : 'unchecked'}
        onPress={handlePress}
    />

}

export default CheckBox