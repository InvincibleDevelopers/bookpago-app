import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {get} from '@src/api/axios';
import CustomText from '@src/components/CustomText';
import MypageButton from '@src/components/common/button/MypageButton';
import BookCard from '@src/components/common/card/BookCard';
import GroupCard from '@src/components/common/card/GroupCard';
import Header from '@src/components/common/header/Header';
import {colors} from '@src/constants/colors';
import {BookItem, HomeTabParamList, MainStackParamList} from '@src/types';
import {useQuery} from '@tanstack/react-query';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

type Props = NativeStackScreenProps<MainStackParamList, 'Main'>;

const MainScreen = ({navigation, route}: Props) => {
  const tabnav = navigation.getParent<NavigationProp<HomeTabParamList>>();

  const bestsellerQuery = useQuery({
    queryKey: ['/books/bestsellers'],
    queryFn: async () => {
      const body: {books: BookItem[]; total: number} = await get({
        path: '/books/bestsellers',
      });
      return body.books;
    },
  });

  const socialClubQuery = useQuery({
    queryKey: ['/social/clubs'],
    queryFn: async () => {
      //page가 0부터 시작
      const body: {content: {meetingTime: string} & SocialGroup[]} = await get({
        path: '/social/clubs?page=0&size=10',
      });
      return body.content;
    },
    select: datas => {
      return datas.map(data => ({
        ...data,
        meetingTime: new Date(data.meetingTime),
      }));
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        buttons={[<MypageButton onPress={() => tabnav.navigate('My')} />]}
      />
      <ScrollView style={styles.scrollBox} contentContainerStyle={styles.inner}>
        <View style={styles.section}>
          <CustomText style={styles.sectionTitle}>
            책파고가 소개하는 인기도서 리스트
          </CustomText>
          {bestsellerQuery.isPending ? (
            <View style={{height: 195, justifyContent: 'center'}}>
              <ActivityIndicator size="large" color={colors.THEME} />
            </View>
          ) : (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{gap: 10}}
              overScrollMode="never" // Android
              bounces={false} // iOS
              horizontal>
              {bestsellerQuery.data?.map((item, index) => {
                return (
                  <BookCard
                    key={item.isbn.toString() + index}
                    isbn={item.isbn}
                    title={item.title}
                    image={item.image}
                    author={item.author}
                    onPress={() =>
                      navigation.navigate('BookDetail', {
                        isbn: item.isbn,
                      })
                    }
                  />
                );
              })}
            </ScrollView>
          )}
        </View>
        {/* <View style={styles.section}>
            <CustomText style={styles.sectionTitle}>
              사용자 맞춤 추천 도서
            </CustomText>
            <ScrollView
              style={{
                marginBottom: 20,
              }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{gap: 7}}
              overScrollMode="never" // Android
              bounces={false} // iOS
              horizontal>
              <WideBookCard />
            </ScrollView>
          </View> */}
        {/* <View style={styles.section}>
            <CustomText style={styles.sectionTitle}>
              이달의 도서 카테고리
            </CustomText>
            <ScrollView
              style={{
                marginBottom: 20,
              }}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{gap: 7}}
              overScrollMode="never" // Android
              bounces={false} // iOS
              horizontal>
              <BorderButton id={'a'} isActive={false}>
                베스트셀러
              </BorderButton>
            </ScrollView>
            <ScrollView
              contentContainerStyle={{
                gap: 10,
              }}
              showsHorizontalScrollIndicator={false}
              overScrollMode="never" // Android
              bounces={false} // iOS
              horizontal>
              {Array.from({length: 6}).map((_, index) => {
                return (
                  <BookCard
                    key={index}
                    isbn={index}
                    isFavorite={false}
                    onPress={e => console.log(e)}
                    onToggleFavorite={e => console.log(e)}
                  />
                );
              })}
            </ScrollView>
          </View> */}
        <View style={styles.section}>
          <CustomText style={styles.sectionTitle}>
            현재 핫한 독서 모임
          </CustomText>
          {socialClubQuery.isPending ? (
            <View style={{height: 150, justifyContent: 'center'}}>
              <ActivityIndicator size="large" color={colors.THEME} />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{gap: 10}}
              showsHorizontalScrollIndicator={false}
              overScrollMode="never" // Android
              bounces={false} // iOS
              horizontal>
              {socialClubQuery.data?.map((item, index) => {
                return (
                  <GroupCard
                    key={index}
                    members={item.members}
                    clubName={item.clubName}
                    meetingTime={item.meetingTime}
                    location={item.location}
                    description="asdasdasdasd"
                    onPress={() =>
                      navigation.navigate('ClubDetail', {
                        socialGrop: item,
                      })
                    }
                  />
                );
              })}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  buttons: {},
  scrollBox: {
    flex: 1,
  },
  inner: {
    marginVertical: 20, // 안쪽 마진
    gap: 20,
  },
  section: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: colors.BLACK,
    marginBottom: 16,
    fontWeight: 700,
  },
});

export default MainScreen;
