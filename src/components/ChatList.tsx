import {useEffect, useRef, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import dayjs from 'dayjs';
import Socket, {MESSAGE_PUB, MESSAGE_SUB} from '@src/utils/socket';
import * as StompJs from '@stomp/stompjs';

interface Props {
  receiverId: string;
  senderId: string;
}

const ChatList = ({receiverId, senderId}: Props) => {
  const socketRef = useRef<StompJs.Client | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = (content: string) => {
    const createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const bodyString = JSON.stringify({
      senderId,
      receiverId,
      content,
      createdAt,
    });

    socketRef.current?.publish({
      destination: MESSAGE_PUB,
      body: bodyString,
    });
  };

  useEffect(() => {
    const socket = new Socket().create();

    socket.onConnect = () => {
      socket.subscribe(MESSAGE_SUB, message => {
        console.log('SUB', message.body);
        setMessages(prev => [...prev, message.body]);
      });
    };

    socket.activate();
    socketRef.current = socket;

    return () => {
      socket.deactivate();
      socketRef.current = null;
    };
  }, []);

  return (
    <ScrollView
      style={{flex: 1, padding: 10, borderWidth: 2, borderColor: 'green'}}>
      <Pressable
        style={{padding: 10, borderWidth: 2}}
        onPress={() =>
          sendMessage(`Hello, how are you? ${senderId} to ${receiverId}`)
        }>
        <Text>보내기</Text>
      </Pressable>
      <View>
        {messages.map((m, i) => (
          <Text key={`${senderId}_${receiverId}_${i}`}>{m}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default ChatList;
