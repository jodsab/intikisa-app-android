import React, { useEffect, useState } from 'react'
import { View, Text, Image,TouchableOpacity } from 'react-native'
import { getNombre, removeNombre } from '../asyncStorage/helpers'

const Usuario = (props) => {

    const [nombre, setNombre] = useState('');

    const cerrarSesion = () => {
        removeNombre();
        props.actualizar
    } 


    useEffect( async() => {
        const user = await getNombre();
        setNombre(user);
        console.log(nombre)
    },[])

    return (
        <View style={{height: "100%"}}>
            <View style={{height: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}>
                <View style={{ height: "50%", flex: 1, justifyContent:"center", alignItems: "center"}}>
                    <View>
                        <Image source={{uri: 'https://i.imgur.com/pOBw24N.png'}} style={{width: 150, height: 80}} />
                    </View>
                    <Text style={{textAlign: "center", fontSize: 20}}>Hola {nombre}  </Text>
                    <TouchableOpacity style={{paddingVertical: 10,paddingHorizontal: 25, marginTop: 40, backgroundColor: "#1FB05D", width: 250}}>
                        <Text style={{color: "white", textAlign: "center"}} >Mis Compras</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cerrarSesion} style={{paddingVertical: 10,paddingHorizontal: 25, marginTop: 50, backgroundColor: "#FC3D3D", borderRadius: 20, width: 150}} >
                        <Text style={{color: "white", textAlign: "center"}}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                </View>   
            </View>
                     
        </View>
    )
}

export default Usuario
