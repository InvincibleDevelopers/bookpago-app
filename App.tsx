import {NavigationContainer} from '@react-navigation/native';
import queryClient from '@src/api/queryClient';
import RootNavigator from '@src/navigators/RootNavigator';
import ContextProvider from '@src/utils/Context';
import {QueryClientProvider} from '@tanstack/react-query';
import {EventProvider} from 'react-native-outside-press';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <NavigationContainer>
          <EventProvider>
            <RootNavigator />
          </EventProvider>
        </NavigationContainer>
      </ContextProvider>
    </QueryClientProvider>
  );
};

export default App;
