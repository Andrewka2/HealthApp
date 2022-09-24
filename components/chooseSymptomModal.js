import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput, Image, Button, Modal, ScrollView, Alert, TouchableHighlight } from "react-native";
import { QuizzItem } from '../components/QuizzItem';
import { saveQuizzAction, userQuizzAction } from "../root/actions/users";
import { useDispatch, useSelector } from "react-redux";

export function ChooseSymptomModal(props) {
    let [heartChoosed, setHeartChoosed] = useState(true)
    let [selected, setSelected] = useState([])

    const symptoms = useSelector((state) => state.user.quizzItems)

    let dispatch = useDispatch()

    function heartChoosedHandler() {
        setHeartChoosed(!heartChoosed)
    }

    function setSelectedHandler(elem, dangerLevel) {
        if (selected.includes(elem)) {
            let result = selected.filter((item) => {
                if (item.elem === elem) {
                    return
                } else {
                    return elem
                }
            })
            setSelected(result)
        } else {
            setSelected([...selected, {elem, dangerLevel}])
        }
    }

    function sendHandler() {
        let date = new Date().toLocaleDateString();
        let time = new Date().toLocaleTimeString();
        let resultData = { date: date, time: time, elems: selected, sypthomType: props.sympthomType, quizzResult: 'danger!' }

        let dangerImpact = symptoms[props.sympthomType].filter((elem, i) => {
            let findItem
            selected.forEach((item,i)=>{
                if (item.elem === elem.sympthom) {
                    findItem = elem.sympthom
                }
            })
            if(findItem !== undefined){
                return findItem
            }
        })
        props.pressHandler();
        props.setQuizzResultHandler(dangerImpact);
        dispatch( userQuizzAction(resultData) )
    }

    return (
        <Modal animationType="fade"
            style={styles.modalCont}
            transparent={props.isModalOpen}
            visible={props.isModalOpen}
            onRequestClose={() => {
                props.pressHandler();
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.titleTextCont}>
                        {
                            props.sympthomType === "СЕРЦЕ" ? <View style={styles.chooseSectionCont}>
                                <Text onPress={heartChoosedHandler} style={heartChoosed ? styles.titleText : styles.unChoosedText}>СЕРЦЕ</Text>
                                <Text style={[styles.titleText, styles.divider]}>/</Text>
                                <Text onPress={heartChoosedHandler} style={heartChoosed ? styles.unChoosedText : styles.titleText}>ЛЕГЕНІ</Text>
                            </View> : <Text style={styles.titleText}>{props.sympthomType}</Text>
                        }
                        <Pressable onPress={() => props.addItemModalHandler()} style={styles.close}>
                            <Image style={styles.closeImg} source={require('../assets/images/add.png')} />
                        </Pressable>
                    </View>
                    <View style={styles.scroll}>

                        <ScrollView>
                            {
                                props.sympthomType !== "СЕРЦЕ" ? symptoms[props.sympthomType].map((elem, index) => {
                                    return (
                                        <QuizzItem setSelectedHandler={setSelectedHandler} key={`elem-${index}`} dangerLevel={elem.dangerLavel} elem={elem.sympthom} />
                                    )
                                }) : heartChoosed ? symptoms["СЕРЦЕ"].map((elem, index) => {
                                    console.log(elem)
                                    return (
                                        <QuizzItem setSelectedHandler={setSelectedHandler} key={`elem-${index}`} dangerLevel={elem.dangerLavel} elem={elem.sympthom} />
                                    )
                                }) : symptoms["ЛЕГЕНІ"].map((elem, index) => {
                                    return (
                                        <QuizzItem setSelectedHandler={setSelectedHandler} key={`elem-${index}`} dangerLevel={elem.dangerLavel} elem={elem.sympthom} />
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.btnsCont}>
                        <Button onPress={sendHandler} title="Відправити">Відправити</Button>
                        <Button color="#FF644F" onPress={() => props.pressHandler()} title="Закрити">Закрити</Button>
                    </View>
                    
                </View>
               
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    btnColor: {
        backgroundColor: 'red'
    },
    btnsCont: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    divider: {
        paddingLeft: 3,
        paddingRight: 3
    },
    unChoosedText: {
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 22,
        color: '#A4AAA3'
    },
    chooseSectionCont: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    close: {
        position: "absolute",
        top: -4,
        right: 0,
        zIndex: 1000
    },
    closeImg: {
        width: 35,
        height: 35
    },
    modalCont: {
        backgroundColor: '#000',
        margin: 0
    },
    titleText: {
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 22
    },
    titleTextCont: {
        marginBottom: 25,
        position: 'relative'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 15,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        width: '90%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    scroll: {
        height: 320,
        marginBottom: 20
    }
})