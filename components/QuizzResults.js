import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image, Button, Modal, ScrollView, Alert, TouchableHighlight } from "react-native";
import { QuizzItem } from "./QuizzItem";

export default function QuizzResults({ quizzResultModal, quizzResult, quizzResultModalHandler }) {
    console.log(quizzResult)
    return (
        <Modal animationType="fade"
            style={styles.modalCont}
            transparent={quizzResultModal}
            visible={quizzResultModal}
            onRequestClose={() => {
                quizzResultModalHandler();
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.titleTextCont}>
                        <Text style={styles.titleText}>Результати</Text>
                    </View>
                    <Pressable onPress={() => quizzResultModalHandler()} style={styles.close}>
                        <Image style={styles.closeImg} source={require('../assets/images/close.png')} />
                    </Pressable>
                    {
                        quizzResult.map((elem, index) => {
                            console.log(elem)
                            return (
                                <QuizzItem setSelectedHandler={false} key={`elem-${index}`} dangerLevel={elem.dangerLavel} elem={elem.sympthom} />
                            )
                        })
                    }
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
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
        top: 25,
        right: 23,
        zIndex: 1000
    },
    closeImg: {
        width: 20,
        height: 20
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
        height: 100
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
