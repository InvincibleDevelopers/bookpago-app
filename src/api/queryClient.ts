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

export const checkIsEndPage = (
  lastPageContent: any[],
  allPage: any[],
  pageSize: number,
) => {
  // 마지막 페이지가 PAGE_SIZE만큼 데이터를 가지고 있으면 다음 페이지를 요청
  return lastPageContent.length === pageSize ? allPage.length + 1 : undefined;
};

export default queryClient;
