import {
  Picker,
  PickerItemProps,
  PickerProps,
} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import CustomText from './CustomText';

interface SelectionProps extends PickerProps {
  containerStyle?: StyleProp<ViewStyle>;
  pickerItems?: React.ComponentType<PickerItemProps>[];
  options: string[];
}

const Selection = ({pickerItems, options, containerStyle}: SelectionProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  return (
    <View style={{flexDirection: "row", alignItems: "center"}}>
        <CustomText style={{fontSize: 16}}>성별</CustomText>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        style={containerStyle}>
        {options &&
          options.map((item: string, index: number) => {
            return <Picker.Item key={index} label={item} value={item} />;
          })}
      </Picker>
    </View>
  );
};

export default Selection;
