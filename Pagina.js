import React, {useState} from 'react'
import { View, Text } from 'react-native'

//Tab Stack 

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Routes Tab Screen
import AroutesScreens from './src/Screens/AroutesScreens';

import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

//productos del carrito
import { callProductos } from './src/api/productos';
const URL_PRODUCTOS = "https://intikisaperu.com/oficial/api/obtenercarrito.php";


const Pagina = () => {

  const [productos, setProductos] = useState([]);

    const llamadaProductos = async () => {

        const data = {
            "user_nombre": await getNombre(),
        }

        const respuestaJson = await callProductos(URL_PRODUCTOS, data);

        const productosarray = [];

        respuestaJson.map(e => {
            const index = productosarray.findIndex(object => object.idprod === e.idprod );

            if(index === -1 ){
                productosarray.push(e)
            }
        } )

        setProductos(productosarray);
        return productos; 
    }

    return (
        <NavigationContainer>
            <Tab.Navigator 
            initialRouteName="Inicio"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
          
                      if (route.name === 'Home') {
                        iconName = focused
                          ? 'ios-information-circle'
                          : 'ios-information-circle-outline';
                      } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                      }
          
                      // You can return any component that you like here!
                      return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#4EC68E',
                    tabBarInactiveTintColor: 'gray'
                  })}
            >
                <Tab.Screen name="Inicio" component={AroutesScreens.Inicio} /* children={()=><AroutesScreens.Inicio />} */ options={{headerShown: true, tabBarIcon: ({size,color}) => (<Icon name='home' size={size} color={color} />)}}  />
                <Tab.Screen name="Carrito" initialRouteName='Hola' component={AroutesScreens.Carrito} /* children={()=><AroutesScreens.Carrito  />} */ options={{headerShown: true, tabBarIcon: ({size,color}) => (<Icon name='shopping-cart' size={size} color={color} />)}} />
                <Tab.Screen name="Compras" component={AroutesScreens.Compras} /* children={()=><AroutesScreens.Compras />} */ options={{headerShown: true, tabBarIcon: ({size,color}) => (<Icon name='shopping-bag' size={size} color={color} />)}} />
                <Tab.Screen name="Logger" component={AroutesScreens.Logger} /* children={()=><AroutesScreens.Logger />} */ options={{headerShown: false, tabBarIcon: ({size,color}) => (<Icon name='user' size={size} color={color} />)}} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Pagina
