import DateTimePicker from '@react-native-community/datetimepicker';
import {View} from "react-native";
import {useState} from "react";
import TextInput from "./TextInput";
import { TextInput as TI } from 'react-native-paper';

const Time= ({label,cod_question,onChangeText})=>{
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        onChangeText(cod_question, date.getHours() + ':' + date.getMinutes())
    };

    const showMode = () => {
        setShow(true);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    return (
        <View>
            <TextInput
                label={label}
                mode='outlined'
                value={ date.getHours() + ':' + date.getMinutes() }
                right={<TI.Icon  onPress={showDatepicker} name="clock" />}
            />
            {show && (
                <DateTimePicker
                    value={date}
                    mode='time'
                    onChange={onChange}
                />
            )}
        </View>
    );

}

export default Time