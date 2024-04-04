import React, {useLayoutEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../../component/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ChatList() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header hideBack title={'Chat List'} />,
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 12,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChatDetail');
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
          Goto Detail
        </Text>
        <Ionicons name="chevron-forward" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}
