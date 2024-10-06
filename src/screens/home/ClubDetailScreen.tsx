import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import LoadingView from '@src/components/LoadingView';
import MypageButton from '@src/components/common/button/MypageButton';
import BackHeader from '@src/components/common/header/BackHeader';
import {CYCLE, colors} from '@src/constants';
import {
  HomeTabParamList,
  MainStackParamList,
  MyStackParamList,
  SocialStackParamList,
} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useContext, useState, useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import ErrorScreen from '../ErrorScreen';
import {getClubDetail, postJoinClub} from '@src/api/club';
import ClubMemberCard from '@src/components/common/card/ClubMemberCard';
import Spacer from '@src/components/common/Spacer';
import {getWeekdayText} from '@src/utils/helper';
import SelectModal, {SelectModalOptions} from '@src/components/SelectModal';
import useJoinClub from '@src/hooks/useJoinClub';

const MEMBER_OPTIONS: SelectModalOptions[] = [
  {
    value: '0',
    text: '프로필 페이지로 이동',
  },
  {
    value: '1',
    text: '추방하기',
  },
];

const APPLICANT_OPTIONS: SelectModalOptions[] = [
  {
    value: '0',
    text: '프로필 페이지로 이동',
  },
  {
    value: '1',
    text: '수락하기',
  },
  {
    value: '2',
    text: '거절하기',
  },
];

type Props = NativeStackScreenProps<
  MainStackParamList & SocialStackParamList & MyStackParamList,
  'ClubDetail'
>;

const ClubDetailScreen = ({navigation, route}: Props) => {
  const props = route.params.socialGrop;
  const tabNav = navigation.getParent<NavigationProp<HomeTabParamList>>();
  const {kakaoId} = useContext(MainContext);
  const [selectedMember, setSelecteMember] = useState<{
    kakaoId: number;
    status: 0 | 1;
  } | null>(null);

  const queryClient = useQueryClient();

  const clubQuery = useQuery({
    queryKey: ['/social/clubs/:clubId', props.id],
    queryFn: () => getClubDetail({clubId: props.id, kakaoId: kakaoId!}),
  });

  const mutationJoinClub = useJoinClub();

  const isAdmin = clubQuery.data?.adminId === kakaoId;

  const isIJoinded = useMemo(() => {
    const data = clubQuery.data;
    if (!data) return true;
    const list = data.memberList.concat(data.applicantList);
    return list.some(member => member.kakaoId === kakaoId);
  }, [clubQuery.data, kakaoId]);

  const accessClub = () => {
    if (mutationJoinClub.isPending) {
      return;
    }
    mutationJoinClub.mutate({
      kakaoId: kakaoId!,
      clubId: props.id,
      isJoin: isIJoinded,
    });
  };

  const onPressMember = (id: number) => {
    setSelecteMember({kakaoId: id, status: 0});
  };

  const onPressApplicant = (id: number) => {
    setSelecteMember({kakaoId: id, status: 1});
  };

  const onCloseModal = () => {
    setSelecteMember(() => null);
  };

  const onSelectModal = (value: string) => {
    if (!selectedMember) {
      return;
    }

    onCloseModal();

    if (value === '0') {
      tabNav.navigate('My', {
        screen: 'Profile',
        params: {kakaoId: selectedMember.kakaoId},
      });
      return;
    }

    if (selectedMember.status === 0) {
      // 멤버

      if (value === '1') {
        // 추방하기
      }
    } else {
      // 신청자
      if (value === '1') {
        // 수락하기
      } else if (value === '2') {
        // 거절하기
      }
    }
  };

  const weekdayText = getWeekdayText(props.weekDay);

  const selectModalOption = useMemo(() => {
    if (!selectedMember) {
      return [];
    }
    const option =
      selectedMember.status === 0 ? MEMBER_OPTIONS : APPLICANT_OPTIONS;

    return isAdmin ? option : option.filter(o => o.value === '0');
  }, [selectedMember]);

  if (clubQuery.error) {
    const error = clubQuery.error as unknown as {error: string};
    return <ErrorScreen errorMessage={error.error} />;
  }

  if (clubQuery.isPending) {
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
    <>
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
            <CustomText style={{fontSize: 20}}>
              {clubQuery.data?.adminId}
            </CustomText>
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
                {`${CYCLE[props.repeatCycle]} (${weekdayText}) `}
                <CustomText style={styles.highlightText}>
                  {props.time}
                </CustomText>
              </CustomText>
            </View>
            <View style={[styles.row, {alignItems: 'flex-start'}]}>
              <Image
                style={[styles.icon, {marginTop: 4}]}
                source={require('@src/assets/icons/dollar-sign.png')}
                resizeMode="center"
              />
              <CustomText style={[styles.text, {flex: 1}]}>
                {`주요 활동 ${props.description}`}
              </CustomText>
            </View>
          </View>
          <Spacer height={20} />
          <View>
            <Text style={styles.cardBoxText}>참여자 목록</Text>
            <ScrollView
              horizontal
              contentContainerStyle={styles.cardBox}
              showsHorizontalScrollIndicator={false}>
              {clubQuery.data?.memberList.map((member, index) => (
                <ClubMemberCard
                  key={`member_${member.kakaoId}_${index}`}
                  onPress={() => onPressMember(member.kakaoId)}
                  kakaoId={member.kakaoId}
                  nickname={member.nickname}
                  profilUrl={member.imgUrl}
                />
              ))}
            </ScrollView>
          </View>

          <Spacer height={20} />

          <View>
            <Text style={styles.cardBoxText}>대기자 목록</Text>
            <ScrollView
              horizontal
              contentContainerStyle={styles.cardBox}
              showsHorizontalScrollIndicator={false}>
              {clubQuery.data?.applicantList.map((member, index) => (
                <ClubMemberCard
                  key={`applicant_${member.kakaoId}_${index}`}
                  onPress={() => onPressApplicant(member.kakaoId)}
                  kakaoId={member.kakaoId}
                  nickname={member.nickname}
                  profilUrl={member.imgUrl}
                />
              ))}
            </ScrollView>
          </View>

          <Spacer height={20} />

          {!isAdmin && (
            <View style={{paddingHorizontal: 20}}>
              <CustomButton
                containerstyle={[
                  styles.accessButton,
                  mutationJoinClub.isPending && styles.accessButtonLoading,
                ]}
                textstyle={{color: colors.WHITE}}
                text={isIJoinded ? '나가기' : '참여하기'}
                onPress={accessClub}
              />
            </View>
          )}
          <Spacer height={20} />
        </ScrollView>
      </SafeAreaView>
      <SelectModal
        isShow={!!selectedMember}
        options={selectModalOption}
        onSelect={onSelectModal}
        onClose={onCloseModal}
      />
    </>
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
