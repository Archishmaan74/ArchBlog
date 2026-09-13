import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ErrorModal from "./ErrorModal";

describe("ErrorModal", () => {
  test("renders the error message when open", () => {
    render(
      <ErrorModal
        open={true}
        message="Unable to connect to the server."
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText("Unable to connect to the server."),
    ).toBeInTheDocument();
  });

  test("does not render the modal content when closed", () => {
    render(
      <ErrorModal
        open={false}
        message="Unable to connect to the server."
        onClose={vi.fn()}
      />,
    );

    expect(screen.queryByText("Something went wrong")).not.toBeInTheDocument();
  });

  test("calls onClose when OK is clicked", () => {
    const onClose = vi.fn();

    render(
      <ErrorModal
        open={true}
        message="Something went wrong."
        onClose={onClose}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "OK" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
