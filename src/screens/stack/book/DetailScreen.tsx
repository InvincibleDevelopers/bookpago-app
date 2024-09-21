import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import Header from '@src/components/Header';
import {colors} from '@src/constants/colors';
import {SearchScreens} from '@src/types';
import {waitfor} from '@src/utils/waitfor';
import {useQuery} from '@tanstack/react-query';
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

type Props = NativeStackScreenProps<SearchScreens, 'Detail'>;

const DetailScreen = ({navigation, route}: Props) => {
  const props = route.params.props;
  const tabnav = navigation.getParent();

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          style={styles.header}
          imageprops={{
            source: require('@src/assets/logo/title.png'),
            resizeMode: 'center',
          }}
        />
        <CustomButton
          onPress={() => tabnav?.navigate('MyPage')}
          bApplyCommonStyle={false}
          style={styles.buttons}
          imageprops={{
            style: {flex: 1},
            resizeMode: 'contain',
            source: require('@src/assets/buttons/my.png'),
          }}
        />
      </View>
      <View>
        <View>
          <Image source={{uri: props.image}} />
        </View>
        <View>
          <View>
            <CustomText>#베스트샐러</CustomText>
            <CustomText>#판타지</CustomText>
            <CustomText>#현대소설</CustomText>
          </View>
          <View>
            <View>
              <CustomText>{props.title}</CustomText>
              <CustomText>{props.author}</CustomText>
            </View>
            <View>
              <CustomText>버튼</CustomText>
            </View>
          </View>
          <View>
            <CustomText>줄거리</CustomText>
            <CustomText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              ea labore laboriosam. Reiciendis nam, quae doloribus nihil
              voluptas sequi, provident porro suscipit ea excepturi nemo culpa,
              non voluptate nobis odit.
            </CustomText>
          </View>
        </View>
        <View>
          <View>
            <View>
              <CustomText>저자</CustomText>
              <CustomText>J.K 롤링</CustomText>
            </View>
            <View>
              <CustomText>발행</CustomText>
              <CustomText>파주</CustomText>
            </View>
          </View>
          <View>
            <View>
              <CustomText>가격</CustomText>
              <CustomText>12,000</CustomText>
            </View>
            <View>
              <CustomText>자료유형</CustomText>
              <CustomText>단행본</CustomText>
            </View>
          </View>
        </View>
      </View>
      <View>
        <View>
          <CustomText>이 책과 비슷한 작품</CustomText>
        </View>
        <ScrollView>
          <View style={{width: 100, height: 150, borderWidth: 1}}></View>
          <View style={{width: 100, height: 150, borderWidth: 1}}></View>
          <View style={{width: 100, height: 150, borderWidth: 1}}></View>
          <View style={{width: 100, height: 150, borderWidth: 1}}></View>
          <View style={{width: 100, height: 150, borderWidth: 1}}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GRAY,
  },
  headerContainer: {
    flex: 1,
  },
  buttons: {
    position: 'absolute',
    left: '85%',
    top: '3%',
    width: 30,
    height: 30,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default DetailScreen;
