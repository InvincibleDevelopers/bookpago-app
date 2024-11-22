import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getClubs, getClubsWithLocation} from '@src/api/club';
import ClubListHeader from '@src/components/club/ClubListHeader';
import Spacer from '@src/components/common/Spacer';
import MypageButton from '@src/components/common/button/MypageButton';
import ClubCard from '@src/components/common/card/ClubCard';
import Header from '@src/components/common/header/Header';
import {CLUB_PAGE_SIZE, colors} from '@src/constants';
import ErrorScreen from '@src/screens/ErrorScreen';
import {
  HomeTabParamList,
  RootStackParamList,
  SocialStackParamList,
} from '@src/types';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GeoLocation from '@react-native-community/geolocation';

type Props = NativeStackScreenProps<SocialStackParamList, 'SocialMain'>;

const SocialMainScreen = ({navigation}: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const tabNav = navigation.getParent<NavigationProp<HomeTabParamList>>();
  const rootNav = tabNav.getParent<NavigationProp<RootStackParamList>>();
  const [order, setOrder] = useState(1);
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  const clubQuery = useInfiniteQuery<{content: SocialClub[]}, {error: string}>({
    queryKey: [
      '/social/clubs',
      'infinity',
      order,
      location.latitude,
      location.longitude,
    ],
    queryFn: ({pageParam}) =>
      order === 1
        ? getClubs(pageParam as number)
        : getClubsWithLocation(
            pageParam as number,
            location.latitude,
            location.longitude,
          ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage, _lastPageParam, _allPageParams) => {
      // 마지막 페이지가 PAGE_SIZE만큼 데이터를 가지고 있으면 다음 페이지를 요청
      return lastPage.content?.length === CLUB_PAGE_SIZE
        ? allPage.length + 1
        : undefined;
    },
  });

  useEffect(() => {
    GeoLocation.getCurrentPosition(
      info => {
        setLocation({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      () => {},
      {enableHighAccuracy: true},
    );
  }, []);

  const renderItem = useCallback(({item}: {item: SocialClub}) => {
    return (
      <View style={{paddingHorizontal: 10}}>
        <ClubCard
          style={{width: '100%'}}
          row={2}
          data={item}
          onPress={() => navigation.navigate('ClubDetail', {socialGrop: item})}
        />
      </View>
    );
  }, []);

  const onEndReached = () => {
    if (clubQuery.hasNextPage && !clubQuery.isFetchingNextPage) {
      clubQuery.fetchNextPage();
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(() => true);
    clubQuery.refetch();
    setIsRefreshing(() => false);
  };

  const onSelectOrder = (value: number) => {
    const failedGetLocation =
      location.latitude === null || location.longitude === null;
    if (value === 2 && failedGetLocation) {
      Alert.alert('위치 정보를 가져오지 못했습니다.');
      return;
    }

    setOrder(() => value);
  };

  const clubList = useMemo(
    () => clubQuery.data?.pages.map(d => d.content).flat() || [],
    [clubQuery.data],
  );

  if (clubQuery.error) {
    return <ErrorScreen errorMessage={clubQuery.error.error} />;
  }

  if (clubQuery.isPending) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          buttons={[<MypageButton onPress={() => tabNav.navigate('My')} />]}
        />
        <ClubListHeader order={order} onSelectOrder={onSelectOrder} />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.THEME} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        buttons={[<MypageButton onPress={() => tabNav.navigate('My')} />]}
      />
      <FlatList
        ListHeaderComponent={
          <ClubListHeader order={order} onSelectOrder={onSelectOrder} />
        }
        ItemSeparatorComponent={() => <Spacer height={10} />}
        ListFooterComponent={() => <Spacer height={20} />}
        renderItem={renderItem}
        contentContainerStyle={styles.inner}
        keyExtractor={item => `club_${item.id.toString()}`}
        data={clubList}
        onEndReached={onEndReached}
        onEndReachedThreshold={1}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        scrollIndicatorInsets={{right: 1}} //ios 스크롤바 버그방지
      />
      <Pressable
        style={styles.postButton}
        onPress={() => rootNav.navigate('ClubForm')}>
        <Text style={styles.postButtonText}>모임 만들기</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  inner: {},
  messageText: {
    fontSize: 17,
    color: colors.GRAY_300,
  },
  postButton: {
    backgroundColor: colors.THEME,
    position: 'absolute',
    paddingVertical: 7.5,
    paddingHorizontal: 10,
    right: 10,
    bottom: 10,
    borderRadius: 9999,
  },
  postButtonText: {
    color: colors.WHITE,
  },
});

export default SocialMainScreen;
