import { StyleSheet } from "react-native-web"

export const itemStyles = StyleSheet.create({
    saveBtn: {
        marginTop: 10
    },
    itemTitle: {
        position: 'relative'
    },
    clockImage: {
        marginLeft: -20,
        marginRight: -10, 
        with: 40,
        height: 40,
    },
    timeCont: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    timeText: {
        fontSize: 22,
        fontWeight: '900',
        color: '#A8A8A8'
    },
    formikCont: {
        flexDirection: "row",
    },
    deleteCont:{
      flexDirection: "row",
      alignItems: "flex-end",
    },
    deleteText: {
      paddingBottom: 3
    },
    changeItemCont: {
        margin: 10
    },
    changeItemText: {
        marginRight: 5,
        fontSize: 12,
        color: "#A8A8A8"
    },
    closeImg: {
      width: 20,
      height: 20
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      marginTop: 22,
    },
    close: {
      position: "absolute",
      top: 0,
      right: 10,
      zIndex: 1000
    },
    input: {
        borderColor: '#000',
        borderBottomWidth: 1,
        width: '100%'
    },
      modalView: {
        margin: 15,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})