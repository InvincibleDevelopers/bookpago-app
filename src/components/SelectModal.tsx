import {Modal, Pressable, Text, View, StyleSheet} from 'react-native';
import Spacer from './common/Spacer';
import React from 'react';
import {colors} from '@src/constants';

export type SelectModalOptions = {
  value: string;
  text: string;
};

interface SelectModalProps {
  isShow: boolean;
  options: SelectModalOptions[];
  onSelect: (option: string) => void;
  onClose: () => void;
}

const Item = ({text, onPress}: {text: string; onPress: () => void}) => {
  return (
    <Pressable style={styles.option} onPress={onPress}>
      <Text style={styles.optionText}>{text}</Text>
    </Pressable>
  );
};

const SelectModal = ({
  isShow,
  options,
  onSelect,
  onClose,
}: SelectModalProps) => {
  return (
    <Modal
      style={styles.container}
      visible={isShow}
      animationType="slide"
      transparent>
      <View style={styles.container}>
        <View style={styles.optionBox}>
          {options.map(item => {
            return (
              <React.Fragment key={item.value}>
                <Item
                  key={item.value}
                  text={item.text}
                  onPress={() => onSelect(item.value)}
                />
                <Spacer height={10} />
              </React.Fragment>
            );
          })}

          <Item key="close" text="닫기" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    borderWidth: 2,
  },
  optionBox: {
    padding: 20,
  },
  option: {
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    padding: 20,
    alignItems: 'center',
  },
  optionText: {
    color: colors.THEME,
    fontSize: 16,
  },
});

export default SelectModal;
