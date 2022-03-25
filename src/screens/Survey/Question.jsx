import {View} from "react-native";
import styles from "./styles";
import TextInput from "../../components/molecules/TextInput";
import RadioButton from "../../components/molecules/RadioButton";
import CheckboxGroup from "../../components/molecules/CheckboxGroup";
import Dropdown from "../../components/molecules/Dropdown";
import MDate from "../../components/molecules/MDate";
import Time from "../../components/molecules/Time";
import {useEffect} from "react";
import ShortAnswer from "../../components/Questions/ShortAnswer";


const Question=(props)=>{
    const {question, type, required,options, id,setAnswers,cod_question,answers}=props

    useEffect( () => {
        const answer={'answer':'','cod_question':cod_question, 'type':type,'required':required}
        setAnswers(oldArray => [...oldArray, answer]);
    }, [cod_question]);

    const handleSave=(cod_question,ans)=>{
        answers.map((e,i)=>{
            if(e.cod_question===cod_question){
                e.answer=ans
            }
        })
    }

    return <View style={styles.question} >
        {type==='short_answer'?<View>
               <ShortAnswer
                   cod_question={cod_question}
                   label={`${question} ${required?'*':''}`}
                   onChange={handleSave}
                   required={required}
               />
            </View>:
            type==='numerical'?<View>
            <TextInput
                label={`${question} ${required?'*':''}`}
                mode='outlined'
                numeric
                keyboardType={'numeric'}
                onChangeText={(ans)=>{handleSave(cod_question,ans)}}
            />
        </View>:
                type==='long_text'?<View>
                <TextInput
                    label={`${question} ${required?'*':''}`}
                    mode='outlined'
                    onChangeText={(ans)=>{handleSave(cod_question,ans)}}
                />
            </View>:
            type==='multiple_choice'?<View>
                <RadioButton
                    cod_question={cod_question}
                    question={`${question} ${required?'*':''}`}
                    options={options}
                    onChange={handleSave}
                />
            </View>:
                type==='checkboxes'?<View>
                <CheckboxGroup
                    cod_question={cod_question}
                    question={`${question} ${required?'*':''}`}
                    options={options}
                    onChange={handleSave}
                />
            </View>
                    :type==='dropdown'?<View>
                    <Dropdown
                        cod_question={cod_question}
                        question={`${question} ${required?'*':''}`}
                        options={options}
                        onChange={handleSave}
                    />
                </View>:
                        type==='date'?<View>
                        <MDate
                            cod_question={cod_question}
                            label={`${question} ${required?'*':''}`}
                            onChangeText={handleSave}
                        />
                    </View>:
                            type==='time'?<View>
                                <Time
                                    cod_question={cod_question}
                                    label={`${question} ${required?'*':''}`}
                                    onChangeText={handleSave}
                                />
                            </View>:null
        }
    </View>
}
export default Question