import React from 'react';
import {Modal, SafeAreaView, ScrollView, Text, StyleSheet} from 'react-native';
import BackHeader from '../common/header/BackHeader';
import {colors} from '@src/constants';
import Spacer from '../common/Spacer';
import ClubCard from '../common/card/ClubCard';

interface ParticipateClubModalProps {
  isShow: boolean;
  onClose: () => void;
  clubList: SocialClub[];
  onPressRow: (club: SocialClub) => void;
}

const ParticipateClubModal = ({
  isShow,
  onClose,
  clubList,
  onPressRow,
}: ParticipateClubModalProps) => {
  return (
    <Modal visible={isShow} animationType="slide" transparent>
      <SafeAreaView style={styles.container}>
        <BackHeader imageProps={{onPress: onClose}} />
        <Spacer height={10} />
        <Text style={styles.title}>참여중인 독서모임</Text>
        <Spacer height={10} />
        <ScrollView contentContainerStyle={{paddingHorizontal: 10, gap: 10}}>
          {clubList.map((club, index) => (
            <ClubCard
              row={2}
              style={{width: '100%'}}
              data={club}
              key={`participateClubModal_${club.id}_${index}`}
              onPress={() => onPressRow(club)}
            />
          ))}
          <Spacer height={20} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  title: {
    paddingHorizontal: 20,
    color: colors.BLACK,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ParticipateClubModal;
