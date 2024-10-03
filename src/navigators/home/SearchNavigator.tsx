import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeTabParamList, SearchStackParamList} from '@src/types';
import SearchScreen from '../../screens/home/search/SearchScreen';
import DetailScreen from '@src/screens/home/search/DetailScreen';

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
        name="Detail"
        options={{
          headerShown: false,
        }}
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
