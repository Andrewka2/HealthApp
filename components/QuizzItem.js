import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image, ImageBackground, ScrollView, Button, Modal, Alert, TouchableHighlight } from "react-native";

export function QuizzItem({elem, setSelectedHandler, dangerLevel}) {
    console.log(elem)
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    function clickHandler(){
        setToggleCheckBox(!toggleCheckBox)
    }
    return (
        <Pressable onPress={ () =>{ clickHandler(); setSelectedHandler(elem, dangerLevel )}} style={ toggleCheckBox ? styles.itemContGreen  : styles.itemCont}>
            <Text>{elem}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    itemCont: {
        borderWidth: 2,
        borderColor: '#E3E3E3',
        backgroundColor: '#E8FDF8',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    itemContGreen: {
        borderWidth: 2,
        borderColor: '#5BE439',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15
    },
    green: {
        backgroundColor: '#CBF9B5'
    },
    yellow: {
        backgroundColor: '#F8F9B5'
    },
    red: {
        backgroundColor: '#F9BEB5'
    }
})