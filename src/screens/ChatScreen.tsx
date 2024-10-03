import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import Socket, {MESSAGE_PUB, MESSAGE_SUB} from '@src/utils/socket';

interface Props {
  reciver: number;
  sender: number;
}

const SocketScreen = ({reciver, sender}: Props) => {
  const socket = Socket.useSocket();
  const [messages, setMessages] = useState<string[]>([]);

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
    <View style={{flex: 1}}>
      <Pressable
        style={{padding: 10, borderWidth: 2}}
        onPress={() => {
          socket.current.client?.publish({
            destination: MESSAGE_PUB,
            body: JSON.stringify({
              senderId: sender,
              receiverId: reciver,
              content: `Hello, how are you? ${sender} to ${reciver}`,
              createdAt: '2024-10-03 15:30:00',
              file: null,
            }),
          });
        }}>
        <Text>보내기</Text>
      </Pressable>
      <View>
        {messages.map((m, i) => (
          <Text key={`${sender}_${reciver}_${i}`}>{m}</Text>
        ))}
      </View>
    </View>
  );
};

export default SocketScreen;
