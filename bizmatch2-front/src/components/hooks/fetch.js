import { useEffect, useState } from "react";

/**
 * custom hook.
 * 함수명이 use로 시작하면 무조건 hook으로 인식.
 *
 * hook 내부에서 다른 hook들을 자유롭게 사용할 수 있다.
 */
export function useFetch(initiateValue, fnFetch) {
  // fetch의 결과를 저장할 스테이트
  const [fectchData, setFechedData] = useState(initiateValue);
  // fetch가 진행중인지, 종료되었는지 판단할 스테이트
  const [isLoading, setIsLoading] = useState(true);
  // fetch 결과가 에러일 경우, 에러 메시지를 저장할 스테이트
  const [errors, setErrors] = useState();

  useEffect(() => {
    const doFetch = async () => {
      setIsLoading(true);

      try {
        const fetchJson = await fnFetch();
        setFechedData(fetchJson);
      } catch (e) {
        setErrors(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    doFetch();
  }, [fnFetch]);

  // 결과 반환.
  return { fectchData, setFechedData, isLoading, errors };
}

export function useFetchForEvent() {}
