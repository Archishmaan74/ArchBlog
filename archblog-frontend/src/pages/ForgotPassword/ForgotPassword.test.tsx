import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import ForgotPassword from "./ForgotPassword";

const mockNavigate = vi.fn();
const mockForgotPassword = vi.fn();
let mockError: FetchBaseQueryError | null = null;

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

vi.mock("../../app/services/authApi", () => ({
  usePostForgotPasswordMutation: () => [
    mockForgotPassword,
    { isLoading: false, error: mockError },
  ],
}));

describe("ForgotPassword", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockError = null;
  });

  test("shows validation error for empty email", () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );

    fireEvent.submit(
      screen.getByRole("button", { name: "Send OTP" }).closest("form")!,
    );

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(mockForgotPassword).not.toHaveBeenCalled();
  });

  test("sends OTP successfully", async () => {
    mockForgotPassword.mockReturnValue({
      unwrap: () => Promise.resolve({}),
    });

    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), {
      target: { value: "test@test.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Send OTP" }));

    await waitFor(() => {
      expect(mockForgotPassword).toHaveBeenCalledWith({
        email: "test@test.com",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/resetpassword", {
        replace: true,
      });
    });
  });

  test("shows error modal when request fails", async () => {
    mockForgotPassword.mockReturnValue({
      unwrap: () => Promise.reject({ status: 401 }),
    });

    const view = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), {
      target: { value: "test@test.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Send OTP" }));

    mockError = { status: 401, data: {} };

    view.rerender(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Your session has expired. Please log in again."),
      ).toBeInTheDocument();
    });
  });
});
