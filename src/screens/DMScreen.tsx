import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FollowItem from '@src/components/profile/FollowItem';
import DMItem from '@src/components/chat/DMItem';
import Divider from '@src/components/common/Divider';
import SearchHeader from '@src/components/common/header/SearchHeader';
import {RootStackParamList} from '@src/types';
import {waitfor} from '@src/utils/waitfor';
import {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'DM'>;

const DMScreen = ({navigation}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onSearch = () => {};

  const handleRefresh = async () => {
    setIsRefreshing(() => true);
    await waitfor(1000);
    setIsRefreshing(() => false);
  };

  const renderItem = useCallback(
    ({item, index}: {item: {nickname: string}; index: number}) => {
      return (
        <DMItem
          nickname={item.nickname}
          onPress={() => navigation.navigate('Chat')}
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
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <SearchHeader
            value={searchValue}
            onChangeText={setSearchValue}
            onPressBack={() => navigation.goBack()}
            onPressSearch={onSearch}
            returnKeyType="search"
            multiline={false}
          />
        )}
        stickyHeaderIndices={[0]}
        keyExtractor={(item, index) => `dm-${index}`}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DMScreen;
