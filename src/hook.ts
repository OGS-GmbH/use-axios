import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios"
import { useEffect, useMemo, useRef, useState } from "react";
import type { UseAxiosAbortFn, UseAxiosCycle, UseAxiosOptions, UseAxiosReturn } from "./types";

/**
 * React hook for handling Axios requests with support for request cancellation and state management.
 *
 * Main benefit of this hook is that it abstracts away the logic of handling request states and cancellation, providing a simple interface for making requests and reacting to their state changes.
 *
 * @example
 * ```tsx
 * function MyComponent () {
 *   const {data, isLoading, hasError, execute} = useAxios<{name: string, address: string}, {message: string}>({
 *     method: "get",
 *     url: "/api/user"
 *   })
 *
 *   return (
 *     <>
 *       <p>{data.name}</p>
 *       <p>{data.address}</p>
 *     </>
 *   )
 * }
 * ```
 *
 * @typeParam TData - Type of the response data.
 * @typeParam TError - Type of the response error.
 * @param options - {@link UseAxiosOptions} for the hook, including Axios request config and additional options for controlling the behavior of the hook.
 * @returns An {@link UseAxiosReturn} containing the request state, response data, and handler functions for executing and aborting the request.
 *
 * @category Hooks
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function useAxios <
  TData,
  TError
> ({immediate, instance, ...axiosRequestConfig}: UseAxiosOptions): UseAxiosReturn<TData, TError> {
  const axiosInstance = useRef<AxiosInstance>(instance || axios);
  const [cycle, setCycle] = useState<UseAxiosCycle>("pending");
  const [response, setResponse] = useState<AxiosResponse<TData, TError> | null>(null);
  const isLoading = useMemo(() => cycle === "loading", [cycle]);
  const hasFinished = useMemo(() => (["error", "success", "canceled"] as UseAxiosCycle[]).includes(cycle), [cycle]);
  const hasError = useMemo(() => cycle === "error", [cycle]);
  const hasSuccess = useMemo(() => cycle === "success", [cycle]);
  const isPending = useMemo(() => cycle === "pending", [cycle]);
  const hasAborted = useMemo(() => cycle === "aborted", [cycle]);
  const abortController = useRef(new AbortController());

  function abort (): ReturnType<UseAxiosAbortFn> {
    abortController.current.abort();
    setCycle("aborted");
    abortController.current = new AbortController();
  }

  function execute (executeAxiosRequestConfig?: AxiosRequestConfig): Promise<AxiosResponse<TData, TError>> {
    setCycle("loading");

    const thenableResponse = axiosInstance.current.request<TData>({
      signal: abortController.current.signal,
      ...axiosRequestConfig,
      ...executeAxiosRequestConfig
    });

    thenableResponse.then((thenableInnerResponse) => {
      setCycle("success");
      setResponse(thenableInnerResponse)
    }).catch((thenableInnerResponse) => {
      setCycle("error");
      setResponse(thenableInnerResponse);
    });

    return thenableResponse;
  }

  useEffect(() => {
    if (immediate)
      execute()
  }, [immediate])

  return {
    execute,
    cycle,
    isLoading,
    isPending,
    hasAborted,
    hasFinished,
    hasError,
    hasSuccess,
    abort,
    ...response
  }
}

export {
  useAxios
}
