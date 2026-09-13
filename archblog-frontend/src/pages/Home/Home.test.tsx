import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Home from "./Home";

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

let mockIsLoading = false;
let mockError: FetchBaseQueryError | null = null;

vi.mock("../../app/services/blogApi", () => ({
  useGetBlogsQuery: () => ({
    data: mockBlogs,
    error: mockError,
    isLoading: mockIsLoading,
  }),
}));

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsLoading = false;
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

  test("shows loader while loading", () => {
    mockIsLoading = true;

    render(<Home />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("displays blogs", () => {
    render(<Home />);

    expect(screen.getByText("All Blogs")).toBeInTheDocument();
    expect(screen.getByText("Test Blog")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("shows empty state when there are no blogs", () => {
    mockBlogs = [];

    render(<Home />);

    expect(screen.getByText("No blogs yet")).toBeInTheDocument();
    expect(
      screen.getByText(
        "There are no blogs available right now. Check back later.",
      ),
    ).toBeInTheDocument();
  });

  test("shows and closes error modal when request fails", async () => {
    mockError = { status: 401, data: {} };

    render(<Home />);

    await waitFor(() => {
      expect(
        screen.getByText("Your session has expired. Please log in again."),
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "OK" }));

    await waitFor(() => {
      expect(
        screen.queryByText("Your session has expired. Please log in again."),
      ).not.toBeInTheDocument();
    });
  });
});
