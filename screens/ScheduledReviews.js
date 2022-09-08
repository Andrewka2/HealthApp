import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text,  TextInput, View, Pressable, Image, ImageBackground, ScrollView, Button, Modal } from "react-native";
import { Agenda } from 'react-native-calendars';
import autumn from '../assets/images/autumn.png';
import cardBgSec from '../assets/images/cardBgSec.png';
import { useSelector } from 'react-redux';
import { uploadDefaultCalendarInfo, updateCalendarFields, upldateCalendarInfo, deleteCalendarInfo } from '../root/actions';
import { useEffect } from "react";
import "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { modalStyles } from '../styles/modalStyles';

export default function ScheduledReviews() {

  const defaultCalendar = useSelector((state) => state.defaultCalendar)

  let [ismodalOpen, setModalOpen] = useState(false)
  let [itemChoosed, setItemChoosed] = useState({})
  let [isUpdated, setIsUpdated] = useState(false)
  let [time, setTime] = useState('')
  let [name, setName] = useState('')
  const dispatch = useDispatch()

  function setTimeHandler(e, text){
    setTime(e)
    if(typeof text === 'undefined'){
      setIsUpdated(true)
    }
  }
  function setNameHandler(e, text){
    setName(e)
    if(typeof text === 'undefined'){
      setIsUpdated(true)
    }
  }
 
  function hideModalHandler(){
    setModalOpen(!ismodalOpen)
    if(isUpdated){
      console.log(isUpdated)
      dispatch(upldateCalendarInfo({id: itemChoosed.id, time, name}))
      dispatch(updateCalendarFields({id: itemChoosed.id, date: itemChoosed.date,updatedFields:{ time, name}}))
    }
  }

  function openDeleteHandler(id, time){
    console.log(id)
    console.log(time)
    dispatch((deleteCalendarInfo(id, time)))
  }

  function openModalHandler(item){
    setModalOpen(!ismodalOpen)
    setTimeHandler(item.time, 'default')
    setNameHandler(item.name, 'default')
    setItemChoosed(item)
  }

  useEffect(() => {
    dispatch(uploadDefaultCalendarInfo())
  }, [])

  const renderItem = (item) => {
    return (
      <View style={styles.renderItemContainer}>
        <ImageBackground style={styles.bgImage} source={cardBgSec} resizeMode="cover">
          <View style={styles.itemTextContainer}>
            <View style={styles.editCont}>
              <Button title={"edit"} onPress={() => openModalHandler(item)}>edit</Button>
              <Button title={"delete"} onPress={() => openDeleteHandler(item.id, item.date)}>delete</Button>
            </View>
            {
              <View style={styles.mainTextCont}>
                <Text style={styles.mainText}>Час прийому: {item.time}</Text>
                <Text style={styles.mainText}>Процедура: {item.procedure}</Text>
                <Text style={styles.mainText}>Кабінет: {item.cabinet}</Text>
              </View>
            }
            <View style={styles.emergencyTextCont}>
              <Text style={styles.emergencyText}>Лікарня: {item.emergency}</Text>
              <Text style={styles.emergencyText}>Адреса: {item.address}</Text>
            </View>

            <View style={styles.doctorInfoTextCont}>
              <Text style={styles.doctorInfoText}>Лікар: {item.name}</Text>
              <Text style={styles.doctorInfoText}>Посада: {item.position}</Text>
            </View>

          </View>
        </ImageBackground>
      </View>
    );
  }
  // <Image style={styles.itemImg} source={require('../assets/images/autumn.png')}/>
  // <ImageBackground style={styles.bgImage} source={autumn} resizeMode="cover">  </ImageBackground>
  const ChangeModal = () => {
    return (
      <View>
        <Modal animationType="none"
          style={modalStyles.modalCont}
          transparent={ismodalOpen}
          visible={ismodalOpen}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            hideModalHandler();
          }}>
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Text style={modalStyles.modalText}>Редагування!</Text>
              <View style={modalStyles.changeItemCont}>
                    <Text style={modalStyles.changeItemText}>Час прийому</Text>
                    <TextInput 
                    style={modalStyles.input}
                    onChangeText={setTimeHandler}
                    value={time}
                    />
              </View>
              <View style={modalStyles.changeItemCont}>
              <Text style={modalStyles.changeItemText}>Ім'я</Text>
                    <TextInput 
                    style={modalStyles.input}
                    onChangeText={setNameHandler}
                    value={name}
                    />
              </View>
              <Pressable
                style={[modalStyles.button, modalStyles.buttonClose]}
                onPress={() => hideModalHandler()}
              >
                <Text style={modalStyles.textStyle}>Зберегти</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      <ChangeModal />
      <ImageBackground style={styles.bgImage} source={autumn} resizeMode="cover">
        <View style={styles.header}>
          <Text style={styles.title}>Календар планових відвідувань</Text>
        </View>
      </ImageBackground>
      <View style={styles.formContainer}>
        <Text style={styles.formContainerTitle}>Заповніть необхідну інформацію</Text>
        <Text>+</Text>
      </View>
      <Agenda
        items={defaultCalendar}
        pastScrollRange={50}
        futureScrollRange={50}
        selected={'2022-09-04'}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={false}
        renderItem={renderItem}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  editCont: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 100
  },
  container: {

  },
  header: {
    height: 195
  },
  formContainerTitle: {
    paddingLeft: 20,
    fontSize: 15,
    fontWeight: 500
  },
  formContainer: {
    paddingTop: 30,
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  renderItemContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20
  },
  mainTextCont: {
    paddingBottom: 15
  },
  mainText: {
    fontSize: 18,
    fontWeight: 600,
    padding: 1
  },
  emergencyTextCont: {
    paddingBottom: 5
  },
  emergencyText: {
    fontSize: 15,
    fontWeight: 500,
    color: '#000'
  },
  doctorInfoText: {
    fontSize: 15,
    fontWeight: 500,
    color: '#000'
  },
  bgImage: {
    justifyContent: 'right',
  },
  itemTextContainer: {
    padding: 20,
    position: "relative"
  },
  itemImg: {
    width: 70,
    height: 70,
    resizeMode: 'stretch',
  }
  ,
  itemText: {

  },
  container: {

  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    padding: 30,
    paddingBottom: 0,
    paddingTop: 30,
    width: 270
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});