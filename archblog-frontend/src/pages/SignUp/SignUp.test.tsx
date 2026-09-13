import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import SignUp from "./SignUp";

const mockNavigate = vi.fn();
const mockRegister = vi.fn();
let mockError: FetchBaseQueryError | null = null;

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));

vi.mock("../../app/services/authApi", () => ({
  usePostRegisterUserMutation: () => [
    mockRegister,
    { isLoading: false, error: mockError },
  ],
}));

describe("SignUp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockError = null;
  });

  test("shows validation errors for empty form", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    fireEvent.submit(
      screen.getByRole("button", { name: "Sign Up" }).closest("form")!,
    );

    expect(screen.getByText("First Name is required")).toBeInTheDocument();
    expect(screen.getByText("Last Name is required")).toBeInTheDocument();
    expect(screen.getByText("Gender is required")).toBeInTheDocument();
    expect(screen.getByText("Company Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(mockRegister).not.toHaveBeenCalled();
  });

  test("registers successfully", async () => {
    mockRegister.mockReturnValue({
      unwrap: () => Promise.resolve({}),
    });

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole("textbox", { name: "First Name" }), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Last Name" }), {
      target: { value: "Doe" },
    });
    fireEvent.change(document.querySelector('input[name="gender"]')!, {
      target: { value: "male" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Company Name" }), {
      target: { value: "Company" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), {
      target: { value: "john@test.com" },
    });
    fireEvent.change(document.querySelector('input[name="password"]')!, {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        gender: "male",
        companyName: "Company",
        email: "john@test.com",
        password: "password",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  test("shows error modal when registration fails", async () => {
    mockRegister.mockReturnValue({
      unwrap: () => Promise.reject({ status: 401 }),
    });

    const view = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByRole("textbox", { name: "First Name" }), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Last Name" }), {
      target: { value: "Doe" },
    });
    fireEvent.change(document.querySelector('input[name="gender"]')!, {
      target: { value: "male" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Company Name" }), {
      target: { value: "Company" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Email" }), {
      target: { value: "john@test.com" },
    });
    fireEvent.change(document.querySelector('input[name="password"]')!, {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    mockError = { status: 401, data: {} };

    view.rerender(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Your session has expired. Please log in again."),
      ).toBeInTheDocument();
    });
  });
});
