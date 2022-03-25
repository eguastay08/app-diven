import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from "react";
import TextInput from "./TextInput";
import { TextInput as TI } from 'react-native-paper';
import {View} from "react-native";

const MDate= ({label,onChangeText,cod_question})=>{
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        onChangeText(cod_question,selectedDate.toISOString().split('T')[0])
    };

    const showDatepicker = () => {
        setShow(true);
    };


    return (
        <View>
            <TextInput
                label={label}
                mode='outlined'
                value={date.toISOString().split('T')[0]}
                right={<TI.Icon  onPress={showDatepicker} name="calendar" />}
            />
            {show && (
                <DateTimePicker
                    value={date}
                    mode='date'
                    onChange={onChange}
                />
            )}
        </View>
    );

}

export default MDate