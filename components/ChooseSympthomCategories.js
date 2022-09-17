import React from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ChooseSympthomCategories({pressHandler}) {
    return (
        <ScrollView>
        <View style={styles.container}>
            <TouchableHighlight onPress={()=> {pressHandler('head')}} style={styles.item}>
                <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={require('../assets/images/head.png')}/>
                    <Text style={styles.itemText}>Голова</Text>
                </View>
            </TouchableHighlight >

            <TouchableHighlight onPress={()=> {pressHandler('loungs')}} style={styles.item}>
                <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={require('../assets/images/heart.png')}/>
                    <Text style={styles.itemText}>Серце</Text>
                    
                </View>
            </TouchableHighlight>

            <TouchableHighlight style={styles.item3}>
                <Text>Легені</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.item4}>
                <Text>Живіт</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.item5}>
                <Text>Живіт</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.item6}>
                <Text>Живіт</Text>
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
        paddingTop: 30,
        justifyContent: 'center'
    },
    item: {
        justifyContent: 'center',
        backgroundColor: '#A4AAA3',
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
        borderRadius: 5
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
    item2: {
        backgroundColor: 'green',
        width: '48%',
        margin: 3
    },
    item3: {
        backgroundColor: 'blue',
        width: '48%',
        height: 100,
        margin: 3
    },
    item4: {
        backgroundColor: 'yellow',
        width: '48%',
        height: 100,
        margin: 3
    },
    item5: {
        backgroundColor: 'brown',
        width: '48%',
        height: 100,
        margin: 3
    },
    item6: {
        backgroundColor: 'aqua',
        width: '48%',
        height: 100,
        margin: 3
    }
})