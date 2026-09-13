import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithResponseData = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.data) {
    result.data = result.data.data;
  }

  return result;
};

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: baseQueryWithResponseData,
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
      providesTags: ["Blogs"],
    }),

    getMyBlogs: builder.query({
      query: () => "/blogs/myblogs",
      providesTags: ["Blogs"],
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

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),

    editBlog: builder.mutation({
      query: ({ id, title, content }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: { title, content },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Blogs"],
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
