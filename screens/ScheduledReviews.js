import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from "react-native";
import { Agenda } from 'react-native-calendars';
import autumn from '../assets/images/autumn.png';
import cardBgSec from '../assets/images/cardBgSec.png';
export default function ScheduledReviews() {

  let test = {
    "2022-09-04": [{procedure: "Плановий огляд", emergency: "Цеентральна лікарня", address: "вул. Перемоги 21",  name: "Петренко Петро Петрович", time: "10:20", cabinet: "322", position: 'педіатр', height: 110, day: '2022-09-04' },
    { name: 'Item for 2022-09-04 #110', height: 110, day: '2022-09-04' },
    { name: 'Item for 2022-09-04 #1', height: 117, day: '2022-09-04' },
    { name: 'Item for 2022-09-04 #2', height: 113, day: '2022-09-04' }],
    "2022-09-06": [{ name: '', height: 110, day: '2022-09-04' },
    { name: 'Item for 2022-09-04 #110', height: 110, day: '2022-09-04' },
    { name: 'Item for 2022-09-04 #1', height: 117, day: '2022-09-04' },
    { name: 'Item for 2022-09-04 #2', height: 113, day: '2022-09-04' }]
  }

  const renderItem = (item) => {
    return (
      <View style={styles.renderItemContainer}>
        <ImageBackground style={styles.bgImage} source={cardBgSec} resizeMode="cover">  
          <View style={styles.itemTextContainer}>

            <View style={styles.mainTextCont}>
              <Text style={styles.mainText}>Час прийому: {item.time}</Text>
              <Text style={styles.mainText}>Процедура: {item.procedure}</Text>
              <Text style={styles.mainText}>Кабінет: {item.cabinet}</Text>
            </View>

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
  return (
    <View>
      <ImageBackground style={styles.bgImage} source={autumn} resizeMode="cover">
        <Text style={styles.title}>Календар регулярних відвідувань</Text>
      </ImageBackground>
      <Agenda
        items={test}
        pastScrollRange={50}
        futureScrollRange={50}
        selected={'2022-09-04'}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={false}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
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
    textAlign: "center",
    padding: 30,
    paddingBottom: 80,
    paddingTop: 50
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