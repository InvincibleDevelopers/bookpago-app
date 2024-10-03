import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import MypageButton from '@src/components/common/button/MypageButton';
import BackHeader from '@src/components/common/header/BackHeader';
import {colors} from '@src/constants';
import {
  HomeTabParamList,
  MainStackParamList,
  SocialStackParamList,
} from '@src/types';
import {SafeAreaView, StyleSheet, ScrollView, View, Image} from 'react-native';

type Props = NativeStackScreenProps<
  MainStackParamList & SocialStackParamList,
  'ClubDetail'
>;

const ClubDetailScreen = ({navigation, route}: Props) => {
  const props = route.params.socialGrop;
  const tabNav = navigation.getParent<NavigationProp<HomeTabParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        imageProps={{onPress: () => navigation.goBack()}}
        title="토론모임 상세"
        buttons={[<MypageButton onPress={() => tabNav.navigate('My')} />]}
      />
      <ScrollView style={styles.scrollBox}>
        <View style={styles.inner}>
          <View style={{paddingHorizontal: 20}}>
            <CustomText style={{fontSize: 20}}>{props.clubName}</CustomText>
          </View>
          <View style={styles.infoBox}>
            <CustomText
              style={{
                fontSize: 14,
                color: colors.GRAY_400,
                marginBottom: 16,
                fontWeight: 'light',
              }}>
              세부 모집 정보
            </CustomText>
            <View style={styles.row}>
              <Image
                style={styles.icon}
                source={require('@src/assets/icons/position.png')}
                resizeMode="center"
              />
              <CustomText
                style={[
                  styles.text,
                  {color: colors.THEME},
                ]}>{`장소: ${props.location}`}</CustomText>
            </View>
            <View style={styles.row}>
              <Image
                style={styles.icon}
                source={require('@src/assets/icons/human.png')}
                resizeMode="center"
              />
              <CustomText style={styles.text}>
                현재&nbsp;
                <CustomText
                  style={
                    styles.highlightText
                  }>{`${props.members}명`}</CustomText>
                &nbsp;참여중
              </CustomText>
            </View>
            <View style={styles.row}>
              <Image
                style={styles.icon}
                source={require('@src/assets/icons/clock.png')}
                resizeMode="center"
              />
              <CustomText style={styles.text}>
                날짜&nbsp;
                <CustomText style={styles.highlightText}>
                  {props.meetingTime.toLocaleDateString('ko-KR', {
                    weekday: 'short',
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </CustomText>
              </CustomText>
            </View>
            <View style={[styles.row, {alignItems: 'flex-start'}]}>
              <Image
                style={[styles.icon, {marginTop: 4}]}
                source={require('@src/assets/icons/dollar-sign.png')}
                resizeMode="center"
              />
              <CustomText
                style={[
                  styles.text,
                  {flex: 1},
                ]}>{`주요 활동 ${props.description}`}</CustomText>
            </View>
          </View>
          <View style={{paddingHorizontal: 20}}>
            <CustomText
              style={
                styles.text
              }>{`모임설명: ${props.description}`}</CustomText>
          </View>
          <View style={{paddingHorizontal: 20, marginTop: 50}}>
            <CustomButton
              containerstyle={{
                borderRadius: 10,
                paddingVertical: 16,
              }}
              textstyle={{color: colors.WHITE}}
              text="참여하기"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollBox: {flex: 1},
  inner: {
    marginVertical: 20, // 안쪽 마진
    gap: 20,
  },
  infoBox: {
    backgroundColor: colors.WHITE,
    padding: 20,
    borderRadius: 20,
    gap: 10,

    borderWidth: 1,
    borderColor: colors.GRAY,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: 'medium',
    color: colors.GRAY_400,
  },
  highlightText: {
    color: colors.THEME,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default ClubDetailScreen;
