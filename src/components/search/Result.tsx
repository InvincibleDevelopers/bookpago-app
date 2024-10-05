import CustomText from '@src/components/CustomText';
import {colors} from '@src/constants';
import React from 'react';
import {View, StyleSheet} from 'react-native';

interface SearchResultProps {
  children: string;
  total: number;
}

const SearchResult = ({children, total}: SearchResultProps) => {
  return (
    <View style={styles.container}>
      <CustomText style={{fontSize: 14}} numberOfLines={1}>
        '
        <CustomText style={{fontSize: 14, color: colors.THEME}}>
          {children}
        </CustomText>
        '{` 검색 결과 (${total})`}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.BACKGROUND,
  },
});

export default SearchResult;
