import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import AddBlog from "./AddBlog";

const mockAddBlog = vi.fn();
let mockLoading = false;
let mockError: FetchBaseQueryError | null = null;

vi.mock("../../app/services/blogApi", () => ({
  usePostAddBlogMutation: () => [
    mockAddBlog,
    { isLoading: mockLoading, error: mockError },
  ],
}));

describe("AddBlog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLoading = false;
    mockError = null;
  });

  test("adds blog successfully", async () => {
    mockAddBlog.mockReturnValue({
      unwrap: () => Promise.resolve({}),
    });

    render(
      <MemoryRouter>
        <AddBlog />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole("textbox", { name: "Blog Title" }), {
      target: { value: "Test Blog" },
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Blog Content" }), {
      target: { value: "Test content" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Post Blog" }));

    await waitFor(() => {
      expect(mockAddBlog).toHaveBeenCalledWith({
        title: "Test Blog",
        content: "Test content",
      });
    });

    await waitFor(() => {
      expect(screen.queryByText("Add a New Blog")).not.toBeInTheDocument();
    });
  });

  test("shows error modal when adding blog fails", async () => {
    mockAddBlog.mockReturnValue({
      unwrap: () => Promise.reject({ status: 401 }),
    });

    const view = render(
      <MemoryRouter>
        <AddBlog />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole("textbox", { name: "Blog Title" }), {
      target: { value: "Test Blog" },
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Blog Content" }), {
      target: { value: "Test content" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Post Blog" }));

    mockError = { status: 401, data: {} };

    view.rerender(
      <MemoryRouter>
        <AddBlog />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Your session has expired. Please log in again."),
      ).toBeInTheDocument();
    });
  });

  test("shows loader while adding blog", () => {
    mockLoading = true;

    render(
      <MemoryRouter>
        <AddBlog />
      </MemoryRouter>,
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.queryByText("Add a New Blog")).not.toBeInTheDocument();
  });
});
