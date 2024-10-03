import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ChatList from '@src/components/ChatList';
import BackHeader from '@src/components/common/header/BackHeader';
import {RootStackParamList} from '@src/types';
import {SafeAreaView} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const ChatScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <BackHeader imageProps={{onPress: () => navigation.goBack()}} />
      <ChatList senderId="1002" receiverId="1001" />
      <ChatList senderId="1001" receiverId="1002" />
    </SafeAreaView>
  );
};

export default ChatScreen;
