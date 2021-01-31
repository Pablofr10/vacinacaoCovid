import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import {api} from '../../service/api';

const ListaPessoas = () => {
  const [pessoa, setPessoa] = useState({});
  const [dose, setDose] = useState([]);
  const route = useRoute();

  const user = route.params?.data;

  const navigation = useNavigation();

  useEffect(() => {
    setPessoa(user);
    setDose(user?.dose);
  }, [user]);

  const editar = () => {
    navigation.navigate('EditarPessoas', {data: user});
  };

  const deletar = () => {
    console.log(pessoa.id);
    api
      .delete(`pessoas/${pessoa.id}`)
      .then((res) => {
        alert('Excluido com sucesso');
        navigation.navigate('Home', {data: user});
      })
      .catch((err) => alert(`Erro ao excluir ${err}`));
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, textAlign: 'center'}}>{pessoa.nome}</Text>
      <View style={styles.itemsGroup}>
        <View style={styles.items}>
          <Text style={styles.label}>Idade: </Text>
          <Text>{pessoa.idade}</Text>
        </View>
        <View style={styles.items}>
          <Text style={styles.label}>Grupo de Risco: </Text>
          <Text>{pessoa.grupo_risco ? 'Sim' : 'Não'}</Text>
        </View>
        <View style={styles.items}>
          <Text style={styles.label}>Sintomas: </Text>
          <Text>{pessoa.sintomas ? 'Sim' : 'Não'}</Text>
        </View>
      </View>
      <View style={styles.itemsGroup}>
        <View style={styles.items}>
          <Text>{pessoa.rua}, </Text>
          <Text>{pessoa.numero}, </Text>
          <Text>{pessoa.bairro}, </Text>
          <Text>{pessoa.cidade} - </Text>
          <Text>{pessoa.estado}</Text>
        </View>
      </View>
      <View style={styles.infoVacinacao}>
        <View>
          <Text style={styles.labelVacina}>Informação Vacinação</Text>
          <View style={styles.items}>
            {dose.length > 1 ? (
              <View style={styles.items}>
                <Text style={{fontSize: 18}}>Imunizado </Text>
                <Icon name="check" color="green" size={25} />
              </View>
            ) : (
              <Text style={{fontSize: 18}}>
                Pendente: {2 - dose.length} dose
              </Text>
            )}
          </View>
        </View>

        <View style={styles.items}>
          <FlatList
            data={dose}
            renderItem={({item}) => (
              <View style={styles.containerDose}>
                <View style={styles.items}>
                  <Text style={styles.label}>Dose: </Text>
                  <Text>{item.id === 1 ? 'Primeira' : 'Segunda'} </Text>
                  <Text style={styles.label}>pessoa: </Text>
                  <Text>{item.pessoa} </Text>
                  <Text style={styles.label}>Hora: </Text>
                  <Text>{item.hora}</Text>
                </View>
                <View style={styles.items}>
                  <Text style={styles.label}>Local: </Text>
                  <Text>{item.local}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <View style={styles.itemsAction}>
        <TouchableOpacity style={styles.btnEditar} onPress={editar}>
          <View style={styles.itemsGroup}>
            <Icon
              style={{marginRight: 8}}
              name="pencil"
              size={30}
              color="white"
            />
            <Text style={{color: '#fff', fontSize: 22}}>Editar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnExcluir} onPress={deletar}>
          <View style={styles.itemsGroup}>
            <Icon
              style={{marginRight: 8}}
              name="trash"
              size={30}
              color="white"
            />
            <Text style={{color: '#fff', fontSize: 22}}>Excluir</Text>
          </View>
        </TouchableOpacity>
      </View>
      {dose?.length >= 2 ? (
        <Text></Text>
      ) : (
        <TouchableOpacity
          style={styles.btnVacinar}
          onPress={() => navigation.navigate('AplicarDose', {data: user})}>
          <View style={styles.itemsGroup}>
            <Icon
              style={{marginRight: 8}}
              name="plus-circle"
              size={30}
              color="white"
            />
            <Text style={{color: '#fff', fontSize: 22}}>Nova Dose</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5,
    padding: 4,
  },
  items: {
    flexDirection: 'row',
  },
  itemsGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
  },
  labelVacina: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoVacinacao: {
    paddingTop: 10,
  },
  containerDose: {
    marginBottom: 10,
  },
  btnEditar: {
    backgroundColor: '#2980B9',
    padding: 8,
    borderRadius: 7,
  },
  btnExcluir: {
    backgroundColor: '#C0392B',
    padding: 8,
    flexDirection: 'row',
    borderRadius: 7,
  },
  btnVacinar: {
    marginTop: 20,
    backgroundColor: '#28B47F',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
  },

  itemsAction: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ListaPessoas;
