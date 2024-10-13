import {getAuthenticated} from '@src/api/auth';
import {KAKAO_ID_KEY} from '@src/constants';
import {createContext, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

type ContextProps = {
  isLoading: boolean;
  kakaoId: number | null;
  isTabVisible: boolean;

  login: (arg: {kakaoId: number}) => void;
  logout: () => void;
  setTabVisibility: (flag: boolean) => void;
};

const defaultContext: ContextProps = {
  isLoading: true,
  kakaoId: null,
  isTabVisible: true,

  login: () => {},
  logout: () => {},
  setTabVisibility: flag => {},
};

export const MainContext = createContext(defaultContext);

const ContextProvider = ({children}: {children: React.ReactNode}) => {
  const [isLoading, setLoading] = useState(true); // 카카오 아이디를 가져오는중..
  const [kakaoId, setKakaoId] = useState<number | null>(null); // null이면 로그인 안한거임
  const [isTabVisible, setContextTabVisibility] = useState<boolean>(true);

  const setTabVisibility = (flag: boolean) => {
    setContextTabVisibility(flag);
  };

  const login = async ({kakaoId}: {kakaoId: number}) => {
    await EncryptedStorage.setItem(KAKAO_ID_KEY, kakaoId.toString());
    setKakaoId(() => kakaoId);
  };

  const logout = async () => {
    await EncryptedStorage.removeItem(KAKAO_ID_KEY);
    setKakaoId(() => null);
  };

  const init = async () => {
    try {
      const value = await EncryptedStorage.getItem(KAKAO_ID_KEY);
      const storedKakaoId = Number(value) || null;

      if (storedKakaoId === null) {
        return;
      }

      await getAuthenticated(storedKakaoId);
      setKakaoId(() => storedKakaoId);
    } catch (e) {
      console.log('error', e);
      await EncryptedStorage.removeItem('kakaoId');
    } finally {
      setLoading(() => false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <MainContext.Provider
      value={{
        isLoading,
        kakaoId,
        isTabVisible,
        setTabVisibility,
        login,
        logout,
      }}>
      {children}
    </MainContext.Provider>
  );
};

export default ContextProvider;
