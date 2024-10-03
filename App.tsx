import ContextProvider from '@src/utils/Context';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@src/api/queryClient';
import ChatScreen from '@src/screens/ChatScreen';
import RootNavigator from '@src/navigators/RootNavigator';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <NavigationContainer>
          {/* <SafeAreaView style={{flex: 1}}>
          <SocketScreen sender={200} reciver={100} />
          <SocketScreen sender={100} reciver={100} />
        </SafeAreaView> */}
          <RootNavigator />
        </NavigationContainer>
      </ContextProvider>
    </QueryClientProvider>
  );
};

export default App;
