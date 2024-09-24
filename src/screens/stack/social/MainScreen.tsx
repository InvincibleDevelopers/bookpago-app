import {Picker} from '@react-native-picker/picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomText from '@src/components/CustomText';
import GroupCard from '@src/components/GroupCard';
import Selection from '@src/components/Selection';
import BorderButton from '@src/components/common/button/BorderButton';
import MypageButton from '@src/components/common/button/MypageButton';
import Header from '@src/components/common/header/Header';
import {colors} from '@src/constants';
import {SocialScreens} from '@src/types';
import {useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

type Props = NativeStackScreenProps<SocialScreens, 'Main'>;

const MainScreen = ({navigation}: Props) => {
  const tabnav = navigation.getParent();
  const [v, s] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        buttons={[<MypageButton onPress={() => tabnav?.navigate('Mypage')} />]}
      />
      <ScrollView style={styles.scrollBox}>
        <View style={styles.inner}>
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
              <Pressable
                onPress={() => {
                  navigation.navigate('Category__hide');
                }}>
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
  scrollBox: {
    flex: 1,
  },
  inner: {
    marginVertical: 20, // 안쪽 마진
    marginHorizontal: 20, // 바깥쪽 마진
    gap: 20,
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
});

export default MainScreen;
