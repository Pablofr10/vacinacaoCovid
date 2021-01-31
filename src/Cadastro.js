import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';

const Cadastro = () => {
  const [pessoa, setPessoa] = useState({});
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [grupoRisco, setGrupoRisco] = useState(false);
  const [sintomas, setSintomas] = useState(false);
  const [dose, setDose] = useState([]);

  const addPessoa = (item) => {
    const temp = {item, ...pessoa};
    setPessoa(temp);
  };

  const adicionar = () => {
    alert('adicionado');
  };

  return (
    <View>
      <Text>Olá</Text>
      <View>
        <TextInput onChangeText={(txt) => setNome(txt)} placeholder="Nome" />
        <TextInput onChangeText={(txt) => setCpf(txt)} placeholder="Nome" />
        <TextInput
          onChangeText={(txt) => setGrupoRisco(txt)}
          placeholder="Nome"
        />

        <TextInput
          onChangeText={(txt) => setSintomas(txt)}
          placeholder="Nome"
        />
        <Picker
          selectedValue={this.state.language}
          style={{height: 50, width: 100}}
          onValueChange={(txt) => setSintomas(txt)}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.btnAdicionar} onPress={adicionar}>
        <View style={styles.itemsGroup}>
          <Text style={{color: '#fff', fontSize: 17}}>Adicionar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnAdicionar: {
    margin: 10,
    width: 120,
    backgroundColor: '#28B463',
    padding: 8,
    borderRadius: 7,
  },
});

export default Cadastro;
