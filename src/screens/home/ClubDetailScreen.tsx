import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {getClubDetail} from '@src/api/get';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import LoadingView from '@src/components/LoadingView';
import MypageButton from '@src/components/common/button/MypageButton';
import BackHeader from '@src/components/common/header/BackHeader';
import {CYCLE, colors} from '@src/constants';
import {
  HomeTabParamList,
  MainStackParamList,
  SocialStackParamList,
} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import ErrorScreen from '../ErrorScreen';
import {postAccessClub} from '@src/api/post';
import ApplicantCard from '@src/components/common/card/ApplicantCard';
import Spacer from '@src/components/common/Spacer';
import {getWeekdayText} from '@src/utils/helper';

type Props = NativeStackScreenProps<
  MainStackParamList & SocialStackParamList,
  'ClubDetail'
>;

const ClubDetailScreen = ({navigation, route}: Props) => {
  const props = route.params.socialGrop;
  const tabNav = navigation.getParent<NavigationProp<HomeTabParamList>>();
  const {kakaoId} = useContext(MainContext);

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['/social/clubs/:clubId', props.id],
    queryFn: async () => {
      if (!kakaoId) {
        return;
      }
      const body = await getClubDetail({clubId: props.id, kakaoId});
      return body;
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!kakaoId) {
        return;
      }
      const body = await postAccessClub({clubId: props.id, kakaoId});
      return body;
    },
    onSuccess: async result => {
      if (!result) {
        return;
      }
      await queryClient.invalidateQueries({
        queryKey: ['/social/clubs/:clubId', props.id],
      });
      console.log('access club success');
    },
  });

  const accessClub = () => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate();
  };

  const weekdayText = getWeekdayText(props.weekDay);

  if (query.error) {
    const error = query.error as unknown as {error: string};
    return <ErrorScreen errorMessage={error.error} />;
  }

  if (query.isPending) {
    return (
      <SafeAreaView style={styles.container}>
        <BackHeader
          imageProps={{onPress: () => navigation.goBack()}}
          title="토론모임 상세"
          buttons={[<MypageButton onPress={() => tabNav.navigate('My')} />]}
        />
        <LoadingView />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        imageProps={{onPress: () => navigation.goBack()}}
        title="토론모임 상세"
        buttons={[<MypageButton onPress={() => tabNav.navigate('My')} />]}
      />
      <ScrollView style={styles.scrollBox}>
        <Spacer height={20} />
        <View style={{paddingHorizontal: 20}}>
          <CustomText style={{fontSize: 20}}>{props.clubName}</CustomText>
        </View>
        <Spacer height={20} />
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
                style={styles.highlightText}>{`${props.members}명`}</CustomText>
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
              {`${CYCLE[props.repeatCycle]} (${weekdayText}) `}
              <CustomText style={styles.highlightText}>{props.time}</CustomText>
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
        <Spacer height={20} />
        <View>
          <Text style={styles.cardBoxText}>참여자 목록</Text>
          <ScrollView
            horizontal
            contentContainerStyle={styles.cardBox}
            showsHorizontalScrollIndicator={false}>
            <ApplicantCard
              onPress={id => console.log(id)}
              kakaoId={1}
              nickname={'nickname'}
              profileUrl={'profileUrl'}
            />
            <ApplicantCard
              onPress={id => console.log(id)}
              kakaoId={1}
              nickname={'nickname'}
              profileUrl={'profileUrl'}
            />
            <ApplicantCard
              onPress={id => console.log(id)}
              kakaoId={1}
              nickname={'nickname'}
              profileUrl={'profileUrl'}
            />
            <ApplicantCard
              onPress={id => console.log(id)}
              kakaoId={1}
              nickname={'nickname'}
              profileUrl={'profileUrl'}
            />
            <ApplicantCard
              onPress={id => console.log(id)}
              kakaoId={1}
              nickname={'nickname'}
              profileUrl={'profileUrl'}
            />
          </ScrollView>
        </View>
        <Spacer height={20} />
        <View style={{paddingHorizontal: 20, marginTop: 50}}>
          <CustomButton
            containerstyle={[
              styles.accessButton,
              mutation.isPending && styles.accessButtonLoading,
            ]}
            textstyle={{color: colors.WHITE}}
            text="참여하기"
            onPress={accessClub}
          />
        </View>
        <Spacer height={20} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollBox: {flex: 1},
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
  accessButton: {
    borderRadius: 10,
    paddingVertical: 16,
  },
  accessButtonLoading: {
    opacity: 0.5,
  },
  cardBox: {
    padding: 20,
    gap: 20,
  },
  cardBoxText: {
    paddingHorizontal: 20,
    fontWeight: 'bold',
    color: colors.BLACK,
    fontSize: 20,
  },
});

export default ClubDetailScreen;
