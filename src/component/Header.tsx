import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import images from '../assets/icon/images';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {
  title: string;
  subtitle?: string;
  showMoreVisible?: boolean;
  hideBack?: boolean;
  onCountChange?: (count: number) => void;
};

export default function Header(props: Props) {
  const {title, subtitle, onCountChange, showMoreVisible, hideBack} = props;

  const [headerCount, setHeaderCount] = useState(0);

  const navigation = useNavigation();

  function _renderGoBack() {
    if (!navigation?.canGoBack() || hideBack) return null;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Entypo name="chevron-left" size={30} color="black" />
        {/* <Image source={images.ArrowBack} style={{width: 48, height: 48}} /> */}
      </TouchableOpacity>
    );
  }

  function _renderShowMore() {
    if (!showMoreVisible) return null;
    return <Image source={images.More} style={{width: 48, height: 48}} />;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        marginBottom: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 8,
      }}>
      {_renderGoBack()}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontFamily: 'EuclidCircularA-Bold',
          }}>
          {title}
        </Text>
      </View>
      {_renderShowMore()}
    </View>
  );
}
