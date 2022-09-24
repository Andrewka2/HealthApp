import React from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ChooseSympthomCategories({pressHandler}) {
    return (
        <ScrollView>
        <View style={styles.container}>
            <TouchableHighlight onPress={()=> {pressHandler('ГОЛОВА')}} style={styles.item}>
                <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={require('../assets/images/head.png')}/>
                    <Text style={styles.itemText}>Голова</Text>
                </View>
            </TouchableHighlight >

            <TouchableHighlight onPress={()=> {pressHandler('СЕРЦЕ')}} style={styles.item}>
                <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={require('../assets/images/heart.png')}/>
                    <Text style={styles.itemText}>Серце</Text>    
                </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={()=> {pressHandler('ЛЕГЕНІ')}} style={styles.item}>
            <View style={styles.itemContainer}>
            <Image style={styles.itemImage} source={require('../assets/images/lungs.png')}/>
                <Text style={styles.itemText}>Легені</Text>
            </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={()=> {pressHandler('ШЛУНКОВО-КИШКОВИЙ ТРАКТ')}} style={styles.item}>
                <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={require('../assets/images/stomach.png')}/>
                    <Text style={styles.itemText}>ШЛУНКОВО-КИШКОВИЙ ТРАКТ</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={()=> {pressHandler('СЕЧО-СТАТЕВА СИСТЕМА')}} style={styles.item}>
                <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={require('../assets/images/vagina.png')}/>
                    <Text style={styles.itemText}>СЕЧО-СТАТЕВА СИСТЕМА</Text>
                </View>
            </TouchableHighlight>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingBottom: 50
    },
    item: {
        justifyContent: 'center',
        backgroundColor: "#cc14aa",
        backgroundGradientFrom: "#7ff591",
        backgroundGradientTo: "#f0f716",
        decimalPlaces: 2,
            color: (opacity = 1) => rgba(0, 0, 0, 0.1),
        width: '90%',
        height: 120,
        marginBottom: 10,
        borderRadius: 5,
        padding: 20
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginTop: -5,
        borderRadius: 2
    },
    itemImage: {
        width: 50,
        height: 50,
        marginTop: 5,
        
    },
    itemText: {
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 5
    },
})