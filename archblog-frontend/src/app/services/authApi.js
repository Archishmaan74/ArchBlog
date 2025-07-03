import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
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
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    postLoginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    postRegisterUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    getLoggedInUser: builder.query({
      query: () => "/auth/profile",
      providesTags: ["User"],
    }),

    putUpdateUser: builder.mutation({
      query: (updatedUser) => ({
        url: "/auth/profile",
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["User"],
    }),

    postForgotPassword: builder.mutation({
      query: (emailData) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: emailData,
      }),
    }),

    postResetPassword: builder.mutation({
      query: (resetData) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: resetData,
      }),
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
