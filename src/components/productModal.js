import React, {useState} from 'react';
import { 
    View,  
    Text,
    Image,
    StyleSheet,
    Modal,
    TouchableOpacity,
    ScrollView,
    ToastAndroid
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Iconfs from 'react-native-vector-icons/FontAwesome';

// import theme
import * as theme from '../constants/theme'

import { getNombre } from '../asyncStorage/helpers';

// API agregar Productos al carrito
import { addProducttoCart } from '../api/compra/agregarCarrito';
const URL_ADD_PRODUCT_TO_CART = "https://intikisaperu.com/oficial/api/insertarcarrito.php";

const ProductModal = (props) => {
    const background = props.item.background

    const [bagVisible, setBagVisible] = useState(false)

    const ToggleBagVisible = () => {
        setBagVisible(!bagVisible)
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
            "carrito_producto": props.item.prodnombre,
            "carrito_precio": props.item.proprecio
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

    return (
        <ScrollView style={{flex: 1}}>
            <View style={[styles.container, {backgroundColor: background}]}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={props.closeModal}>
                        <Icon name="keyboard-arrow-left" size={30} color={theme.colors.light.foreground} />
                    </TouchableOpacity>
                </View>
                {/* Body */}
                <View style={styles.imgContainer}>
                    <Image source={{uri: props.item.produrl}} style={{width: 220, height: 220, resizeMode: 'contain'}} />
                </View>
                <View style={styles.detailsContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>

                        <Text style={styles.priceText}>S/.{props.item.proprecio}</Text>

                        <View style={{justifyContent: "center", alignItems: "center" }} >
                            <TouchableOpacity onPress={()=> agregaralCarrito()} style={[styles.btnContainer]} >
                                <Iconfs name="cart-plus" size={30} color='black' style={{backgroundColor:'#53ff87', padding: 9, borderRadius: 50 }} />
                            </TouchableOpacity>

                            <Text>Añadir</Text>
                        </View>

                    </View>
                    <Text style={styles.descriptionText}>{props.item.proddescripcion}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    header: {
        height: 70,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: theme.sizes.h4
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
        backgroundColor: theme.colors.light.background
    },
    badgeText: {
        color: theme.colors.light.foreground
    },
    imgContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: theme.colors.light.background,
        justifyContent: "center",
        alignItems: "center"
    },
    sizesContainer: {
        flexDirection: 'row'
    },
    sizeCircleContainer: {
        width: 30, 
        height: 30,
        marginRight: 10,
        borderRadius: 30,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: theme.colors.gray,
        backgroundColor: theme.colors.clouds,
    },
    priceText: {
        fontWeight: 'bold',
        fontSize: theme.sizes.h5,
    },
    descriptionText: {
        marginTop: 20,
        fontWeight: '900',
        fontSize: theme.sizes.h4,
        color: theme.colors.gray
    },
    footerContainer: {
        padding: 20,
        flexDirection: 'row',
        backgroundColor: theme.colors.light.background
    },
    btnContainer: {
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontWeight: 'bold',
        fontSize: theme.sizes.h3
    }
});

export default ProductModal;