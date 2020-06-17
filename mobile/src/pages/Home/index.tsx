import React, {useEffect, useState} from 'react';
import {Text, Image, ImageBackground, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import ModalSelector from 'react-native-modal-selector';
import axios from 'axios';

import logo from '../../assets/logo.png';
import background from '../../assets/home-background.png';

interface IBGEUfs {
  sigla: string;
}

interface IBGECities {
  nome: string;
}

const Home = () => {
  const navigation = useNavigation();
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const urlUf = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  useEffect(() => {
    axios.get<IBGEUfs[]>(urlUf).then((response) => {
      const ufSigla = response.data.map((uf) => uf.sigla);
      setUfs(ufSigla);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`;

    axios.get<IBGECities[]>(url).then((response) => {
      const cityName = response.data.map((city) => city.nome);
      setCities(cityName);
    });
  }, [selectedUf]);

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity,
    });
  }

  return (
    <ImageBackground
      source={background}
      style={styles.container}
      imageStyle={{width: 240, height: 368}}>
      <View style={styles.title}>
        <Image source={logo} />
      </View>

      <View style={styles.main}>
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coletas de forma eficiente.
        </Text>
      </View>

      <View>
        <ModalSelector
          style={styles.select}
          data={ufs.map((uf) => ({key: uf, label: uf}))}
          initValue={selectedUf === '0' ? 'Selecione o UF' : selectedUf}
          optionTextStyle={styles.modalOptionText}
          initValueTextStyle={{color: '#666'}}
          selectStyle={{borderColor: '#ddd'}}
          cancelStyle={{display: 'none'}}
          scrollViewPassThruProps={{showsVerticalScrollIndicator: false}}
          onChange={(option) => {
            setSelectedUf(option.label);
          }}
        />
        <ModalSelector
          style={styles.select}
          data={cities.map((city) => ({key: city, label: city}))}
          initValue={selectedCity === '0' ? 'Selecione a cidade' : selectedCity}
          optionTextStyle={styles.modalOptionText}
          selectStyle={{borderColor: '#ddd'}}
          initValueTextStyle={{color: '#666'}}
          scrollViewPassThruProps={{showsVerticalScrollIndicator: false}}
          cancelStyle={{display: 'none'}}
          onChange={(option) => {
            setSelectedCity(option.label);
          }}
        />

        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" size={20} color="#FFF" />
          </View>
          <Text style={styles.buttonText}>Buscar pontos de coletas</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  modalOptionText: {
    color: '#666',
    fontSize: 20,
  },

  modalOptionContainer: {
    width: '50%',
  },

  footer: {},

  select: {
    marginBottom: 5,
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
});

export default Home;
