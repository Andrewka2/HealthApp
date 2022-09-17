import { StyleSheet } from "react-native-web"

export const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 25
    },
    position: {
        marginBottom: 15,
        backgroundColor: '#65D6B4',
        borderRadius: 10
    },
    timeDayCont: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"
    },
    btnDeleteCont: {
        marginTop: 20,
        width: 100
    },
    positionText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
        padding: 5
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
    calendarImage: {
        with: 30,
        height: 30,
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
        fontSize: 22,
        fontWeight: '900',
        color: '#A8A8A8'
    }
})