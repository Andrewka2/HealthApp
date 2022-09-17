import { Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import { modalStyles } from "../styles/modalStyles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function LoginScreen({navigation}) {

    const defaultUser = useSelector((state) => state.user.defaultUser)
    const dispatch = useDispatch()

    let loginObj = {
        login: String,
        password: String
    }

    function updateLogin(value){
        loginObj.login = value
        console.log('login changed to ' + loginObj.login)
    }

    function updatePassword(value) {
        loginObj.password = value
        console.log('login changed to ' + loginObj.password)
    }

    function authorizeUser() {
        
    }

    return (
        <View style={styles.renderItemContainer}>
            <View>
                <Text style={styles.text}>Логін</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(logInp) => updateLogin(logInp)}
                    placeholder={'login'}
                    placeholderTextColor="grey"
                />
                <Text style={styles.text}>Пароль</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(passInp) => updatePassword(passInp)}
                    placeholder={'password'}
                    placeholderTextColor="grey"
                    secureTextEntry={true}
                />
            </View>
            <View>
                <Pressable
                    style={[modalStyles.button, modalStyles.buttonClose]}
                    onPress={() => authorizeUser()}
                    component={LoginScreen}
                >
                    <Text style={modalStyles.textStyle}>Зайти</Text>
                </Pressable>
            </View>
                <Pressable
                    style={styles.regButton}
                    onPress={() => navigation.navigate('Registration')}
                >
                    <Text style={styles.text}>Зареєструватись</Text>
                </Pressable>
            <View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    test: {
        backgroundColor: "grey",
    },
    
    renderItemContainer: {
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    height: '100%'
    },

    input: {
        display: "flex",
        justifyContent: "center",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        marginBottom: 20,
        borderColor: '#000',
        borderBottomWidth: 1,
    },

    text: {
        fontWeight: "bold"
    },

    regButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    }
});