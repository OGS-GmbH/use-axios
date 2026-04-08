import { describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAxios } from "./hook";
import axios from "axios";

vi.mock("axios");

const mockResponse = {
  userId: 1,
  id: 1,
  title: "delectus aut autem",
  completed: false
};

describe("useAxios", () => {
  it("should be called immediately", async ()  => {
    vi.mocked(axios.request).mockResolvedValue({
      data: mockResponse
    });

    const {result} = renderHook(() => useAxios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/todos/1",
      immediate: true
    }));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBe(mockResponse);
  }),
  it("should be aborted", () => {
    vi.mocked(axios.request).mockResolvedValue({
      data: mockResponse
    });

    const {result} = renderHook(() => useAxios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/todos/1"
    }));

    act(() => {
      result.current.execute();
      result.current.abort();
    });

    expect(result.current.hasAborted).toBe(true);
    expect(result.current.cycle).toBe("aborted");
  }),
  it("should be callable by execute", async () => {
    vi.mocked(axios.request).mockResolvedValue({
      data: mockResponse
    });

    const {result} = renderHook(() => useAxios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/todos/1"
    }));

    await act(async () => {
      await result.current.execute()
    })

    expect(result.current.data).toStrictEqual(mockResponse);
    expect(result.current.hasSuccess).toBe(true);
    expect(result.current.hasFinished).toBe(true);
    expect(result.current.cycle).toBe("success");
  }),
  it("should fail with execute", async () => {
    vi.mocked(axios.request).mockRejectedValue(new Error("Network error"));

    const {result} = renderHook(() => useAxios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/todos/1"
    }));

    await expect(result.current.execute()).rejects.toThrow("Network error");

    await waitFor(() => {
      expect(result.current.hasError).toBe(true);
      expect(result.current.cycle).toBe("error");
      expect(result.current.hasFinished).toBe(true);
    });
  })
}) 
