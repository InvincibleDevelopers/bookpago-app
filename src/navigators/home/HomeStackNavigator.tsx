import {createStackNavigator} from '@react-navigation/stack';
import HomeMainScreen from '@src/screens/home/HomeMainScreen';
import BookDetailScreen from '@src/screens/home/BookDetailScreen';
import {HomeStackParamList} from '@src/types';
import ClubDetailScreen from '@src/screens/home/ClubDetailScreen';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, presentation: 'card'}}>
      <Stack.Screen name="HomeMain" component={HomeMainScreen} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen name="ClubDetail" component={ClubDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
