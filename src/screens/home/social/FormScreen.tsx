import {OnCompleteParams} from '@actbase/react-daum-postcode/lib/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import PostcodeModal from '@src/components/PostcodeModal';
import DismissKeyboardView from '@src/components/common/DismissKeyboardView';
import Spacer from '@src/components/common/Spacer';
import BackHeader from '@src/components/common/header/BackHeader';
import {CYCLE, WEEKDAYS, colors} from '@src/constants';
import {SocialStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useContext, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import {postClub} from '@src/api/club';

interface WeekdayButtonProps {
  children: string;
  isActive: boolean;
  onPress: (value: number) => void;
  value: number;
  isLoading?: boolean;
}

const ToggleButton = ({
  children,
  isActive,
  onPress,
  value,
  isLoading = false,
}: WeekdayButtonProps) => {
  return (
    <Pressable
      style={[styles.button, isActive && styles.buttonActive]}
      onPress={() => onPress(value)}>
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.WHITE} />
      ) : (
        <Text style={[styles.buttonText, isActive && styles.buttonTextActive]}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

type Props = NativeStackScreenProps<SocialStackParamList, 'Form'>;

const FormScreen = ({navigation}: Props) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isShowPostcode, setIsShowPostcode] = useState(false);
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [weekdays, setWeekdays] = useState<number[]>([]);
  const [repeatCycle, setRepeatCycle] = useState(0);
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(new Date());
  const {kakaoId} = useContext(MainContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (mutation.isPending || !kakaoId) {
        return;
      }

      if (!title || !location || !weekdays.length || !desc) {
        Alert.alert('입력되지 않은 항목이 있습니다.');
        return;
      }

      const body = await postClub({
        kakaoId,
        location,
        clubName: title,
        weekDay: weekdays,
        description: desc,
        time: dayjs(date).format('HH:mm'),
      });

      return {...body, clubId: body.id};
    },
    onSuccess: async result => {
      if (!result) {
        return;
      }
      navigation.pop();
      navigation.navigate('ClubDetail', {
        socialGrop: result,
      });
      await queryClient.invalidateQueries({queryKey: ['/social/clubs']});
    },
  });

  const showPostcode = () => setIsShowPostcode(() => true);
  const closePostcode = () => setIsShowPostcode(() => false);
  const showDatePicker = () => setIsShowDatePicker(() => true);
  const closeDatePicker = () => setIsShowDatePicker(() => false);

  const onChangeTitle = (text: string) => setTitle(text);

  const selectLocation = (data: OnCompleteParams) => {
    setLocation(data.address);
    setIsShowPostcode(() => false);
  };

  const seleteWeekdays = (value: number) => {
    const isInclude = weekdays.includes(value);
    const newWeekdays = isInclude
      ? weekdays.filter(day => day !== value)
      : [...weekdays, value];
    setWeekdays(() => newWeekdays);
  };

  const seleteRepeatCycle = (value: number) => {
    setRepeatCycle(() => value);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <DismissKeyboardView style={{flex: 1}}>
        <BackHeader
          title="토론 작성"
          buttons={[
            <ToggleButton
              value={0}
              isActive
              onPress={() => mutation.mutate()}
              isLoading={mutation.isPending}>
              완료
            </ToggleButton>,
          ]}
        />
        <ScrollView contentContainerStyle={styles.scrollViewBox}>
          <View style={styles.titleInputBox}>
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={onChangeTitle}
              placeholder="제목을 입력해주세요"
            />
          </View>
          <Spacer height={10} />
          <Pressable onPress={showPostcode}>
            <View style={styles.locationInputBox}>
              <Image
                source={require('@src/assets/icons/position.png')}
                style={styles.icon}
              />
              <Text style={location && styles.locationInputTextActive}>
                {location ? location : '장소를 입력해주세요'}
              </Text>
            </View>
          </Pressable>
          <Spacer height={10} />
          <Pressable onPress={showDatePicker}>
            <View style={styles.locationInputBox}>
              <Image
                source={require('@src/assets/icons/clock.png')}
                style={styles.icon}
              />
              <Text style={location && styles.locationInputTextActive}>
                {dayjs(date).format('HH:mm')}
              </Text>
            </View>
          </Pressable>
          <Spacer height={20} />
          <View style={styles.weekdayBox}>
            <Text>토론 요일을 선택해 주세요</Text>
            <Spacer height={10} />
            <View style={styles.weekdayButtonBox}>
              {WEEKDAYS.map((day, index) => (
                <ToggleButton
                  isActive={weekdays.includes(index)}
                  key={index}
                  value={index}
                  onPress={seleteWeekdays}>
                  {day}
                </ToggleButton>
              ))}
            </View>
            <Spacer height={45} />
            <Text>토론 요일을 선택해 주세요</Text>
            <Spacer height={20} />
            <View style={styles.weekdayButtonBox}>
              {CYCLE.map((c, index) => (
                <ToggleButton
                  isActive={index === repeatCycle}
                  key={index}
                  value={index}
                  onPress={seleteRepeatCycle}>
                  {c}
                </ToggleButton>
              ))}
            </View>
          </View>
          <Spacer height={20} />
          <View style={styles.descBox}>
            <Image
              source={require('@src/assets/icons/dollar-sign.png')}
              style={styles.icon}
            />
            <View>
              <TextInput
                value={desc}
                onChangeText={setDesc}
                placeholder="주요활동 설명을 입력해 주세요"
                multiline
              />
            </View>
          </View>
          <Spacer height={20} />
        </ScrollView>
      </DismissKeyboardView>
      <PostcodeModal
        isShow={isShowPostcode}
        onClose={closePostcode}
        onSelected={selectLocation}
      />
      <DatePicker
        modal
        title="날짜 선택"
        open={isShowDatePicker}
        date={date}
        mode="time"
        onConfirm={date => {
          setDate(date);
          closeDatePicker();
        }}
        onCancel={closeDatePicker}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollViewBox: {
    padding: 10,
  },
  titleInputBox: {},
  titleInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_300,
  },
  locationInputBox: {
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
  locationInputTextActive: {
    color: colors.BLACK,
  },
  weekdayBox: {
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    paddingVertical: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.GRAY,
  },
  weekdayButtonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 1.5,
    gap: 7,
    flexWrap: 'wrap',
  },
  descBox: {
    backgroundColor: colors.WHITE,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.GRAY,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {width: 18, height: 18, marginRight: 7},
  button: {
    backgroundColor: colors.WHITE,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 9999,
    borderColor: colors.GRAY_300,
    borderWidth: 1,
  },
  buttonText: {
    color: colors.GRAY_300,
  },
  buttonActive: {
    backgroundColor: colors.THEME,
    borderColor: colors.THEME,
  },
  buttonTextActive: {
    color: colors.WHITE,
  },
});

export default FormScreen;
