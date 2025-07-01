import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers, { endpoint }) => {
      const publicEndpoints = ["loginUser"];

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
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    getLoggedInUser: builder.query({
      query: () => "/auth/profile",
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: (updatedUser) => ({
        url: "/auth/profile",
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetLoggedInUserQuery,
  useUpdateUserMutation,
} = authApi;
