import {createContext, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

type ContextProps = {
  isLoading: boolean;
  kakaoId: number | null;
  isTabVisible: boolean;

  login: (arg: {kakaoId: number}) => void;
  setTabVisibility: (flag: boolean) => void;
};

const defaultContext: ContextProps = {
  isLoading: true,
  kakaoId: null,
  isTabVisible: true,

  login: () => {},
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
    await EncryptedStorage.setItem('kakaoId', kakaoId.toString());
    setKakaoId(() => kakaoId);
  };

  useEffect(() => {
    EncryptedStorage.getItem('kakaoId')
      .then(value => {
        const num = Number(value) || null;
        if (num === null) return;
        login({kakaoId: num}).finally(() => {
          setLoading(() => false);
        });
      })
      .catch(() => {
        EncryptedStorage.removeItem('kakaoId').finally(() => {
          setLoading(() => false);
        });
      });
  }, []);

  return (
    <MainContext.Provider
      value={{
        isLoading,
        kakaoId,
        isTabVisible,
        setTabVisibility,
        login,
      }}>
      {children}
    </MainContext.Provider>
  );
};

export default ContextProvider;
