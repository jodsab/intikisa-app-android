import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconfs from 'react-native-vector-icons/FontAwesome';

const ComoComprar = (props) => {
    return (
        <ScrollView>
            <TouchableOpacity onPress={props.closeModal} style={{flexDirection: 'row', alignItems:'center'}}>
                <Icon name="keyboard-arrow-left" size={30} />
                <Text>Como comprar</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'center' }}>
                <Image source={{uri: 'https://i.imgur.com/pOBw24N.png'}} style={{width: 150, height: 80}} />
            </View>
            <View style={{margin:15 }} >
                <Text style={{fontSize: 19, marginVertical: 5}}>1.Ve a la ventana de <Text style={{fontWeight: "bold"}}>Inicio</Text><Icon name="home" size={20} color='green'/>, busca el producto de tu elección.</Text>
                <Text style={{fontSize: 19, marginVertical: 5}}>2.<Text style={{fontWeight: "bold"}}>Presiona en el producto</Text> para mirar más fotos y ver la descripción, incluso sus ingredientes.</Text>
                <Text style={{fontSize: 19, marginVertical: 5}}>3.<Text style={{fontWeight: "bold"}}>Añadelo al carrito</Text><Icon name="shopping-cart" size={20} color='green'/> y espera el popup de confirmacion.</Text>
                <Text style={{fontSize: 19, marginVertical: 5}}>4.Ve a la ventana de <Text style={{fontWeight: "bold"}}>Carritos</Text><Icon name="shopping-cart" size={20} color='green' /> y verifica que tu producto se haya agregado correctamente.</Text>
                <Text style={{fontSize: 19, marginVertical: 5}}>5.<Text style={{fontWeight: "bold"}}>Procede al botón pagar y paga</Text>, nosotros nos encargaremos de usar la información que inscribiste al registrarte para contactarnos y enviarnos tu producto.</Text>
            </View>
        </ScrollView>
    )
}

export default ComoComprar
