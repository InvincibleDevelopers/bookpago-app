import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {HomeTabParamList, SearchStackParamList} from '@src/types';
import SearchMainScreen from '../../screens/home/search/SearchMainScreen';
import BookDetailScreen from '@src/screens/home/BookDetailScreen';

type Props = BottomTabScreenProps<HomeTabParamList, 'Search'>;

const Stack = createStackNavigator<SearchStackParamList>();

const SearchNavigator = ({navigation}: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="SearchMain"
        options={{title: '프로필 페이지'}}
        component={SearchMainScreen}
      />
      <Stack.Screen
        name="BookDetail"
        options={{title: '책 상세 페이지'}}
        component={BookDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
