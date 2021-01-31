import React, {useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import {api} from '../../service/api';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';

const AplicarDose = () => {
  const [local, setLocal] = useState(false);
  const [id, setId] = useState(false);
  const [dose, setDose] = useState([]);

  const navigation = useNavigation();

  const route = useRoute();

  const user = route.params?.data;

  useEffect(() => {
    setDose(user.dose);
    setId(user.id);
  }, [user]);

  function dataAtualFormatada() {
    var data = new Date(),
      dia = data.getDate().toString(),
      diaF = dia.length == 1 ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(),
      mesF = mes.length == 1 ? '0' + mes : mes,
      anoF = data.getFullYear();
    return diaF + '/' + mesF + '/' + anoF;
  }

  function horaFormatada() {
    var data = new Date(),
      hora = data.getHours(),
      minutos = data.getMinutes();
    return `${hora}/${minutos}`;
  }

  const salvar = () => {
    const temp = {
      id: dose.length + 1,
      local,
      hora: horaFormatada(),
      data: dataAtualFormatada(),
    };

    dose.push(temp);

    api
      .patch(`pessoas/${id}`, {dose})
      .then((res) => {
        alert('Editado com sucesso!');
        navigation.navigate('Home', {data: user});
      })
      .catch((err) => alert('Erro ao adicionar' + err));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 20}}>
          Aplicar a {dose.length + 1 == 1 ? 'Primeira' : 'Segunda'} Dose
        </Text>
        <TextInput
          style={styles.input}
          value={local}
          onChangeText={(txt) => setLocal(txt)}
          placeholder="Local"
        />
      </View>

      <TouchableOpacity style={styles.btnAdicionar} onPress={salvar}>
        <Text style={{color: '#fff', fontSize: 17, textAlign: 'center'}}>
          Aplicar
        </Text>
      </TouchableOpacity>
      <View>
        {dose.map((x) => (
          <View>
            <Text key={x.id} style={{fontSize: 18, textAlign: 'center'}}>
              {x.id == 1 ? 'Primeira' : 'Segunda'} Dose
            </Text>
            <Text style={{alignSelf: 'center'}}>
              {x.local} {x.data} {x.hora}
            </Text>
          </View>
        ))}
      </View>
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

export default AplicarDose;
