import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
    }),

    getMyBlogs: builder.query({
      query: () => "/myblogs",
    }),

    addBlog: builder.mutation({
      query: (blogData) => ({
        url: "/blogs",
        method: "POST",
        body: blogData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getLoggedInUser: builder.query({
      query: () => "/user",
    }),

    updateUser: builder.mutation({
      query: (userData) => ({
        url: "/user",
        method: "PUT",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useAddBlogMutation,
  useGetLoggedInUserQuery,
  useUpdateUserMutation,
  useGetMyBlogsQuery,
} = blogApi;
