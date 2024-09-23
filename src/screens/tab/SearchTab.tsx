import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {MainTabs, SearchScreens} from '@src/types';
import MainScreen from '../stack/search/MainScreen';
import DetailScreen from '../stack/search/DetailScreen';
import {useContext, useEffect} from 'react';
import {MainContext} from '@src/utils/Context';
import useOnStart from '@src/hooks/useOnStart';

type Props = BottomTabScreenProps<MainTabs, 'Search'>;

const Stack = createStackNavigator<SearchScreens>();

const SearchTab = ({navigation}: Props) => {
  const {setTabVisibility} = useContext(MainContext);

  useEffect(() => {
    if(navigation.isFocused()) {
      setTabVisibility(false);
    }
    else {
      setTabVisibility(true);
    }

  }, [navigation.isFocused()]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{headerShown: false}}
        component={MainScreen}
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
