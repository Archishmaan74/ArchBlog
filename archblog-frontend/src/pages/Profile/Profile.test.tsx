import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Profile from "./Profile";

const mockNavigate = vi.fn();
const mockUpdateUser = vi.fn();

let mockUser = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  gender: "Male",
  companyName: "Company",
  email: "john@test.com",
};

let mockIsLoading = false;
let mockError: FetchBaseQueryError | null = null;
let mockUpdateError: FetchBaseQueryError | null = null;

vi.mock("../../app/services/authApi", () => ({
  useGetLoggedInUserQuery: () => ({
    data: mockUser,
    isLoading: mockIsLoading,
    error: mockError,
  }),
  usePutUpdateUserMutation: () => [mockUpdateUser, { error: mockUpdateError }],
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("Profile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockIsLoading = false;
    mockError = null;
    mockUpdateError = null;
    mockUser = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      companyName: "Company",
      email: "john@test.com",
    };
  });

  test("shows loader while loading", () => {
    mockIsLoading = true;

    render(<Profile />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("displays user data and updates profile", async () => {
    mockUpdateUser.mockReturnValue({
      unwrap: () => Promise.resolve({}),
    });

    render(<Profile />);

    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Male")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Company")).toBeInTheDocument();

    fireEvent.change(screen.getByDisplayValue("John"), {
      target: { value: "Jane" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Save Changes" }));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        firstName: "Jane",
        lastName: "Doe",
        gender: "Male",
        companyName: "Company",
      });
    });
  });

  test("logs out successfully", () => {
    localStorage.setItem("token", "test-token");

    render(<Profile />);

    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    expect(localStorage.getItem("token")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });

  test("shows error modal when API request fails", async () => {
    mockError = { status: 401, data: {} };

    render(<Profile />);

    await waitFor(() => {
      expect(
        screen.getByText("Your session has expired. Please log in again."),
      ).toBeInTheDocument();
    });
  });
});
