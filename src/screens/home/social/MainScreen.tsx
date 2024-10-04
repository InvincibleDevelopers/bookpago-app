import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {get} from '@src/api/axios';
import ClubListHeader from '@src/components/club/ClubListHeader';
import Spacer from '@src/components/common/Spacer';
import ClubCard from '@src/components/common/card/ClubCard';
import {CLUB_PAGE_SIZE, colors} from '@src/constants';
import ErrorScreen from '@src/screens/ErrorScreen';
import {SocialStackParamList} from '@src/types';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = NativeStackScreenProps<SocialStackParamList, 'Main'>;

const MainScreen = ({navigation}: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const clubQuery = useInfiniteQuery<{content: SocialClub[]}, {error: string}>({
    queryKey: ['/social/clubs', 'infinity'],
    queryFn: async ({pageParam}) => {
      const body: {content: SocialClub[]} = await get({
        path: `/social/clubs?page=${pageParam}&size=${CLUB_PAGE_SIZE}`,
      });
      return body;
    },
    initialPageParam: 0, //page가 0부터 시작
    getNextPageParam: (lastPage, allPage, _lastPageParam, _allPageParams) => {
      // 마지막 페이지가 PAGE_SIZE만큼 데이터를 가지고 있으면 다음 페이지를 요청
      return lastPage.content.length === CLUB_PAGE_SIZE
        ? allPage.length + 1
        : undefined;
    },
  });

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
        <ClubListHeader />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.THEME} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => <ClubListHeader />}
        ItemSeparatorComponent={() => <Spacer height={10} />}
        ListFooterComponent={() => <Spacer height={20} />}
        renderItem={renderItem}
        contentContainerStyle={styles.inner}
        keyExtractor={item => `club_${item.id.toString()}`}
        data={clubList}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        scrollIndicatorInsets={{right: 1}} //ios 스크롤바 버그방지
      />
      <Pressable
        style={styles.postButton}
        onPress={() => navigation.navigate('Form')}>
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

export default MainScreen;
