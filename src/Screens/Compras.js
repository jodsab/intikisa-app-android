import React from 'react'
import { View, Text } from 'react-native'

import { useFocusEffect } from '@react-navigation/native';

const Compras = () => {

    /* useFocusEffect(
        React.useCallback(() => {
            async function fetchProductos() {
                const respuestaFetchProducts = await await llamadaProductos();
            }
            fetchProductos();
        }, [navigation])
      ); */

    return (
        <View>
            <Text>Compras</Text>
        </View>
    )
}

export default Compras
