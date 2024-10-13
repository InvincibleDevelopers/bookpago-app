import TabIcon from './TabIcon';

export const HomeIcon = ({focused}: {focused: boolean}) => {
  return (
    <TabIcon
      text="홈"
      isFocus={focused}
      focusIconProp={require('@src/assets/icons/home-active.png')}
      unFocusIconProp={require('@src/assets/icons/home.png')}
    />
  );
};

export const SearchIcon = ({focused}: {focused: boolean}) => {
  return (
    <TabIcon
      text="도서 검색"
      isFocus={focused}
      focusIconProp={require('@src/assets/icons/search-active.png')}
      unFocusIconProp={require('@src/assets/icons/search.png')}
    />
  );
};

export const SocialIcon = ({focused}: {focused: boolean}) => {
  return (
    <TabIcon
      text="소셜"
      isFocus={focused}
      focusIconProp={require('@src/assets/icons/social-active.png')}
      unFocusIconProp={require('@src/assets/icons/social.png')}
    />
  );
};

// export const CalendarIcon = ({focused}: {focused: boolean}) => {
//   return (
//     <TabIcon
//       isFocus={focused}
//       focusIconProp={require('@src/assets/icons/cal.png')}
//       unFocusIconProp={require('@src/assets/icons/ncal.png')}
//     />
//   );
// };

export const MyPageIcon = ({focused}: {focused: boolean}) => {
  return (
    <TabIcon
      text="프로필"
      isFocus={focused}
      focusIconProp={require('@src/assets/icons/profile-active.png')}
      unFocusIconProp={require('@src/assets/icons/profile.png')}
    />
  );
};
