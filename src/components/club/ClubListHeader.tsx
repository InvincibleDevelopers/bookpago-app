import {Picker} from '@react-native-picker/picker';
import {colors} from '@src/constants';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import CustomText from '../CustomText';
import Spacer from '../common/Spacer';
import BorderButton from '../common/button/BorderButton';

const ClubListHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={0}
          onValueChange={() => {}}
          style={styles.picker}
          dropdownIconColor={colors.THEME}>
          <Picker.Item label="인기순" value={0} />
          <Picker.Item label="최신순" value={1} />
          <Picker.Item label="가까운 위치" value={2} />
        </Picker>
      </View>
      <Spacer height={10} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.BACKGROUND,
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

export default ClubListHeader;
