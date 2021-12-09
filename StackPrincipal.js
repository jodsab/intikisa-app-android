import * as React from 'react';
import { Pressable, View, Text } from 'react-native';

//Navigator
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

enableScreens();

const Stack = createNativeStackNavigator();

import Routes from './src/PantallaInicio/StackRoutes';
import Login from './src/PantallaInicio/Login';
import Registro from './src/PantallaInicio/Registro';
import Acceso from './src/PantallaInicio/Acceso';

export default function StackPrincipal({navigation}) {

    const navigationRef = useNavigationContainerRef();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Acceso'>
                <Stack.Screen name="Acceso" component={Acceso} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Registro" component={Registro} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

