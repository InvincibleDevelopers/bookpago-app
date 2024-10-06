import {NativeStackScreenProps} from '@react-navigation/native-stack';
import UserCard from '@src/components/UserCard';
import Divider from '@src/components/common/Divider';
import BackHeader from '@src/components/common/header/BackHeader';
import {MyStackParamList, UserProfile} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {waitfor} from '@src/utils/waitfor';
import {useState, useContext, useCallback} from 'react';
import {SafeAreaView, Text, FlatList, View, StyleSheet} from 'react-native';

type Props = NativeStackScreenProps<MyStackParamList, 'Follower'>;

const FollowerScreen = ({navigation, route}: Props) => {
  const {kakaoId} = useContext(MainContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // useOnStart(() => {
  //   getMutation.mutate(
  //     {path: '/profile/follower?targetId=52&page=0&size=10'},
  //     {
  //       onSuccess: result => {
  //         const temp: UserProfile = {
  //           nickname: result.content[0].nickname,
  //           username: result.content[0].username,
  //           isMine: false,
  //         };
  //         setData(prev => [...prev, temp]);
  //       },
  //     },
  //   );
  // });

  const handleRefresh = async () => {
    setIsRefreshing(() => true);
    await waitfor(1000);
    setIsRefreshing(() => false);
  };

  const renderItem = useCallback(
    ({item, index}: {item: {nickname: string}; index: number}) => {
      return (
        <UserCard
          nickname={item.nickname}
          onPress={() => {}}
          onPressFollow={() => {}}
        />
      );
    },
    [],
  );

  const dummyData = Array.from({length: 10}, (v, i) => ({
    nickname: 'nickname' + i,
  }));

  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={() => (
          <BackHeader
            imageProps={{onPress: () => navigation.goBack()}}
            title="팔로워"
          />
        )}
        stickyHeaderIndices={[0]}
        keyExtractor={(item, index) => `follower-${index}`}
        data={dummyData}
        renderItem={renderItem}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ItemSeparatorComponent={() => <Divider type="horizontal" />}
        onEndReachedThreshold={0.5}
        scrollIndicatorInsets={{right: 1}} //ios 스크롤바 버그방지
        overScrollMode="never" // Android
        bounces={false} // iOS
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default FollowerScreen;
