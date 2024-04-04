import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../component/Header';
import HomeHeader from './home-header/Homeheader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FlatList} from 'react-native-gesture-handler';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [_dataList, setDataList] = React.useState<any[]>([]);
  const [_isLoading, _setIsLoading] = React.useState<boolean>(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title={'Home Screen'} />,
    });
  }, []);

  async function getListData(currentOffset = 0) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=20`,
      );
      const data = await response.json();
      if (currentOffset > 0) {
        setDataList([..._dataList, ...data.results]);
      } else {
        setDataList(data.results);
      }
      _setIsLoading(false);
    } catch (error) {}
  }

  useEffect(() => {
    getListData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <HomeHeader />
      <View
        style={{
          paddingHorizontal: 12,
          flex: 1,
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={_dataList}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('PokemonDetail', {
                    name: item.name,
                  });
                }}
                style={{
                  height: 50,
                  borderWidth: 1,
                  marginBottom: 4,
                  borderRadius: 6,
                  paddingHorizontal: 12,
                  borderColor: 'gray',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: 'EuclidCircularA-Medium',
                    fontSize: 16,
                    color: 'black',
                  }}>
                  {item.name}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="black" />
              </TouchableOpacity>
            );
          }}
          onEndReached={() => {
            _setIsLoading(true);
            getListData(_dataList.length);
          }}
          refreshControl={
            <RefreshControl refreshing={_isLoading} onRefresh={getListData} />
          }
        />
        {_isLoading && <ActivityIndicator size="large" color="red" />}
        {/* // <ScrollView showsVerticalScrollIndicator={false}>
        //   {_dataList?.map((item, index) => {
        //   })}
        // </ScrollView> */}
      </View>
    </View>
  );
}
