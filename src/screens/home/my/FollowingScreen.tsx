import {NativeStackScreenProps} from '@react-navigation/native-stack';
import UserCard from '@src/components/UserCard';
import {MyStackParamList, UserProfile} from '@src/types';
import {useState} from 'react';
import {ScrollView, View} from 'react-native';

type Props = NativeStackScreenProps<MyStackParamList>;

const FollowingScreen = ({navigation, route}: Props) => {
  const [data, setData] = useState<UserProfile[]>([]);

  // useOnStart(() => {
  //   getMutation.mutate(
  //     {path: '/profile/follower?targetId=52&page=0&size=10'},
  //     {
  //       onSuccess: result => {
  //         const temp: UserProfile = {
  //           nickname: result.content[0].nickname,
  //           username: result.content[0].username,
  //           isMine: false,
  //         };
  //         setData(prev => [...prev, temp]);
  //       },
  //     },
  //   );
  // });

  return (
    <View>
      {data &&
        data.map((item: UserProfile, index: number) => {
          return (
            <ScrollView style={{borderBottomWidth: 1}} key={index}>
              <UserCard
                OnClick={() => navigation.navigate('Profile', {kakaoId: 0})}
                {...item}
              />
            </ScrollView>
          );
        })}
    </View>
  );
};

export default FollowingScreen;
