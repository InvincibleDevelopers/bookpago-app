import {Picker} from '@react-native-picker/picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {get} from '@src/api/axios';
import CustomButton from '@src/components/CustomButton';
import CustomText from '@src/components/CustomText';
import BorderButton from '@src/components/common/button/BorderButton';
import MypageButton from '@src/components/common/button/MypageButton';
import GroupCard from '@src/components/common/card/GroupCard';
import Header from '@src/components/common/header/Header';
import {colors} from '@src/constants';
import {SocialStackParamList} from '@src/types';
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

type Props = NativeStackScreenProps<SocialStackParamList, 'Main'>;

const MainScreen = ({navigation}: Props) => {
  const tabnav = navigation.getParent();
  const [v, s] = useState(0);

  const socialClubQuery = useQuery<SocialGroup[], {error: string}>({
    queryKey: ['/social/clubs'],
    queryFn: async () => {
      //page가 0부터 시작
      const body: {content: {meetingTime: string} & SocialGroup[]} = await get({
        path: '/social/clubs?page=0&size=10',
      });
      return body.content;
    },
    select: datas => {
      return datas.map(data => ({
        ...data,
        meetingTime: new Date(data.meetingTime),
      }));
    },
  });

  if (socialClubQuery.error) {
    <SafeAreaView style={styles.container}>
      <Header
        buttons={[<MypageButton onPress={() => tabnav?.navigate('Mypage')} />]}
      />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <CustomText style={styles.messageText}>
          {socialClubQuery.error.error}
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
    </SafeAreaView>;
  }

  if (socialClubQuery.isPending) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          buttons={[
            <MypageButton onPress={() => tabnav?.navigate('MyPage')} />,
          ]}
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
        buttons={[<MypageButton onPress={() => tabnav?.navigate('Mypage')} />]}
      />
      <View style={styles.content}>
        <View style={styles.topBox}>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={v}
              onValueChange={t => s(() => t)}
              style={styles.picker}
              dropdownIconColor={colors.THEME}>
              <Picker.Item label="인기순" value={0} />
              <Picker.Item label="최신순" value={1} />
              <Picker.Item label="가까운 위치" value={2} />
            </Picker>
          </View>
          <View>
            <CustomText
              style={{
                fontSize: 20,
                color: colors.BLACK,
                marginBottom: 18,
              }}>
              현재 핫한 독서 모임
            </CustomText>
            <ScrollView
              contentContainerStyle={{gap: 7}}
              horizontal
              showsHorizontalScrollIndicator={false}
              overScrollMode="never" // Android
              bounces={false} // iOS
            >
              <Pressable onPress={() => {}}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  source={require('@src/assets/buttons/filter.png')}></Image>
              </Pressable>
              <BorderButton>전체</BorderButton>
              <BorderButton>미스터리</BorderButton>
              <BorderButton>스릴러</BorderButton>
              <BorderButton>판타지</BorderButton>
              <BorderButton>기타등등</BorderButton>
              <BorderButton>기타등등</BorderButton>
              <BorderButton>기타등등</BorderButton>
              <BorderButton>기타등등</BorderButton>
            </ScrollView>
          </View>
        </View>
        <ScrollView
          style={styles.scrollBox}
          contentContainerStyle={styles.inner}>
          {socialClubQuery.data?.map((data, index) => (
            <GroupCard
              key={index}
              clubName={data.clubName}
              style={{width: '100%'}}
              members={data.members}
              meetingTime={data.meetingTime}
              location={data.location}
              row={2}
              description="adasdasd"
              onPress={() => navigation.navigate('Detail', {socialGrop: data})}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  content: {
    flex: 1,
  },
  topBox: {
    marginVertical: 20, // 안쪽 마진
    marginHorizontal: 20, // 바깥쪽 마진
  },
  pickerBox: {
    backgroundColor: colors.WHITE,
    width: 120,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    textAlign: 'center',
    paddingLeft: 7,
  },
  picker: {
    color: colors.THEME,
  },
  scrollBox: {
    // marginVertical: 20, // 안쪽 마진
  },
  inner: {
    gap: 20,
    marginHorizontal: 20, // 바깥쪽 마진
  },
  messageText: {
    fontSize: 17,
    color: colors.GRAY_300,
  },
});

export default MainScreen;
