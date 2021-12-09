import React, {useState,useEffect} from 'react'
import { Image, View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native'

import Login from '../PantallaInicio/Login'
import Registro from '../PantallaInicio/Registro'

import { getNombre } from '../asyncStorage/helpers'

const Perfil = (props) => {

    const [loginstatus, setLoginStatus] = useState(false)

    const ToggleLogin = () => {
        setLoginStatus(!loginstatus)
    }

    const [registerstatus, setRegisterStatus] = useState(false)

    const ToggleRegister = () => {
        setRegisterStatus(!registerstatus)
    }

    useEffect(() => {
        if(getNombre() != ''){
            
        }

    }, []);

    return (
        <View style={styles.containerPerfil}>
                <Modal 
                    animationType="slide" 
                    visible={loginstatus}
                    onRequestClose={() => ToggleLogin()}>
                        <Login closeModal={() => ToggleLogin()} />
                </Modal>
                <Modal 
                    animationType="slide" 
                    visible={registerstatus}
                    onRequestClose={() => ToggleRegister()}>
                        <Registro closeModal={() => ToggleRegister()} />
                </Modal>
                
                <View>
                    <Image source={{uri: 'https://i.imgur.com/pOBw24N.png'}} style={{width: 150, height: 80}} />
                </View> 
                <View style={styles.touchContainer}>
                    <TouchableOpacity onPress={() => ToggleLogin()} style={styles.login_btn}>
                        <Text style={styles.textLog}>Login</Text>
                    </TouchableOpacity>   
                    <TouchableOpacity onPress={() => ToggleRegister()} style={styles.register_btn}>
                        <Text style={styles.textReg}>Registrarme</Text>
                    </TouchableOpacity> 
                </View>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    containerPerfil: {
        /* flex: 1, */
        justifyContent: "center",
        alignItems: "center",
        top: 20
    },
    touchContainer: {
        top: 100
    },  
    login_btn:{
        width: 130,
        backgroundColor: 'green',
        borderRadius: 18,
        paddingTop: 5,
        paddingBottom: 5,
    },
    register_btn:{
        width: 130,
        backgroundColor: 'white',
        borderRadius: 18,
        paddingTop: 5,
        paddingBottom: 5,
        top: 10
    },
    textLog: {
        fontSize: 16,
        color: "white",
        textAlign: "center"
    },
    textReg: {
        fontSize: 16,
        color: "green",
        textAlign: "center"
    }
})

export default Perfil
