import React, {useState, useEffect} from 'react'

import { View, SafeAreaView, StyleSheet, TextInput,Button, Text,TouchableOpacity, Modal, Alert, Image  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Usuario from '../Screens/Usuario';

import {storeNombre, storePassword, getNombre, getPassword, removeNombre} from '../asyncStorage/helpers';

/* credenciales */
/* Login */
const URL_LOGIN = "https://intikisaperu.com/oficial/login.php";

const enviarData = async (url, data) => {

    const resp = await fetch (url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const json = await resp.json();

    return json;
}  

export default function Login(props) {

    const [name, onChangeName] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    const [conectado, setConectado] = React.useState(false);
    
    const handleLogin = async () => {

        const data = {
            "user_nombre": name,
            "user_password": password
        }

        const respuestaJson = await enviarData(URL_LOGIN, data);
        
        if(respuestaJson.conectado == true){
            storeNombre(name)
            storePassword(password)
            props.closeModal()
            props.conectar()
            props.settingNombre()
        }
        else{
        }
    }

    useEffect(async ()=> {
        if(getNombre() != ''){
            setConectado(true)
            const nombreuser = await getNombre();
            onChangeName(nombreuser)
        }
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ flex: 1 }}>
                <TouchableOpacity onPress={props.closeModal}>
                    <Icon name="keyboard-arrow-left" size={30} color='black' />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent:"center", alignItems: "center"}}>
                    <View >
                        <Image source={{uri: 'https://i.imgur.com/pOBw24N.png'}} style={{width: 150, height: 80}} />
                    </View>
                    <View> 
                        <Text>Ingrese a su cuenta</Text>
                    </View> 
                    <SafeAreaView >
                        <TextInput
                            style={stylesLogin.input}
                            onChangeText={(data)=> onChangeName(data) }
                            value={name}
                            placeholder="Usuario"
                        />
                        <TextInput
                            style={stylesLogin.input}
                            onChangeText={(data)=> onChangePassword(data)}
                            value={password}
                            secureTextEntry={true}
                            placeholder="Password"
                        />
                        <Button onPress={handleLogin} title="Ingresar" color="#1FB05D" accessibilityLabel="Learn more about this purple button"  />
                    </SafeAreaView>
                </View>
            </TouchableOpacity>
        </View>
        
    )
}

const stylesLogin = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 250
    },
  });