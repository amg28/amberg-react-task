import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import NewProjectPage from "./NewProjectPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import AxiosMockAdapter from "axios-mock-adapter";
import { api } from "../services/apiService";
import { createRef } from "react";
import { NewProjectFormRef } from "../components/NewProjectForm";

// Mock API calls
const axiosMock = new AxiosMockAdapter(api);

describe("NewProjectPage", () => {
  beforeAll(() => {
    axiosMock.onPost("/project").reply(201, {
      id: "12b53627-83f0-4bce-b88c-4161a702e50d",
      projectInfo: { name: "Project Alpha", number: "1" },
      createdDate: "2025-03-01T15:15:25Z",
      modifiedDate: "2025-03-01T15:15:25Z",
    });
  });

  afterAll(() => {
    axiosMock.reset();
  });

  const renderComponent = () => {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <NewProjectPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  it("should render the page layout correctly", () => {
    renderComponent();

    expect(screen.getByText("Create project")).toBeVisible();
    expect(screen.getByRole("button", { name: "+ Create" })).toBeVisible();
  });

  it("should render the NewProjectForm component", () => {
    renderComponent();

    expect(screen.getByLabelText("Name")).toBeVisible();
    expect(screen.getByLabelText("Line Section Name")).toBeVisible();
    expect(screen.getByLabelText("Track Name")).toBeVisible();
  });
  it("should call submitForm() when clicking the '+ Create' button", async () => {
    // Create a mock ref with a spy on submitForm
    const formRefMock = createRef<NewProjectFormRef>();
    formRefMock.current = { submitForm: vi.fn() };

    const user = userEvent.setup();

    renderComponent();

    // Click the create button
    await user.click(screen.getByRole("button", { name: "+ Create" }));

    // Ensure submitForm() was called
    await waitFor(() => {
      expect(formRefMock.current?.submitForm).toHaveBeenCalled();
    });
});
    
  it("should show validation errors when submitting an empty form", async () => {
    renderComponent();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "+ Create" }));

    expect(await screen.findByText("Name is required")).toBeVisible();
    expect(await screen.findByText("Line Section Name is required")).toBeVisible();
    expect(await screen.findByText("Track Name is required")).toBeVisible();

    expect(axiosMock.history.post.length).toBe(0); // API should not be called
  });

  it("should successfully submit the form and make an API request", async () => {
    renderComponent();
    const user = userEvent.setup();

    // Fill the form
    await user.type(screen.getByLabelText("Name"), "Project Alpha");
    await user.type(screen.getByLabelText("Line Section Name"), "Section 1");
    await user.type(screen.getByLabelText("Track Name"), "Track A");

    await user.click(screen.getByRole("button", { name: "+ Create" }));

    await waitFor(() => {
      expect(axiosMock.history.post.length).toBe(1); // Ensure API was called
    });

    // Verify request payload
    const requestData = JSON.parse(axiosMock.history.post[0].data);
    expect(requestData).toEqual({
      name: "Project Alpha",
      lineSectionName: "Section 1",
      trackName: "Track A",
      projectTemplateId: undefined, // Default unless selected
    });
  });

  it("should handle API errors gracefully", async () => {
    axiosMock.onPost("/project").reply(500, { message: "Server Error" });

    renderComponent();
    const user = userEvent.setup();

    // Fill the form
    await user.type(screen.getByLabelText("Name"), "Project Alpha");
    await user.type(screen.getByLabelText("Line Section Name"), "Section 1");
    await user.type(screen.getByLabelText("Track Name"), "Track A");

    await user.click(screen.getByRole("button", { name: "+ Create" }));

    await waitFor(() => {
      expect(axiosMock.history.post.length).toBe(1);
      expect(console.error).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Server Error" })
      );
    });
  });
});
