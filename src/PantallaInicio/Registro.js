import React, { useState } from 'react'

import {View, StyleSheet, Button, SafeAreaView, TextInput, TouchableOpacity, Text,Image} from 'react-native';

import { storeNombre, storePassword } from '../asyncStorage/helpers';

import Icon from 'react-native-vector-icons/MaterialIcons';

/* credenciales */
/* Register */
const URL_REGISTER = "https://intikisaperu.com/oficial/api/registrar.php";

const enviarRegData = async (url, data) => {

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

export default function Registro(props) {

    const [name, onChangeName] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [celular, onChangeCelular] = React.useState("");
    const [direccion, onChangeDireccion] = React.useState("");

    const [msj, setMsj] = useState('');

    const gettingDate = () => {
        const d = new Date();

        var fechita = `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`;

        return fechita
    } 

    const handleRegister = async () => {
        const regdata = {
            "user_fecha": gettingDate(),
            "user_nombre": name,
            "user_email": email,
            "user_password": password,
            "user_celular": celular,
            "user_direccion": direccion
        }

        const regRespuestaJson = await enviarRegData(URL_REGISTER, regdata);
        console.log(regRespuestaJson)

        if(regRespuestaJson.registro == true ){
            storeNombre(name)
            storePassword(password)
            props.closeModal()
            props.conectar()
            props.settingNombre()
        } else{
            setMsj(regRespuestaJson.msj)
            onChangeName('')
        }
    }

    return (
        <View style={{flex: 1}}>
            <TouchableOpacity onPress={props.closeModal} style={{flexDirection: 'row', alignItems:'center'}}>
                <Icon name="keyboard-arrow-left" size={30} color='black' />
                <Text>Regresar</Text>
            </TouchableOpacity>
            <View style={{flex: 1,justifyContent:"center", alignItems: "center"}}>
                <View>
                    <Image source={require('../../assets/logo.png')} style={{width: 200, height: 120}} />
                </View> 
                <SafeAreaView>
                <Text style={{color: "red", textAlign: "center"}} >{msj}</Text>
                    <Text>Con tu usuario ingresar??s a tu cuenta</Text>
                    <TextInput
                        style={stylesRegistro.input}
                        onChangeText={onChangeName}
                        value={name}
                        placeholder="Usuario"
                    />
                    <Text>Con tu contrase??a ingresar??s a tu cuenta</Text>
                    <TextInput
                        style={stylesRegistro.input}
                        onChangeText={onChangePassword}
                        value={password}
                        placeholder="Contrase??a"
                    />
                    <TextInput
                        style={stylesRegistro.input}
                        keyboardType='email-address'
                        onChangeText={onChangeEmail}
                        value={email}
                        placeholder="Email"
                    />
                    <TextInput
                        style={stylesRegistro.input}
                        keyboardType='numeric'
                        onChangeText={onChangeCelular}
                        value={celular}
                        placeholder="Celular"
                    />
                    <TextInput
                        style={stylesRegistro.input}
                        onChangeText={onChangeDireccion}
                        value={direccion}
                        placeholder="Direccion"
                    />
                    <Button onPress={handleRegister} title="Registrarme" color="#38875A" accessibilityLabel="Learn more about this purple button"  />
                </SafeAreaView>
            </View>
        </View>
    )
}

const stylesRegistro = StyleSheet.create({
    input: {
        height: 36,
        margin: 9,
        borderWidth: 1,
        padding: 10,
        width: 250
      },
  });
