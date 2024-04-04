import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Image, ScrollView, Text, TextInput, View} from 'react-native';
import Header from '../../component/Header';
import {firebase} from '@react-native-firebase/database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {orderBy, sortBy} from 'lodash';

enum MessageType {
  TXT = 'text',
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
  Document = 'document',
}

type Messages = {
  timestamp: number;
  message: string;
  sender: string;
  receiver: string;
  type: MessageType;
  path: string;
};

export default function ChatDetail() {
  const navigation = useNavigation();
  const [_messages, _setMessages] = useState<Messages[]>([]);
  const [_inputMessage, _setInputMessage] = useState<string>('');

  const _scrollRef = React.useRef<ScrollView>(null);
  const _isFirstScroll = React.useRef<boolean>(false);

  const _firebase = firebase
    .app()
    .database(
      'https://praktikumrn-default-rtdb.asia-southeast1.firebasedatabase.app',
    )
    .ref('/users/1');

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header title={'Chat Detail'} />,
    });
  }, []);

  function _sendMessage(type = MessageType.TXT) {
    const message = {
      timestamp: new Date().getTime(),
      message: _inputMessage,
      sender: '1',
      receiver: '2',
      type: MessageType.Image,
      path: 'https://img.freepik.com/premium-vector/vector-flat-icon-man-wearing-glasses-circular-vector-icon_176841-4665.jpg',
    };
    if (type !== MessageType.TXT) {
      //kirim ke backend sendiri
      const messageData = new FormData();
      messageData.append('data', message);
      messageData.append('file', '');
      return;
    }

    const newRef = _firebase.push();
    newRef.set({
      message: message,
    });
    _setInputMessage('');
  }

  useEffect(() => {
    _firebase.limitToLast(100).on('value', snapshot => {
      const data = snapshot.val();
      if (!data) return;
      const messagesTmp = Object.values(data) as Messages[];
      const messages = messagesTmp.map(message => message.message);
      const sortedMessages = orderBy(messages, ['timestamp'], ['asc']);
      _setMessages(sortedMessages as Messages[]);
      if (!_isFirstScroll.current) {
        setTimeout(() => {
          _scrollRef.current?.scrollToEnd({animated: true});
          _isFirstScroll.current = true;
        }, 100);
      }
    });

    return () => {
      _firebase.off('value');
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 12,
        }}>
        <ScrollView ref={_scrollRef}>
          {_messages?.map((message, index) => {
            const msg = message as Messages;
            return (
              <View
                key={index}
                style={{
                  padding:
                    (msg?.type ?? MessageType.TXT) === MessageType.Image
                      ? 0
                      : 12,
                  backgroundColor: msg.sender === '1' ? 'green' : 'gray',
                  marginBottom: 4,
                  maxWidth: '50%',
                  alignSelf: msg.sender === '1' ? 'flex-end' : 'flex-start',
                  borderRadius: 8,
                }}>
                {msg.type === MessageType.Image && (
                  <Image
                    source={{uri: msg.path}}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                )}
                <Text
                  style={{
                    color: 'white',
                    margin:
                      (msg?.type ?? MessageType.TXT) === MessageType.Image
                        ? 4
                        : 0,
                  }}>
                  {msg.message}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View
        style={{
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: 'gray',
          justifyContent: 'space-between',
        }}>
        <TextInput
          placeholder="Type your message"
          value={_inputMessage}
          onChangeText={_setInputMessage}
        />
        <MaterialCommunityIcons
          name="send"
          size={24}
          color="black"
          onPress={_sendMessage}
        />
      </View>
    </View>
  );
}
