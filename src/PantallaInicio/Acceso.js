import React from 'react'

import { StyleSheet, Text,TouchableOpacity, View, Image, Button } from "react-native";

import 'react-native-gesture-handler';

import { enableScreens } from 'react-native-screens';
enableScreens();

export default function Acceso() {

    return (
        <View style={styles.container}>
                {/* Logo */}
                {/* Body */}
                <View style={styles.bodyContainer}>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                        data={[{key: 'Entrar'}, {key: 'Registrarme'}]}
                        numColumns={1}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <ProductComponent />
                            )
                        }} 
                    />
                </View>
            </View>
        
    )
}

const stylesAcceso = StyleSheet.create({
    logoybotones: {
        flex: .5,
        justifyContent: "center",
        alignItems: "center",
    },
    logregContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        top: 20
    },
    btnLogin: {
        height: 30,
        width: 120,
        textAlign: "center",
        backgroundColor: "#14B47A",
        borderRadius: 18,
    },
    btnRegister: {
        height: 30,
        width: 120,
        textAlign: "center",
        backgroundColor: "white",
        borderRadius: 18,
        borderColor: "rgba(20,180,122,.3)",
        borderWidth: 1,
        top: 15
    },
    textoLog: {
        textAlign: "center",
        fontSize: 18,
        color: "white"
    },
    textoReg: {
        textAlign: "center",
        fontSize: 18,
        color: "#14B47A"
    }
  });
  