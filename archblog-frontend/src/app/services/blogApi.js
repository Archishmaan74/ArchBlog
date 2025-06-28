import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
    }),
  }),
});

export const { useGetBlogsQuery } = blogApi;
