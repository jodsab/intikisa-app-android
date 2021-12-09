import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

const AboutUs = (props) => {
  return (
    <ScrollView>
      <TouchableOpacity
        onPress={props.closeModal}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Icon name="keyboard-arrow-left" size={30} />
        <Text>Como comprar</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: "https://i.imgur.com/pOBw24N.png" }}
          style={{ width: 150, height: 80 }}
        />
      </View>
      <View style={{marginHorizontal: 15}}>
        <View style={{marginVertical: 12}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Nosotros</Text>
          <Text style={{fontSize: 15, textAlign: 'center'}}>
            Somos una empresa que nace con el fin de brindar productos de
            calidad y que además contengan un sabor único y aporten beneficios a
            nuestra salud, Asimismo seguir un estilo de vida sana va a
            proporcionarnos un aumento de defensas en nuestro sistema
            inmunológico, es por ello que INTIKISA PERU selecciono diversos
            productos con la idea de brindarles una alternativa sana y natural
            para la alimentación diaria de todos nuestros clientes debido a las
            innumerables propiedades con las que nuestros productos cuentan,
            mejorando así la calidad de vida de nuestro consumidores. Además,
            INTIKISA PERU cuenta con la aprobación de la FDA y certificación
            kosher, las cuales acreditan que nuestros productos cumplen con
            todos los requisitos para ser considerados productos de alto
            estándar de calidad.
          </Text>
        </View>
        <View style={{marginVertical: 12}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Misión</Text>
          <Text style={{fontSize: 15, textAlign: 'center'}}>
            Satisfacer las necesidades de nuestros clientes, brindando productos
            saludables y de calidad, los cuales son una alternativa sana y
            natural para nuestra alimentación diaria debido a sus innumerables
            beneficios con los que nuestros productos cuentan.
          </Text>
        </View>
        <View style={{marginVertical: 12}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Visión</Text>
          <Text style={{fontSize: 15, textAlign: 'center'}}>
            Ser una empresa líder en brindar alimentos saludables, reconocidos
            por el consumidor como un referente que satisface sus necesidades a
            través de productos de alta calidad.
          </Text>
        </View>
        <View style={{marginVertical: 12}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>Contacto</Text>
          <Text style={{fontSize: 15, textAlign: 'center'}}>
            CEO de la empresa: +1 (786)
            777-9201
          </Text>
          <Text style={{fontSize: 15, textAlign: 'center'}}>
            Area de ventas: +51 992 851 181
          </Text>
          <Text style={{fontSize: 15, textAlign: 'center'}}>
            Desarrollador de la App: +51 949
            959 463, camilo.b.q@hotmail.com
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutUs;
