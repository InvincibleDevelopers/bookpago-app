import {DOMAIN} from '@env';
import CustomButton from '@src/components/CustomButton';
import InputField from '@src/components/InputField';
import useAPI from '@src/hooks/useAPI';
import {UserProfile} from '@src/types';
import axios from 'axios';
import {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const SettingScreen = () => {
  const [imageUri, setImageUri] = useState<string>(
    'data:image/jpeg;base64,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',
  );

  const [data, setData] = useState<UserProfile>({
    nickname: '',
    username: '',
  });
  const {postMutation} = useAPI();

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('Image picker cancelled');
        } else if (response.errorMessage) {
          console.log('Image picker error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          setImageUri(uri as string);
        }
      },
    );
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert('No image selected', 'Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg', // 서버에 전송할 이미지의 MIME 타입
      name: 'image.jpg', // 서버에 전송할 파일 이름
    });
    formData.append('username', `${data.username}`);

    try {
      const response = await axios.post(`${DOMAIN}/profile/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Image uploaded successfully!');
      } else {
        Alert.alert('Error', 'Failed to upload image.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while uploading the image.');
    }
  };

  const Submit = async () => {
    await postMutation.mutate(
      {
        path: '/profile/nickname',
        body: {
          username: String(data.username),
          nickname: String(data.nickname),
        },
      },
      {
        onSuccess: () => console.log('DD'),
      },
    );

    postMutation.mutate(
      {
        path: '/profile/introduce',
        body: {
          username: String(data.username),
          introduce: String(data.introduce),
        },
      },
      {
        onSuccess: () => console.log('TT'),
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <InputField
          value={data.nickname}
          onChangeText={e =>
            setData(prev => {
              return {...prev, nickname: e};
            })
          }
          text="닉네임"
        />
        <InputField
          value={data.introduce}
          onChangeText={e =>
            setData(prev => {
              return {...prev, introduce: e};
            })
          }
          text="소개글"
        />
        <CustomButton onPress={Submit} text={'Submit'} />
      </View>
      <View style={{top: 10, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={{uri: imageUri}} style={{width: 200, height: 200}} />
        <Button title="Select Image" onPress={selectImage} />
        <Button title="Upload Image" onPress={uploadImage} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
});

export default SettingScreen;
