import {UserProfile} from './UserProfile';

export type RootStackParamList = {
  Auth: undefined;
  HomeTab: undefined;
  Chat: undefined;
};

export type AuthStackParamList = {
  Main: undefined;
  Login: undefined;
  Test: undefined;
};

export type HomeTabParamList = {
  Home: undefined;
  Search: undefined;
  Social: undefined;
  Calendar: undefined;
  My: undefined;
};

export type MainStackParamList = {
  Main: undefined;
  BookDetail: {isbn: number};
  ClubDetail: {socialGrop: SocialClub};
};

export type MyStackParamList = {
  Profile: {kakaoId: number};
  Follower: undefined;
  Followee: undefined;
  Setting: undefined;
  Edit: undefined;
  ClubDetail: {socialGrop: SocialClub};
};

export type SearchStackParamList = {
  Main: undefined;
  BookDetail: {isbn: number};
};

export type SocialStackParamList = {
  Main: undefined;
  Form: undefined;
  ClubDetail: {socialGrop: SocialClub};
};
