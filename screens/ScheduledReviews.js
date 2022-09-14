import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View, Pressable, Image, ImageBackground, ScrollView, Button, Modal, FlatList } from "react-native";
import { Agenda } from 'react-native-calendars';
import autumn from '../assets/images/autumn.png';
import { useSelector } from 'react-redux';
import { uploadDefaultCalendarInfo, updateCalendarFields, deleteCalendarInfo } from '../root/actions';
import { useEffect } from "react";
import "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { modalStyles } from '../styles/modalStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import RegularScheduledReviews from '../components/regularPhysicalExamination';
import { defaultSchedule } from '../config/regularSchedule';
import DateTimePicker from '@react-native-community/datetimepicker';
import CreateCalendarItem from '../components/createCalendarItem';
import { Formik } from 'formik';
import { LogBox } from 'react-native';

export default function ScheduledReviews() {

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])

  const defaultCalendar = useSelector((state) => state.defaultCalendar)
  let [ismodalOpen, setModalOpen] = useState(false)
  let [itemChoosed, setItemChoosed] = useState({})
  let [isUpdated, setIsUpdated] = useState(false)
  let [createCalendarItem, setCreateCalendarItem] = useState(false)
  let [dateForCreateItem, setDateForCreateItem] = useState(null)
  let [saveItemList, setSaveItemList] = useState(false)
  let [time, setTime] = useState('')
  let [name, setName] = useState('')
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)

  function saveMultipleItemsHandler() {
    setSaveItemList(true)
  }

  function createCalendarItemHandler(day) {
    setCreateCalendarItem(!createCalendarItem)
    if (typeof day !== 'undefined') {
      let normalize = { ...day }
      let result = normalize.dateString
      setDateForCreateItem(result)
    }
  }

  const [items, setItems] = useState([
    { label: 'Розклад регулярних відвідувань', value: 'Schedule' },
    { label: 'Календар профілактичних щеплень', value: 'Calendar' }
  ]);

  function hideSelect() {
    setValue(null)
  }
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
     // dispatch(upldateCalendarInfo({ id: itemChoosed.id, time, name }))
     // dispatch(updateCalendarFields({ id: itemChoosed.id, date: itemChoosed.date, updatedFields: { time, name } }))
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
        <View style={styles.itemTextContainer}>
          <View style={styles.editCont}>
            <Pressable
              onPress={() => openModalHandler(item)}
            >
              <Image style={styles.editImg} source={require('../assets/images/edit.png')} />
            </Pressable>
          </View>
          {
            <View style={styles.mainTextCont}>
              <Text style={styles.mainText}>{item.procedure}</Text>
              <View style={styles.itemTimeCont}>
                <Image style={styles.clockItemImage} source={require('../assets/images/Itemclock.png')} />
                <Text style={styles.mainTextTime}>{item.time}</Text>
              </View>
              <Text style={styles.mainText}>Кабінет: {item.cabinet}</Text>
            </View>
          }
          <View style={styles.emergencyTextCont}>
            <Image style={styles.clockItemImage} source={require('../assets/images/userLocation.png')} />
            <Text style={styles.emergencyText}>{item.emergency} {item.address}</Text>
          </View>

          <View style={styles.doctorInfoTextCont}>
            <Text style={styles.doctorInfoText}>Лікар: {item.name}</Text>
            <Text style={styles.doctorInfoText}>Посада: {item.position}</Text>
          </View>
        </View>
      </View>
    );
  }

  const ChangeModal = () => {
    const [date, setDate] = useState(new Date(`${itemChoosed.date}T${time}:00`));
    const [timeEditor, setTime] = useState(new Date(`${itemChoosed.date}T${time}:00`));
    const [show, setShow] = useState(false);
    const [showDate, setShowDate] = useState(false);

    const showMode = currentMode => {
      setShow(true)
    }

    function showDateMode() {
      setShowDate(true)
    }

    function onChangeDate(event, selectedDate) {
      console.log(selectedDate)
      setShowDate(false);
      setDate(selectedDate);
    }

    function onChange(event, selectedTime) {
      const currentTime = selectedTime;
      setShow(false);
      setTime(currentTime);
    }

    function upDateItem(values){
      dispatch(updateCalendarFields({ id: itemChoosed.id, date: `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`, updatedFields: {
         time: timeEditor.toLocaleTimeString().slice(0, 5), name: values.name, cabinet: values.cabinet, procedure: values.procedure, address: values.address } }))
    }

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
            <View style={modalStyles.modalView}>
              <View style={modalStyles.titleTextCont}>
                <Text style={modalStyles.modalText}>Редагування</Text>
                <Pressable onPress={() => hideModalHandler()} style={modalStyles.close}>
                  <Image style={modalStyles.closeImg} source={require('../assets/images/close.png')} />
                </Pressable>
              </View>

              <View style={modalStyles.timeDayCont}>
                <View styles={modalStyles.timeCont}>
                    <TouchableOpacity style={modalStyles.timeCont} onPress={showMode}>
                        <Image resizeMode='contain' style={modalStyles.clockImage} source={require('../assets/images/iconsClock.png')}></Image>
                        <Text style={modalStyles.timeText}>{timeEditor.toLocaleTimeString().slice(0, 5)}</Text>
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
                <View style={modalStyles.dateCont}>
                    <TouchableOpacity style={modalStyles.timeCont} onPress={showDateMode}>
                        <Image resizeMode='contain' style={modalStyles.calendarImage} source={require('../assets/images/calendar.png')}></Image>
                        <Text style={modalStyles.timeText}>{date.toLocaleDateString()}</Text>
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
              <Formik
                style={modalStyles.formikCont}
                initialValues={{
                  name: '',
                  cabinet: '',
                  procedure: '',
                  address: '',
                }}
                onSubmit={values => upDateItem(values)}>
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <View>
                    <View style={modalStyles.changeItemCont}>
                      <Text style={modalStyles.changeItemText}>ім'я</Text>
                      <TextInput
                        style={modalStyles.input}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                      />
                    </View>
                    <View style={modalStyles.changeItemCont}>
                      <Text style={modalStyles.changeItemText}>кабінет</Text>
                      <TextInput
                        style={modalStyles.input}
                        onBlur={handleBlur('cabinet')}
                        onChangeText={handleChange('cabinet')}
                        value={values.cabinet}
                      />
                    </View>
                    <View style={modalStyles.changeItemCont}>
                      <Text style={modalStyles.changeItemText}>процедура</Text>
                      <TextInput
                        style={modalStyles.input}
                        onBlur={handleBlur('procedure')}
                        onChangeText={handleChange('procedure')}
                        value={values.procedure}
                      />
                    </View>
                    <View style={modalStyles.changeItemCont}>
                      <Text style={modalStyles.changeItemText}>адреса</Text>
                      <TextInput
                        style={modalStyles.input}
                        onChangeText={handleChange('address')}
                        value={values.address}
                      />
                    </View>
                    <Pressable
                      onPress={() => {openDeleteHandler(itemChoosed.id, itemChoosed.date), hideModalHandler()}}
                      style={modalStyles.deleteCont}
                    >
                      <Image style={styles.deleteImg} source={require('../assets/images/delete.png')} />
                      <Text style={modalStyles.deleteText}>Видалити</Text>
                    </Pressable>
                    <Pressable
                      style={[modalStyles.button, modalStyles.buttonClose]}
                      onPress={() => {handleSubmit(); hideModalHandler()}}
                    >
                      <Text style={modalStyles.textStyle}>Зберегти</Text>
                    </Pressable>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      <ChangeModal />
      {
        createCalendarItem === true ? <CreateCalendarItem openHandler={createCalendarItemHandler} date={dateForCreateItem} /> : null
      }
      <ImageBackground style={styles.bgImage} source={autumn} resizeMode="cover">
        <View style={styles.header}>
          <Text style={styles.title}>Календар планових відвідувань</Text>
        </View>
      </ImageBackground>
      <View style={styles.selectContainer}>
        <DropDownPicker
          placeholder="Оберіть зі списку"
          multiple={false}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      {
        value === 'Schedule' ? <Pressable onPress={() => {
          hideSelect()
        }} style={styles.hideSelectCont}>
          <Text>сховати</Text>
          <Image style={styles.hideImg} source={require('../assets/images/Stroke.png')} />
        </Pressable> : <></>
      }
      {
        value === 'Schedule' ?
          defaultSchedule.map((elem, i) => {
            return <RegularScheduledReviews key={`${elem}-id`} closeItemsSelection={hideSelect} doctor={elem} saveItemList={saveItemList} />
          }) : <></>
      }
      {
        value === 'Schedule' ? <View style={styles.saveScheduleBtn}><Button onPress={ () => {saveMultipleItemsHandler(); hideSelect()}} title={"Зберегти"}>Зберегти</Button></View> : <></>
      }  
    <Agenda
        items={defaultCalendar}
        pastScrollRange={50}
        futureScrollRange={50}
        selected={'2022-09-04'}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={false}
        renderItem={renderItem}
        onDayPress={day => {
          createCalendarItemHandler(day)
        }}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainTextTime: {
    fontSize: 22,
    fontWeight: "900",

  },
  itemTimeCont: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  clockItemImage: {
    width: 35,
    height: 35,
    marginLeft: -5
  },
  hideSelectCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#A8A8A8",
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  },
  hideImg: {
    width: 15,
    height: 15
  },
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
    paddingRight: 18,
    marginBottom: 30
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
    backgroundColor: '#fff'
  },
  header: {
    height: 195,
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
    backgroundColor: "#dfdeff",
    borderRadius: 5,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20
  },
  mainTextCont: {
    paddingBottom: 15,
  },
  mainText: {
    fontSize: 18,
    fontWeight: "900",
    padding: 1,
    color: '#5b4cb0'
  },
  emergencyTextCont: {
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  emergencyText: {
    fontSize: 15,
    fontWeight: "500",
    color: '#000',
    marginLeft: 5
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