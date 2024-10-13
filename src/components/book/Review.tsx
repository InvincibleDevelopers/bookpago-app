import {colors} from '@src/constants';
import useReviewLikes from '@src/hooks/useReviewLikes';
import {useQueryClient} from '@tanstack/react-query';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {Rating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spacer from '../common/Spacer';

const data = [
  {
    key: 1,
    label: '수정',
  },
  {
    key: 2,
    label: '삭제',
  },
];

interface ReviewProps {
  onPress?: () => void;
  myKakaoId: number;
  isbn: number;
  reviewId: number;
  nickname: string;
  content: string;
  rating: number;
  isLiked: boolean;
  likes: number;
  profileImage?: string | null;
}

const Review = ({
  reviewId,
  myKakaoId,
  isbn,
  nickname,
  profileImage,
  content,
  rating,
  isLiked,
  likes,
  onPress,
}: ReviewProps) => {
  const queryClient = useQueryClient();

  const mutateToggleLikes = useReviewLikes(reviewId, isbn, myKakaoId);

  const onSelect = (option: (typeof data)[0]) => {
    switch (option.key) {
      case 1:
        console.log('수정');
        break;
      case 2:
        console.log('삭제');
        break;
    }
  };

  const onToggleLikes = () => {
    if (mutateToggleLikes.isPending) {
      return;
    }

    mutateToggleLikes.mutate({
      reviewId,
      myKakaoId,
    });
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Spacer height={20} />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Rating
          type="custom"
          minValue={0}
          startingValue={rating}
          ratingCount={5}
          fractions={1} // 분수
          jumpValue={0.5}
          tintColor={styles.rating.backgroundColor} // outer color
          ratingColor="#FFB900" // selected color
          ratingBackgroundColor="#D9D9D9" //unSelected color
          style={styles.rating}
          imageSize={25}
          readonly // control
        />
        <Text style={{color: colors.BLACK, fontSize: 20}}>
          {/* 소수점 첫째자리까지 */}
          {rating.toFixed(1)}
        </Text>
      </View>

      <Spacer height={10} />

      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Image
            source={
              profileImage
                ? {
                    uri: profileImage,
                  }
                : require('@src/assets/user/profile.png')
            }
            style={{width: 20, height: 20, borderRadius: 9999, marginRight: 7}}
          />
          <Text style={{color: colors.BLACK, fontWeight: 'bold'}}>
            {nickname}
          </Text>
        </View>

        <ModalSelector
          overlayStyle={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
          keyExtractor={item => item.key}
          data={data}
          accessible
          onChange={onSelect}
          labelExtractor={item => item.label}
          optionContainerStyle={{backgroundColor: colors.WHITE}}
          cancelStyle={{backgroundColor: colors.WHITE}}
          cancelText="취소">
          <Image
            source={require('@src/assets/icons/more.png')}
            style={{width: 18, height: 18}}
          />
        </ModalSelector>
      </View>

      <Spacer height={10} />

      <Text style={{color: colors.BLACK}}>{content}</Text>

      <Spacer height={10} />

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Pressable style={{marginRight: 5}} onPress={onToggleLikes}>
          <Icon
            size={14}
            color="#FF0000"
            name={isLiked ? 'heart' : 'heart-o'}
          />
        </Pressable>
        <Text style={{color: '#FF0000', fontSize: 14, fontWeight: 'bold'}}>
          {likes.toString()}
        </Text>
      </View>

      <Spacer height={10} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE_200, // outer color
  },
  rating: {
    backgroundColor: colors.WHITE_200, // outer color
    marginRight: 7,
  },
});

export default Review;
