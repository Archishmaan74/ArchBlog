import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import AuthLayout from "./AuthLayout";

vi.mock("react-router-dom", () => ({
  Outlet: () => <div>Content</div>,
}));

describe("AuthLayout", () => {
  test("renders outlet content", () => {
    render(<AuthLayout />);

    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
