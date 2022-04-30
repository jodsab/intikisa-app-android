import React, {useState} from 'react'
import {  StyleSheet, View, Text, Image, TouchableOpacity, Modal, Alert, ToastAndroid } from 'react-native'

// import Product Modal
import ProductModal from './productModal'

import Iconfs from 'react-native-vector-icons/FontAwesome';

import { getNombre } from '../asyncStorage/helpers';

// import theme
import * as theme from '../constants/theme'

import { addProducttoCart } from '../api/compra/agregarCarrito';
const URL_ADD_PRODUCT_TO_CART = "https://intikisaperu.com/oficial/api/insertarcarrito.php";

const ProductComponent = ({item}) => {
    const [productVisible, setProductVisible] = useState(false)

    const ToggleProductVisible = () => {
        setProductVisible(!productVisible)
    }

    const gettingDate = () => {
        const d = new Date();
    
        var fechita = `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`;
    
        return fechita
    }

    const agregaralCarrito = async () => {
        
        const data = {
            "user_nombre": await getNombre(),
            "carrito_fecha": gettingDate(), 
            "carrito_producto":item.prodnombre,
            "carrito_precio": item.proprecio
        }
        const respuestaJson = await addProducttoCart(URL_ADD_PRODUCT_TO_CART, data);
        if(respuestaJson.registro == true){
            ToastAndroid.showWithGravity(
                'Producto agregado correctamente.',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
                )
        }
    }

    return(
        <View style={{flex: 1}} >
        <TouchableOpacity 
            onPress={() => ToggleProductVisible()}
            style={[styles.container, {backgroundColor: 'white'}, {flex: 1}]}>

                <Modal 
                    animationType="slide" 
                    visible={productVisible}
                    onRequestClose={() => ToggleProductVisible()}>
                        <ProductModal closeModal={() => ToggleProductVisible()} item={item} />
                </Modal>
                
                <View>
                    <Text style={styles.title}>{item.prodnombre}</Text>
                    <View style={{flexDirection:'row', alignItems: 'center'}}>
                        <Text style={styles.subTitle}>S/.{item.proprecio}</Text>
                        <TouchableOpacity onPress={()=> agregaralCarrito()} style={{width: 35}} >
                            <Iconfs name="cart-plus" size={20} color='black' style={{backgroundColor:'#53ff87', padding: 7, borderRadius: 50 }} />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.imgContainer}>
                        <Image source={{uri: item.produrl}} style={{width: 100, height: 100, resizeMode: 'contain'}} />
                    </View>
                </View>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        margin: 5,
        borderRadius: 10,
    },
    title: {
        fontWeight: 'bold',
        minHeight: 40,
        fontSize: theme.sizes.h3,
        color: theme.colors.light.foreground
    },
    subTitle: {
        fontSize: theme.sizes.h3,
        color: theme.colors.light.foreground,
        marginRight: 10
    },
    imgContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ProductComponent