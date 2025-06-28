import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
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
  }),
});

export const { useGetBlogsQuery, useAddBlogMutation, useGetLoggedInUserQuery } =
  blogApi;
