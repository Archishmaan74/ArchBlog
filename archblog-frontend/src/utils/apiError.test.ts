import { describe, expect, test } from "vitest";
import { getApiErrorMessage } from "./apiError";

describe("getApiErrorMessage", () => {
  test("returns the correct message for known errors", () => {
    expect(getApiErrorMessage({ status: "FETCH_ERROR", error: "" })).toBe(
      "Unable to connect to the server. Please try again.",
    );

    expect(getApiErrorMessage({ status: "TIMEOUT_ERROR", error: "" })).toBe(
      "The request took too long. Please try again.",
    );

    expect(getApiErrorMessage({ status: 401, data: {} })).toBe(
      "Your session has expired. Please log in again.",
    );

    expect(getApiErrorMessage({ status: 403, data: {} })).toBe(
      "You don't have permission to perform this action.",
    );

    expect(getApiErrorMessage({ status: 404, data: {} })).toBe(
      "The requested resource was not found.",
    );

    expect(getApiErrorMessage({ status: 500, data: {} })).toBe(
      "Something went wrong on the server. Please try again.",
    );
  });

  test("returns fallback message for unknown errors", () => {
    expect(getApiErrorMessage({ status: 400, data: {} })).toBe(
      "Something went wrong. Please try again.",
    );

    expect(getApiErrorMessage({ message: "Unknown error" })).toBe(
      "Something went wrong. Please try again.",
    );
  });
});
