import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../../types/api";
import { Blog, BlogRequest } from "../../types/blog";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  timeout: 10000,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery,
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    getBlogs: builder.query<Blog[], void>({
      query: () => "/blogs",
      providesTags: ["Blogs"],
      transformResponse: (response: ApiResponse<Blog[]>) => response.data,
    }),

    getMyBlogs: builder.query<Blog[], void>({
      query: () => "/blogs/myblogs",
      providesTags: ["Blogs"],
      transformResponse: (response: ApiResponse<Blog[]>) => response.data,
    }),

    postAddBlog: builder.mutation<Blog, BlogRequest>({
      query: ({ title, content }) => ({
        url: "/blogs",
        method: "POST",
        body: { title, content },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Blogs"],
      transformResponse: (response: ApiResponse<Blog>) => response.data,
    }),

    deleteBlog: builder.mutation<string, number>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
      transformResponse: (response: ApiResponse<string>) => response.data,
    }),

    editBlog: builder.mutation<Blog, BlogRequest & { id: number }>({
      query: ({ id, title, content }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: { title, content },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Blogs"],
      transformResponse: (response: ApiResponse<Blog>) => response.data,
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetMyBlogsQuery,
  usePostAddBlogMutation,
  useDeleteBlogMutation,
  useEditBlogMutation,
} = blogApi;
