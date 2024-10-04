import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {get} from '@src/api/axios';
import ClubListHeader from '@src/components/club/ClubListHeader';
import Spacer from '@src/components/common/Spacer';
import ClubCard from '@src/components/common/card/ClubCard';
import {colors} from '@src/constants';
import ErrorScreen from '@src/screens/ErrorScreen';
import {SocialStackParamList} from '@src/types';
import {useQuery} from '@tanstack/react-query';
import {useCallback} from 'react';
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
  const socialClubQuery = useQuery<
    ({id: number} & Omit<SocialClub, 'id'>)[],
    {error: string},
    SocialClub[]
  >({
    queryKey: ['/social/clubs'],
    queryFn: async () => {
      //page가 0부터 시작
      const body: {content: ({id: number} & Omit<SocialClub, 'id'>)[]} =
        await get({
          path: '/social/clubs?page=0&size=10',
        });
      return body.content;
    },
    select: datas => {
      return datas.map(data => ({
        ...data,
        clubId: data.id,
      }));
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

  if (socialClubQuery.error) {
    return <ErrorScreen errorMessage={socialClubQuery.error.error} />;
  }

  if (socialClubQuery.isPending) {
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
        keyExtractor={item => `club_${item.clubId.toString()}`}
        data={socialClubQuery.data || []}
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
  scrollBox: {
    // marginVertical: 20, // 안쪽 마진
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
