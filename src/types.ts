import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Options for {@link useAxios} hook.
 *
 * @category Types
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type UseAxiosOptions = Partial<{
  /**
   * Flag indicating whether the request should be made immediately on hook initialization.
   * @default `false`
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  immediate: boolean,
  /**
   * Instance to use for the request.
   * @default `axios`
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  instance: AxiosInstance
}> & AxiosRequestConfig;

/**
 * Cycle of the request in {@link useAxios} hook.
 * Possible is only one state at the time of: `loading`, `error`, `success`, `pending` or `aborted`
 *
 * @category Types
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type UseAxiosCycle = "loading" | "error" | "success" | "pending" | "aborted";

/**
 * Fn signature for aborting the request in {@link useAxios} hook.
 *
 * @category Types
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type UseAxiosAbortFn = () => void;

/**
 * Fn signature for executing the request in {@link useAxios} hook.
 *
 * It takes the same config as the one passed to the hook, but with higher priority and returns a `Promise` of `AxiosResponse`, that can be handled as thenable.
 * @typeParam TData - Type of the response data.
 * @typeParam TError - Type of the response error.
 *
 * @category Types
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type UseAxiosExecuteFn <TData, TError> = (options?: AxiosRequestConfig) => Promise<AxiosResponse<TData, TError>>;

/**
 * Return type of {@link useAxios} hook.
 * @typeParam TData - Type of the response data.
 * @typeParam TError - Type of the response error.
 *
 * @category Types
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type UseAxiosReturn <
  TData,
  TError
> = {
  /**
   * Flag indicating whether the request is currently loading. Derived from the {@link UseAxiosReturn.cycle} state.
   */
  isLoading: boolean,
  /**
   * Flag indicating whether the request is currently pending or outstanding. Derived from the {@link UseAxiosReturn.cycle} state.
   */
  isPending: boolean,
  /**
   * Flag indicating whether the request is was aborted. Derived from the {@link UseAxiosReturn.cycle} state.
   *
   * @remarks Aborting the request with a custom `AbortController` signal will not update this flag.
   */
  hasAborted: boolean,
  /**
   * Flag indicating whether the request is finished. Derived from the {@link UseAxiosReturn.cycle} state.
   *
   * @remarks The request is considered finished if it is in either `error`, `success` or `abort` cycle.
   */
  hasFinished: boolean,
  /**
   * Flag indicating whether the request is finished with errors. Derived from the {@link UseAxiosReturn.cycle} state.
   */
  hasError: boolean,
  /**
   * Flag indicating whether the request is finished with success. Derived from the {@link UseAxiosReturn.cycle} state.
   */
  hasSuccess: boolean,
  /**
   * Current cycle of the request.
   * Refer to {@link UseAxiosCycle} for more details on possible cycles and their meaning.
   *
   */
  cycle: UseAxiosCycle,
  /**
   * Abort fn to cancel the request. It will update the cycle to `aborted`.
   */
  abort: UseAxiosAbortFn,
  /**
   * Handler fn to execute the request.
   * Refer to {@link UseAxiosExecuteFn} for more details on the signature of the fn and its behavior.
   */
  execute: UseAxiosExecuteFn<TData, TError>,
} & Partial<AxiosResponse<TData, TError>>;

export type {
  UseAxiosCycle,
  UseAxiosExecuteFn,
  UseAxiosAbortFn,
  UseAxiosOptions,
  UseAxiosReturn
}
