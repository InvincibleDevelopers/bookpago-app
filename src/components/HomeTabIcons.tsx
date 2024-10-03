import TabIcon from './TabIcon';

export const HomeIcon = ({focused}: {focused: boolean}) => {
  return (
    <TabIcon
      isFocus={focused}
      focusIconProp={require('@src/assets/icons/home.png')}
      unFocusIconProp={require('@src/assets/icons/nhome.png')}
    />
  );
};

export const SearchIcon = ({focused}: {focused: boolean}) => {
  return (
    <TabIcon
      isFocus={focused}
      focusIconProp={require('@src/assets/icons/search.png')}
      unFocusIconProp={require('@src/assets/icons/nsearch.png')}
    />
  );
};

export const SocialIcon = ({focused}: {focused: boolean}) => {
  return (
    <TabIcon
      isFocus={focused}
      focusIconProp={require('@src/assets/icons/social.png')}
      unFocusIconProp={require('@src/assets/icons/nsocial.png')}
    />
  );
};

export const CalendarIcon = ({focused}: {focused: boolean}) => {
  return (
    <TabIcon
      isFocus={focused}
      focusIconProp={require('@src/assets/icons/cal.png')}
      unFocusIconProp={require('@src/assets/icons/ncal.png')}
    />
  );
};

export const MyPageIcon = ({focused}: {focused: boolean}) => {
  return (
    <TabIcon
      isFocus={focused}
      focusIconProp={require('@src/assets/icons/my.png')}
      unFocusIconProp={require('@src/assets/icons/nmy.png')}
    />
  );
};
