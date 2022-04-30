import React, {useEffect, useState} from 'react'
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { getNombre, removeNombre } from '../asyncStorage/helpers'

import Icon from 'react-native-vector-icons/FontAwesome';

import Perfil from './Perfil'
import Usuario from './Usuario'

import Login from '../PantallaInicio/Login';
import Registro from '../PantallaInicio/Registro'

import aExportMenuUser from '../menusUser/aExportMenuUser';

const Logger = () => {

    const [name, onChangeName] = React.useState("");

    const [conectado, setConectado] = useState(false);

    const [loginstatus, setLoginStatus] = useState(false)

    const ToggleLogin = () => {
        setLoginStatus(!loginstatus)
    }

    const [registerstatus, setRegisterStatus] = useState(false)

    const ToggleRegister = () => {
        setRegisterStatus(!registerstatus)
    }

    const cerrarSesion = () => {
        removeNombre();
        setConectado(false);
    } 

    const setearNombre = async () => {
        const settingNombre = await getNombre();
        onChangeName(settingNombre);
    }

    const [comoComprarVisible, setComoComprarVisible] = useState(false);
    const [aboutUsVisible, setAboutUsVisible] = useState(false);

    const toggleComoComprar = () => {
        setComoComprarVisible(!comoComprarVisible)
    }

    const toggleAboutUs = () => {
        setAboutUsVisible(!aboutUsVisible)
    }

    useEffect( async() => {
        const effectuser = await getNombre();
        if(effectuser.length >= 1 ){
            setConectado(true);
            onChangeName(effectuser)
        }

    },[])

    return (
        <View>
            <Modal 
                    animationType="slide" 
                    visible={comoComprarVisible}
                    onRequestClose={() => toggleComoComprar()}>
                        <aExportMenuUser.ComoComprar closeModal={() => toggleComoComprar()} />
                </Modal>
                <Modal 
                    animationType="slide" 
                    visible={aboutUsVisible}
                    onRequestClose={() => toggleAboutUs()}>
                        <aExportMenuUser.AboutUs closeModal={() => toggleAboutUs()} />
                </Modal>
            {
                conectado ? 
            <View style={{height: "100%"}}>
                <View style={{height: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <View style={{ height: "50%", flex: 1, justifyContent:"center", alignItems: "center"}}>
                        <View>
                            <Image source={{uri: 'https://i.imgur.com/pOBw24N.png'}} style={{width: 150, height: 80}} />
                        </View>

                        <Text style={{textAlign: "center", fontSize: 20}}> <Icon name='user' style={{fontSize: 20, color: '#1FB05D' }} /> Hola {name}  </Text>
                        
                        <View style={{marginTop: 30}} >
                            <TouchableOpacity onPress={() => toggleComoComprar()} style={{borderColor:"#30BA6C", borderWidth: 1 ,paddingVertical: 10,paddingHorizontal: 25,backgroundColor: "#1FB05D", width: 250, flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
                                <Icon name='tasks' style={{fontSize: 20, color: 'white', padding: 5 }} /><Text style={{color: "white", textAlign: "center"}} > Cómo comprar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => toggleAboutUs()} style={{borderColor:"#30BA6C", borderWidth: 1 ,paddingVertical: 10,paddingHorizontal: 25, backgroundColor: "#1FB05D", width: 250, flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
                                <Icon name='book' style={{fontSize: 20, color: 'white', padding: 5 }} /><Text style={{color: "white", textAlign: "center"}} > Acerca de nosotros</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={cerrarSesion} style={{paddingVertical: 10,paddingHorizontal: 25, marginTop: 40, backgroundColor: "#FC3D3D", borderRadius: 20, width: 150}} >
                            <Text style={{color: "white", textAlign: "center"}}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>   
                </View>
            </View> 
            : 
            <View style={styles.containerPerfil}>
                <Modal 
                    animationType="slide" 
                    visible={loginstatus}
                    onRequestClose={() => ToggleLogin()}>
                        <Login closeModal={() => ToggleLogin()} conectar={() => {setConectado(true)}} settingNombre={() => setearNombre() }  />
                </Modal>
                <Modal 
                    animationType="slide" 
                    visible={registerstatus}
                    onRequestClose={() => ToggleRegister()}>
                        <Registro closeModal={() => ToggleRegister()} conectar={() => {setConectado(true)}} settingNombre={() => setearNombre() } />
                </Modal>
                
                <View>
                    <Image source={require('../../assets/logo.png')} style={{width: 200, height: 200}} />
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
            }
        </View>
    )
}

const styles = StyleSheet.create({
    containerPerfil: {
        height: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "white"
    },
    touchContainer: {
        /* top: 100 */
    },  
    login_btn:{
        width: 130,
        backgroundColor: 'green',
        borderRadius: 18,
        paddingVertical: 5,
        marginVertical: 8
    },
    register_btn:{
        width: 130,
        backgroundColor: 'white',
        borderRadius: 18,
        paddingVertical: 5,
        marginVertical: 8,
        borderColor: "green",
        borderWidth: 1
        /* top: 10 */
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

export default Logger
