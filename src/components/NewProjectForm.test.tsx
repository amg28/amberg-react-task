import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import NewProjectForm, { NewProjectFormRef } from "./NewProjectForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import AxiosMockAdapter from "axios-mock-adapter";

import { api } from "../services/apiService";
import { ProjectTemplate } from "../data/schema";

const axiosMock = new AxiosMockAdapter(api);

const testData = {
  name: "Project Riga",
  lineSectionName: "Line 1",
  trackName: "Track 1",
  number: '1',
  projectTemplateId: '1',
};

const mockTemplateData: ProjectTemplate[] = [
  { id: "1", name: "Template 1" },
  { id: "2", name: "Template 2" },
  { id: "3", name: "Template 3" },
];    

describe("NewProjectForm", () => {
  beforeEach(() => {
    axiosMock.onGet("/projectTemplate/list").reply(200, mockTemplateData);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  const renderComponent = () => {
    const ref = createRef<NewProjectFormRef>();
    render(
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
          <NewProjectForm ref={ref} />
        </BrowserRouter>
      </QueryClientProvider>
    );
    return ref;
  };

  it("should successfully submit form and receive response body with submitted fields", async () => {
    const user = userEvent.setup();
    
    const ref = renderComponent();
   
    // Fill out the form
    await user.type(screen.getByLabelText(/^Name/), testData.name);
    await user.type(screen.getByLabelText(/Line Section Name/), testData.lineSectionName);
    await user.type(screen.getByLabelText(/Track Name/), testData.trackName);

    // Select a template
    const input = screen.getByLabelText(/Select a Template/);
    await user.click(input);
    await user.click(screen.getByText(mockTemplateData[0].name));


    ref.current!.submitForm();

    await waitFor(() => {
      expect(axiosMock.history.post.length).toBe(1); // Ensure request was made
    });

    expect(axiosMock.history.post[0].url).toEqual("/project");
    const requestData = JSON.parse(axiosMock.history.post[0].data);
    expect(requestData).toEqual(testData);
  });
});