import ContextProvider from '@src/utils/Context';
import RootNavigator from '@src/navigators/RootNavigator';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from '@src/api/queryClient';

function App(): React.JSX.Element {

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <RootNavigator />
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
