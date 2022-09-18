import { StyleSheet, Text, View, TextInput, Pressable, CheckBox } from "react-native";
import { modalStyles } from "../styles/modalStyles";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../root/actions/userActions";
import { useState, useEffect } from 'react';

export default function RegistrationScreen({ navigation }) {

  const defaultUser = useSelector((state) => state.user.defaultUser)
  const dispatch = useDispatch()

  const user = {
    customId: String,
    email: String,
    password: String
  }

  const userData = {
    firstName: String,
    lastName: String,
    Phone: String,
    Email: String,
    AddressCity: String,
    AddressStreet: String,
    AddressBuilding: String,
    AddressAppartment: String
  }
  
  function updateParam(value, type) {
    if(type == 'email' || type == 'password' || type == 'passwordRep'){
      user[type] = value;
    }
    else {
      userData[type] = value;
    }
  }
  
  function GenerateInput(inputHeading, inputType, autoComplete, defaultV){
    return(
      <View>
        <Text style={styles.text}>{inputHeading}</Text>
            <TextInput
                style={styles.input}
                onChangeText={(logInp) => updateParam(logInp, inputType)}
                placeholder={inputType}
                placeholderTextColor="grey"
                autoComplete={autoComplete}
                defaultValue={defaultV}
            />
      </View>
    );
  }

  return (
    <View style={styles.renderItemContainer}>
      <View>
        <View>
          {GenerateInput("Пошта", "email", "email", "web21@test.com")}
          {GenerateInput("Ім'я", "name", "name", "web")}
          {GenerateInput("Прізвище", "surname", "name-family", "web")}
          {GenerateInput("По батькові", "middleName", "name-middle", "webovych")}
          {GenerateInput("Номер телефону", "Phone", "tel", "0988888888")}
          {GenerateInput("Адреса проживання", "postal-address", "", "Cyberspace,localhost,19006,expo_compilation_data")}
          {GenerateInput("Пароль", "password", "password", "Qwerty")}
          {GenerateInput("Повторіть пароль", "passwordRep", "password", "Qwerty")}
        </View>
        <View>
          <Pressable
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={() => dispatch(createUser([user, userData]))}
          >
              <Text style={modalStyles.textStyle}>Зареєструватись</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

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

  renderItemContainer: {
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "center",
  borderRadius: 5,
  paddingLeft: 20,
  paddingRight: 20,
  width: '100%',
  height: '100%'
  }

});
