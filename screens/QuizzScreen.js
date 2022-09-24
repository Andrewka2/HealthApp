import React from 'react';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { ChooseSymptomModal } from '../components/chooseSymptomModal';
import ChooseSympthomCategories from '../components/ChooseSympthomCategories';
import QuizzResults from '../components/QuizzResults';
import AddItemModal from '../components/AddItemModal';

export default function QuizzScreen({navigation}) {

    let [isModalOpen, setIsModalOpen] = useState(false)
    let [quizzResultModal, setquizzResultModal] = useState(false)
    let [sympthomType, setSympthomType] = useState('')
    let [isView, setIsView] = useState(false)
    let [quizzResult, setQuizzResult] = useState([])
    let [addItemModal, setAddItemModal] = useState(false)

    function addItemModalHandler() {
        setAddItemModal(!addItemModal)
    }

    function quizzResultModalHandler() {
        setquizzResultModal(!quizzResultModal)
    }

    function setQuizzResultHandler(data){
        setQuizzResult(data)
        quizzResultModalHandler()
    }

    function viewHandler() {
        setIsView(!isView)
    }

    function historyHandler(){
        navigation.navigate('quizHistory')
    }

    function pressHandler(type) {
        setIsModalOpen(!isModalOpen)
        setSympthomType(type)
    }

    return (
        <View style={styles.quizzScreen}>
            {
                isModalOpen ? <ChooseSymptomModal addItemModalHandler={addItemModalHandler} setQuizzResultHandler={setQuizzResultHandler} sympthomType={sympthomType} isModalOpen={isModalOpen} pressHandler={pressHandler} /> : null
            }
            {
                addItemModal ? <AddItemModal addItemModalHandler={addItemModalHandler} addItemModal={addItemModal}  type={sympthomType}/> : null
            }
            {
                quizzResultModal ? <QuizzResults quizzResultModal={quizzResultModal} quizzResult={quizzResult} quizzResultModalHandler={quizzResultModalHandler}/> : null
            }
            <TouchableOpacity onPress={viewHandler} style={styles.imageViewCont}>
                <Image style={styles.imageView} source={require('../assets/images/Person/view.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={historyHandler} style={styles.imageHistoryCont}>
                <Image style={styles.imageHistory} source={require('../assets/images/Person/history.png')} />
            </TouchableOpacity>
            {
                isView ? <ChooseSympthomCategories pressHandler={pressHandler}/> : <View style={styles.imagesCont}>
                    <TouchableOpacity onPress={() => { pressHandler('ГОЛОВА') }} style={styles.imageHeadCont}>
                        <Image style={styles.imageHead} source={require('../assets/images/Person/body1.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { pressHandler('СЕРЦЕ') }} style={styles.imageCont}>
                        <Image style={styles.imageLungs} source={require('../assets/images/Person/body2.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { pressHandler('ШЛУНКОВО-КИШКОВИЙ ТРАКТ') }} style={styles.imageStomachCont}>
                        <Image style={styles.imageLungs} source={require('../assets/images/Person/body3.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { pressHandler('СЕЧО-СТАТЕВА СИСТЕМА') }} style={styles.imageBootomCont}>
                        <Image style={styles.imageFoots} source={require('../assets/images/Person/body4.png')} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    imageHistory: {
        width: 40,
        height: 40
    },
    imageHistoryCont: {
        position: 'absolute',
        top: 2.5,
        right: 53
    },
    imageViewCont: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
        paddingRight: 5,
        paddingBottom: 10,
    },
    imageView: {
        width: 45,
        height: 45
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