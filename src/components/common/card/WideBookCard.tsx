import CustomText from '@src/components/CustomText';
import {colors} from '@src/constants';
import {BookItem} from '@src/types';
import {Image, StyleSheet, View, Pressable} from 'react-native';

interface WideBookCardProps {
  item: BookItem;
  onPress: () => void;
}

const WideBookCard = ({item, onPress}: WideBookCardProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image style={styles.image} source={{uri: item.image}} />
      <View style={styles.descBox}>
        <CustomText
          numberOfLines={1}
          style={{fontSize: 17, color: colors.BLACK, marginBottom: 7}}>
          {item.title}
        </CustomText>
        <CustomText
          style={{fontSize: 14, color: colors.GRAY_300, marginBottom: 7}}>
          {item.author}
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    padding: 20,
    width: 350,

    borderWidth: 1,
    borderColor: colors.GRAY,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    elevation: 0.5,
  },
  image: {
    marginRight: 20,
    borderRadius: 3,
    width: 80,
    height: 120,
  },
  descBox: {
    flex: 1,
  },
});

export default WideBookCard;
