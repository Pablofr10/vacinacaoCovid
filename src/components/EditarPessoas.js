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
import {api} from '../../service/api';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';

const EditarPessoa = () => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [idade, setIdade] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState(0);
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [grupoRisco, setGrupoRisco] = useState(false);
  const [sintomas, setSintomas] = useState(false);
  const [dose, setDose] = useState([]);

  const navigation = useNavigation();

  const route = useRoute();

  const user = route.params?.data;

  useEffect(() => {
    console.log(user);
    setId(user.id);
    setNome(user.nome);
    setCpf(user.cpf);
    setIdade(user.idade);
    setRua(user.rua);
    setNumero(user.numero);
    setBairro(user.bairro);
    setCidade(user.cidade);
    setEstado(user.estado);
    setGrupoRisco(user.grupo_risco);
    setSintomas(user.sintomas);
    setDose(user.dose);
  }, [user]);

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
      dose,
    };
    api
      .patch(`pessoas/${id}`, tempPessoa)
      .then((res) => {
        alert('Editado com sucesso!');
        navigation.navigate('Home', {data: user});
      })
      .catch((err) => alert('Erro ao adicionar' + err));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={(txt) => setNome(txt)}
          placeholder="Nome"
        />
        <TextInput
          style={styles.input}
          value={idade}
          onChangeText={(txt) => setIdade(txt)}
          placeholder="Idade"
        />
        <TextInput
          style={styles.input}
          value={cpf}
          onChangeText={(txt) => setCpf(txt)}
          placeholder="CPF"
        />
        <TextInput
          style={styles.input}
          value={rua}
          onChangeText={(txt) => setRua(txt)}
          placeholder="Rua"
        />
        <TextInput
          style={styles.input}
          value={bairro}
          onChangeText={(txt) => setBairro(txt)}
          placeholder="Bairro"
        />
        <TextInput
          style={styles.input}
          value={numero}
          onChangeText={(txt) => setNumero(txt)}
          placeholder="Número"
        />
        <TextInput
          style={styles.input}
          value={cidade}
          onChangeText={(txt) => setCidade(txt)}
          placeholder="Cidade"
        />
        <TextInput
          style={styles.input}
          value={estado}
          onChangeText={(txt) => setEstado(txt)}
          placeholder="Estado"
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
      <View>
        {dose.map((x) => (
          <View>
            <Text style={{fontSize: 18, textAlign: 'center'}}>
              {x.id == 1 ? 'Primeira' : 'Segunda'} Dose
            </Text>
            <Text style={{alignSelf: 'center'}}>
              {x.local} {x.data} {x.hora}
            </Text>
          </View>
        ))}
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

export default EditarPessoa;
