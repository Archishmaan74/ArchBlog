import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import ResetPassword from "./ResetPassword";

const mockNavigate = vi.fn();
const mockResetPassword = vi.fn();
let mockError: FetchBaseQueryError | null = null;

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

vi.mock("../../app/services/authApi", () => ({
  usePostResetPasswordMutation: () => [
    mockResetPassword,
    { isLoading: false, error: mockError },
  ],
}));

describe("ResetPassword", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockError = null;
  });

  test("shows validation errors for empty form", () => {
    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>,
    );

    fireEvent.submit(
      screen.getByRole("button", { name: "Reset Password" }).closest("form")!,
    );

    expect(screen.getByText("OTP is required")).toBeInTheDocument();
    expect(screen.getByText("New password is required")).toBeInTheDocument();
    expect(mockResetPassword).not.toHaveBeenCalled();
  });

  test("resets password successfully", async () => {
    mockResetPassword.mockReturnValue({
      unwrap: () => Promise.resolve({}),
    });

    render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole("textbox", { name: "OTP" }), {
      target: { value: "123456" },
    });

    fireEvent.change(document.querySelector('input[name="newPassword"]')!, {
      target: { value: "newpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Reset Password" }));

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith({
        otp: "123456",
        newPassword: "newpassword",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });

  test("shows error modal when reset fails", async () => {
    mockResetPassword.mockReturnValue({
      unwrap: () => Promise.reject({ status: 401 }),
    });

    const view = render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole("textbox", { name: "OTP" }), {
      target: { value: "123456" },
    });

    fireEvent.change(document.querySelector('input[name="newPassword"]')!, {
      target: { value: "newpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Reset Password" }));

    mockError = { status: 401, data: {} };

    view.rerender(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Your session has expired. Please log in again."),
      ).toBeInTheDocument();
    });
  });
});
