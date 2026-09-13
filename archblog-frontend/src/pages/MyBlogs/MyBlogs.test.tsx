import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import MyBlogs from "./MyBlogs";

const mockDeleteBlog = vi.fn();
const mockEditBlog = vi.fn();

let mockBlogs = [
  {
    id: 1,
    title: "Test Blog",
    content: "Test Content",
    dateOfBlog: "2026-09-13",
    timeOfBlog: "10:00:00",
    userEmail: "test@test.com",
    firstName: "John",
    lastName: "Doe",
    gender: "male",
    companyName: "Company",
  },
];

let mockError: FetchBaseQueryError | null = null;

vi.mock("../../app/services/blogApi", () => ({
  useGetMyBlogsQuery: () => ({
    data: mockBlogs,
    error: mockError,
    isLoading: false,
  }),
  useDeleteBlogMutation: () => [mockDeleteBlog, { error: mockError }],
  useEditBlogMutation: () => [mockEditBlog, { error: mockError }],
}));

describe("MyBlogs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockError = null;
    mockBlogs = [
      {
        id: 1,
        title: "Test Blog",
        content: "Test Content",
        dateOfBlog: "2026-09-13",
        timeOfBlog: "10:00:00",
        userEmail: "test@test.com",
        firstName: "John",
        lastName: "Doe",
        gender: "male",
        companyName: "Company",
      },
    ];
  });

  test("shows empty state when there are no blogs", () => {
    mockBlogs = [];

    render(<MyBlogs />);

    expect(screen.getByText("No blogs yet")).toBeInTheDocument();
    expect(
      screen.getByText("You haven't published any blogs yet."),
    ).toBeInTheDocument();
  });

  test("enters edit mode and cancels", () => {
    render(<MyBlogs />);

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    expect(screen.getByDisplayValue("Test Blog")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Content")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.getByText("Test Blog")).toBeInTheDocument();
  });

  test("edits and saves a blog", async () => {
    mockEditBlog.mockReturnValue({
      unwrap: () => Promise.resolve({}),
    });

    render(<MyBlogs />);

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    fireEvent.change(screen.getByDisplayValue("Test Blog"), {
      target: { value: "Updated Blog" },
    });

    fireEvent.change(screen.getByDisplayValue("Test Content"), {
      target: { value: "Updated Content" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(mockEditBlog).toHaveBeenCalledWith({
        id: 1,
        title: "Updated Blog",
        content: "Updated Content",
      });
    });

    expect(screen.getByText("Test Blog")).toBeInTheDocument();
  });

  test("deletes a blog", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);

    mockDeleteBlog.mockReturnValue({
      unwrap: () => Promise.resolve({}),
    });

    render(<MyBlogs />);

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(mockDeleteBlog).toHaveBeenCalledWith(1);
    });
  });

  test("shows error modal when an API request fails", async () => {
    mockError = { status: 401, data: {} };

    render(<MyBlogs />);

    await waitFor(() => {
      expect(
        screen.getByText("Your session has expired. Please log in again."),
      ).toBeInTheDocument();
    });
  });

  test("handles delete and save errors", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);

    mockDeleteBlog.mockReturnValue({
      unwrap: () => Promise.reject({ status: 500 }),
    });

    mockEditBlog.mockReturnValue({
      unwrap: () => Promise.reject({ status: 500 }),
    });

    render(<MyBlogs />);

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(mockDeleteBlog).toHaveBeenCalledWith(1);
    });

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => {
      expect(mockEditBlog).toHaveBeenCalledWith({
        id: 1,
        title: "Test Blog",
        content: "Test Content",
      });
    });
  });
});
