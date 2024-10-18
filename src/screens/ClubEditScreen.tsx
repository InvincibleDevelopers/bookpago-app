import {
  RichText,
  TenTapStartKit,
  Toolbar,
  useEditorBridge,
  ImageBridge,
} from '@10play/tentap-editor';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {postClub} from '@src/api/club';
import ToggleButton from '@src/components/common/button/ToggleButton';
import BackHeader from '@src/components/common/header/BackHeader';
import {CUSTOM_TOOLBAR} from '@src/components/common/Toolbar';
import {RootStackParamList} from '@src/types';
import {MainContext} from '@src/utils/Context';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import dayjs from 'dayjs';
import {useContext} from 'react';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'ClubEdit'>;

const ClubEditScreen = ({navigation, route}: Props) => {
  const props = route.params;

  const {kakaoId} = useContext(MainContext);

  const queryClient = useQueryClient();

  // https://github.com/10play/10tap-editor/blob/main/example/src/Examples/CustomKeyboardExample.tsx
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: 'Start editing!',
    bridgeExtensions: [...TenTapStartKit, ImageBridge.configureExtension({})],
  });

  const mutation = useMutation({
    mutationFn: async (arg: {
      title: string;
      location: string;
      weekdays: number[];
      repeatCycle: number;
      time: Date;
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
        time: dayjs(arg.time).format('HH:mm'),
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
    <SafeAreaView style={{flex: 1}}>
      <BackHeader
        title="모임 만들기"
        buttons={[
          <ToggleButton
            value={0}
            isActive
            onPress={() => mutation.mutate(props)}
            isLoading={mutation.isPending}>
            완료
          </ToggleButton>,
        ]}
        imageProps={{
          onPress: () => navigation.goBack(),
        }}
      />
      <RichText editor={editor} />
      <KeyboardAvoidingView
        style={{
          position: 'absolute',
          width: '100%',
          left: 0,
          bottom: 0,
        }}>
        <Toolbar editor={editor} items={CUSTOM_TOOLBAR} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ClubEditScreen;
