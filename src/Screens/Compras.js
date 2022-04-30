import React, {useState} from 'react'
import { View, Text, Image } from 'react-native'

import { useFocusEffect } from '@react-navigation/native';

import { getNombre } from '../asyncStorage/helpers';

const URL_OBTENER_VENTAS = "https://intikisaperu.com/oficial/api/obtenerventa.php";

export const callProductos = async (url, data) => {

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


const Compras = ({navigation}) => {

    const [productos,setProductos] = useState([]);
    const [fechas, setFechas] = useState([]);
    const [direccion, setDireccion] = useState('');
    const [celular, setCelular] = useState('');

    const fetchVentas = async () => {

        const data = {
            "user_nombre": await getNombre(),
        }

        const usersaso = await getNombre();

        if( typeof usersaso != 'undefined'){
            const respuestaJson = await callProductos(URL_OBTENER_VENTAS, data);
            setProductos(respuestaJson)
    
            const fechasAux = [];
        
            respuestaJson.map(e => {
                const index = fechasAux.findIndex(object => object.vfecha === e.vfecha );
        
                if(index === -1 ){
                    fechasAux.push(e)
                }
            })
    
            setFechas(fechasAux);
            
            return respuestaJson;
        }
        else {
            setProductos([])
        }
        
    }

    useFocusEffect(
        React.useCallback(() => {
            async function fetchCompras() {
                const ventas = await fetchVentas();
            }
            fetchCompras();
        }, [navigation])
      );

    return (
        <View>
            {
                productos.length >= 1 ? 
            <View style={{margin: 10}}>
                <Text style={{color: 'black'}} >(Todas las compras demoran máximo 3 días)</Text>
                <Text>Dirección de envio: {productos[0].vdireccion}</Text>
                <Text>Celular de contacto: {productos[0].vcelular}</Text>
                <Text>Email de contacto: {productos[0].vemail}</Text>
                <View style={{borderColor: 'black', borderWidth: 1, margin: 5, backgroundColor: 'white', borderRadius: 5}}>
                {
                    fechas.map(f => 
                        <View>
                            <Text style={{marginHorizontal: 4}}>Pagado el {f.vfecha}</Text>
                        </View>
                        )
                }
                <View style={{borderColor: 'red', borderWidth: 0, margin: 5}}>
                    <Text>
                    Lista de productos:
                    </Text>
                {
                    productos.map(e => 
                    <View>
                        <Text>-{e.vproducto} </Text>
                    </View>
                        )
                }
                </View>
                </View></View> 
                : 
            <Text>No hay compras</Text>
            }
            
        </View>
    )
}

export default Compras
