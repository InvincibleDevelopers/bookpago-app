import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getBestsellers, getRecommendBooks} from '@src/api/book';
import {getClubs} from '@src/api/club';
import CustomText from '@src/components/CustomText';
import Spacer from '@src/components/common/Spacer';
import MypageButton from '@src/components/common/button/MypageButton';
import BookCard from '@src/components/common/card/BookCard';
import ClubCard from '@src/components/common/card/ClubCard';
import WideBookCard from '@src/components/common/card/WideBookCard';
import Header from '@src/components/common/header/Header';
import {colors} from '@src/constants/colors';
import {HomeTabParamList, MainStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useQuery} from '@tanstack/react-query';
import {useContext} from 'react';
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
  const {kakaoId} = useContext(MainContext);

  const bestsellerQuery = useQuery({
    queryKey: ['/books/bestsellers'],
    queryFn: getBestsellers,
  });

  const socialClubQuery = useQuery({
    queryKey: ['/social/clubs'],
    queryFn: async () => getClubs(1),
    select: datas => {
      return datas.content.map(data => ({
        ...data,
        clubId: data.id,
      }));
    },
  });

  const recommendBooksQuery = useQuery({
    queryKey: ['/books/recommend', kakaoId],
    queryFn: async () => getRecommendBooks(kakaoId!, 5),
    select: data => data.books,
  });

  const onPressRecommend = (isbn: number) => {
    navigation.navigate('BookDetail', {isbn});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        buttons={[<MypageButton onPress={() => tabnav.navigate('My')} />]}
      />
      <ScrollView style={styles.scrollBox}>
        <Spacer height={20} />
        <View style={styles.section}>
          <CustomText style={styles.sectionTitle}>
            책파고가 소개하는 인기도서 리스트
          </CustomText>
          <Spacer height={16} />
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

        <Spacer height={50} />

        <View style={styles.section}>
          <CustomText style={styles.sectionTitle}>
            사용자 맞춤 추천 도서
          </CustomText>
          <Spacer height={16} />
          {recommendBooksQuery.isPending ? (
            <View style={{height: 165, justifyContent: 'center'}}>
              <ActivityIndicator size="large" color={colors.THEME} />
            </View>
          ) : (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{gap: 7}}
              overScrollMode="never" // Android
              bounces={false} // iOS
              horizontal>
              {recommendBooksQuery.data?.map((item, index) => {
                return (
                  <WideBookCard
                    item={item}
                    key={`recommend_${item.isbn}_${index}`}
                    onPress={() => onPressRecommend(item.isbn)}
                  />
                );
              })}
            </ScrollView>
          )}
        </View>

        <Spacer height={50} />

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
          <Spacer height={16} />
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
                  <ClubCard
                    key={index}
                    data={item}
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

        <Spacer height={20} />
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
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: colors.BLACK,
    fontWeight: 'bold',
  },
});

export default MainScreen;
