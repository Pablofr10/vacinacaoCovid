import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import {api} from '../service/api';
import {useNavigation} from '@react-navigation/native';

const Cadastro = () => {
  const [pessoa, setPessoa] = useState({});
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [idade, setIdade] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [grupoRisco, setGrupoRisco] = useState(false);
  const [sintomas, setSintomas] = useState(false);
  const [dose, setDose] = useState([]);

  const navigation = useNavigation();

  const addPessoa = (item) => {
    const temp = {item, ...pessoa};
    setPessoa(temp);
  };

  const salvar = () => {
    const tempPessoa = {
      nome,
      idade,
      cpf,
      grupo_risco: grupoRisco,
      sintomas,
      cidade,
      bairro,
      rua,
      numero,
      estado,
    };
    api
      .post('pessoas', tempPessoa)
      .then((res) => {
        alert('Adicionado');
        navigation.navigate('Home');
      })
      .catch((err) => alert('Erro ao adicionar' + err));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(txt) => setNome(txt)}
          placeholder="Nome"
        />
        <TextInput
          style={styles.input}
          onChangeText={(txt) => setCpf(txt)}
          placeholder="CPF"
        />
        <TextInput
          style={styles.input}
          onChangeText={(txt) => setRua(txt)}
          placeholder="Rua"
        />
        <TextInput
          style={styles.input}
          onChangeText={(txt) => setBairro(txt)}
          placeholder="Bairro"
        />
        <TextInput
          style={styles.input}
          onChangeText={(txt) => setNumero(txt)}
          placeholder="Número"
        />
        <TextInput
          style={styles.input}
          onChangeText={(txt) => setCidade(txt)}
          placeholder="Cidade"
        />
        <TextInput
          style={styles.input}
          onChangeText={(txt) => setEstado(txt)}
          placeholder="Estado"
        />
        <TextInput
          style={styles.input}
          onChangeText={(txt) => setGrupoRisco(txt)}
          placeholder="Idade"
        />
        <View style={styles.itemsGroup}>
          <Text style={{paddingTop: 12, fontSize: 16}}>Possui sintomas? </Text>
          <Picker
            selectedValue={sintomas}
            style={{height: 50, width: 100}}
            onValueChange={(txt) => setSintomas(txt)}>
            <Picker.Item label="Sim" value="False" />
            <Picker.Item label="Não" value="False" />
          </Picker>
        </View>
        <View style={styles.itemsGroup}>
          <Text style={{paddingTop: 12, fontSize: 16}}>Grupo de Risco? </Text>
          <Picker
            selectedValue={grupoRisco}
            style={{height: 50, width: 100}}
            onValueChange={(txt) => setGrupoRisco(txt)}>
            <Picker.Item label="Sim" value={true} />
            <Picker.Item label="Não" value={false} />
          </Picker>
        </View>
      </View>
      <TouchableOpacity style={styles.btnAdicionar} onPress={salvar}>
        <Text style={{color: '#fff', fontSize: 17, textAlign: 'center'}}>
          Salvar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingTop: 10,
  },
  btnAdicionar: {
    margin: 10,
    width: 300,
    backgroundColor: '#28B463',
    padding: 8,
    borderRadius: 7,
    alignSelf: 'center',
  },
  itemsGroup: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Cadastro;
