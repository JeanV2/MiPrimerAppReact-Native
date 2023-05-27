import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Listado } from './Listado';
import { Registro } from './Registro';

const Stack = createStackNavigator();

export const Navigator= () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Registro" component={Registro} />
      <Stack.Screen name="Listado" component={Listado} />
    </Stack.Navigator>
  );
}