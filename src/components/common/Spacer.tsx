import {View, ViewProps} from 'react-native';

interface Props extends ViewProps {
  height: number;
  backgroundColor?: string;
}

const Spacer = ({height, backgroundColor}: Props) => {
  return <View style={{height, backgroundColor}} />;
};

export default Spacer;
