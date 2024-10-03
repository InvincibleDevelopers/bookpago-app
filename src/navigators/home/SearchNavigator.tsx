import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeTabParamList, SearchStackParamList} from '@src/types';
import SearchScreen from '../../screens/home/search/SearchScreen';
import BookDetailScreen from '@src/screens/home/BookDetailScreen';

type Props = BottomTabScreenProps<HomeTabParamList, 'Search'>;

const Stack = createStackNavigator<SearchStackParamList>();

const SearchNavigator = ({navigation}: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{headerShown: false}}
        component={SearchScreen}
      />
      <Stack.Screen
        name="BookDetail"
        options={{
          headerShown: false,
        }}
        component={BookDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
