import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Loader from "./Loader";

describe("Loader", () => {
  test("renders the loader", () => {
    render(<Loader />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders the small loader", () => {
    render(<Loader small />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
