import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {get} from '@src/api/axios';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import MypageButton from '@src/components/common/button/MypageButton';
import ToggleStar from '@src/components/common/button/ToggleStar';
import Header from '@src/components/common/header/Header';
import {colors} from '@src/constants/colors';
import useBookFavorite from '@src/hooks/useBookFavorite';
import {
  BookDetail,
  HomeTabParamList,
  MainStackParamList,
  SearchStackParamList,
} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useQuery} from '@tanstack/react-query';
import {useContext, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

type Props = NativeStackScreenProps<
  SearchStackParamList & MainStackParamList,
  'BookDetail'
>;

const BookDetailScreen = ({navigation, route}: Props) => {
  const props = route.params;
  const tabnav = navigation.getParent<NavigationProp<HomeTabParamList>>();
  const [isShow, setIsShow] = useState(false);
  const {kakaoId} = useContext(MainContext);

  const detailQuery = useQuery<BookDetail, {error: string}>({
    queryKey: ['/books/:isbn', props.isbn],
    queryFn: async () => {
      const body: BookDetail = await get({
        path: `/books/${props.isbn}`,
      });

      return body;
    },
    staleTime: 3 * 1000,
    gcTime: 30 * 1000,
  });

  const favoriteMutation = useBookFavorite(kakaoId!);

  const toggleShow = () => {
    setIsShow(pre => !pre);
  };

  if (detailQuery.error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          buttons={[<MypageButton onPress={() => tabnav.navigate('My')} />]}
        />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <CustomText style={styles.messageText}>
            {detailQuery.error.error}
          </CustomText>
          <CustomButton
            bApplyCommonStyle={true}
            containerstyle={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 3,
            }}
            text="뒤로가기"
            onPress={() => navigation.goBack()}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (detailQuery.isPending) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          buttons={[<MypageButton onPress={() => tabnav.navigate('My')} />]}
        />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.THEME} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        buttons={[<MypageButton onPress={() => tabnav.navigate('My')} />]}
      />
      <ScrollView>
        <View>
          <View style={styles.imageBox}>
            <Image
              style={{
                width: Dimensions.get('screen').width / 2,
                height: (Dimensions.get('screen').width / 2) * 1.5,
                borderRadius: 3,
              }}
              source={{uri: detailQuery.data?.image}}
              resizeMode="contain"
            />
          </View>
          <View style={styles.descBox}>
            {/* <View style={styles.hashTagBox}>
              <CustomText style={{fontSize: 14, color: colors.THEME}}>
                #베스트샐러
              </CustomText>
              <CustomText style={{fontSize: 14, color: colors.THEME}}>
                #판타지
              </CustomText>
              <CustomText style={{fontSize: 14, color: colors.THEME}}>
                #현대소설
              </CustomText>
            </View> */}
            <View style={styles.titleBox}>
              <View
                style={{
                  width: Dimensions.get('screen').width - 80,
                }}>
                <CustomText
                  style={{
                    fontSize: 20,
                    paddingBottom: 7,
                    color: colors.BLACK,
                  }}>
                  {detailQuery.data?.title}
                </CustomText>
                <CustomText
                  style={{
                    fontSize: 14,
                    color: colors.GRAY_300,
                  }}>
                  {detailQuery.data?.author}
                </CustomText>
              </View>
              <ToggleStar
                isActive={detailQuery.data.wishBook}
                onPress={() =>
                  favoriteMutation.mutate({
                    isbn: props.isbn,
                    isFavorite: detailQuery.data.wishBook,
                  })
                }
              />
            </View>
            <View>
              <CustomText
                style={{
                  fontSize: 14,
                  marginBottom: 7,
                  color: colors.GRAY_300,
                }}>
                줄거리
              </CustomText>
              <Pressable onPress={toggleShow}>
                <CustomText
                  style={{
                    fontSize: 14,
                    lineHeight: 20,
                    color: colors.BLACK,
                    fontWeight: 500,
                  }}
                  numberOfLines={isShow ? undefined : 2}>
                  {detailQuery.data?.description}
                </CustomText>
              </Pressable>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <CustomText style={styles.cellTitle}>저자</CustomText>
                <CustomText style={styles.cellValue}>
                  {detailQuery.data?.author}
                </CustomText>
              </View>
              <View style={styles.cell}>
                <CustomText style={styles.cellTitle}>발행</CustomText>
                <CustomText style={styles.cellValue}>
                  {detailQuery.data?.publisher}
                </CustomText>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <CustomText style={styles.cellTitle}>가격</CustomText>
                <CustomText style={styles.cellValue}>"미정"</CustomText>
              </View>
              <View style={styles.cell}>
                <CustomText style={styles.cellTitle}>자료유형</CustomText>
                <CustomText style={styles.cellValue}>"미정"</CustomText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.smilerBox}>
          <CustomText style={{fontSize: 20, marginBottom: 20}}>
            이 책과 비슷한 작품
          </CustomText>
          <ScrollView
            contentContainerStyle={{
              gap: 10,
            }}
            horizontal>
            {Array.from({length: 6}).map((_, index) => {
              return (
                <Image
                  key={index}
                  style={{width: 100, height: 150, borderRadius: 3}}
                  source={{
                    uri: 'https://shopping-phinf.pstatic.net/main_3250690/32506900732.20230620100615.jpg',
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GRAY,
  },
  descBox: {
    backgroundColor: colors.WHITE,
    padding: 20,
  },
  imageBox: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hashTagBox: {
    flexDirection: 'row',
    gap: 7,
    marginBottom: 10,
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  table: {
    backgroundColor: colors.WHITE,
    marginTop: 3,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
  },
  cellTitle: {
    color: colors.GRAY_300,
    marginBottom: 7,
    fontSize: 14,
  },
  cellValue: {
    color: colors.BLACK,
    marginBottom: 7,
    fontSize: 15,
    fontWeight: 500,
  },
  smilerBox: {
    marginVertical: 25,
    padding: 20,
  },
  messageText: {
    fontSize: 17,
    color: colors.GRAY_300,
  },
});

export default BookDetailScreen;
