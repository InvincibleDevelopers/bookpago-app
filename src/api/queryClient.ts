import {QueryCache, QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    async onError(error, query) {
      const querykey = query.queryKey;
      // queryKey에 ignore가 포함되어 있으면 예외처리
      if (querykey.includes('ignore')) return;
    },
  }),
  defaultOptions: {
    queries: {
      gcTime: 30 * 1000, // 30초
      staleTime: 10 * 1000, // 10초
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // failureCount 0부터 시작
        // 재시도 횟수를 3으로 설정
        return failureCount < 2;
      },
      retryDelay: 1000 * 2,
    },
    mutations: {
      gcTime: 0,
      retry: false, // 재시도를 하지 않음
      // onError: async error => {},
    },
  },
});

export default queryClient;
