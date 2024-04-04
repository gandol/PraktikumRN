import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {Button, Text, View} from 'react-native';
import Header from '../component/Header';

export default function ProfileScreen(props) {
  const {navigation, route} = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title="Profile" />,
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Text>ProfileScreen</Text>
      <Text>{route?.params?.data}</Text>
      <Button
        title="Go to Testing"
        onPress={() => {
          navigation.replace('Testing');
        }}
      />
    </View>
  );
}
