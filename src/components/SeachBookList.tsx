import CustomText from '@src/components/CustomText';
import Line from '@src/components/Line';
import {colors} from '@src/constants/colors';
import {SearchBookItem} from '@src/types';
import {memo, useCallback} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';

interface SearchBookListProps {
  isLoading: boolean;
  search: string;
  data: SearchBookItem[];
  enabled: boolean;
  onToggleFavorite: (arg: {isbn: number; isFavorite: boolean}) => void;
}

const SearchBookList = ({
  isLoading,
  search,
  data,
  enabled,
  onToggleFavorite,
}: SearchBookListProps) => {
  const renderItem = useCallback(
    ({item, index}: {item: SearchBookItem; index: number}) => {
      // console.log('item', item.image);
      return (
        <View style={styles.itemBox}>
          <Line
            style={{
              position: 'absolute',
              alignItems: 'center',
              top: 0,
              left: 10,
              right: 10,
            }}
          />
          <View style={styles.itemImageBox}>
            <Image
              style={{width: 68, height: 103, borderRadius: 3}}
              source={{uri: item.image}}
              onError={() => {
                console.log('이미지 불러오기 실패');
              }}
            />
          </View>
          <View style={styles.itemDetailBox}>
            <View style={styles.itemDescBox}>
              <View style={styles.itemTitleBox}>
                <CustomText style={{fontSize: 14, marginBottom: 7}}>
                  {item.title + index}
                </CustomText>
                <CustomText
                  style={{
                    fontSize: 12,
                    color: colors.GRAY_300,
                  }}>
                  {item.author}
                </CustomText>
              </View>
              <View>
                <Pressable
                  onPress={() =>
                    onToggleFavorite({
                      isbn: item.isbn,
                      isFavorite: true,
                    })
                  }>
                  {/* <Image /> */}
                  <Text>버튼</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.itemHashtagBox}>
              <CustomText style={{fontSize: 12, color: colors.GRAY_300}}>
                #판타지
              </CustomText>
              <CustomText style={{fontSize: 12, color: colors.GRAY_300}}>
                #모험
              </CustomText>
              <CustomText style={{fontSize: 12, color: colors.GRAY_300}}>
                #베스트셀러
              </CustomText>
            </View>
          </View>
        </View>
      );
    },
    [onToggleFavorite],
  );

  if (!enabled) {
    // 검색하기 전
    return null;
  }

  if (isLoading) {
    // 검색중
    return (
      <View>
        <CustomText>로딩중...</CustomText>
      </View>
    );
  }

  if (enabled && data.length === 0) {
    // 검색 결과가 없을때
    return (
      <View>
        <CustomText>검색 결과가 없습니다.</CustomText>
      </View>
    );
  }

  return (
    <>
      <View style={styles.searchResult}>
        <CustomText style={{fontSize: 14}}>'</CustomText>
        <CustomText style={{fontSize: 14, color: colors.THEME}}>
          {search}
        </CustomText>
        <CustomText style={{fontSize: 14, marginRight: 7}}>'</CustomText>
        <CustomText
          style={{fontSize: 14}}>{`검색 결과(${data.length})`}</CustomText>
      </View>
      {/* BUG: 네비게이션 하단바랑 겹침 */}
      <View style={styles.listBox}>
        <FlatList
          keyExtractor={(item, index) => item.isbn.toString() + index}
          renderItem={renderItem}
          data={data}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchResult: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  listBox: {
    backgroundColor: colors.WHITE,
  },
  itemBox: {
    position: 'relative',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  itemImageBox: {
    marginRight: 16,
  },
  itemDetailBox: {
    flex: 1,
    marginTop: 10,
  },
  itemDescBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  itemTitleBox: {
    marginBottom: 20,
  },
  itemHashtagBox: {
    flexDirection: 'row',
    color: colors.GRAY,
  },
});

export default memo(SearchBookList);
