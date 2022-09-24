import { Formik, Field } from "formik";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, TextInput, Image, Button, Modal } from "react-native";
import { useDispatch } from "react-redux";
import { addQuizzSymptom } from "../root/actions/users";

export default function AddItemModal({addItemModal, addItemModalHandler, type}) {
    let dispatch = useDispatch()    
    let [dangerLevel, setDangerLevel] = useState(0)

    function dangerLevelHandler(level){
        setDangerLevel(level)
    }

    function saveItem(value){
        let resultData = {}
        resultData.type = type
         resultData.elem = {
            sympthom: value.symphom,
            dangerLavel: dangerLevel
         }
         dispatch(addQuizzSymptom(resultData))
    }

    return (
        <Modal animationType="fade"
            style={styles.modalAddItem}
            transparent={addItemModal}
            visible={addItemModal}
            onRequestClose={() => {
                addItemModalHandler();
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalAddItemView}>
                    <View style={styles.addItemTitleCont}>
                        <Text style={styles.addItemTitle}>Додайте симптом</Text>
                        <Pressable onPress={() => addItemModalHandler()} style={styles.close}>
                            <Image style={styles.closeImg} source={require('../assets/images/close.png')} />
                        </Pressable>
                    </View>
                    <View style={styles.itemContent}>
                        <Formik
                            style={styles.formikCont}
                            initialValues={{
                                symphom: '',
                            }}
                            onSubmit={values => saveItem(values)}>
                            {({ handleChange, handleBlur, handleSubmit, values }) => (
                                <View>
                                    <View style={styles.changeItemCont}>
                                        <Text style={styles.changeItemText}>Симптом</Text>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={handleChange('symphom')}
                                            onBlur={handleBlur('symphom')}
                                            value={values.symphom}
                                            
                                        />
                                    </View>
                                    <View style={styles.changeItemCont}>
                                        <Text style={styles.changeItemText}>Рівень загрози</Text>
                                        <View style={styles.dangerLevelItemsCont}>
                                            <Pressable onPress={ ()=> dangerLevelHandler(1)} style={ dangerLevel === 1 ? [styles.dangerItemGreen, styles.dangerItemFeelGreen] : styles.dangerItemGreen}>

                                            </Pressable>
                                            <Pressable onPress={ ()=> dangerLevelHandler(2)}  style={dangerLevel === 2 ? [styles.dangerItemYellow, styles.dangerItemFeelYellow] : styles.dangerItemYellow}>

                                            </Pressable>
                                            <Pressable onPress={ ()=> dangerLevelHandler(3)} style={dangerLevel === 3 ? [styles.dangerItemRed, styles.dangerItemFeelRed] : styles.dangerItemRed }>

                                            </Pressable>
                                        </View>
                                    </View>
                                    <View style={styles.saveBtn}>
                                        <Button onPress={() => { handleSubmit(); addItemModalHandler() }} title="Зберегти" />
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    dangerLevelItemsCont: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    dangerItemFeelGreen: {
        backgroundColor: '#00F519' 
    },
    dangerItemFeelYellow: {
        backgroundColor: '#F1F500'
    },
    dangerItemFeelRed: {
        backgroundColor: '#EB1C00'
    },
    dangerItemGreen: {
        width: '27%',
        height: 20,
        borderWidth: 2,
        borderColor: '#00F519',
        marginTop: 15,
        marginRight: 10,
        borderRadius: 15
    },
    dangerItemYellow: {
        width: '27%',
        height: 20,
        borderWidth: 2,
        borderColor: '#F1F500',
        marginTop: 15,
        marginRight: 10,
        borderRadius: 15
    },
    dangerItemRed: {
        width: '27%',
        height: 20,
        borderWidth: 2,
        borderColor: '#EB1C00',
        marginTop: 15,
        marginRight: 10,
        borderRadius: 15
    },
    changeItemCont: {
        marginBottom: 20
    },
    changeItemText: {
        fontSize: 12,
        color: "#A8A8A8"
    },
    input: {
        borderColor: '#000',
        borderBottomWidth: 1,
        width: '100%'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 22,
    },
    addItemTitleCont: {
        marginBottom: 25,
        position: 'relative'
    },
    close: {
        position: 'absolute',
        top: 0,
        right: -6
    },
    closeImg: {
        width: 25,
        height: 25
    },
    addItemTitle: {
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 17
    },
    modalAddItem: {
        position: 'relative',
        zIndex: 2000,
        backgroundColor: '#000',
        margin: 0
    },
    modalAddItemView: {
        margin: 15,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        width: '70%',
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