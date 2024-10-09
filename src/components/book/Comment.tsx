import {colors} from '@src/constants';
import {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Rating} from 'react-native-ratings';

const Comment = () => {
  const [rating, setRating] = useState(5);
  const onFinishedRating = (e: number) => {
    setRating(() => e);
  };

  return (
    <Pressable>
      <Rating
        ratingTextColor={colors.BLACK}
        type="custom"
        onFinishRating={onFinishedRating}
        minValue={0}
        startingValue={3}
        ratingCount={5}
        fractions={1} // 분수
        jumpValue={0.5}
        tintColor={styles.rating.backgroundColor} // outer color
        ratingColor="#FFB900" // selected color
        ratingBackgroundColor="#D9D9D9" //unSelected color
        style={styles.rating}
        imageSize={40}
        readonly // control
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  rating: {
    paddingVertical: 10,
    backgroundColor: colors.BACKGROUND, // outer color
  },
});

export default Comment;
