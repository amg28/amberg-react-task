import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SortOrderSelect from "../components/SortOrderSelect";
import { describe, it, expect, vi } from "vitest";

const theme = createTheme();

describe("SortOrderSelect component", () => {
  it("renders the dropdown with correct initial value", () => {
    render(
      <ThemeProvider theme={theme}>
        <SortOrderSelect direction={1} toggleSort={() => {}} />
      </ThemeProvider>
    );

    expect(screen.getByText("A-Z")).toBeInTheDocument();
  });

  it("calls toggleSort function when selecting a new option", async () => {
    const toggleSortMock = vi.fn();
    render(
      <ThemeProvider theme={theme}>
        <SortOrderSelect direction={1} toggleSort={toggleSortMock} />
      </ThemeProvider>
    );

    const user = userEvent.setup();

    
    await user.click(screen.getAllByLabelText("Order")[0]);
    await user.click(screen.getByRole("option", { name: "Z-A" }));

    expect(toggleSortMock).toHaveBeenCalled();
  });
});
