import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const getApiErrorMessage = (
  error: FetchBaseQueryError | SerializedError,
): string => {
  if ("status" in error) {
    if (error.status === "FETCH_ERROR") {
      return "Unable to connect to the server. Please try again.";
    }

    if (error.status === "TIMEOUT_ERROR") {
      return "The request took too long. Please try again.";
    }

    if (typeof error.status === "number") {
      if (error.status === 401) {
        return "Your session has expired. Please log in again.";
      }

      if (error.status === 403) {
        return "You don't have permission to perform this action.";
      }

      if (error.status === 404) {
        return "The requested resource was not found.";
      }

      if (error.status >= 500) {
        return "Something went wrong on the server. Please try again.";
      }
    }
  }

  return "Something went wrong. Please try again.";
};
