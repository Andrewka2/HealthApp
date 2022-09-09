import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable, Image, ImageBackground, ScrollView, Button, Modal, Alert, TouchableHighlight } from "react-native";
import { styles } from '../styles/regularExaminationStyles';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function RegularScheduledReviews(props) {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(`${new Date().getHours()}:${new Date().getMinutes}`)
   
    console.log(typeof time)
    const [show, setShow] = useState(false);

    const showMode = currentMode => {
        setShow(true);
    };
    function onChange(event, selectedDate) {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    }
    return (
        <View style={styles.container}>
            <View style={styles.position}>
                <Text style={styles.positionText}>{props.doctor}</Text>
            </View>
            <View styles={styles.timeCont}>
                <TouchableOpacity style={styles.timeCont} onPress={showMode}>
                    <Image resizeMode='contain' style={styles.clockImage} source={require('../assets/images/iconsClock.png')}></Image>
                    <Text style={styles.timeText}>{date.toLocaleTimeString().slice(0, 5)}</Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        value={date}
                        minimumDate={Date.parse(new Date())}
                        display='default'
                        mode="time"
                        onChange={onChange}
                    />
                )}
            </View>
            <View style={styles.procedure}>
                <TextInput style={styles.input}
                  value={"Плановий огляд"}/>
            </View>
            <View style={styles.cabinet}>
            <TextInput style={styles.input}
                  value={""}
                  placeholder={"Кабінет"}/>
            </View>
            <View style={styles.address}>
            <TextInput style={styles.input}
                  value={""}
                  placeholder={"Адреса"}/>
            </View>
            <View style={styles.doctor}>
            <TextInput style={styles.input}
                  value={""}
                  placeholder={"Прізвище ім'я"}/>
            </View>
        </View>
    )
}