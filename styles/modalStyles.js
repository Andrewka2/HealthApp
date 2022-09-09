import { StyleSheet } from "react-native-web"

export const modalStyles = StyleSheet.create({
    modalCont: {
      backgroundColor:'#000',
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
      alignItems: "center",
      marginTop: 22,
      position: 'relative'
    },
    close: {
      position: "absolute",
      top: 67,
      right: 80,
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