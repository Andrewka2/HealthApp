import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image, ImageBackground, ScrollView, Button, Modal, Alert, TouchableHighlight } from "react-native";

export function QuizzItem({elem, setSelectedHandler}) {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    function clickHandler(){
        setToggleCheckBox(!toggleCheckBox)
    }
    return (
        <Pressable onPress={ () =>{ clickHandler(); setSelectedHandler(elem)}} style={ toggleCheckBox ? styles.itemContGreen : styles.itemCont}>
            <Text>{elem}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    itemCont: {
        borderWidth: 2,
        borderColor: '#E3E3E3',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15
    },
    itemContGreen: {
        borderWidth: 2,
        borderColor: '#5BE439',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15
    },
})