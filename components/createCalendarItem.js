import { StyleSheet, Text, TouchableOpacity, TextInput, View, Pressable, Image, ImageBackground, ScrollView, Button, Modal, Alert, TouchableHighlight } from "react-native";
import { itemStyles } from '../styles/addCalendarItemStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Formik } from 'formik';
import { useDispatch } from "react-redux";
import {addCalendarItem} from '../root/actions/index'

export default function CreateCalendarItem(props) {
    const dispatch = useDispatch()
    const [timeEditor, setTime] = useState(new Date())
    const [show, setShow] = useState(false)

    const showMode = currentMode => {
        setShow(true);
    }

    function saveItem(itemData){
        let resultData = {...itemData}
        resultData.time = timeEditor.toLocaleTimeString().slice(0, 5);
        resultData['date'] = props.date;
        dispatch(addCalendarItem(resultData))
    }
    
    function onChange(event, selectedTime) {
        const currentTime = selectedTime;
        setShow(false);
        setTime(currentTime);
    }

    return (
        <View style={itemStyles.cont}>
            <Modal animationType="none"
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    props.openHandler();
                }}>
                <View style={itemStyles.centeredView}>
                    <View style={itemStyles.modalView}>
                        <View style={itemStyles.itemTitle}>
                            <Text style={itemStyles.modalText}>Створення</Text>
                            <Pressable onPress={() => props.openHandler()} style={itemStyles.close}>
                                <Image style={itemStyles.closeImg} source={require('../assets/images/close.png')} />
                            </Pressable>
                        </View>
                        <View style={itemStyles.changeItemCont}>
                            <TouchableOpacity style={itemStyles.timeCont} onPress={showMode}>
                                <Image resizeMode='contain' style={itemStyles.clockImage} source={require('../assets/images/iconsClock.png')}></Image>
                                <Text
                                    style={itemStyles.timeText}
                                    onChangeText={''}
                                    value={timeEditor}
                                >{timeEditor.toLocaleTimeString().slice(0, 5)}</Text>
                            </TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    value={timeEditor}
                                    minimumDate={Date.parse(new Date())}
                                    display='default'
                                    mode="time"
                                    onChange={onChange}
                                />
                            )}
                        </View>
                        <Formik
                            style={itemStyles.formikCont}
                            initialValues={{
                                name: '',
                                cabinet: '',
                                procedure: '',
                                address: '',
                            }}
                            onSubmit={values => saveItem(values)}>
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <View>
                                    <View style={itemStyles.changeItemCont}>
                                        <Text style={itemStyles.changeItemText}>ім'я</Text>
                                        <TextInput
                                            style={itemStyles.input}
                                            onChangeText={handleChange('name')}
                                            onBlur={handleBlur('name')}
                                            value={values.email}
                                        />
                                    </View>
                                    <View style={itemStyles.changeItemCont}>
                                        <Text style={itemStyles.changeItemText}>кабінет</Text>
                                        <TextInput
                                            style={itemStyles.input}
                                            onBlur={handleBlur('cabinet')}
                                            onChangeText={handleChange('cabinet')}
                                            value={values.cabinet}
                                        />
                                    </View>
                                    <View style={itemStyles.changeItemCont}>
                                        <Text style={itemStyles.changeItemText}>процедура</Text>
                                        <TextInput
                                            style={itemStyles.input}
                                            onBlur={handleBlur('procedure')}
                                            onChangeText={handleChange('procedure')}
                                            value={values.procedure}
                                        />
                                    </View>
                                    <View style={itemStyles.changeItemCont}>
                                        <Text style={itemStyles.changeItemText}>адреса</Text>
                                        <TextInput
                                            style={itemStyles.input}
                                            onBlur={handleBlur('address')}
                                            onChangeText={handleChange('address')}
                                            value={values.address}
                                        />
                                    </View>
                                    <View style={itemStyles.saveBtn}>
                                        <Button onPress={() => { handleSubmit(); props.openHandler() }} title="Зберегти" />
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </Modal>
        </View>
    )
}