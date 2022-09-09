import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Image, ImageBackground, ScrollView, Button, Modal, Alert, TouchableHighlight } from "react-native";
import { Agenda } from 'react-native-calendars';
import autumn from '../assets/images/autumn.png';
import cardBgSec from '../assets/images/cardBgSec.png';
import { useSelector } from 'react-redux';
import { uploadDefaultCalendarInfo, updateCalendarFields, upldateCalendarInfo, deleteCalendarInfo } from '../root/actions';
import { useEffect } from "react";
import "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { modalStyles } from '../styles/modalStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import RegularScheduledReviews from '../components/regularPhysicalExamination';
import { defaultSchedule } from '../config/regularSchedule';

export default function ScheduledReviews() {

  const defaultCalendar = useSelector((state) => state.defaultCalendar)
  let [ismodalOpen, setModalOpen] = useState(false)
  let [itemChoosed, setItemChoosed] = useState({})
  let [isUpdated, setIsUpdated] = useState(false)
  let [time, setTime] = useState('')
  let [name, setName] = useState('')
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    {label: 'Розклад регулярних відвідувань', value: 'Schedule'},
    {label: 'Календар профілактичних щеплень', value: 'Calendar'}
  ]);

  function setTimeHandler(e, text) {
    setTime(e)
    if (typeof text === 'undefined') {
      setIsUpdated(true)
    }
  }

  function setNameHandler(e, text) {
    setName(e)
    if (typeof text === 'undefined') {
      setIsUpdated(true)
    }
  }

  function hideModalHandler() {
    setModalOpen(!ismodalOpen)
    if (isUpdated) {
      dispatch(upldateCalendarInfo({ id: itemChoosed.id, time, name }))
      dispatch(updateCalendarFields({ id: itemChoosed.id, date: itemChoosed.date, updatedFields: { time, name } }))
    }
  }

  function openDeleteHandler(id, time) {
    dispatch((deleteCalendarInfo(id, time)))
  }

  function openModalHandler(item) {
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
              <Pressable
              onPress={() => openModalHandler(item)}
              >    
                <Image style={styles.editImg} source={require('../assets/images/edit.png')}/>
              </Pressable>
              
              <Pressable
              onPress={() => openDeleteHandler(item.id, item.date)}
              >    
                <Image style={styles.deleteImg} source={require('../assets/images/delete.png')}/>
              </Pressable>
              
            </View>
            {
              <View style={styles.mainTextCont}>
                <Text style={styles.mainText}>{item.time}</Text>
                <Text style={styles.mainText}>{item.procedure}</Text>
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
            hideModalHandler();
          }}>
          <View style={modalStyles.centeredView}>
          <Pressable onPress={() => hideModalHandler()}  style={modalStyles.close}>
              <Image style={modalStyles.closeImg} source={require('../assets/images/close.png')}/>
            </Pressable>
            <View style={modalStyles.modalView}>
              <Text style={modalStyles.modalText}>Редагування</Text>
              <View style={modalStyles.changeItemCont}>
              <Text style={modalStyles.changeItemText}>час</Text>
                <TextInput
                  style={modalStyles.input}
                  onChangeText={setTimeHandler}
                  value={time}
                />
              </View>
              <View style={modalStyles.changeItemCont}>
                <Text style={modalStyles.changeItemText}>ім'я</Text>
                <TextInput
                  style={modalStyles.input}
                  onChangeText={setNameHandler}
                  value={name}
                />
              </View>
              <View style={modalStyles.changeItemCont}>
                <Text style={modalStyles.changeItemText}>кабінет</Text>
                <TextInput
                  style={modalStyles.input}
                  onChangeText={setNameHandler}
                  value={"322"}
                />
              </View>
              <View style={modalStyles.changeItemCont}>
                <Text style={modalStyles.changeItemText}>процедура</Text>
                <TextInput
                  style={modalStyles.input}
                  onChangeText={setNameHandler}
                  value={"Огляд"}
                />
              </View>
              <View style={modalStyles.changeItemCont}>
                <Text style={modalStyles.changeItemText}>адреса</Text>
                <TextInput
                  style={modalStyles.input}
                  onChangeText={setNameHandler}
                  value={"Десь там"}
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
      <View style={styles.selectContainer}>
      <DropDownPicker
        multiple={false}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      {
        value === 'Schedule' ?
        defaultSchedule.map((elem, i)=>{
          return <RegularScheduledReviews key={`${elem}-id`} doctor={elem}/>
        }) : <></>
      }
      {
        value === 'Schedule' ? <View style={styles.saveScheduleBtn}><Button title={"Зберегти"}>Зберегти</Button></View> : <></>
      }
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
  deleteImg: {
    width: 35,
    height: 35
  },
  editImg: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  saveScheduleBtn: {
    paddingLeft: 20,
    paddingRight: 18
  },
  editCont: {
    position: 'absolute',
    right: 5,
    top: 20,
    zIndex: 100,
    flexDirection: "row",
    alignItems: "center"
  },
  container: {

  },
  header: {
    height: 195
  },
  formContainerTitle: {
    paddingLeft: 20,
    fontSize: 15,
    fontWeight: "500"
  },
  selectContainer: {
    position: 'relative',
    zIndex: 1000,
    paddingTop: 30,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff'
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
    fontWeight: "600",
    padding: 1
  },
  emergencyTextCont: {
    paddingBottom: 5
  },
  emergencyText: {
    fontSize: 15,
    fontWeight: "500",
    color: '#000'
  },
  doctorInfoText: {
    fontSize: 15,
    fontWeight: "500",
    color: '#000'
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