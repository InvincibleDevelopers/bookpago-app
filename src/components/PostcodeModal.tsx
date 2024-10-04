import React from 'react';
import {SafeAreaView, Modal} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import {OnCompleteParams} from '@actbase/react-daum-postcode/lib/types';
import BackHeader from './common/header/BackHeader';

interface PostcodeModalProps {
  isShow: boolean;
  onSelected: (data: OnCompleteParams) => void;
  onClose: () => void;
}

const PostcodeModal = ({isShow, onSelected, onClose}: PostcodeModalProps) => {
  return (
    <Modal visible={isShow} animationType="slide" transparent>
      <SafeAreaView style={{flex: 1}}>
        <BackHeader imageProps={{onPress: onClose}} />
        <Postcode
          style={{flex: 1}}
          jsOptions={{animation: true, hideMapBtn: true}}
          onSelected={onSelected}
          onError={onClose}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default PostcodeModal;
