import {
  RichText,
  TenTapStartKit,
  Toolbar,
  useEditorBridge,
  PlaceholderBridge,
} from '@10play/tentap-editor';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {postClub} from '@src/api/club';
import Chip from '@src/components/common/Chip';
import BackHeader from '@src/components/common/header/BackHeader';
import {CUSTOM_TOOLBAR} from '@src/components/common/Toolbar';
import {colors} from '@src/constants';
import {RootStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useContext} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'ClubEdit'>;

const ClubEditScreen = ({navigation, route}: Props) => {
  const props = route.params;

  const {kakaoId} = useContext(MainContext);

  const queryClient = useQueryClient();

  // https://github.com/10play/10tap-editor/blob/main/example/src/Examples/CustomKeyboardExample.tsx
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: '',
    bridgeExtensions: [
      ...TenTapStartKit,
      // ImageBridge.configureExtension({}),
      PlaceholderBridge.configureExtension({
        placeholder: '내용을 입력해주세요.',
      }),
    ],
  });

  const mutation = useMutation({
    mutationFn: async (arg: {
      title: string;
      location: string;
      weekdays: number[];
      repeatCycle: number;
      time: string;
    }) => {
      if (mutation.isPending || !kakaoId) {
        return;
      }

      const html = await editor.getHTML();

      const body = await postClub({
        ...arg,
        kakaoId,
        clubName: arg.title,
        weekDay: arg.weekdays,
        description: html,
      });

      return {...body, clubId: body.id};
    },

    onSuccess: async result => {
      if (!result) {
        return;
      }

      navigation.popToTop(); // navigation 초기화
      navigation.navigate('HomeTab', {
        screen: 'Social',
        params: {screen: 'ClubDetail', params: {socialGrop: result}},
      });

      await queryClient.invalidateQueries({queryKey: ['/social/clubs']});
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        title="활동내역"
        buttons={[
          <Chip
            value={0}
            isActive
            onPress={() => mutation.mutate(props)}
            isLoading={mutation.isPending}>
            완료
          </Chip>,
        ]}
        imageProps={{
          onPress: () => navigation.goBack(),
        }}
      />
      <View style={styles.richTextBox}>
        <RichText editor={editor} />
      </View>
      <KeyboardAvoidingView style={styles.toolbarBox}>
        <Toolbar editor={editor} items={CUSTOM_TOOLBAR} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  richTextBox: {
    padding: 10,
    flex: 1,
    borderColor: colors.GRAY_300,
    borderWidth: 1,
  },
  toolbarBox: {
    position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
  },
});

export default ClubEditScreen;
