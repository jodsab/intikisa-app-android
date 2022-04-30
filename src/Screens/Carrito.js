import React, {useEffect, useState} from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, Button, Linking, Alert } from 'react-native'

import { callProductos } from '../api/productos'
import { getNombre } from '../asyncStorage/helpers';

import Iconfs from 'react-native-vector-icons/FontAwesome';

const URL_PRODUCTOS = "https://intikisaperu.com/oficial/api/obtenercarrito.php";
const URL_DELETE_PRODUCTO = "https://intikisaperu.com/oficial/api/borrardecarrito.php";
const URL_TOTAL_A_PAGAR = "https://intikisaperu.com/oficial/api/totalapagar.php";

const URL_PASARELA_DE_PAGO = "https://api.mercadopago.com/checkout/preferences?access_token=APP_USR-7887698424202198-111920-4e13e41c68b56cfb2427a8b306243dc0-837446390";

import { totalaPagar } from '../api/compra/totalaPagar';

import { deleteProductCart } from '../api/compra/borrarCarrito';

import { useIsFocused } from '@react-navigation/native';

import { useFocusEffect } from '@react-navigation/native';

const cobrarCliente = async (url, data) => {
    
    const respCobro = await fetch (url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    })

    const jsonrespCobro = await respCobro.json();

    return jsonrespCobro;
}

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
            const preciaso = Object.values(respuestaJsonx)

            setPago(preciaso)
            return preciaso;
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

    const realizarCobro = async()=>{

        const pagofinal2 = await totalaPagarX();
        const pagofinal = parseFloat(pagofinal2[0]);

        const itemCobro = {
            "external_reference": "ABC",
                
            "items": [
                {
                  "title": "Carrito de Intikisa Peru",
                  "description": "Comprando diferentes productos de intikisa",
                  "picture_url": "https://images.app.goo.gl/oNYwH1ssJdWJiKKr5",
                  "quantity": 1,
                  "unit_price": pagofinal
                }
            ],
            "back_urls": {
                "success": "https://intikisaperu.com/#/compraexitosa",
                "failure": "https://intikisaperu.com/#/comprafallida",
                "pending": "https://intikisaperu.com/#/comprapendiente"
            },
            "auto_return": "approved",
        }

        const respuestaCobro = await cobrarCliente(URL_PASARELA_DE_PAGO, itemCobro); 

        const urlPago = respuestaCobro.init_point.toString();

        const isSupported = await Linking.canOpenURL(urlPago);

        if(isSupported){
            await Linking.openURL(urlPago);
        }
        else{
            await Linking.openURL(urlPago);
        }

        return respuestaCobro.init_point;

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
                    Total a pagar: <Text style={{fontSize: 20, fontWeight: 'bold'}} >S/.{pago}</Text>
                </Text>
                <Button title='pagar' color="#37CA61" accessibilityLabel="Boton para pagar" onPress={()=> {realizarCobro()}} />
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
                            <Text>S/.{e.precio}</Text>
                            <TouchableOpacity onPress={async ()=> await borrarDeCarrito(e.idprod, e.producto)} style={{width: 25}} ><Text style={{color: '#ef3737'}}><Iconfs name='minus-circle' style={{fontSize: 25}}  /></Text></TouchableOpacity>
                        </View>
                    </View>
                 )
            }
        </View> 
    )
}

export default Carrito
