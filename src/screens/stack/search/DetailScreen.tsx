import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomText from '@src/components/CustomText';
import ToggleStar from '@src/components/ToggleStar';
import {colors} from '@src/constants/colors';
import {SearchScreens} from '@src/types';
import {waitfor} from '@src/utils/waitfor';
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

type Props = NativeStackScreenProps<SearchScreens, 'Detail'>;

const DetailScreen = ({navigation, route}: Props) => {
  const props = route.params.props;
  const tabnav = navigation.getParent();
  const [isShow, setIsShow] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  console.log('DetailScreen', props);

  const {} = useQuery({
    queryKey: ['detail', props.isbn],
    queryFn: async () => {
      // const body = await get({});
      // return body;

      await waitfor(2000);
    },
    enabled: false,
  });

  const toggleShow = () => {
    setIsShow(pre => !pre);
  };

  const toggleFavorite = () => {
    setIsFavorite(pre => !pre);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.imageBox}>
            <Image
              style={{
                width: Dimensions.get('screen').width / 2,
                height: (Dimensions.get('screen').width / 2) * 1.5,
                borderRadius: 3,
              }}
              source={{uri: props.image}}
              resizeMode="contain"
            />
          </View>
          <View style={styles.descBox}>
            <View style={styles.hashTagBox}>
              <CustomText style={{fontSize: 14, color: colors.THEME}}>
                #베스트샐러
              </CustomText>
              <CustomText style={{fontSize: 14, color: colors.THEME}}>
                #판타지
              </CustomText>
              <CustomText style={{fontSize: 14, color: colors.THEME}}>
                #현대소설
              </CustomText>
            </View>
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
                  {props.title}
                </CustomText>
                <CustomText
                  style={{
                    fontSize: 14,
                    color: colors.GRAY_300,
                  }}>
                  {props.author}
                </CustomText>
              </View>
              <ToggleStar isActive={isFavorite} onPress={toggleFavorite} />
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique ea labore laboriosam. Reiciendis nam, quae doloribus
                  nihil voluptas sequi, provident porro suscipit ea excepturi
                  nemo culpa, non voluptate nobis odit.
                </CustomText>
              </Pressable>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.cell}>
                <CustomText style={styles.cellTitle}>저자</CustomText>
                <CustomText style={styles.cellValue}>J.K 롤링</CustomText>
              </View>
              <View style={styles.cell}>
                <CustomText style={styles.cellTitle}>발행</CustomText>
                <CustomText style={styles.cellValue}>파주</CustomText>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.cell}>
                <CustomText style={styles.cellTitle}>가격</CustomText>
                <CustomText style={styles.cellValue}>12,000</CustomText>
              </View>
              <View style={styles.cell}>
                <CustomText style={styles.cellTitle}>자료유형</CustomText>
                <CustomText style={styles.cellValue}>단행본</CustomText>
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
});

export default DetailScreen;
