import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomText from '@src/components/CustomText';
import GroupCard from '@src/components/GroupCard';
import BorderButton from '@src/components/common/button/BorderButton';
import MypageButton from '@src/components/common/button/MypageButton';
import BookCardWithFavorite from '@src/components/common/card/BookCardWithFavorite';
import WideBookCard from '@src/components/common/card/WideBookCard';
import Header from '@src/components/common/header/Header';
import {colors} from '@src/constants/colors';
import {HomeScreens} from '@src/types';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

type Props = NativeStackScreenProps<HomeScreens, 'Main'>;

const HomeScreen = ({navigation, route}: Props) => {
  const tabnav = navigation.getParent();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        buttons={[<MypageButton onPress={() => tabnav?.navigate('MyPage')} />]}
      />
      <ScrollView style={styles.scrollBox}>
        <View style={styles.inner}>
          <View style={styles.section}>
            <CustomText style={styles.sectionTitle}>
              책파고가 소개하는 인기도서 리스트
            </CustomText>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 10,
              }}
              overScrollMode="never" // Android
              bounces={false} // iOS
              horizontal>
              {Array.from({length: 6}).map((_, index) => {
                return (
                  <BookCardWithFavorite
                    key={index}
                    isbn={index}
                    isFavorite={false}
                    onPress={e => console.log(e)}
                    onToggleFavorite={e => console.log(e)}
                  />
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.section}>
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
              <WideBookCard />
              <WideBookCard />
              <WideBookCard />
              <WideBookCard />
              <WideBookCard />
            </ScrollView>
          </View>
          <View style={styles.section}>
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
              <BorderButton id={'b'} isActive={false}>
                스테디셀러
              </BorderButton>
              <BorderButton id={'c'} isActive={false}>
                판타지
              </BorderButton>
              <BorderButton id={'d'} isActive={false}>
                SF
              </BorderButton>
              <BorderButton id={'e'} isActive={false}>
                인문
              </BorderButton>
              <BorderButton id={'f'} isActive={false}>
                경제
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
                  <BookCardWithFavorite
                    key={index}
                    isbn={index}
                    isFavorite={false}
                    onPress={e => console.log(e)}
                    onToggleFavorite={e => console.log(e)}
                  />
                );
              })}
            </ScrollView>
          </View>
          <View style={styles.section}>
            <CustomText style={styles.sectionTitle}>
              현재 핫한 독서 모임
            </CustomText>
            <ScrollView
              contentContainerStyle={{
                gap: 10,
              }}
              showsHorizontalScrollIndicator={false}
              overScrollMode="never" // Android
              bounces={false} // iOS
              horizontal>
              <GroupCard
                members={5}
                clubName="Hello"
                time={'투썸 앞 14:00'}
                location={'서울대학교'}
              />
              <GroupCard
                members={5}
                clubName="Hello"
                time={'투썸 앞 14:00'}
                location={'서울대학교'}
              />
              <GroupCard
                members={5}
                clubName="Hello"
                time={'투썸 앞 14:00'}
                location={'서울대학교'}
              />
              <GroupCard
                members={5}
                clubName="Hello"
                time={'투썸 앞 14:00'}
                location={'서울대학교'}
              />
            </ScrollView>
          </View>
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

export default HomeScreen;
