import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Login from "./Login";

const mockNavigate = vi.fn();
const mockLogin = vi.fn();
let mockError: FetchBaseQueryError | null = null;

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

vi.mock("../../app/services/authApi", () => ({
  usePostLoginUserMutation: () => [
    mockLogin,
    { isLoading: false, error: mockError },
  ],
}));

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockError = null;
  });

  test("shows validation errors for empty form", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    fireEvent.submit(
      screen.getByRole("button", { name: "Login" }).closest("form")!,
    );

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  test("logs in successfully", async () => {
    mockLogin.mockReturnValue({
      unwrap: () =>
        Promise.resolve({
          token: "token",
          user: { id: 1, email: "test@test.com" },
        }),
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(document.querySelector('input[name="password"]')!, {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("token");
      expect(mockNavigate).toHaveBeenCalledWith("/home", { replace: true });
    });
  });

  test("shows error modal when login fails", async () => {
    mockLogin.mockReturnValue({
      unwrap: () => Promise.reject({ status: 401 }),
    });

    const view = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(document.querySelector('input[name="password"]')!, {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    mockError = { status: 401, data: {} };
    view.rerender(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Your session has expired. Please log in again."),
      ).toBeInTheDocument();
    });
  });
});
