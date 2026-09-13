import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../../types/api";
import {
  EmailRequest,
  JwtResponse,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  UpdateUserRequest,
  User,
} from "../../types/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  timeout: 10000,
  prepareHeaders: (headers, { endpoint }) => {
    const publicEndpoints = [
      "postLoginUser",
      "postRegisterUser",
      "postForgotPassword",
      "postResetPassword",
    ];

    if (!publicEndpoints.includes(endpoint)) {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    postLoginUser: builder.mutation<JwtResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: ApiResponse<JwtResponse>) => response.data,
    }),

    postRegisterUser: builder.mutation<User, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: ApiResponse<User>) => response.data,
    }),

    getLoggedInUser: builder.query<User, void>({
      query: () => "/auth/profile",
      providesTags: ["User"],
      transformResponse: (response: ApiResponse<User>) => response.data,
    }),

    putUpdateUser: builder.mutation<User, UpdateUserRequest>({
      query: (updatedUser) => ({
        url: "/auth/profile",
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response: ApiResponse<User>) => response.data,
    }),

    postForgotPassword: builder.mutation<string, EmailRequest>({
      query: (emailData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: emailData,
      }),
      transformResponse: (response: ApiResponse<string>) => response.data,
    }),

    postResetPassword: builder.mutation<string, ResetPasswordRequest>({
      query: (resetData) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: resetData,
      }),
      transformResponse: (response: ApiResponse<string>) => response.data,
    }),
  }),
});

export const {
  usePostLoginUserMutation,
  usePostRegisterUserMutation,
  useGetLoggedInUserQuery,
  usePutUpdateUserMutation,
  usePostForgotPasswordMutation,
  usePostResetPasswordMutation,
} = authApi;
