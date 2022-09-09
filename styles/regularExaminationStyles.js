import { StyleSheet } from "react-native-web"

export const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 25,
        marginBottom: 30
    },
    position: {
        marginBottom: 15
    },
    positionText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '600',
    },
    timeCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    input: {
        borderColor: "#000",
        borderBottomWidth: 1.5,
        paddingTop: 2
    },
    clockImage: {
        marginLeft: -20,
        marginRight: -10, 
        with: 40,
        height: 40,
        
    },
    procedure: {
        marginTop: 10
    },
    address: {
        marginTop: 10
    },
    cabinet: {
        marginTop: 10
    },
    doctor: {
        marginTop: 10
    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
        position: 'relative',
        zIndex: 1000,
        backgroundColor: "#000",
    },
    timeText: {
        fontSize: 24,
        fontWeight: '900',
        color: '#A8A8A8'
    }
})