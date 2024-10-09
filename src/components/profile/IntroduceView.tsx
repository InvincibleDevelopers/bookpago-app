import {colors} from '@src/constants';
import {View, StyleSheet} from 'react-native';

interface IntroduceViewProps {
  children: React.ReactNode;
}

const IntroduceView = ({children}: IntroduceViewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.THEME,
    flex: 1,
  },
  inner: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: colors.WHITE,
    flex: 1,
  },
});

export default IntroduceView;
