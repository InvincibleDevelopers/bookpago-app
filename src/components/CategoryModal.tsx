import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomText from '@src/components/CustomText';
import BorderButton from '@src/components/common/button/BorderButton';
import MypageButton from '@src/components/common/button/MypageButton';
import BackHeader from '@src/components/common/header/BackHeader';
import {colors} from '@src/constants';
import {SocialStackParamList} from '@src/types';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const CategoryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        title="카테고리"
        imageProps={{onPress: () => {}}}
        buttons={[<MypageButton onPress={() => {}} />]}
      />
      <View style={styles.inner}>
        <View>
          <CustomText style={{fontWeight: 'bold'}}>
            독서 카테고리 설정
          </CustomText>
        </View>
        <ScrollView
          contentContainerStyle={styles.borderButtonContainer}
          overScrollMode="never" // Android
          bounces={false} // iOS
        >
          <BorderButton>전체</BorderButton>
          <BorderButton>SF</BorderButton>
          <BorderButton>모험</BorderButton>
          <BorderButton>스릴러</BorderButton>
          <BorderButton>판타지</BorderButton>
          <BorderButton>공포</BorderButton>
          <BorderButton>추리</BorderButton>
          <BorderButton>미스터리</BorderButton>
          <BorderButton>기타등등</BorderButton>
          <BorderButton>테스트</BorderButton>
          <BorderButton>외교</BorderButton>
          <BorderButton>해외토픽</BorderButton>
          <BorderButton>인문학</BorderButton>
          <BorderButton>사회</BorderButton>
          <BorderButton>과학</BorderButton>
          <BorderButton>전체</BorderButton>
          <BorderButton>SF</BorderButton>
          <BorderButton>모험</BorderButton>
          <BorderButton>스릴러</BorderButton>
          <BorderButton>판타지</BorderButton>
          <BorderButton>공포</BorderButton>
          <BorderButton>추리</BorderButton>
          <BorderButton>미스터리</BorderButton>
          <BorderButton>기타등등</BorderButton>
          <BorderButton>테스트</BorderButton>
          <BorderButton>외교</BorderButton>
          <BorderButton>해외토픽</BorderButton>
          <BorderButton>인문학</BorderButton>
          <BorderButton>사회</BorderButton>
          <BorderButton>과학</BorderButton>
          <BorderButton>전체</BorderButton>
          <BorderButton>SF</BorderButton>
          <BorderButton>모험</BorderButton>
          <BorderButton>스릴러</BorderButton>
          <BorderButton>판타지</BorderButton>
          <BorderButton>공포</BorderButton>
          <BorderButton>추리</BorderButton>
          <BorderButton>미스터리</BorderButton>
          <BorderButton>기타등등</BorderButton>
          <BorderButton>테스트</BorderButton>
          <BorderButton>외교</BorderButton>
          <BorderButton>해외토픽</BorderButton>
          <BorderButton>인문학</BorderButton>
          <BorderButton>사회</BorderButton>
          <BorderButton>과학</BorderButton>
          <BorderButton>전체</BorderButton>
          <BorderButton>SF</BorderButton>
          <BorderButton>모험</BorderButton>
          <BorderButton>스릴러</BorderButton>
          <BorderButton>판타지</BorderButton>
          <BorderButton>공포</BorderButton>
          <BorderButton>추리</BorderButton>
          <BorderButton>미스터리</BorderButton>
          <BorderButton>기타등등</BorderButton>
          <BorderButton>테스트</BorderButton>
          <BorderButton>외교</BorderButton>
          <BorderButton>해외토픽</BorderButton>
          <BorderButton>인문학</BorderButton>
          <BorderButton>사회</BorderButton>
          <BorderButton>과학</BorderButton>
          <BorderButton>전체</BorderButton>
        </ScrollView>
        <View style={styles.buttonBox}>
          <Pressable style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>설정 완료</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  inner: {
    marginVertical: 20, // 안쪽 마진
    marginHorizontal: 20, // 바깥쪽 마진
    gap: 20,
    flex: 1,
  },
  borderButtonContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 7,
  },
  buttonBox: {
    marginTop: 20,
  },
  button: {
    backgroundColor: colors.THEME,
    padding: 15,
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CategoryScreen;
