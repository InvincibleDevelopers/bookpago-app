import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import Socket, {MESSAGE_PUB, MESSAGE_SUB} from '@src/utils/socket';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@src/types';
import dayjs from 'dayjs';
import BackHeader from '@src/components/common/header/BackHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const ChatScreen = ({navigation}: Props) => {
  const socket = Socket.useSocket();
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = ({
    receiverId,
    content,
    senderId,
  }: {
    receiverId: string;
    content: string;
    senderId: string;
  }) => {
    socket.current.client?.publish({
      destination: MESSAGE_PUB,
      body: JSON.stringify({
        senderId,
        receiverId,
        content,
        createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }),
    });
  };

  useEffect(() => {
    socket.current.onConnect(client => {
      client.subscribe(MESSAGE_SUB, e => {
        console.log('SUB', e.body);
        setMessages(prev => [...prev, e.body]);
      });
    });

    return () => {
      socket.current.disConnect();
    };
  }, []);

  return (
    <SafeAreaView>
      <BackHeader imageProps={{onPress: () => navigation.goBack()}} />
      <View style={{flex: 1}}>
        <Pressable
          style={{padding: 10, borderWidth: 2}}
          onPress={() =>
            sendMessage({
              senderId: '1000',
              receiverId: '1001',
              content: `Hello, how are you? ${'1000'} to ${'1001'}`,
            })
          }>
          <Text>보내기</Text>
        </Pressable>
        <View>
          {messages.map((m, i) => (
            <Text key={`${'1000'}_${'1001'}_${i}`}>{m}</Text>
          ))}
        </View>
      </View>
      <View style={{flex: 1}}>
        <Pressable
          style={{padding: 10, borderWidth: 2}}
          onPress={() => {
            sendMessage({
              senderId: '1001',
              receiverId: '1000',
              content: `Hello, how are you? ${'1001'} to ${'1000'}`,
            });
          }}>
          <Text>보내기</Text>
        </Pressable>
        <View>
          {messages.map((m, i) => (
            <Text key={`${'1001'}_${'1000'}_${i}`}>{m}</Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
