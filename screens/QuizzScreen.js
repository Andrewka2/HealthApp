import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, View, Pressable, Image, ImageBackground, ScrollView, Button, Modal, FlatList } from "react-native";
import { ChooseSymptomModal } from '../components/chooseSymptomModal';
import ChooseSympthomCategories from '../components/ChooseSympthomCategories';

export default function QuizzScreen() {

    let [isModalOpen, setIsModalOpen] = useState(false)
    let [sympthomType, setSympthomType] = useState('')
    let [isView, setIsView] = useState(false)

    function viewHandler() {
        setIsView(!isView)
    }

    function pressHandler(type) {
        setIsModalOpen(!isModalOpen)
        setSympthomType(type)
    }

    return (
        <View style={styles.quizzScreen}>
            {
                isModalOpen ? <ChooseSymptomModal sympthomType={sympthomType} isModalOpen={isModalOpen} pressHandler={pressHandler} /> : null
            }

            <TouchableOpacity onPress={viewHandler} style={styles.imageViewCont}>
                <Image style={styles.imageView} source={require('../assets/images/Person/view.png')} />
            </TouchableOpacity>
            {
                isView ? <ChooseSympthomCategories pressHandler={pressHandler}/> : <View style={styles.imagesCont}>
                    <TouchableOpacity onPress={() => { pressHandler('head') }} style={styles.imageHeadCont}>
                        <Image style={styles.imageHead} source={require('../assets/images/Person/body1.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { pressHandler('loungs') }} style={styles.imageCont}>
                        <Image style={styles.imageLungs} source={require('../assets/images/Person/body2.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { pressHandler('stomach') }} style={styles.imageStomachCont}>
                        <Image style={styles.imageLungs} source={require('../assets/images/Person/body3.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { pressHandler('foots') }} style={styles.imageBootomCont}>
                        <Image style={styles.imageFoots} source={require('../assets/images/Person/body4.png')} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    imageViewCont: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
        paddingRight: 5
    },
    imageView: {
        width: 30,
        height: 30
    },
    quizzScreen: {
        position: 'relative'
    },
    imagesCont: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
        backgroundColor: "#fff",
        paddingBottom: 350,
        position: 'relative'
    },
    imageCont: {
        marginTop: 77
    },
    imageHeadCont: {
        marginTop: 77,
        marginBottom: 1
    },
    imageHead: {
        width: 116,
        height: 76
    },
    imageLungs: {
        width: 165,
        height: 60,
        resizeMode: 'contain'
    },
    imageBootomCont: {
        marginTop: 57
    },
    imageStomachCont: {
        marginTop: 57.5
    },
    imageFootCont: {
        marginTop: 50
    },
    imageFoots: {
        height: 90,
        width: 165
    }
})