import { render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import ProjectListPage from "./ProjectListPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import AxiosMockAdapter from "axios-mock-adapter";
import { api } from "../services/apiService";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ProjectsData } from "../data/schema";

const axiosMock = new AxiosMockAdapter(api);


const renderComponent = () => {
  const theme = createTheme();
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ProjectListPage />
      </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe("ProjectListPage", () => {
  afterEach(() => {
    axiosMock.reset();
  });

  it("should show correct projects after clicking next page", async () => {
    const user = userEvent.setup();

    axiosMock.onGet("/project/list?direction=1").reply(200, {
      projects: [
        { id: "1", projectInfo: { name: "Project Alpha" }, modifiedDate: "2025-03-01T15:15:25Z" },
        { id: "2", projectInfo: { name: "Project Beta" }, modifiedDate: "2025-03-02T10:10:10Z" },
      ],
      next: 'cursor-page-2',
      prev: undefined,
    } satisfies ProjectsData);

    axiosMock.onGet("/project/list/cursor-page-2").reply(200, {
        projects: [
          { id: "3", projectInfo: { name: "Project Delta" }, modifiedDate: "2025-03-01T15:15:25Z" },
          { id: "4", projectInfo: { name: "Project Gamma" }, modifiedDate: "2025-03-02T10:10:10Z" },
        ],
        next: undefined,
        prev: 'cursor-page-1',
      } satisfies ProjectsData);

    renderComponent();

    expect(await screen.findByText("Project Alpha")).toBeVisible();
    expect(screen.getByText("Project Beta")).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Next" }));

    expect(screen.getByText("Project Delta")).toBeVisible();
    expect(screen.getByText("Project Gamma")).toBeVisible();
  });
});
