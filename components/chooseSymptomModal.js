import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image, Button, Modal, Alert, TouchableHighlight } from "react-native";
import { symptoms } from '../config/symptoms';
import {QuizzItem} from '../components/QuizzItem';

export function ChooseSymptomModal(props) {
    let [selected, setSelected] = useState([])

    function setSelectedHandler(elem){
        if(selected.includes(elem)){
            let result = selected.filter((item)=>{
                if(item === elem){
                    return
                }else{
                    return elem
                }
            })
            setSelected(result)
        }else{
            setSelected([...selected, elem] )
        }
    }

    function sendHandler(){
        console.log(selected)
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
                        <Text style={styles.titleText}>{props.sympthomType}</Text>
                        <Pressable onPress={() => props.pressHandler()} style={styles.close}>
                            <Image style={styles.closeImg} source={require('../assets/images/close.png')} />
                        </Pressable>
                    </View>
                    <View>
                        {
                            symptoms[props.sympthomType].map((elem, index) => {
                                return (
                                    <QuizzItem setSelectedHandler={setSelectedHandler} key={`elem-${index}`} elem={elem}/>
                                )
                            })
                        }
                    </View>
                    <View>
                        <Button onPress={sendHandler} title="Відправити">Відправити</Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    close: {
        position: "absolute",
        top: 4,
        right: 10,
        zIndex: 1000
    },
    closeImg: {
        width: 20,
        height: 20
    },
    modalCont: {
        backgroundColor: '#000',
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})