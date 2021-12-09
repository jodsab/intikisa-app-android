import React, {useEffect, useState} from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, Button } from 'react-native'

import { callProductos } from '../api/productos'
import { getNombre } from '../asyncStorage/helpers';

import Iconfs from 'react-native-vector-icons/FontAwesome';

const URL_PRODUCTOS = "https://intikisaperu.com/oficial/api/obtenercarrito.php";
const URL_DELETE_PRODUCTO = "https://intikisaperu.com/oficial/api/borrardecarrito.php";
const URL_TOTAL_A_PAGAR = "https://intikisaperu.com/oficial/api/totalapagar.php";

import { totalaPagar } from '../api/compra/totalaPagar';

import { deleteProductCart } from '../api/compra/borrarCarrito';

import { useIsFocused } from '@react-navigation/native';

import { useFocusEffect } from '@react-navigation/native';

const Carrito = (props, {navigation}) => {


    const [productos, setProductos] = useState([]);
    const [pago, setPago] = useState(0);

    const llamadaProductos = async () => {

        const data = {
            "user_nombre": await getNombre(),
        }

        const nombreUSer = await getNombre();

        if( typeof nombreUSer !== 'undefined' ){
            const respuestaJson = await callProductos(URL_PRODUCTOS, data);

            const productosarray = [];
    
            respuestaJson.map(e => {
                const index = productosarray.findIndex(object => object.idprod === e.idprod );
    
                if(index === -1 ){
                    productosarray.push(e)
                }
            } )
            
            setProductos(productosarray);
        } 
        else{
            setProductos([]);
        }
         
    }

    const totalaPagarX = async() => {
        const data = {
            "user_nombre": await getNombre(),
        }

        const nombreUsuariox = await getNombre();

        if( typeof nombreUsuariox !== 'undefined' ){
            const respuestaJsonx = await totalaPagar(URL_TOTAL_A_PAGAR, data);
            /* console.log(respuestaJsonx)
            console.log(Object.values(respuestaJsonx)) */
            const preciaso = Object.values(respuestaJsonx)
            /* console.log(preciaso[0]) */
            /* setPago(Object.values(respuestaJsonx)) */
            setPago(preciaso)
            /* console.log(pago) */
        } 
        else{
            setPago(0);
        }
    }

    const borrarDeCarrito = async (id,nombreProducto) => {

        const data = {
            "carrito_user_nombre": await getNombre(),
            "id_carrito": id,
            "carrito_producto_nombre": nombreProducto,
        }

        const respuestaJson = await deleteProductCart(URL_DELETE_PRODUCTO, data);
        await llamadaProductos();
        await totalaPagarX();
    }

    useFocusEffect(
        React.useCallback(() => {
            async function fetchProductos() {
                const respuestaFetchProducts = await llamadaProductos();
                const totalaPagarm = await totalaPagarX();
            }
            fetchProductos();
        }, [navigation])
      );

    return (
        <View style={{backgroundColor: "#ecf0f1"}} >
            <View style={{flexDirection: 'row', justifyContent:'flex-end', alignItems: 'center', marginHorizontal: 15, marginVertical: 5}}>
                <Text style={{fontSize: 16, marginRight: 10}}>
                    Total a pagar: <Text style={{fontSize: 20, fontWeight: 'bold'}} >S/.{pago}.00</Text>
                </Text>
                <Button title='pagar' color="#37CA61" accessibilityLabel="Boton para pagar" />
            </View>
            {
                productos.length === 0 ? 
                <Text>No hay productos en el carrito</Text>
                :
                productos.map((e,key) => 
                    <View key={e.idprod} style={{flexDirection: 'row', justifyContent: "flex-start", borderColor: "#D8D8D8", borderWidth: 1, marginHorizontal: 8, marginVertical: 4,paddingVertical: 8, backgroundColor: "white", borderRadius: 12}}>
                        <Image source={{uri: e.url}} style={{width: 80, height: 80, resizeMode: 'contain', marginHorizontal: 10}} />
                        <View>
                            <Text>{e.producto}</Text>
                            <Text>S/.{e.precio}.00</Text>
                            <TouchableOpacity onPress={async ()=> await borrarDeCarrito(e.idprod, e.producto)} style={{width: 25}} ><Text style={{color: '#ef3737'}}><Iconfs name='minus-circle' style={{fontSize: 25}}  /></Text></TouchableOpacity>
                        </View>
                    </View>
                 )
            }
        </View> 
    )
}

export default Carrito
