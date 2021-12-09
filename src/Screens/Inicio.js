import React, {useState, useEffect} from 'react'
import {  StyleSheet, View, Modal, Text, TouchableOpacity, TextInput, FlatList, ScrollView, StatusBar,Image  } from 'react-native'

import productos from '../ProductosJson/productos.json'
// import theme
import * as theme from '../constants/theme'
import Icon from 'react-native-vector-icons/MaterialIcons'

// import product component
import ProductComponent from '../components/productsComponents'

// import Bag Modal
import BagModal from '../components/bagModal'

// import clothes from products
import * as Products from '../constants/products'

// const with the current theme (dark / light)
const currentTheme = theme.colors.light

import { useFocusEffect } from '@react-navigation/native';

//API INTIKISA PRODUCTOS
import { callProductos } from '../api/productos'
const URL_PRODUCTOS = "https://intikisaperu.com/oficial/api/productos.php";

const Inicio = () => {

    const [bagVisible, setBagVisible] = useState(true);

    const [productos, setProductos] = useState([]);

    const llamadaProductos = async () => {

        const data = {
            "user_nombre": "admin",
        }

        const respuestaJson = await callProductos(URL_PRODUCTOS, data);

        const productosarray = [];

        respuestaJson.map(e => {
            const index = productosarray.findIndex(object => object.prodid === e.prodid );

            if(index === -1 ){
                productosarray.push(e);
            }
        } )

        return productosarray;
    }

    useFocusEffect(
        React.useCallback(() => {
            async function fetchProductos() {
                const productasos = await await llamadaProductos();
                setProductos(productasos)  
            }
            fetchProductos();
        }, [])
      );

    /* useEffect(async () => {
        const productasos = await llamadaProductos();
        setProductos(productasos)   
    }, []); */

    return (
        <View >
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <View>
                        <Text style={styles.titleText}>Productos Naturales</Text>
                        <Text style={styles.subTitleText}>Alimentate bien desde hoy</Text>
                    </View>
                    {/* <TouchableOpacity style={styles.iconCaontainer} onPress={() => ToggleBagVisible()}>
                        <Icon name="shopping-cart" color={currentTheme.background} size={25} />
                        <View style={styles.badgeContainer}>
                            <Text style={styles.badgeText}>6</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>

                {/* Search */}
{/*                 <View style={styles.searchContainer}>
                    <Icon name="search" color={theme.colors.gray} size={25} />
                    <TextInput 
                    style={styles.textInputContainer} 
                    placeholder="Search.." 
                    placeholderTextColor={theme.colors.gray} />
                </View> */}

                {/* Body */}
                <View style={styles.bodyContainer}>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                        data={productos}
                        numColumns={2}
                        keyExtractor={(item, index) => String(index)}
                        ListFooterComponent={<View style={{height: 220}}/>}
                        renderItem={({ item }) => {
                            return (
                                <ProductComponent item={item} />
                            )
                        }} 
                        
                    />
                </View>
            </View>
        </View>
    )
}

export default Inicio

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#ecf0f1',
    },
    // Header Style
    headerContainer: {
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    badgeContainer: {
        top: -4, 
        right: -4,
        width: 18,
        height: 18,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', 
        backgroundColor: theme.colors.green
    },
    badgeText: {
        color: theme.colors.light.background
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: theme.sizes.h5
    },
    subTitleText: {
        fontSize: theme.sizes.h3,
        color: theme.colors.gray
    },  
    iconCaontainer: {
        padding: 10,
        borderRadius: 30,
        backgroundColor: currentTheme.foreground
    },
    // Search Style
    searchContainer: {
        paddingLeft: 10,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: theme.colors.clouds
    },
    textInputContainer: {
        flex: 1
    },
    // Body Style
    bodyContainer: {
        
        marginTop: 20,
    }
})

