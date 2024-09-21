import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {MainTabs, SearchScreens} from '@src/types';
import SearchScreen from '../stack/book/SearchScreen';
import DetailScreen from '../stack/book/DetailScreen';

type Props = BottomTabScreenProps<MainTabs, 'Search'>;

const Stack = createStackNavigator<SearchScreens>();

const SearchTab = ({navigation}: Props) => {
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
          //  cardStyleInterpolator: CardStyleInterpolators
        }}
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};

export default SearchTab;
