import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Text, TextInput, TouchableOpacity, View, Image, Button } from "react-native";
import { styles } from '../styles/regularExaminationStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {addCalendarItem} from '../root/actions'

export default function RegularScheduledReviews(props) {
    const dispatch = useDispatch()
    const [isClose, setIsClose] = useState(false)
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);
    const [showDate, setShowDate] = useState(false);
    let [cabinet, setCabinet] = useState('')
    let [address, setAddress] = useState('')
    let [doctorName, setDoctorName] = useState('')

    useEffect(()=>{
        if(props.saveItemList){
            let normalizeDateString = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`
            let result = {date: normalizeDateString, cabinet, doctorName, address, time: time.toLocaleTimeString().slice(0, 5), name: doctorName, position: props.doctor, procedure: "Плановий огляд" }
            dispatch(addCalendarItem(result))
            props.closeItemsSelection()
        }
    },[props.saveItemList])

    function cabinetHandler(e){
        setCabinet(e.target.value)
    }
    function addressHandler(e){
        setAddress(e.target.value)
    }
    function doctorNameHandler(e){
        setDoctorName(e.target.value)
    }
    function isCloseHandler(){
        setIsClose(true)
    }
    const showMode = currentMode => {
        setShow(true)
    }
    function showDateMode() {
        setShowDate(true)
    }
    function onChangeDate(event, selectedDate) {
        const currentDate = selectedDate;
        setShowDate(false);
        setDate(currentDate);
    }
    function onChange(event, selectedTime) {
        const currentTime = selectedTime;
        setShow(false);
        setTime(currentTime);
    }
    return (
        !isClose ?
        <View style={styles.container}>
            <View style={styles.position}>
                <Text style={styles.positionText}>{props.doctor}</Text>
            </View>
            <View style={styles.timeDayCont}>
                <View styles={styles.timeCont}>
                    <TouchableOpacity style={styles.timeCont} onPress={showDateMode}>
                        <Image resizeMode='contain' style={styles.clockImage} source={require('../assets/images/iconsClock.png')}></Image>
                        <Text style={styles.timeText}>{time.toLocaleTimeString().slice(0, 5)}</Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            value={time}
                            minimumDate={Date.parse(new Date())}
                            display='default'
                            mode="time"
                            onChange={onChange}
                        />
                    )}
                </View>
                <View style={styles.dateCont}>
                    <TouchableOpacity style={styles.timeCont} onPress={showMode}>
                        <Image resizeMode='contain' style={styles.calendarImage} source={require('../assets/images/calendar.png')}></Image>
                        <Text style={styles.timeText}>{time.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    {showDate && (
                        <DateTimePicker
                            value={date}
                            minimumDate={Date.parse(new Date())}
                            display='default'
                            mode="calendar"
                            onChange={onChangeDate}
                        />
                    )}
                </View>
            </View>
            <View style={styles.procedure}>
                <TextInput style={styles.input}
                    value={"Плановий огляд"} />
            </View>
            <View style={styles.cabinet}>
                <TextInput style={styles.input}
                    onChange={cabinetHandler}
                    value={cabinet}
                    placeholder={"Кабінет"} />
            </View>
            <View style={styles.address}>
                <TextInput style={styles.input}
                    onChange={addressHandler}
                    value={address}
                    placeholder={"Адреса"} />
            </View>
            <View style={styles.doctor}>
                <TextInput style={styles.input}
                    onChange={doctorNameHandler}
                    value={doctorName}
                    placeholder={"Прізвище ім'я"} />
            </View>
            <View style={styles.btnDeleteCont}>
                <Button onPress={()=> { isCloseHandler() }} title={"Видалити"}>Видалити</Button>
            </View>
        </View>
        : <></>
    )
}