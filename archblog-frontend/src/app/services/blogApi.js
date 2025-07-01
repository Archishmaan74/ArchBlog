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
      providesTags: ["Blogs"],
    }),

    getMyBlogs: builder.query({
      query: () => "/blogs/myblogs",
    }),

    postAddBlog: builder.mutation({
      query: ({ title, content }) => ({
        url: "/blogs",
        method: "POST",
        body: { title, content },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const { useGetBlogsQuery, usePostAddBlogMutation, useGetMyBlogsQuery } =
  blogApi;
