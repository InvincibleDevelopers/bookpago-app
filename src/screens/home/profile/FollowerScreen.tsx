import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FollowItem as FollowItemType, getFollower} from '@src/api/profile';
import {checkIsEndPage} from '@src/api/queryClient';
import LoadingView from '@src/components/LoadingView';
import Divider from '@src/components/common/Divider';
import BackHeader from '@src/components/common/header/BackHeader';
import FollowItem from '@src/components/profile/FollowItem';
import {FOLLOW_PAGE_SIZE} from '@src/constants';
import ErrorScreen from '@src/screens/ErrorScreen';
import {MyStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useCallback, useContext, useMemo, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';

type Props = NativeStackScreenProps<MyStackParamList, 'Follower'>;

const FollowerScreen = ({navigation, route}: Props) => {
  const {kakaoId} = useContext(MainContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const followerQuery = useInfiniteQuery({
    queryKey: ['/profile/follower', kakaoId],
    queryFn: async ({pageParam}) => getFollower(kakaoId, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage, _lastPageParam, _allPageParams) => {
      return checkIsEndPage(lastPage.content, allPage, FOLLOW_PAGE_SIZE);
    },
  });

  const handleRefresh = async () => {
    setIsRefreshing(() => true);
    await followerQuery.refetch();
    setIsRefreshing(() => false);
  };

  const renderItem = useCallback(({item}: {item: FollowItemType}) => {
    return (
      <FollowItem item={item} onPress={() => {}} onPressFollow={() => {}} />
    );
  }, []);

  const convertedData = useMemo(() => {
    if (!followerQuery.data) return [];
    return followerQuery.data.pages.map(d => d.content).flat();
  }, []);

  if (followerQuery.error) {
    const error = followerQuery.error as unknown as {error: string};
    return <ErrorScreen errorMessage={error.error} />;
  }

  if (followerQuery.isPending) {
    // 검색중
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader
          imageProps={{onPress: () => navigation.goBack()}}
          title="팔로워"
        />
        <LoadingView />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <BackHeader
            imageProps={{onPress: () => navigation.goBack()}}
            title="팔로워"
          />
        )}
        stickyHeaderIndices={[0]}
        keyExtractor={(item, index) => `follower_${item.kakaoId}_${index}`}
        data={convertedData}
        renderItem={renderItem}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ItemSeparatorComponent={() => <Divider type="horizontal" />}
        onEndReachedThreshold={0.5}
        scrollIndicatorInsets={{right: 1}} //ios 스크롤바 버그방지
        overScrollMode="never" // Android
        bounces={false} // iOS
        ListEmptyComponent={() => <Text>조회된 팔로잉 목록이 없습니다.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FollowerScreen;
