import {HEADER_HEIGHT} from '@src/constants';
import {colors} from '@src/constants/colors';
import {
  Image,
  StyleSheet,
  TextInputProps,
  View,
  Pressable,
  TextInput,
} from 'react-native';

interface SearchHeaderProps extends TextInputProps {
  isShowAiButton?: boolean;
  aiButtonType?: 'book' | 'default';
  onPressBack: () => void;
  onPressAi?: () => void;
  onPressSearch: () => void;
}

const SearchHeader = ({
  isShowAiButton = false,
  aiButtonType = 'default',
  onPressBack,
  onPressAi,
  onPressSearch,
  style,
  ...props
}: SearchHeaderProps) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={onPressBack}>
        <Image
          style={{width: 20, height: 20}}
          source={require('@src/assets/icons/hback.png')}
          resizeMode="center"
        />
      </Pressable>
      <View style={styles.inputBox}>
        <TextInput style={[styles.input, style]} {...props} />
        {isShowAiButton && (
          <Pressable style={styles.button} onPress={onPressAi}>
            <Image
              source={
                aiButtonType === 'default'
                  ? require('@src/assets/icons/hai.png')
                  : require('@src/assets/icons/hbook.png')
              }
              style={styles.buttonImage}
              resizeMode="center"
            />
          </Pressable>
        )}
        <Pressable style={styles.button} onPress={onPressSearch}>
          <Image
            source={require('@src/assets/icons/hsearch.png')}
            style={styles.buttonImage}
            resizeMode="center"
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 20,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBox: {
    backgroundColor: colors.GRAY,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 9999,
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 14,
    fontSize: 14,
    flex: 1,
  },
  backButton: {
    marginRight: 10,
  },
  button: {
    borderRadius: 9999,
    marginRight: 10,
  },
  buttonImage: {
    width: 20,
    height: 20,
  },
});

export default SearchHeader;
