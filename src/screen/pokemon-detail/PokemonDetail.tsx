import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import Header from '../../component/Header';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';

export default function PokemonDetail(props: any) {
  const [_isLoading, _setIsLoading] = useState<boolean>(true);
  const [_dataDetail, setDataDetail] = useState<any>({});

  const navigation = useNavigation();
  const {name} = props.route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title={'Pokemon Detail'} />,
    });
  }, []);

  async function getPokemonDetail() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setDataDetail(data);
      _setIsLoading(false);
    } catch (error) {}
  }

  useEffect(() => {
    getPokemonDetail();
  }, []);

  function _renderImage() {
    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 100,
            borderColor: 'gray',
          }}>
          <Image
            source={{uri: _dataDetail?.sprites?.back_shiny}}
            style={{width: 100, height: 100}}
          />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {_isLoading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <View
          style={{
            padding: 12,
          }}>
          {_renderImage()}
        </View>
      )}
    </View>
  );
}
