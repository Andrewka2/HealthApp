import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { QuizzItem } from '../components/QuizzItem';

export default function QuizzHistory() {
    const symptoms = useSelector((state) => state.user.quizz)
    let rigthSymptoms = symptoms.slice(1)
    return (
        <View style={styles.quizzHistory}>
            <View style={styles.titleCont}>
                <Text style={styles.title}>Історія</Text>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    {
                        symptoms.length === 1 ? <View>
                            <Text>Поки що нічого немає</Text>
                        </View> :
                            rigthSymptoms.map((elem, index) => {
                                return (
                                    <View style={styles.itemContainer}>
                                        <View style={styles.contentWrapper}>
                                            <View style={styles.dateTimeCont}>
                                                <View style={styles.dateCont}>
                                                    <Image resizeMode='contain' style={styles.calendarImage} source={require('../assets/images/calendar.png')}></Image>
                                                    <Text style={styles.timeText}>{elem.date}</Text>
                                                </View>
                                                <View style={styles.dateCont}>
                                                    <Text style={styles.timeText}>{elem.time.slice(0, 5)}</Text>
                                                    <Image resizeMode='contain' style={styles.clockImage} source={require('../assets/images/iconsClock.png')}></Image>
                                                </View>
                                            </View>
                                            <View style={styles.resultTextCont}>
                                                <Text style={styles.resultTextTitle}>
                                                    Рекомендації  
                                                </Text>
                                                <Text style={styles.resultText}>
                                                    Увага! Ваш стан є загрозливим! Зверніться до найближчої медичної установи, або викличте в швидку.
                                                </Text>
                                            </View>
                                            <View style={styles.elemsCont}>
                                                {
                                                    elem.elems.map((item) => {
                                                        return <QuizzItem elem={item.elem} setSelectedHandler={() => { }} dangerLevel={item.dangerLevel} />
                                                    })
                                                }
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    elemsCont: {
        
    },
    resultText: {
        marginTop: 6
    },
    resultTextTitle: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16
    },
    resultTextCont: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15
    },
    titleCont: {
        marginTop: 40,
        marginLeft: 20,
    },
    timeText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#A8A8A8'
    },
    timeCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    dateCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    clockImage: {
        marginLeft: -10,
        marginRight: -18,
        with: 40,
        height: 40,
    },
    calendarImage: {
        marginLeft: -5,
        with: 30,
        height: 30,
    },
    dateTimeCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    quizzHistory: {

    },
    title: {
        fontSize: 22,
        fontWeight: '600',
    },
    itemContainer: {
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: '#000'
    },
    container: {
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 50,
   
    }
})