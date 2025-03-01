import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import ProjectListPage from "./ProjectListPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import AxiosMockAdapter from "axios-mock-adapter";
import { api } from "../services/apiService";

// Mock API Setup
const axiosMock = new AxiosMockAdapter(api);

describe("ProjectListPage", () => {
  beforeEach(() => {
    axiosMock.reset(); // Clear previous API calls
  });

  afterEach(() => {
    axiosMock.reset();
  });

  const renderComponent = () =>
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <ProjectListPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

  it("should render project list correctly", async () => {
    // Mock API response for projects
    axiosMock.onGet("/project/list?direction=1").reply(200, {
      projects: [
        { id: "1", projectInfo: { name: "Project Alpha" }, modifiedDate: "2025-03-01T15:15:25Z" },
        { id: "2", projectInfo: { name: "Project Beta" }, modifiedDate: "2025-03-02T10:10:10Z" },
      ],
      hasNext: true,
      hasPrev: false,
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Projects")).toBeVisible();
      expect(screen.getByText("Project Alpha")).toBeVisible();
      expect(screen.getByText("Project Beta")).toBeVisible();
      expect(screen.getByRole("button", { name: "+ New" })).toBeVisible();
      expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();
      expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    });
  });

  it("should display loading indicator while fetching projects", async () => {
    axiosMock.onGet("/project/list?direction=1").reply(() => new Promise(() => {})); // Simulating loading state

    renderComponent();

    expect(screen.getByRole("progressbar")).toBeVisible();
  });

  it("should call API to change sorting order", async () => {
    axiosMock.onGet("/project/list?direction=1").reply(200, { projects: [], hasNext: false, hasPrev: false });
    axiosMock.onGet("/project/list?direction=-1").reply(200, { projects: [], hasNext: false, hasPrev: false });

    renderComponent();
    const user = userEvent.setup();

    const orderSelect = screen.getByLabelText("Order");
    await user.click(orderSelect);
    await user.click(screen.getByText("Z-A"));

    await waitFor(() => {
      expect(axiosMock.history.get.some(req => req?.url?.includes("direction=-1"))).toBe(true);
    });
  });

  it("should load next page when clicking 'Next' button", async () => {
    axiosMock.onGet("/project/list?direction=1").reply(200, {
      projects: [{ id: "1", projectInfo: { name: "Project Alpha" }, modifiedDate: "2025-03-01T15:15:25Z" }],
      hasNext: true,
      hasPrev: false,
    });

    axiosMock.onGet("/project/list?cursor=next").reply(200, {
      projects: [{ id: "2", projectInfo: { name: "Project Beta" }, modifiedDate: "2025-03-02T10:10:10Z" }],
      hasNext: false,
      hasPrev: true,
    });

    renderComponent();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Next" }));

    await waitFor(() => {
      expect(axiosMock.history.get.some(req => req?.url?.includes("cursor=next"))).toBe(true);
    });
  });

  it("should load previous page when clicking 'Previous' button", async () => {
    axiosMock.onGet("/project/list?direction=1").reply(200, {
      projects: [{ id: "2", projectInfo: { name: "Project Beta" }, modifiedDate: "2025-03-02T10:10:10Z" }],
      hasNext: false,
      hasPrev: true,
    });

    axiosMock.onGet("/project/list?cursor=prev").reply(200, {
      projects: [{ id: "1", projectInfo: { name: "Project Alpha" }, modifiedDate: "2025-03-01T15:15:25Z" }],
      hasNext: true,
      hasPrev: false,
    });

    renderComponent();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Previous" }));

    await waitFor(() => {
      expect(axiosMock.history.get.some(req => req?.url?.includes("cursor=prev"))).toBe(true);
    });
  });

  it("should navigate to the new project page when clicking '+ New'", async () => {
    axiosMock.onGet("/project/list?direction=1").reply(200, { projects: [], hasNext: false, hasPrev: false });

    renderComponent();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "+ New" }));

    await waitFor(() => {
      expect(window.location.pathname).toBe("/new"); // Ensures navigation occurs
    });
  });

  it("should handle API errors gracefully", async () => {
    axiosMock.onGet("/project/list?direction=1").reply(500);

    renderComponent();

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  });
});
