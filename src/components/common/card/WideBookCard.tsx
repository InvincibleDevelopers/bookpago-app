import CustomText from '@src/components/CustomText';
import {colors} from '@src/constants';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

const WideBookCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image
          style={{
            borderRadius: 3,
            width: 80,
            height: 120,
          }}
          source={{
            uri: 'https://shopping-phinf.pstatic.net/main_3250690/32506900732.20230620100615.jpg',
          }}
        />
      </View>
      <View style={styles.descBox}>
        <CustomText
          style={{fontSize: 17, color: colors.BLACK, marginBottom: 7}}>
          책 제목
        </CustomText>
        <CustomText
          style={{fontSize: 14, color: colors.GRAY_300, marginBottom: 7}}>
          작가
        </CustomText>
        <CustomText
          style={{
            fontSize: 14,
            color: colors.BLACK,
            marginBottom: 7,
            fontWeight: 500,
          }}
          numberOfLines={2}>
          덤블도어 교장의 죽음 이후, 마멈부는 죽음을 먹는 자들에게 점령당하고
          호그와트는 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Voluptate, fuga quaerat. Harum cupiditate assumenda, consequatur
          accusantium neque error suscipit totam dolore minus vel laudantium
          animi. Facilis id dolores labore eius.
        </CustomText>
        <CustomText style={{fontSize: 14, color: colors.GRAY_300}}>
          더보기
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    padding: 20,
    width: Dimensions.get('window').width - 30,

    borderWidth: 1,
    borderColor: colors.GRAY,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  imageBox: {
    marginRight: 20,
  },
  descBox: {
    flex: 1,
  },
});

export default WideBookCard;
