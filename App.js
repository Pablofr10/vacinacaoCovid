import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/Home';
import ListaPessoas from './src/components/ListaPessoas';
import Cadastro from './src/Cadastro';
import EditarPessoas from './src/components/EditarPessoas';
import AplicarDose from './src/components/AplicarDose';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ListaPessoas" component={ListaPessoas} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="EditarPessoas" component={EditarPessoas} />
        <Stack.Screen name="AplicarDose" component={AplicarDose} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
