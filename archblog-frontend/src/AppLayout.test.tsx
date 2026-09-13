import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import AppLayout from "./AppLayout";

vi.mock("./components/NavHeader/NavHeader", () => ({
  default: () => <div>Header</div>,
}));

vi.mock("./components/NavFooter/NavFooter", () => ({
  default: () => <div>Footer</div>,
}));

vi.mock("react-router-dom", () => ({
  Outlet: () => <div>Content</div>,
}));

describe("AppLayout", () => {
  test("renders header, content, and footer", () => {
    render(<AppLayout />);

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
