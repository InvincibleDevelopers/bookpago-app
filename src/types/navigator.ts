import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  HomeTab?: NavigatorScreenParams<HomeTabParamList>;
  DM: undefined;
  Chat: undefined;
};

export type AuthStackParamList = {
  AuthMain: undefined;
  Login: undefined;
  Join: {kakaoId: number; kakaoOauthToken: string};
  TestLogin: undefined;
};

export type HomeTabParamList = {
  HomeStack?: NavigatorScreenParams<HomeStackParamList>;
  Search?: NavigatorScreenParams<SearchStackParamList>;
  Social?: NavigatorScreenParams<SocialStackParamList>;
  // Calendar: undefined;
  My?: NavigatorScreenParams<MyStackParamList>;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  BookDetail: {isbn: number};
  ClubDetail: {socialGrop: SocialClub};
};

export type SearchStackParamList = {
  SearchMain: undefined;
  BookDetail: {isbn: number};
};

export type SocialStackParamList = {
  SocialMain: undefined;
  Form: undefined;
  ClubDetail: {socialGrop: SocialClub};
};

export type MyStackParamList = {
  Profile: {kakaoId: number};
  Follower: {kakaoId: number};
  Following: {kakaoId: number};
  Setting: undefined;
  WishBook: undefined;
  Edit: undefined;
  ClubDetail: {socialGrop: SocialClub};
  BookDetail: {isbn: number};
};
