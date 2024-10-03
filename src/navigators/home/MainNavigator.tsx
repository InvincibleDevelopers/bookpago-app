import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '@src/screens/home/MainScreen';
import BookDetailScreen from '@src/screens/home/BookDetailScreen';
import {MainStackParamList} from '@src/types';
import ClubDetailScreen from '@src/screens/home/ClubDetailScreen';

const Stack = createStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, presentation: 'card'}}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen name="ClubDetail" component={ClubDetailScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
