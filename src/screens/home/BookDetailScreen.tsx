import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getBookByIsbn} from '@src/api/book';
import PostReviewModal from '@src/components/book/PostReviewModal';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import ReviewList from '@src/components/book/ReviewList';
import Divider from '@src/components/common/Divider';
import Spacer from '@src/components/common/Spacer';
import MypageButton from '@src/components/common/button/MypageButton';
import ToggleStar from '@src/components/common/button/ToggleStar';
import Header from '@src/components/common/header/Header';
import {colors} from '@src/constants/colors';
import useBookFavorite from '@src/hooks/useBookFavorite';
import {
  BookDetail,
  HomeStackParamList,
  HomeTabParamList,
  MyStackParamList,
  SearchStackParamList,
} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useCallback, useContext, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = NativeStackScreenProps<
  SearchStackParamList & HomeStackParamList & MyStackParamList,
  'BookDetail'
>;

const BookDetailScreen = ({navigation, route}: Props) => {
  const props = route.params;
  const tabnav = navigation.getParent<NavigationProp<HomeTabParamList>>();
  const [isShowPlot, setIsShowPlot] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isShowPostReviewModal, setIsShowPostReviewModal] = useState(false);

  const {kakaoId} = useContext(MainContext);

  const queryClient = useQueryClient();

  const detailQuery = useQuery<BookDetail, {error: string}>({
    queryKey: ['/books/:isbn', props.isbn],
    queryFn: () => getBookByIsbn(props.isbn, kakaoId!),
    staleTime: 3 * 1000,
    gcTime: 30 * 1000,
  });

  const favoriteMutation = useBookFavorite(kakaoId!);

  const onPressStar = () => {
    const wishBook = detailQuery.data?.wishBook;
    if (favoriteMutation.isPending || wishBook === undefined) {
      return;
    }
    favoriteMutation.mutate({
      isbn: props.isbn,
      isFavorite: wishBook,
    });
  };

  const openCommentModal = useCallback(
    () => setIsShowPostReviewModal(() => true),
    [],
  );
  const closeCommentModal = useCallback(
    () => setIsShowPostReviewModal(() => false),
    [],
  );

  const toggleShowPlot = () => {
    setIsShowPlot(pre => !pre);
  };

  const onRefresh = async () => {
    setIsRefreshing(() => true);
    await Promise.all([
      detailQuery.refetch(),
      queryClient.invalidateQueries({
        queryKey: ['/reviews/:isbn', props.isbn, kakaoId],
      }),
    ]);
    setIsRefreshing(() => false);
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
      <FlatList
        data={[]}
        renderItem={null}
        stickyHeaderIndices={[0]}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <Header
            buttons={[<MypageButton onPress={() => tabnav.navigate('My')} />]}
          />
        }
        ListEmptyComponent={
          <>
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
                    onPress={onPressStar}
                  />
                </View>

                <Spacer height={28} />

                <View>
                  <CustomText
                    style={{
                      fontSize: 14,
                      marginBottom: 7,
                      color: colors.GRAY_300,
                    }}>
                    줄거리
                  </CustomText>
                  <Pressable onPress={toggleShowPlot}>
                    <CustomText
                      style={{
                        fontSize: 14,
                        lineHeight: 20,
                        color: colors.BLACK,
                        fontWeight: 500,
                      }}
                      numberOfLines={isShowPlot ? undefined : 2}>
                      {detailQuery.data?.description}
                    </CustomText>
                  </Pressable>
                </View>
              </View>
              <Divider type="horizontal" style={{height: 3}} />
              <View style={styles.table}>
                <View style={styles.row}>
                  <View style={styles.cell}>
                    <CustomText style={styles.cellTitle}>저자</CustomText>
                    <Spacer height={7} />
                    <CustomText style={styles.cellValue}>
                      {detailQuery.data?.author}
                    </CustomText>
                    <Spacer height={7} />
                  </View>
                  {/* <View style={styles.cell}>
                    <CustomText style={styles.cellTitle}>발행</CustomText>
                    <Spacer height={7} />
                    <CustomText style={styles.cellValue}>
                      {detailQuery.data?.publisher}
                    </CustomText>
                    <Spacer height={7} />
                  </View> */}
                </View>
                {/* <View style={styles.row}>
                  <View style={styles.cell}>
                    <CustomText style={styles.cellTitle}>가격</CustomText>
                    <Spacer height={7} />
                    <CustomText style={styles.cellValue}>"미정"</CustomText>
                    <Spacer height={7} />
                  </View>
                  <View style={styles.cell}>
                    <CustomText style={styles.cellTitle}>자료유형</CustomText>
                    <Spacer height={7} />
                    <CustomText style={styles.cellValue}>"미정"</CustomText>
                    <Spacer height={7} />
                  </View>
                </View> */}
              </View>
            </View>
            {/* <View style={styles.smilerBox}>
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
            </View> */}
            <ReviewList isbn={props.isbn} />
          </>
        }
      />
      <Pressable style={styles.postButton} onPress={openCommentModal}>
        <Text style={styles.postButtonText}>댓글 입력하기</Text>
      </Pressable>
      <PostReviewModal
        isShow={isShowPostReviewModal}
        myKakaoId={kakaoId!}
        isbn={props.isbn}
        onClose={closeCommentModal}
      />
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
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  table: {
    backgroundColor: colors.WHITE,
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
    fontSize: 14,
  },
  cellValue: {
    color: colors.BLACK,
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
  postButton: {
    backgroundColor: colors.THEME,
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 9999,
    paddingVertical: 7,
    paddingHorizontal: 14,
  },
  postButtonText: {
    color: colors.WHITE,
  },
});

export default BookDetailScreen;

{
  /* <View style={styles.hashTagBox}>
        <CustomText style={{fontSize: 14, color: colors.THEME}}>
          #베스트샐러
        </CustomText>
        <CustomText style={{fontSize: 14, color: colors.THEME}}>
          #판타지
        </CustomText>
        <CustomText style={{fontSize: 14, color: colors.THEME}}>
          #현대소설
        </CustomText>
      </View> */
}
