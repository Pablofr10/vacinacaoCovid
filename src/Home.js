import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {api} from '../service/api';

import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [pessoas, setPessoas] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    api
      .get('pessoas')
      .then((res) => setPessoas(res.data))
      .catch((err) => alert(`Erro ao carregar ${err}`));
  }, []);

  const adicionar = () => {
    navigation.navigate('Cadastro');
  };

  const ver = (pessoa) => {
    navigation.navigate('ListaPessoas', {data: pessoa});
  };

  return (
    <View>
      <Text style={styles.titulo}>Cadastro Vacinados</Text>
      <TouchableOpacity style={styles.btnAdicionar} onPress={adicionar}>
        <View style={styles.itemsGroup}>
          <Icon style={{marginRight: 8}} name="plus" size={25} color="white" />
          <Text style={{color: '#fff', fontSize: 17}}>Adicionar</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={pessoas}
        renderItem={({item}) => (
          <TouchableOpacity onPress={ver(item)} style={styles.container}>
            <View style={styles.itemsGroup}>
              <View style={styles.items}>
                <Text style={styles.txtLabel}>Nome: </Text>
                <Text style={styles.txt}>{item.nome}</Text>
              </View>
              <View style={styles.items}>
                <Text style={styles.txtLabel}>CPF: </Text>
                <Text style={styles.txt}>{item.cpf}</Text>
              </View>
            </View>
            <View style={styles.items}>
              {item?.dose.length > 1 ? (
                <View style={styles.items}>
                  <Text style={styles.txt}>Imunizado </Text>
                  <Icon name="check" color="green" size={25} />
                </View>
              ) : (
                <Text style={styles.txt}>
                  Pendente {2 - item?.dose.length} dose
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },
  container: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5,
    padding: 4,
  },
  items: {
    flexDirection: 'row',
  },
  txt: {
    fontSize: 16,
  },
  txtLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemsGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnAdicionar: {
    margin: 10,
    width: 120,
    backgroundColor: '#28B463',
    padding: 8,
    borderRadius: 7,
  },
});

export default Home;
