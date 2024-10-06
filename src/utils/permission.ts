import {PermissionsAndroid, Alert} from 'react-native';

export const requestExternalStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'External Storage Permission',
        message:
          'This app needs access to your external storage to upload files.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can read external storage');
      return true;
    } else {
      console.log('External storage permission denied');
      Alert.alert('Permission Denied', 'Cannot read files without permission');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
