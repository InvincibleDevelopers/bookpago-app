import {patchProfileImage} from '@src/api/profile';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const useUploadProfileImage = (myKakaoId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileKakaoId: number) => {
      const isMyProfile = myKakaoId === profileKakaoId;

      if (!isMyProfile) {
        Alert.alert('본인의 프로필 사진만 변경할 수 있습니다.');
        return false;
      }

      const response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1,
      });

      if (response.didCancel) {
        return false;
      }

      if (response.errorMessage) {
        throw new Error(response.errorMessage);
      }

      const asset = response.assets?.[0];

      const uri = asset?.uri;
      const type = asset?.type;
      const name = asset?.fileName;

      if (!asset || !uri || !type || !name) {
        throw new Error("unknown error: response.assets doesn't exist");
      }

      const result = await patchProfileImage({
        kakaoId: profileKakaoId,
        file: {
          uri,
          type,
          name,
        },
      });

      return true;
    },
    onSuccess: async result => {
      if (!result) return;
      await queryClient.invalidateQueries({queryKey: ['/profile/:kakaoId']});
      Alert.alert('프로필 사진이 변경되었습니다.');
    },
    onError: error => {
      console.error(error);
      Alert.alert('프로필 사진 변경에 실패했습니다.');
    },
  });
};

export default useUploadProfileImage;
